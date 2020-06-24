// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using Contoso.Retail.NextGen.ProductManagement.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contoso.Retail.NextGen.ProductManagement
{
    public interface IProductManager
    {
        IEnumerable<Product> GetAllProducts();
        IEnumerable<Product> GetProductsByCategory(string CategoryName);
        IEnumerable<Product> GetProducts(string[] ProductIDs);
        Product GetProduct(string ProductId);
        Task<Product> Register(Product Product);
        bool Remove(Guid ProductID);
        bool Remove(Product Product);
        Task<bool> Update(Product Product);
    }
}