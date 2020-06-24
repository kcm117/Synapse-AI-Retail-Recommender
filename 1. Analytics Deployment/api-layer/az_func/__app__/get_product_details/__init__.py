# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

import os, json, time, logging
import requests
import redis
import azure.functions as func
import __app__.shared_code.search_operations as search_operations


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    search_key = os.getenv("SEARCH_KEY")
    search_service = os.getenv("SEARCH_SERVICE")
    index_name = os.getenv("PRODUCT_DETAIL_INDEX")
    product_id = req.params.get('product_id')

    try:
        if type(product_id) == type(list()):
            list_of_products = ",".join(product_id)
        else:
            list_of_products = product_id
        product_details = search_operations.az_search_lookup(search_key, search_service, index_name, "productID", list_of_products)
        response = json.dumps({"items": product_details})
        logging.info(response)
    except Exception as e:
        logging.error(e)
        response = {}["message"]=f"Recommendation Process Failed with exception {e}"

    return response