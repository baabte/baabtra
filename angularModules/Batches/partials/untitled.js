/*

  Created by : Akshath

  Modified by : Lijin
  Date : 8-6-2015
  Purpose:Fix in element order generation

*/


db.system.js.save({
    "_id" : "fnAssignCourseMaterials4Batch",
    "value" : function(batchMappingId,dataObj) {
  //var urmIds=db.clnCourseBatchMapping.distinct("users.fkUserRoleMappingId",{batchId:ObjectId(batchId),fkCompanyId:ObjectId(companyId),activeFlag:1}); 

    var batchObj = db.clnCourseBatchMapping.findOne({_id:ObjectId(batchMappingId),activeFlag:1});
    var urmIds = db.clnCourseBatchMapping.distinct("users.fkUserRoleMappingId",{_id:ObjectId(batchMappingId),activeFlag:1});

    var elementOrder = {};

    for(var element in dataObj){
      elementOrder[element] = elementOrder[element].elementOrder;
    }

    return elementOrder;
}
});
