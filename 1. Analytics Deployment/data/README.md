## Additional Datasets Needed
  
We use the `product_details.json` to enhance the products served to the front-end with image information and cleaned up names.  
  
1. Upload this JSON to the Azure Data Lake Storage Account attached to your Synapse Studio  
    - Make sure you put it into the filesystem that is the Primary Filesystem for the Synapse Studio  
    - Put it in the folder `synapse/workspaces` in the filesystem that is the primary filesystem for the Synapse Studio
2. Import `1. Analytics Deployment\synapse-studio\notebooks\CreateOrUpdateProductDetails.ipynb` to the Synapse Studio and fill out the parameters for the filesystem name and the account name  
3. Execute the Notebook  
4. Then using `1. Analytics Deployment\synapse-studio\sqlscripts\03_create_product_detail_table.sql` create the External Table  
5. Go to the provisioned Azure Cognitive Search and set up an index that targets this table, name the index `product-detail-index`