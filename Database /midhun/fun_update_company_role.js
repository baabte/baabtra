db.system.js.save(
	{
		_id:"fun_update_company_role",
		value:function(RoleId,role,data)
		{
			var set={};
			CompanyId=ObjectId(RoleId);
			set[role]=data;
			set.updatedDate=Date();
			db.ClnRoleMaster.update({'_id':CompanyId},{'$set':set}); 
	}});