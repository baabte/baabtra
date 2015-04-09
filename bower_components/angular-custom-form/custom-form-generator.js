/*!
   angular-custom-form v0.1
   description : To add and load the custom form
*/
(function(angular) {
var acf=angular.module('custom-form',[]);
var responseData;
/* Storing the templates into $templateCache to load it in future*/
angular.module('custom-form').run(['$templateCache','loadTemplateSrv',function($templateCache,loadTemplateSrv){

  	//var responseData;
    /*promise for loading template service*/
   	var promise=loadTemplateSrv.loadFormTemplates();
   	promise.then(function(response){ 
   		responseData=angular.fromJson(JSON.parse(response.data));
      
   		angular.forEach(responseData, function(templateElement){
          var templateData=templateElement.DefaultTemplate;
          var beforeCustom = templateData.split(">");
          angular.forEach(templateElement.unEditableAttributes, function(innerElement){ //looping through uneditable list to get the ng-model value
              beforeCustom[0] = beforeCustom[0] + innerElement.value +'=\"'+innerElement.text+'\"';//this line will add the ng-model to specific control

            });

          angular.forEach(templateElement.mandatoryAttributes, function(innerMElement){ //looping through uneditable list to get the ng-model value
              beforeCustom[0] = beforeCustom[0] + innerMElement.value +'='+innerMElement.text;//this line will add the ng-model to specific control

            });
            templateData= beforeCustom.join('>');
            $templateCache.put('angular-custom-form/'+templateElement.Name+'.ng.html',templateData);
         });
 

  	});

     /*template for loading the dynamic fields*/
      // $templateCache.put('angular-custom-form/fieldView.ng.html','<div class=\"col-xs-12\"><div ng-repeat=\"field in acfSchema.fields\">{{acfModel}}<div acf-model="acfModel" acf-field=\"field\"></div></div></div>');
      $templateCache.put('angular-custom-form/fieldView.ng.html','<div ng-bind-html=\"template\"></div>');
     

  }]);


/* directive to load the dynamic form data*/
acf.directive('acfForm',['$templateCache','$compile','$sce',function($templateCache,$compile,$sce){
	 return {
    restrict: 'A',
    replace:true,
    require: ['^?acfForm','^?acfModel','^?inputModel'],
    scope: {
      //acfSchema:'=',
      //acfModel:'=',
      inputModel:'='
    },
   	//templateUrl: 'angular-custom-form/fieldView.ng.html', /*template url to field view */
    link: function (scope, element, attrs){
      //$scope.acfModel={};
      //scope.template='';
      scope.template='';
      scope.$watch('inputModel',function(){
          if(Object.keys(scope.inputModel).length>0){
            //console.log(scope.inputModel.template);

            for(var key in scope.inputModel){
              $templateCache.put('angular-custom-form/template.ng.html',scope.inputModel[key].template);
              //scope.template = $sce.trustAsHtml(scope.inputModel[key].template);
            }
            var templateData=$templateCache.get('angular-custom-form/template.ng.html');
            element.html(templateData);                                                      
            $compile(element.contents())(scope);   //compiles the specific control
          }
      },true);

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
    require: ['^?acfEditForm','^?acfModel'],
    replace:true,
    scope: {
      //fieldSchema: '=acfField',
      form:"=acfModel"
    },
    templateUrl: 'bower_components/angular-custom-form/formTemplates/formEdit.ng.html',
    link: function ($scope, $element, $attrs) {
   
      $scope.fieldList=responseData; //storing the list of fileds from response data to scope varible.
      //$scope.form={};
      //$scope.form[$scope.formName]={};
      $scope.fields=[];
      

      $scope.customFieldId=0;


    //***validation patters ***
    $scope.validationPatterns=[
      {'name':'None','value': undefined},
       {'name':'Url','value': '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$'},
       {'name':'Domain','value': '^([a-z][a-z0-9\\-]+(\\.|\\-*\\.))+[a-z]{2,6}$'},
       {'name':'IPv4 Address','value': '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'},
       {'name':'Email Address','value': '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'},
       {'name':'Positive Integers','value': '^\\d+$'},
       {'name':'Negative Integers','value': '^-\\d+$'},
       {'name':'Number','value': '^-{0,1}\\d*\\.{0,1}\\d+$'},
       {'name':'Positive Number','value': '^\\d*\\.{0,1}\\d+$'},
       {'name':'Negative Number','value': '^-\\d*\\.{0,1}\\d+$'},
       {'name':'Year (1920-2099)','value': '^(19|20)[\\d]{2,2}$'},
       {'name':'Password','value': '(?=.*\\d)(?=.*[!@#$%^&*\\-=()|?.\"\';:]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'}
    ];

      //***function to add new field into the custom form ***
      $scope.addNewField=function(){
        $scope.customFieldId++; //to uniquely identify

        /*deleting unesessary fields*/
        delete $scope.selectedField[0]._id;
        delete $scope.selectedField[0].urmId;
        delete $scope.selectedField[0].crmId;
        delete $scope.selectedField[0].updatedDate;
        delete $scope.selectedField[0].ticked;
        delete $scope.selectedField[0].createdDate;
        delete $scope.selectedField[0].activeFlag;
       $scope.selectedField[0].validation={};
        $scope.selectedField[0].validation.messages={
          required: 'A value is required for this field.',
          minlength: 'The value does not match the minimum length.',
          maxlength: 'The value exceeds the maximum length',
          pattern: 'The value does not match the required format.',
          email: 'The value is not a valid email address.',
          unique: 'The value is already in use.',
          number: 'The value is not a number.',
          min: 'The value not met min',
          max: 'The value not met max'
      };
        var fieldObj=angular.copy($scope.selectedField[0]);
        //fieldObj.customAttributes=[{"text":"","key":"Attribute1"}]; //for custom attributes
        //fieldObj.options=[{"text":"","key":"option1"}]; //for options
        if(!angular.equals($scope.selectedField.length,0)){
          fieldObj.id='field'+$scope.customFieldId;
          $scope.fields.push(fieldObj);
        }
      };

      //to remove the field from the form
      $scope.deleteField=function(index){
        $scope.fields.splice(index,1);
      };


      //****field.otherPattern should be removed from the object while saving***
      
      /*save the custom form after configuration*/
      $scope.generateCustomiseForm=function(){
        /*creating the custom form object*/

        $scope.form[$scope.formName]={}
        $scope.form[$scope.formName].fields=$scope.fields;
        $scope.form[$scope.formName].template='';
        /*loop to add each attributes into the element*/
        angular.forEach($scope.form[$scope.formName].fields,function(item,index){
          delete $scope.form[$scope.formName].fields[index].otherPattern;
          var templateData = item.DefaultTemplate;

          //for adding options to select list
          if(angular.equals(item.Name,'select')){
           optionsForAdd =templateData.split('</select>')[0];
            angular.forEach(item.options,function(optAtt){
              optionsForAdd = optionsForAdd + '<option value=\"'+ optAtt.key +'\">'+optAtt.text+'</option>';
            });
            optionsForAdd=optionsForAdd+'</select>';
            templateData=optionsForAdd;
          }
          //split the template by '>' to add custom attributes
          var beforeCustom = templateData.split(">");
          var optionsForAdd;
          var formLabel='<div class="form-group"><label class="col-lg-2 control-label">'+item.DisplayName+'</label><div class="col-lg-10">';


          //loping through custom attributes to add it into default template
          angular.forEach(item.customAttributes,function(cutsomAtt){
            beforeCustom[0] = beforeCustom[0] + ' '+ customAtt.key +'=\"'+customAtt.text+'\"';
          });
          // $templateCache.put('angular-custom-form/
          //loping through mandatory Attributes to add it into default template
          angular.forEach(item.mandatoryAttributes,function(mandAtt){
            beforeCustom[0] = beforeCustom[0] + ' '+ mandAtt.key +'=\"'+mandAtt.text+'\"';
          });
          
          //loping through unEditableAttributes to add it into default template
          angular.forEach(item.unEditableAttributes,function(uneditAtt){
            beforeCustom[0] = beforeCustom[0] + ' '+ uneditAtt.key +'=\"'+uneditAtt.text+'\"';
          });

          //other attributes
          beforeCustom[0] = beforeCustom[0] + ' '+ 'placeholder=\"'+item.placeholder+'\"';
          beforeCustom[0] = beforeCustom[0] + ' '+ 'data-title=\"'+item.tooltip+'\"';
          beforeCustom[0] = beforeCustom[0] + ' '+ 'bs-tooltip';
          beforeCustom[0] = beforeCustom[0] + ' '+ 'name=\"'+item.id+'\"';
          if(!angular.equals(item.value,undefined)){
            beforeCustom[0] = beforeCustom[0] + ' '+ 'value=\"'+item.value+'\"';
          }
          if(!angular.equals(item.disabled,undefined)){
            beforeCustom[0] = beforeCustom[0] + ' '+ 'disabled=\"'+item.disabled+'\"';
          }
          //attributes adding for validation
          beforeCustom[0] = beforeCustom[0] + ' '+ 'xt-validate';
          //if(angular.equals(item.validation.required,undefined)){
            beforeCustom[0] = beforeCustom[0] + ' '+ 'required';
          //}
          if(!angular.equals(item.validation.pattern,undefined)){
            beforeCustom[0] = beforeCustom[0] + ' '+ 'ng-pattern=\"'+item.validation.pattern+'\"';
          }
          

          beforeCustom[0] = beforeCustom[0] + ' '+ 'msg-required=\"'+item.validation.messages.custom+'\"';
  
          templateData= beforeCustom.join('>');
          var footer="</div></div>";
          $scope.form[$scope.formName].template=$scope.form[$scope.formName].template+formLabel+templateData+footer;
             
        });
        $scope.form[$scope.formName].template='<form name="myForm" role="form" class="form-horizontal" xt-form novalidate>'+$scope.form[$scope.formName].template+'</form>'
      };

    }
  }

}]);

/*service to load the added build in templates from database*/
acf.service('loadTemplateSrv',['$http','bbConfig',function($http,bbConfig){

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

}]);

})(angular);