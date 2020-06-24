// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using Contoso.DataAccess.CosmosDB.Mongo.ModelBase;
using System;
using System.Collections.Generic;
using System.Text;

namespace Contoso.Retail.NextGen.UserProfile.Models
{
    public class UserProfile : IEntityModel<Guid>
    {
        public UserProfile()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public string UserID { get; set; }
        public string Name { get; set; }
        public string ProfileImageURL { get; set; }
    }
}
