# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

import json, os
import requests
import logging



def az_search_lookup (key, search_service, index_name, field_to_search, items_to_search, search_expr="*", fields_to_select="*"):
    url = f"https://{search_service}.search.windows.net/indexes/{index_name}/docs/search?api-version=2019-05-06"


    payload = json.dumps({
        "search": search_expr,
        "select": fields_to_select,
        "filter": f"search.in({field_to_search}, '{items_to_search}', ',')"
    })

    headers = {
        'api-key': key,
        'Content-Type': 'application/json'
    }

    
    response = requests.request("POST", url, headers=headers, data=payload)
    if response.status_code == 200:
        result = response.json()["value"]
    else:
        result = response.json()
        logging.info(response.json())

    return result