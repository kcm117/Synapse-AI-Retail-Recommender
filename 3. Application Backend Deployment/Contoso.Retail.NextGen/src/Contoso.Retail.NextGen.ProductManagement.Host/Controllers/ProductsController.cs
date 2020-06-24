// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contoso.Retail.NextGen.ProductManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Contoso.Retail.NextGen.ProductManagement.Host.Controllers
{
    [Route("ContosoRetail/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private IProductManager productManager;
        public ProductsController(IProductManager ProductManager)
        {
            productManager = ProductManager;
        }

        [HttpGet]
        public IEnumerable<Models.Product> Get()
        {
            return productManager.GetAllProducts();
        }

        [HttpGet("{ProductId}")]
        public Models.Product Get(string ProductId)
        {
            return productManager.GetProduct(ProductId);
        }

        [HttpGet]
        [Route("GetProductsByCategory")]
        public IEnumerable<Models.Product> GetProductsByCategory([FromQuery] string CategoryName)
        {
            return productManager.GetProductsByCategory(CategoryName);
        }

        [HttpPost]
        [Route("GetProducts")]
        public IEnumerable<Models.Product> GetProducts(string[] ProductIDS)
        {
            return productManager.GetProducts(ProductIDS);
        }


        [HttpPost]
        public async Task<Models.Product> Post([FromBody] Models.Product Product)
        {
            return await productManager.Register(Product);
        }

        [HttpPut]
        public async Task<bool> Put([FromBody] Models.Product Product)
        {
            return await productManager.Update(Product);
        }

        [HttpDelete("{ProductId}")]
        public bool Delete(Guid ProductId)
        {
            return productManager.Remove(ProductId);
        }
    }
}
