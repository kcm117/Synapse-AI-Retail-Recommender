// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using Contoso.DataAccess.CosmosDB.Mongo.ModelBase;
using Contoso.DigitalGoods.OffChain;
using Contoso.Retail.NextGen.ProductManagement.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contoso.Retail.NextGen.ProductManagement
{
    public class ProductManager : MongoEntntyCollectionBase<Models.Product, Guid>, IProductManager
    {
        public ProductManager(string DataConnectionString, string CollectionName) : base(DataConnectionString, CollectionName)
        {
        }

        public async Task<Models.Product> Register(Models.Product Product)
        {
            return await ObjectCollection.SaveAsync(new Models.Product()
            {
                Name = Product.Name,
                ProductID = Product.ProductID,
                Brand = Product.Brand,
                ProductCategory = Product.ProductCategory,
                Price = Product.Price,
                ImageURL = Product.ImageURL,
                Description = Product.Description
            });
        }

        public Models.Product GetProduct(string ProductId)
        {
            return ObjectCollection.Find(new GenericSpecification<Models.Product>(x => x.ProductID == ProductId));
        }

        public IEnumerable<Models.Product> GetProductsByCategory(string CategoryName)
        {
            return ObjectCollection.FindAll(new GenericSpecification<Models.Product>(x => x.ProductCategory == CategoryName));
        }


        public IEnumerable<Models.Product> GetProducts(string[] ProductIDs)
        {
            foreach (var item in ProductIDs)
            {
                yield return GetProduct(item);
            }
        }

        public IEnumerable<Models.Product> GetAllProducts()
        {
            return ObjectCollection.GetAll();
        }

        public async Task<bool> Update(Models.Product Product)
        {
            await ObjectCollection.SaveAsync(Product);
            return true;
        }

        public bool Remove(Models.Product Product)
        {
            ObjectCollection.Delete(Product);
            return true;
        }

        public bool Remove(Guid ProductID)
        {
            ObjectCollection.Delete(ProductID);
            return true;
        }
    }
}
