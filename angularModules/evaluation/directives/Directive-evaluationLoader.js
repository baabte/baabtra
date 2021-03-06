angular.module('baabtra').directive('evaluationLoader',['evaluationService', '$alert' , '$modal',function (evaluationService, $alert, $modal) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			 courseElement:'=',
			 evaluatorId:'=',
			 courseMappingId:'=',
		},
		templateUrl: 'angularModules/evaluation/directives/Directive-evaluationLoader.html',
		link: function(scope, element, attrs, fn) {

var loader=$modal({scope: scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: false,placement:'center'});

scope.startLoader =function(){
loader.$promise.then(loader.show);
};

scope.stopLoader =function(){
loader.hide();
};   

				
				name=scope.courseElement["Name"];
				tlPointInMinute=scope.courseElement["tlPointInMinute"];
				index=scope.courseElement["index"];
                 elementOrder=tlPointInMinute+"."+name+"."+index;
                 
				// scope.outElement = [];
                
				scope.$watch('courseElement',function(){
				

				// var keyArray = scope.courseElement.split('.');

				// var obj = scope.courseTimeline;

				// var index = 0;
				// for(var key in keyArray){
				// 	if(!angular.equals(obj[keyArray[key]],undefined)){
				// 		obj = obj[keyArray[key]];
				// 		index++;
				// 		if(angular.equals(keyArray.length, index)){
				// 			scope.element = obj;
				// 			if(scope.element.evaluable){
				// 				scope.evaluableElement = t)rue;	
				// 			}
				// 		}
				// 	}
				// 	else{
				// 		break;
				// 	}
				// }
                scope.element=scope.courseElement;
                if(scope.element.evaluable){
						scope.evaluableElement = true;	
				   }
				});
				scope.evaluated = function(element, elementTotalMarks, outElement,  courseMappingId, evaluatorId){
					       scope.startLoader();
					element.evalDetails = {};
					var result = angular.copy(outElement);

					if(angular.equals(element.evalStatusHistory,undefined)){
						element.evalStatusHistory = [];
					}
					element.evalStatusHistory.push({changedBy:evaluatorId, changedFrom:element.evalStatus, changedTo:"Evaluated", changedOn: Date()});

					element.evalDetails.evaluatedBy = evaluatorId;
					element.evalDetails.evaluatedOn = new Date();
					element.evalStatus = "Evaluated";
					
					
					element.markScored = parseFloat(elementTotalMarks);
					
					var index = 0;
					for(var field in result){
						if(!angular.equals(result[field], undefined)){
							element.elements[field] = result[field].data;
						}

						index++;
						if(angular.equals(result.length, index)){
							console.log(courseMappingId, element, elementOrder);
							var evaluationResponse = evaluationService.evaluateAnswer(courseMappingId, element, elementOrder);
							evaluationResponse.then(function(response){
								var result = angular.fromJson(JSON.parse(response.data));

								console.log(result);
								
								if(angular.equals(result.result, "Added")){
									$alert({title: 'Evaluated!', content: element.Name + ' evaluated successfuly', placement: 'bottom-right', type: 'success', duration:2, show: true});
								}
								else if(angular.equals(result.result, "Updated")){
									$alert({title: 'Updated!', content: element.Name + ' updated successfuly', placement: 'bottom-right', type: 'success', duration:2, show: true});
								}
								else{
									$alert({title: 'Wrong!', content: 'Operation faild', placement: 'bottom-right', type: 'danger', duration:2, show: true});

								}
								scope.stopLoader();

							});	
						}

					}

					
				};//fn_evaluated

				scope.askResubmit = function(outElement){
					scope.resubmit = {};
					scope.resubmit.outElement = angular.copy(outElement);
					scope.resubmit.durationUnit = "days";

					scope.resubmit.penaltyTimeUnits = [{label:"Days", value:"days"},
										  {label:"Hours", value:"hours"},
										  {label:"Months", value:"months"}];

					//scope.resubmit.duration = [{label:"days", value:"days"}];
					var askResubmitModal = $modal({scope:scope, template: 'angularModules/evaluation/directives/Popup-askResubmit.html', show: true});
			            // Show when some event occurs (use $promise property to ensure the template has been loaded)
			           //  scope.showModal = function() {
			           //    askResubmitModal.$promise.then(askResubmitModal.show);
	            	// };
            	};//fn askResubmit

				//this function trigers when click resubmit button
				scope.fnResubmit = function(element, outElement, courseElement, courseMappingId, evaluatorId){
					

					var result = angular.copy(outElement);
					
					if(angular.equals(element.statusHistory,undefined)){
						element.statusHistory = [];
					}
					element.statusHistory.push({changedBy:evaluatorId, changedFrom:element.status, changedTo:"to be resubmitted", changedOn: Date()});

					if(angular.equals(element.evalStatusHistory,undefined)){
						element.evalStatusHistory = [];
					}
					element.evalStatusHistory.push({changedBy:evaluatorId, changedFrom:element.evalStatus, changedTo:"to be resubmitted", changedOn: Date()});
					
					element.status = "to be resubmitted";
					
					if(!angular.equals(scope.resubmit.comments,undefined)){
						element.comments = scope.resubmit.comments;
					}
					

					element.evalStatus = "to be resubmitted";
					
					var index = 0;
					for(var field in result){
						element.elements[field] = result[field].data;

						if(!angular.equals(element.elements[field].markScored, undefined)){
							
							if(!angular.equals(element.elements[field].value.assignedDate, undefined)){
								element.elements[field].value.assignedDateHistory.push({assignedDate:element.elements[field].value.assignedDate ,changedBy:evaluatorId, changedFrom:element.status, changedTo:"to be resubmitted", changedOn: Date()});
							}
							element.elements[field].value.assignedDate = Date();

							if(!angular.equals(element.elements[field].value.duration, undefined)){
								if(angular.equals(element.elements[field].value.durationDateHistory, undefined)){
									element.elements[field].value.durationDateHistory = [];
								}
								element.elements[field].value.durationDateHistory.push({duration:element.elements[field].value.duration.duration, durationUnit:element.elements[field].value.duration.durationUnit, changedBy:evaluatorId, changedFrom:element.status, changedTo:"to be resubmitted", changedOn: Date()});
							}

							
							element.elements[field].value.duration = {duration:scope.resubmit.duration, durationUnit:scope.resubmit.durationUnit};
						}

						index++;

						if(angular.equals(index, result.length)){
							element.markScored = 0;
							var evaluationResponse = evaluationService.evaluateAnswer(courseMappingId, element, elementOrder);
									evaluationResponse.then(function(response){
										var result = angular.fromJson(JSON.parse(response.data));
										if(angular.equals(result.result, "Added")){
											$alert({title: 'Resubmitted!', content: element.Name + ' resubmitted successfuly', placement: 'top-right', type: 'success', duration:3, show: true});
										}
										else if(angular.equals(result.result, "Updated")){
											$alert({title: 'Updated!', content: element.Name + ' updated successfuly', placement: 'top-right', type: 'success', duration:3, show: true});
										}
									});
						}
					}

					

				};// fn resubmit

				scope.checkViewOfElement = function(elementType){
					var evaluableElementArray = ['Physical Test', "Interview"];
					if(evaluableElementArray.indexOf(elementType) >= 0){
						return true;
					}
					return false;
				};

			}//link end
		};
	}]);
