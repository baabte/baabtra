angular.module('baabtra').directive('evaluationLoader',['evaluationService','$alert',function (evaluationService,$alert) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			 courseTimeline:'=',
			 elementOrder:'=',
			 evaluatorId:'=',
			 courseMappingId:'=',
			 evaluableElement:'='
		},
		templateUrl: 'angularModules/evaluation/directives/Directive-evaluationLoader.html',
		link: function(scope, element, attrs, fn) {
				scope.evalLoader = {};
				
				scope.outElement = {};
				var keyArray = scope.elementOrder.split('.');

				var obj = scope.courseTimeline;

				var index = 0;
				for(var key in keyArray){
					if(!angular.equals(obj[keyArray[key]],undefined)){
						obj = obj[keyArray[key]];
						index++;
						if(angular.equals(keyArray.length, index)){
							scope.element = obj;
							if(scope.element.evaluable){
								scope.evaluableElement = true;	
							}
						}
					}
					else{
						break;
					}
				}

				scope.evaluated = function(element, outElement, elementOrder, courseMappingId, evaluatorId){
					element.evalDetails = {};
					var result = angular.copy(outElement);
					element.evalDetails.evaluatedBy = evaluatorId;
					element.evalDetails.evaluatedOn = new Date();
					element.evalStatus = "Evaluated";
					
					
					element.markScored = 0;
					
					

					for(var field in result){
						element.elements[field] = result[field].data;


						for(var key in element.elements[field].markScored){
							element.markScored = element.markScored + element.elements[field].markScored[key];
							
							if(angular.equals(parseInt(key), Object.keys(element.elements[field].markScored).length-1)){
								if(angular.equals(parseInt(field), result.length-1)){
									var evaluationResponse = evaluationService.evaluateAnswer(courseMappingId, element, elementOrder);
									evaluationResponse.then(function(response){
										var result = angular.fromJson(JSON.parse(response.data));
										if(angular.equals(result.result, "Added")){
											$alert({title: 'Evaluated!', content: element.Name + ' evaluated successfuly', placement: 'top-right', type: 'success', duration:3, show: true});
										}
										else if(angular.equals(result.result, "Updated")){
											$alert({title: 'Updated!', content: element.Name + ' updated successfuly', placement: 'top-right', type: 'success', duration:3, show: true});
										}
									});
								}
							}
						}
					}
				}

			}//link end
		};
	}]);
