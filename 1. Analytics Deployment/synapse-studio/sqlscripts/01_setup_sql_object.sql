-- Copyright (c) Microsoft Corporation. All rights reserved.
-- Licensed under the MIT License.

-- Enter in a random string to be used for the password of the MASTER KEY
-- Run this command using the master database of the SQL Pool that you provisioned
CREATE MASTER KEY ENCRYPTION BY PASSWORD = '<enter-in-random-string>';
GO

-- This command should be run on the database that is not the master database, so switch to the other database for this command by
-- going to the "Use Database" drop-down in at the top of the window for this SQL Script (not the browser window)
--
-- You will need to get the Primary Key of the Azure Data Lake Storage Gen2 Account that is acting as the primary storage for this Synapse workspace
-- Enter in this value where it says <primary-key-from-adls-gen2>
CREATE DATABASE SCOPED CREDENTIAL data_lake_primary_key
WITH IDENTITY = 'user', Secret = '<primary-key-from-adls-gen2>';

-- Create data source
-- You will need to replace <file-system-name> with the file system name that is being used as the primary filesystem for this workspace
-- You will need to replace <account-name> with the account name of the ADLS Gen2 that is being used as the primary storage for this workspace
-- Do not change the name of the Data Source, if you do you will need to change it for the other included SQL Scripts
CREATE EXTERNAL DATA SOURCE [retailaidl]
WITH
(
	TYPE = HADOOP,
	LOCATION = N'abfss://<file-system-name>@<account-name>.dfs.core.windows.net/', 
	CREDENTIAL = [data_lake_primary_key]
);

-- No changes needed here, just highlight and run
CREATE EXTERNAL FILE FORMAT parquetformat  
WITH (  
    FORMAT_TYPE = PARQUET,  
    DATA_COMPRESSION = 'org.apache.hadoop.io.compress.SnappyCodec'  
); 