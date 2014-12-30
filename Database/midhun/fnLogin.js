db.system.js.save(
	{
		_id:"fnLogin",
		value:function(data)
		{
		   
			ReturnData={};
			user_valid_or_not=db.clnUserLogin.find(data).limit(1).count();
			if(user_valid_or_not==0)
			{
				ReturnData.result="false";
				return ReturnData;
			}
			else
			{
		                login_data=db.clnUserLogin.find(data,{"_id":1,"roleMappings":1,"lastLoggedRoleMapping":1}).limit(1).toArray();
		                role_id=db.clnUserRoleMapping.find({"_id":login_data[0].lastLoggedRoleMapping}).toArray();
				ReturnData.ActiveUserDataId=new ObjectId();
		       			    var user={};
					    user._id=ReturnData.ActiveUserDataId;
					    user.userLoginId=login_data[0]._id;
					    user.roleMappingId=login_data[0].lastLoggedRoleMapping;
					    user.roleMappingObj=role_id;
		                            ReturnData.ActiveUserData=user;
					    ReturnData.result="true";
		                            ReturnData.userLoginId=login_data[0]._id.valueOf();
					    db.clnActiveUserData.insert(user);
		                            LogUserData=db.clnUserLogin.find({"_id":ObjectId(ReturnData.userLoginId)}).limit(1).toArray();
		                            ReturnData.ActiveUserData.username=LogUserData[0].userName;
					    return ReturnData;
			}

	}});