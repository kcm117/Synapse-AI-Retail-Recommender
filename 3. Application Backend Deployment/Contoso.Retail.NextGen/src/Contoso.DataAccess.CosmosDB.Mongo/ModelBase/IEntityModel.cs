// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

namespace Contoso.DataAccess.CosmosDB.Mongo.ModelBase
{
    public interface IEntityModel<TIdentifier>
    {
        TIdentifier Id { get; set; }
    }
}