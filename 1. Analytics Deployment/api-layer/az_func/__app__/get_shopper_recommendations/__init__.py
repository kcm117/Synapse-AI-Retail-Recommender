# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

import os, json, time, logging
import requests
import redis
import __app__.shared_code.search_operations as search_operations
import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    key = os.getenv("SEARCH_KEY")
    search_service = os.getenv("SEARCH_SERVICE")
    index_name = os.getenv("RECOMMENDATION_INDEX")
    user_id = req.params.get('user_id')
    try:
        list_of_products = search_operations.az_search_lookup(key, search_service, index_name, "user_id", user_id, "*", "*")[0]["product_ids"][1:-1].split(",")
        list_of_products = ",".join([item.replace(" ", "") for item in list_of_products])
        logging.info(list_of_products)
        product_details = search_operations.az_search_lookup(key, search_service, os.getenv("PRODUCT_DETAIL_INDEX"), "productID", list_of_products)
        logging.info(product_details)
        response = {"user_id": user_id, "items": product_details}
        logging.info(f"Recommendation Generated: {response}")
    except IndexError as ie:
        logging.error(ie)
        response = {}["message"]=f"User ID does not exist, no recommendations"
    except Exception as e:
        logging.error(e)
        response = {}["message"]=f"Recommendation Process Failed with exception {e}"

    return json.dumps(response)