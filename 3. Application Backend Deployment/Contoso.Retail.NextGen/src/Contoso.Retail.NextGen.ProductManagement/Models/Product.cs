// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using Contoso.DataAccess.CosmosDB.Mongo.ModelBase;
using System;
using System.Collections.Generic;
using System.Text;

namespace Contoso.Retail.NextGen.ProductManagement.Models
{
    public class Product : IEntityModel<Guid>
    {
        public Product()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public string ProductID { get; set; }
        public string ProductCategory { get; set; }
        public string Brand { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string ImageURL { get; set; }
        public string Description { get; set; }
    }
}
