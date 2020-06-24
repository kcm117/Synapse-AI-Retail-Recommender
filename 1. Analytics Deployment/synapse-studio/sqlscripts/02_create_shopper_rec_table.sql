-- Copyright (c) Microsoft Corporation. All rights reserved.
-- Licensed under the MIT License.

-- Choose the SQL Pool that you provisioned for this workspace and choose the database that is not master
-- You will need to switch "<synapse-studio-name>" with the name of the Synapse Analytics account name that you chose during deployment
CREATE EXTERNAL TABLE top_shopper_recommendations
(
[user_id] varchar(200),
[product_ids] varchar(200),
[updated_ts] datetime
)
WITH
(
 LOCATION = 'synapse/workspaces/<synapse-studio-name>/warehouse/retailaidb.db/top_shopper_recommendation_summary/', 
 DATA_SOURCE = retailaidl, 
 FILE_FORMAT = parquetformat
)