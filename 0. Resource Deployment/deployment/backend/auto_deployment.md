# Deploy Resources

## Step 1: Get the data required for this Accelerator 
We are using the data provided by [this Kaggle Open Dataset](https://www.kaggle.com/mkechinov/ecommerce-behavior-data-from-multi-category-store), and you will need to download the data to your local machine. You will need the following CSVs/Datasets (download them):  
    - 2019-Oct.csv  
    - 2019-Nov.csv  
    - 2019-Dec.csv.gz (available [here](https://drive.google.com/drive/folders/1Nan8X33H8xrXS5XhCKZmSpClFTCJsSpE))   
    - 2020-Jan.csv.gz (available [here](https://drive.google.com/drive/folders/1Nan8X33H8xrXS5XhCKZmSpClFTCJsSpE))  


## Step 2: Create Azure Synapse Analytics (workspace preview)
In this step you will deploy an Azure Synapse Analytics (workspace preview), a SQL Pool and a Spark Pool in the Azure Synapse Analytics (workspace preview) and an Azure Data Lake (Gen2) Storage Account into your Azure Subscription that you are using for this solution accelerator. 

**Parameters**

Below are paramaters you will use to create the necessary resources for this solution accelerator. 
- Subscription: Azure Subscription Id 
- Resource Group: Name of the resource group to create 
- Resource Name: a globally unique name for creating the resources (must be 3-10 characters)
- Username: SQL user for Synapse workspace 
- Password: SQL user for Synapse workspace (must be at least 8 characters)
- Location: the location to deploy all the resources  


**Note:** You will be installing the Azure CLI extension for Azure Synapse 
1. Open powershell  
2. Navigate to this folder 
3. Run the following command: 
    `./deployment_script.ps1`

