angular.module('baabtra').directive('courseTimeline',['$state','$rootScope','$popover','$templateCache','$aside','addCourseService','addCourseElementService', function($state,$rootScope,$popover,$templateCache,$aside,addCourseService,addCourseElementService) {
	return {
		restrict: 'E', // to use as an element . Use 'A' to use as an attribute
		replace: true,
		scope: {
		totalDuration:"=totalDuration",
		callbackFunctions:"=callbackFunctions",
		syncData:"=",
		tlElements:"=tlElements",
		courseId:"=courseId",
		coursePreviewObj:"="
		},
		templateUrl: 'angularModules/courseTimeline/directives/Directive-courseTimeline.html',
		link: function(scope, element, attrs, fn) {
			scope.ddlBindObject = {0:{id: "1",name: "Year(s)",mFactor:(1/525600),show:true},
                        1:{id: "2",name: "Month(s)",mFactor:(1/43200),show:true},
                        2:{id: "3",name: "Week(s)",mFactor:(1/10080),show:true},
                        3:{id: "4",name: "Day(s)",mFactor:(1/1440),show:true},
                        4:{id: "5",name: "Hour(s)",mFactor:1/60,show:true},
                        5:{id: "6",name: "Minute(s)",mFactor:1,show:true}};//mFactor is multiplication factor
			//setting selected duration type as first object
			scope.selectedDuration="4";

			scope.formData=new Object();//used to save datas from timeline

			//These are kept in rootscope as these are to be availble throughout the application
			$rootScope.valid=true;
			$rootScope.errTooltip = "Please choose an image to be shown for the course";


			//saving current state for loading callback functions accordingly - lijin
			scope.currentState=$state.current.name.split('.');
			scope.currentState=scope.currentState[scope.currentState.length-1];

			//set a duration in minutes (initially) *Note: totalDuration will come from the database and it will be in mintutes
			scope.duration=0;//scope.totalDuration/1440; 

			// Set a minimum width for each individual point
			scope.tlPointMinWidth = 5;


			scope.buildTlObject = function(selectedDuration){//function for building timeline object
				
				scope.$watch(function() {return scope.syncData.courseTimeline}, function(){

				if(!angular.equals(scope.syncData.courseTimeline,undefined)){
					var name=scope.ddlBindObject[selectedDuration-1].name.replace('(s)','');
					var newTlPoint = 1;
					scope.timeLineView = {};
					var containerCount = 0;
					scope.containerHeight = 95;
					
					if(angular.equals(name,'Minute')){
						scope.timeLineView = angular.copy(scope.syncData.courseTimeline);
					}
					else{
						angular.forEach(scope.syncData.courseTimeline, function (crsElements, timePoint){
							newTlPoint = Math.ceil(timePoint/(1/scope.ddlBindObject[selectedDuration-1].mFactor));
							if(angular.equals(scope.timeLineView[newTlPoint],undefined)){
								scope.timeLineView[newTlPoint] = {};
								}

							angular.forEach(crsElements,function (crsElement,elemType) {
								if(angular.equals(scope.timeLineView[newTlPoint][elemType],undefined) && crsElement.length){
								scope.timeLineView[newTlPoint][elemType] = [];
								}
								angular.forEach(crsElement,function (item) {
								item.tlPointInMinute = timePoint*1;
								scope.timeLineView[newTlPoint][elemType].push(item);
								if(containerCount < Object.keys(scope.timeLineView[newTlPoint]).length){
									containerCount = Object.keys(scope.timeLineView[newTlPoint]).length;
								}
							});
							});
							scope.containerHeight = 30/containerCount + (containerCount*90);
						});
					}
				}
			  }, true);
			}

			//building the object for the first time
			scope.buildTlObject(scope.selectedDuration);


			//function to change the appearance of the timeline whilst the change in the dropdownlist		 
			scope.durationIn=[];
			scope.changeDuration=function(selectedDuration){
				
				if(!angular.equals(selectedDuration,undefined))
				{
					scope.buildTlObject(selectedDuration);//calling function for building timeline object
					
					scope.selectedDuration=selectedDuration;
				}
				if(scope.durationIn.length<1){
					scope.duration=scope.totalDuration;
				}
				else{
				var name=scope.ddlBindObject[scope.selectedDuration-1].name;
				name = name.replace('(s)','');
				scope.selectedDurType=name;
				scope.duration=Math.ceil(scope.totalDuration*scope.ddlBindObject[scope.selectedDuration-1].mFactor);
				
				}
				scope.setMinWidth(35);
				scope.tlPointList=[];
				scope.buildTlPointList(1);
				
			};

			//function to set the min width of each timeline unit while the selected data in the dropdown changes
			scope.setMinWidth=function(minWidthofTlPnt) {
				scope.tlContainerWidth = element.parent().innerWidth();
				scope.tlPointMinWidth = parseInt((scope.tlContainerWidth-(scope.duration*9)-115)/(scope.duration+1));
				scope.tlPointMinWidth = (scope.tlPointMinWidth<minWidthofTlPnt)?minWidthofTlPnt:scope.tlPointMinWidth;

			};

			/*create a tlPointList object to create the timeline
			*Note: This will be only for visual representation, when
			the user adds a course element it will get added to the 
			courseTimeLine object which will be pushed into the database*/
			scope.tlPointList=[];
			scope.buildTlPointList = function(start){
				scope.tlPointCount = Math.floor(scope.tlContainerWidth/scope.tlPointMinWidth);

				for (var i=start; i<start+scope.tlPointCount&&i<=scope.duration;i++)
				{
					scope.tlPointList.push(i);
				}
				if(i-1==scope.duration){
					scope.toBeLoaded=false;
				}
				else{
					scope.toBeLoaded=true;
				}

			};
			
			scope.toBeLoaded=true;

			//setting the min width of each repeating timeline unit
			scope.changeDuration(scope.selectedDuration);

			// scroll event of the container
			var delay = 200;
			var timeout = null;
			 element[0].querySelector('.tl-container').onscroll=function(e) {
              clearTimeout(timeout);
			    timeout = setTimeout(function(){
			    	//current position of end point of timeline
			    	var endPointPos=element[0].querySelector('.end-of-tl').getBoundingClientRect().left;
			    	
			        if(endPointPos<scope.tlContainerWidth){
			        	scope.buildTlPointList(scope.tlPointList.length+1);
			        	scope.$digest();	
			        }
			    },delay);
            };
            // rebuild the scrollbar
  			 scope.$broadcast('rebuild:me');
  scope.$on('scrollbar.show', function(){
      //console.log('Scrollbar show');
    });
    scope.$on('scrollbar.hide', function(){
      //console.log('Scrollbar hide');
      scope.flag=true;
    });

             scope.$watch('totalDuration',function(){ // for executing when the value of total duration is changed
           	
           	if(!angular.equals(scope.totalDuration,0)&&!angular.equals(scope.ddlBindObject,undefined))
           		{
           		           	//duration dropdown data
           		           			 scope.durationIn=[];
           							 angular.forEach(scope.ddlBindObject,function(obj){
           							 	if(obj.show){
           							 		scope.durationIn.push(obj);
           							 	}
           							 });
									scope.changeDuration(scope.selectedDuration);
									
           		}
           		else
           		{
           			scope.changeDuration();
           		}
           		        });
             if(!angular.equals(scope.callbackFunctions,undefined)){
             	 scope.popoverObject=scope.callbackFunctions[scope.currentState]; //popover object
             	}else{
             		scope.popoverObject=[];
             	}
            

			
            scope.callbackOfTlPointClick=function(selectedPoint){
            	var tlSelectedPoint = scope.ddlBindObject[scope.selectedDuration-1].name.replace('(s)','');
            	tlSelectedPoint = tlSelectedPoint + ' ' + selectedPoint;

            	var startPoint=((selectedPoint/scope.ddlBindObject[scope.selectedDuration-1].mFactor)-(1/scope.ddlBindObject[scope.selectedDuration-1].mFactor)+1);
            	var endPoint=(((selectedPoint)/scope.ddlBindObject[scope.selectedDuration-1].mFactor));
            	scope.coursePreviewObj.datas=[];
            	angular.forEach(scope.syncData.courseTimeline, function(CourseElements, key){
            		if(key >= startPoint && key <= endPoint){
            			angular.forEach(CourseElements,function(courseElemType){
            				angular.forEach(courseElemType, function(courseElem){
	            				scope.coursePreviewObj.datas.push(courseElem);
	            				scope.coursePreviewObj.tlSelectedPoint = tlSelectedPoint;
            				});
            			});
            		}
            	});
            };

            var selectedCourseElement = {};
            //var selectedTpoint = 0;
              var tlPopOverEditObject=addCourseElementService.FnGetCourseElements("");//calling course element function
      			tlPopOverEditObject.then(function(data){
        			scope.tlPopOverEditObject = angular.fromJson(JSON.parse(data.data));
      			});
            scope.manageCourseElement = function(element,tPoint,selectedIndex){
            	scope.tPoint = tPoint;
            	selectedCourseElement = element;
            	scope.selectedTpoint = element.tlPointInMinute;
            	scope.selectedIndex = selectedIndex;
            }

            scope.editCourseElement = function(){
            	if(!angular.equals(scope.coursePreviewObj,undefined))
            	{
            		scope.coursePreviewObjAside = angular.copy(selectedCourseElement);
            	}
            	angular.forEach(scope.tlPopOverEditObject,function(courseElement){
            		if(angular.equals(selectedCourseElement.Name,courseElement.Name)){
            			scope.courseElement = courseElement;
            		}
            	});
            	
            	 for(var elementCount=0;elementCount < selectedCourseElement.elements.length; elementCount++){
            	 	if(!angular.equals(selectedCourseElement.elements[elementCount],null)){
            	 		// if(angular.equals(selectedCourseElement.elements[elementCount].type,'doc-viewer')){
            	 		// 	console.log(selectedCourseElement.elements[elementCount].url.split('/')[selectedCourseElement.elements[elementCount].url.split('/').length-1]);

            	 		// }
            	 	scope.courseElement.courseElementTemplate.fields[elementCount].value = selectedCourseElement.elements[elementCount].value;
            	 }
            	 }
            	$templateCache.put('course-element-popup.html','<edit-course-element></edit-course-element>');
 				$aside({scope: scope, template:'course-element-popup.html', html:true});
            }

            scope.removeCourseElement = function(ev) {
            		angular.forEach(scope.popoverObject.courseElementlist,function(courseElement){
            		if(angular.equals(selectedCourseElement.Name,courseElement.Name)){
            			scope.courseElement = courseElement;
            		}
            	});
            	scope.syncData.courseTimeline[scope.selectedTpoint][selectedCourseElement.Name].splice(scope.selectedIndex,1);
            	addCourseService.removeCourseTimelineElement(scope.courseId, selectedCourseElement.Name, scope.selectedTpoint, scope.selectedIndex, scope.$parent.$parent.rm_id);
            };

		}

	};
}]);
