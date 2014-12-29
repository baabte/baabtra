db.system.js.save(
	{
		_id:"fun_load_log_user_data",
		value:function(objId)
		{
			 var activeObjId=objId.substr(0, objId.length-24); 
		    var activeUsrId=objId.substr(24);
		    userLoginId=db.clnActiveUserData.find({$and:[{"_id" : ObjectId(activeObjId)},{userLoginId:ObjectId(activeUsrId)}]}).limit(1).toArray();
		    userLoginId[0].userLoginId=userLoginId[0].userLoginId.valueOf();
		    userData=db.clnUserLogin.find({"_id":ObjectId(userLoginId[0].userLoginId)}).limit(1).toArray();
		    return userData[0];
	}});