// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Contoso.Retail.NextGen.UserProfile;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Linq;
using Contoso.Test.MSTestV2;

namespace Contoso.Retail.NextGen.UserProfile.Tests
{
    [TestClass()]
    public class UserProfileManagerTests : TestBase
    {

        static UserProfileManager _profile;
        static Models.UserProfile newUser;

        [TestInitialize()]
        public void Initialize()
        {
            if (_profile == null)
            {
                _profile = new UserProfileManager(Config["Values:DBConnectionString"], "Users");
            }
        }


        [TestMethod()]
        public  void Test01_RegisterTest()
        {
            var result =  _profile.Register(
                new Models.UserProfile() 
                { 
                    Name = "Foo",
                    UserID = "1010101",
                    ProfileImageURL = "http://foo.com/foo.jpg"
                }).GetAwaiter().GetResult();
            newUser = result;

            Assert.IsNotNull(result);
        }

    
        [TestMethod()]
        public void Test02_GetUserTest()
        {
            var result = _profile.GetUser(newUser.UserID);
            Assert.IsTrue(result.Id == newUser.Id);


        }

        [TestMethod()]
        public void Test03_GetAllUsersTest()
        {
            var result = _profile.GetAllUsers();
            Assert.IsTrue(result.Count() > 0);
        }


        [TestMethod()]
        public void Test04_UpdateTest()
        {
            newUser.Name = "updated Name";
            _profile.Update(newUser).GetAwaiter().GetResult();

            var user = _profile.GetUser(newUser.UserID);

            Assert.IsTrue(user.Name == "updated Name");
        }

        [TestMethod()]
        public void Test05_RemoveTest()
        {
            var result = _profile.Remove(newUser.Id);

            Assert.IsTrue(result);
        }



    }

  
}