db.system.js.save(
	{
		_id:"function_loadFeatures",
		value:function(value)
		{
			companyId=db.clnFeatures.find().toArray();
			return companyId;
	}});