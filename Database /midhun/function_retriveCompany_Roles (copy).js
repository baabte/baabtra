db.system.js.save(
	{
		_id:"function_retrieve_billing_plans",
		value:function()
		{
			plans=db.clnFeatures.find({activeFlag:1}).toArray();
			return plans;
	}});