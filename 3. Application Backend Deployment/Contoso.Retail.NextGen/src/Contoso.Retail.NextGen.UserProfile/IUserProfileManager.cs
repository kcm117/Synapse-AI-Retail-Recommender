// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contoso.Retail.NextGen.UserProfile
{
    public interface IUserProfileManager
    {
        IEnumerable<Models.UserProfile> GetAllUsers();
        Models.UserProfile GetUser(string UserID);
        Task<Models.UserProfile> Register(Models.UserProfile User);
        bool Remove(Guid UserID);
        bool Remove(Models.UserProfile User);
        Task<bool> Update(Models.UserProfile User);
    }
}