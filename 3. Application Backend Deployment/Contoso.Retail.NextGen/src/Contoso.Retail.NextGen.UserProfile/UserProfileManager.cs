// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using Contoso.DataAccess.CosmosDB.Mongo.ModelBase;
using Contoso.DigitalGoods.OffChain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contoso.Retail.NextGen.UserProfile
{
    public class UserProfileManager : MongoEntntyCollectionBase<Models.UserProfile, Guid>, IUserProfileManager
    {
        public UserProfileManager(string DataConnectionString, string CollectionName) : base(DataConnectionString, CollectionName)
        {
        }

        public async Task<Models.UserProfile> Register(Models.UserProfile User)
        {
            return await ObjectCollection.SaveAsync(new Models.UserProfile()
            { UserID = User.UserID, Name = User.Name, ProfileImageURL = User.ProfileImageURL }
            );
        }

        public Models.UserProfile GetUser(string UserID)
        {
            return ObjectCollection.Find(new GenericSpecification<Models.UserProfile>(x => x.UserID == UserID));
        }

        public IEnumerable<Models.UserProfile> GetAllUsers()
        {

            return ObjectCollection.GetAll();
        }

        public async Task<bool> Update(Models.UserProfile User)
        {
            await ObjectCollection.SaveAsync(User);
            return true;
        }

        public bool Remove(Models.UserProfile User)
        {
            ObjectCollection.Delete(User);
            return true;
        }

        public bool Remove(Guid UserID)
        {
            ObjectCollection.Delete(UserID);
            return true;
        }
    }
}
