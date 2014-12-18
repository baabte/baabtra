db.system.js.save(
	{
		_id:"fun_add_new_roles",
		value:function(data)
		{
			roledata={"companyId": ObjectId(data.companyId),
			"urmId":data.urmId,
			"crmId":data.crmId,
			"activeFlag":1,
			"roleName":data.roleName,
			"roleDescription":data.RoleDesc,
			"createdDate":Date(),
			"updatedDate":Date()};

			db.ClnRoleMaster.insert(roledata);
	}});