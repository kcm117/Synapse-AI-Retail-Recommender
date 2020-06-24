// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Contoso.Retail.NextGen.UserProfile.Host.Controllers
{
    [Route("ContosoRetail/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserProfileManager profileManager;

        public UsersController(IUserProfileManager ProfileManager)
        {
            profileManager = ProfileManager;
        }

        [HttpGet]
        public IEnumerable<Models.UserProfile> Get()
        {
            return profileManager.GetAllUsers();
        }

        [HttpGet("{UserId}")]
        public Models.UserProfile Get(string UserId)
        {
            return profileManager.GetUser(UserId);
        }

        [HttpPost]
        public async Task<Models.UserProfile> Post([FromBody] Models.UserProfile userProfile)
        {
            return await profileManager.Register(userProfile);
        }

        [HttpPut]
        public async Task<bool> Put([FromBody] Models.UserProfile userProfile)
        {
            return await profileManager.Update(userProfile);
        }

        [HttpDelete("{UserId}")]
        public bool Delete(Guid UserId)
        {
            return profileManager.Remove(UserId);
        }
    }
}
