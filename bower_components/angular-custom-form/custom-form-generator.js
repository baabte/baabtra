/*!
   angular-custom-form v0.1
   description : To add and load the custom form
*/
(function(angular) {
var acf=angular.module('custom-form',[]);

/* Storing the templates into $templateCache to load it in future*/
angular.module('custom-form').run(['$templateCache','courseElementFieldsManaging',function($templateCache,courseElementFieldsManaging){

  	var responseData;
    /*promise for loading template service*/
   	/*var promise=courseElementFieldsManaging.fnGetCourseElementFields();
   	promise.then(function(response){ 
   		responseData=angular.fromJson(JSON.parse(response.data));
   		angular.forEach(responseData, function(templateElement){
          $templateCache.put('angular-custom-form/'+templateElement.Name+'.ng.html',templateElement.DefaultTemplate);
  		    $templateCache.put('angular-custom-form/formEdit.ng.html','<div class=\"col-xs-8\"></div><div class=\"col-xs-4\"></div>'); 
         });
     
  	});*/
	//console.log(templateElement.Name);
     /*template for loading the dynamic fields*/
      $templateCache.put('angular-custom-form/formEdit.ng.html','<div class=\"col-xs-8\"></div><div class=\"col-xs-4\"></div>'); 
      $templateCache.put('angular-custom-form/textInput.ng.html','<input class="form-control m-b-lg"  type="text" id="" title="input text">');
      $templateCache.put('angular-custom-form/selectField.ng.html','<select   class="form-control m-b-lg" float-label wrapperless = "true"><option value="1">one</option><option value="2"></option></select>');
      $templateCache.put('angular-custom-form/fieldView.ng.html','<div class=\"col-xs-12\"><div ng-repeat=\"field in acfSchema.fields\">{{acfModel}}<div acf-model="acfModel" acf-field=\"field\"></div></div></div>');
     

  }]);

/* directive to load the dynamic form data*/
acf.directive('acfForm',['$templateCache',function($templateCache){
	 return {
    restrict: 'A',
    require: ['^?acfForm','^?acfModel'],
    scope: {
      //acfSchema:'=',
      acfModel:'='
    },
   	templateUrl: 'angular-custom-form/fieldView.ng.html', /*template url to field view */
    link: function ($scope, $element, $attrs){
      //$scope.acfModel={};
    	$scope.acfSchema={
				    "fields" : [ 
				       /* {
				            "displayName" : "Textbox",
				            "validation" : {
				                "messages" : {}
				            },
				            "type" : "youtubevideo",
				            "name" : "field1"
				        }, */
				        {
				            "displayName" : "Email",
				            "validation" : {
				                "messages" : {}
				            },
				            "type" : "textInput",
				            "name" : "field2"
				        }, 
				        {
				            "displayName" : "Number",
				            "validation" : {
				                "messages" : {},
				                "maxlength" : 15
				            },
				            "type" : "selectField",
				            "name" : "field3",
				            "customlist" : [ 
				                {
				                    "text" : "payment-checkpoint",
				                    "value" : "previewkey"
				                }
				            ]
				        }
				    ]
				}

     }
    }
  }]);

/*directive to load the single field from template cache*/
acf.directive('acfField',['$templateCache','$compile',function($templateCache,$compile){
	 return {
    restrict: 'EA',
    require: ['^?acfForm','^?acfModel'],
    replace:true,
    scope: {
      fieldSchema: '=acfField',
      acfModel:"="
    },
    link: function ($scope, $element, $attrs) {
     /*Here the code to load the dynamic template in the page*/
    	var templateData = $templateCache.get('angular-custom-form/'+$scope.fieldSchema.type+'.ng.html');
      var beforeCustom = templateData.split(">");
      beforeCustom[0] = beforeCustom[0] + ' ng-model=acfModel[\''+$scope.fieldSchema.name+'\']'; //this line will add the ng-model to specific control
      templateData= beforeCustom.join('>');
      $element.html(templateData);              //adding the controle to the page.                                                        
    	$compile($element.contents())($scope);   //compiles the specific control
    }
  }


}]);


/*directive to load the editable fields for creating form*/
acf.directive('acfEditForm',['$templateCache','$compile',function($templateCache,$compile){
   return {
    restrict: 'EA',
    require: ['^?acfForm','^?acfModel'],
    replace:true,
    scope: {
      fieldSchema: '=acfField',
      acfModel:"="
    },
    link: function ($scope, $element, $attrs) {
     /*Here the code to load the dynamic template in the page*/
      var templateData = $templateCache.get('angular-custom-form/'+$scope.fieldSchema.type+'.ng.html');
      var beforeCustom = templateData.split(">");
      beforeCustom[0] = beforeCustom[0] + ' ng-model=acfModel[\''+$scope.fieldSchema.name+'\']'; //this line will add the ng-model to specific control
      templateData= beforeCustom.join('>');
      $element.html(templateData);              //adding the controle to the page.                                                        
      $compile($element.contents())($scope);   //compiles the specific control
    }
  }


}]);
/*service to load the added build in templates from database*/
/*.service('loadTemplateSrv',['$http','bbConfig',function($http,bbConfig){

	this.loadFormTemplates = function(){
    var promise = $http({
      url: bbConfig.BWS+'fnLoadCustomFormTemplates/',
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

}]);*/

})(angular);