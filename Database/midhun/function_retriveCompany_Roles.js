db.system.js.save(
	{
		_id:"function_loadFeatures",
		value:function(value)
		{
			companyId=db.ClnRoleMaster.find({"companyId":ObjectId(value),activeFlag:1}).toArray();
			return companyId;
	}});