-- Copyright (c) Microsoft Corporation. All rights reserved.
-- Licensed under the MIT License.

-- Choose the SQL Pool that you provisioned for this workspace and choose the database that is not master
-- You will need to switch "<synapse-studio-name>" with the name of the Synapse Analytics account name that you chose during deployment
CREATE EXTERNAL TABLE product_detail 
(
[id] varchar(8000),
[productID] varchar(8000),
[productCategory] varchar(8000),
[brand] varchar(8000),
[name] varchar(8000),
[price] float,
[imageURL] varchar(8000),
[description] varchar(8000),
[updated_ts] datetime
)
WITH
(
 LOCATION = 'synapse/workspaces/<synapse-studio-name>/warehouse/retailaidb.db/product_detail/', 
 DATA_SOURCE = retailaidl, 
 FILE_FORMAT = parquetformat
)