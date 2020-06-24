# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

import os, json, requests

def create_index (key, search_index_name, index_name, index_json, api_version="2019-05-06"):
    url = f"https://{search_index_name}.search.windows.net/indexes?api-version={api_version}"
    headers = {"Content-Type": "application/json", "api-key": key}
    response = requests.post(index_json, headers=headers)
    if response.status_code == 201:
        print("SUCCESS! Index created!")
        print(response.json())
        print("----------------------")
    else:
        print("Error creating the index")

pathToIndexJSON = os.path.join(os.getcwd(), "top_shopper_recommendations_index.json")

# Read template
with open(pathToIndexJSON, "r") as data:
    index = json.loads(data)


try:
    create_index(AUTH_KEY, "<SEARCH_SERVICE>", "INDEX_NAME", index)
    print("SUCCESS!")
except Exception as e:
    print(f"Failure {e}")