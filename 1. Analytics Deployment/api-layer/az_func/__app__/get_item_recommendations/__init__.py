# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

import os, json, time, logging
import requests
import redis
import azure.functions as func
import __app__.shared_code.search_operations as search_operations


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    scoring_uri = os.getenv("SCORING_URL")
    amls_key = os.getenv("AMLS_SERVICE_KEY")
    search_key = os.getenv("SEARCH_KEY")
    search_service = os.getenv("SEARCH_SERVICE")
    index_name = os.getenv("PRODUCT_DETAIL_INDEX")
    input_id = req.params.get('product_id')
    logging.info(input_id)
    inputdict = {"product_id":int(input_id)}
    logging.info(inputdict)
    input_data = json.dumps(inputdict)
    headers = {'Content-Type': 'application/json'}
    headers['Authorization'] = f'Bearer {amls_key}'
    try:
        resp = requests.post(scoring_uri, input_data, headers=headers)
        logging.info(resp.text)
        resp_get_id = [str(item) for item in json.loads(resp.json())["related_products"]]
        logging.info(resp_get_id)
        list_of_products = ",".join(resp_get_id)
        product_details = search_operations.az_search_lookup(search_key, search_service, index_name, "productID", list_of_products)
        response = {"related_products": product_details}
        logging.info(response)
    except ValueError as ve:
        logging.info(ve)
        logging.info("No recommendations")
        response = {"related_products": []}
    except Exception as e:
        logging.error(e)
        response = {}["message"]=f"Recommendation Process Failed with exception {e}"

    return json.dumps(response)