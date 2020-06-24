// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Contoso.Retail.NextGen.ProductManagement;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Contoso.Test.MSTestV2;

namespace Contoso.Retail.NextGen.ProductManagement.Tests
{
    [TestClass()]
    public class ProductManagerTests : TestBase
    {

        static ProductManager _productManager;
        static Models.Product newProduct;

        [TestInitialize()]
        public void ProductManagerTest()
        {
            if (_productManager == null)
            {
                _productManager = new ProductManager(Config["Values:DBConnectionString"], "Products");
            }
        }

        [TestMethod()]
        public void Test01_RegisterTest()
        {
            var result = _productManager.Register(
                new Models.Product()
                {
                    Name = "foo",
                    ProductID = "1010101",
                    Brand = "Microsoft",
                    Price = 10.02,
                    Description = "bla bla bla",
                    ImageURL = "http://images.com/foo.jpg"
                }
                ).GetAwaiter().GetResult();

            newProduct = result;

            Assert.IsNotNull(newProduct);
        }

        [TestMethod()]
        public void Test02_GetProductTest()
        {
            var result = _productManager.GetProduct(newProduct.ProductID);
            Assert.IsTrue(result.Id == newProduct.Id);
        }

        [TestMethod()]
        public void Test03_GetAllProductsTest()
        {
            var result = _productManager.GetAllProducts();
            Assert.IsTrue(result.Count() > 0);
        }

        [TestMethod()]
        public void Test04_UpdateTest()
        {
            newProduct.Name = "Updated Name";
            _productManager.Update(newProduct).GetAwaiter().GetResult();

            var product = _productManager.GetProduct(newProduct.ProductID);

            Assert.IsTrue(product.Name == "Updated Name");
        }

        [TestMethod()]
        public void Test05_RemoveTest()
        {
            var result = _productManager.Remove(newProduct.Id);

            Assert.IsTrue(result);
        }

    }
}