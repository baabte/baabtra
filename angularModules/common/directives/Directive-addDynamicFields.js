angular.module('baabtra').directive('addDynamicFields',['$sce','$templateCache','$modal', function($sce,$templateCache,$modal) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
		detailFields:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-addDynamicFields.html',
		link: function(scope, element, attrs, fn) {

			 $templateCache.put('DynamicFields/popup.html','<div><input class=\"form-control\" type=\"text\"></div>')
  			 $templateCache.put('DynamicFields/editor.html', '<div><ng-quill-editor name=\"{{detail.title}}\" ng-model=\"newField.value\"  toolbar=\"true\" link-tooltip=\"true\" image-tooltip=\"true\" toolbar-entries=\"font size bold list bullet italic underline strike align color background link image\" editor-required=\"true\" error-class=\"input-error\"></ng-quill-editor>');
			 $templateCache.put('DynamicFields/inputText.html','<input ng-model=\"detail.value\" class=\"form-control floating-label\" placeholder="\{{detail.title}}\" >');
			 $templateCache.put('DynamicFields/video.html','<input type=\"text\" readonly=\"\" class=\"form-control floating-label\" placeholder=\"Please Choose a video\"><input type=\"file\" ng-model=\"newField.value\" ng-multiple=\"false\" accept=\"video/*\" resetOnClick=\"true\">')
			
			//setting default fields in daynamic field
				
			if(!scope.detailFields.length){
			scope.detailFields = [{title:"Course Description",
								value:"",
								template:'DynamicFields/editor.html',
								help:"A short description of the Course(Optional, recommended)",
								removable:false},
								{title:"Course Benefits",
								value:"",
								template:'DynamicFields/editor.html',
								help:"Benefits of the Course(Optional, recommended)",
								removable:false}];
							}
			scope.addNewField = function(template, title){
				
				scope.newField = {title:title,
  										value:"",
  										template:template,
  										help:"",
  										removable:true};

				$modal({scope: scope, template: 'angularModules/common/directives/popup-addNewField.html', show: true});
  			}

  			scope.addThisField = function(newField){
  				scope.detailFields.push(newField);
  			}

			scope.courseDetailsType = [{"text": "<div class=\"text-success\" style=\"cursor: default;!important\">Here you can add custom details to the course</div>",
										"click": '#'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Add a custom detail</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"\");'
  										},
  										{
  											"divider": true
  										},
  										{"text": "<div class=\"text-success\" style=\"cursor: default;!important\">However below are few suggestion from us</div>",
										"click": '#'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Course highlights</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Course highlights\");'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Course Objectives</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Course Objectives\");'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Course Delivery Method</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Course Delivery Method\");'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Who can take this course</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Who can take this course\");'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Pre-Requisites</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Pre-Requisites\");'
  										},
  										{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-caret-right\"></i>&nbsp;Project & Certification Process</div>",
										"click": 'this.addNewField(\"DynamicFields/editor.html\",\"Project & Certification Process\");'
  										}];
  				//,{"text": "<div class=\"m-l\"><i class=\"fa fa-fw fa-bookmark\"></i>&nbsp;Add Course Video</div>","click": 'this.addNewField(\"DynamicFields/video.html\",\"Course Video\");'}



  			}
  		};
  	}]);
