angular.module('baabtra').directive('courseTimeline',['$state', function($state) {
	return {
		restrict: 'E', // to use as an element . Use 'A' to use as an attribute
		replace: true,
		scope: true,// to inherit scope from the parent
		templateUrl: 'angularModules/courseTimeline/directives/Directive-courseTimeline.html',
		link: function(scope, element, attrs, fn) {

			//console.log(element);
			scope.currentState=$state.current.name.split('.'); // for setting call back function - lijin)
			scope.currentState=scope.currentState[scope.currentState.length-1];

			//set a duration in minutes (initially) *Note: totalCourseDuration will come from the database and it will be in days
			scope.duration=scope.totalCourseDuration/1440; 

			// Set a minimum width for each individual point
			scope.tlPointMinWidth = 5;

			
			//setting a duration type initially 
			scope.selectedDurType='Day';


			
			// scope.durationIn=[{id: "1",name:"Days",mFactor:(1/1440),show:(totalCourseDuration>1440)},
			// 		 {id: "2",name: "Months",mFactor:(1/43200),show:(totalCourseDuration>43200)},
			// 		 {id: "3",name: "Hours",mFactor:1/60,show:(totalCourseDuration>60)},
			// 		 {id: "4",name: "Minutes",mFactor:1,show:(totalCourseDuration>1)}]; //mFactor is multiplication factor

			

			//function to change the appearance of the timeline whilst the change in the dropdownlist		 
			scope.durationIn=[];
			scope.changeDuration=function(){
				if(scope.durationIn.length<1){
					return 0;
				}
				var name=scope.durationIn[scope.selectedDuration-1].name;
				name = name.replace('s','');
				scope.selectedDurType=name;
				scope.duration=scope.totalCourseDuration*scope.durationIn[scope.selectedDuration-1].mFactor;
				scope.setMinWidth(15);
				scope.tlPointList=[];
				scope.buildTlPointList(1);
			};

			//function to set the min width of each timeline unit while the selected data in the dropdown changes
			scope.setMinWidth=function(minWidthofTlPnt) {
				scope.tlContainerWidth = element.parent().innerWidth();
				scope.tlPointMinWidth = (scope.tlContainerWidth-130)/scope.duration;
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
			scope.changeDuration();

			// scroll event of the container
			var delay = 200;
			var timeout = null;
			 element[0].querySelector('.tl-container').onscroll=function(e) {
              clearTimeout(timeout);
			    timeout = setTimeout(function(){
			    	//current position of end point of timeline
			    	var endPointPos=element[0].querySelector('.end-of-tl').getBoundingClientRect().left;
			    	// console.log(endPointPos+':'+scope.tlContainerWidth);
			        if(endPointPos<scope.tlContainerWidth){
			        	scope.buildTlPointList(scope.tlPointList.length+1);
			        	scope.$digest();	
			        }
			    },delay);
            };

             scope.$watch('totalCourseDuration',function(){ // for executing when the value of total duration is changed
           	
           	if(!angular.equals(scope.totalCourseDuration,0))
           		{
           			
           		           	//duration dropdown data
           		           	scope.durationIn=[];
           		           	var temp=[{id: "1",name:"Days",mFactor:(1/1440),show:(scope.totalCourseDuration>=1440)},
           							 {id: "2",name: "Months",mFactor:(1/43200),show:(scope.totalCourseDuration>=43200)},
           							 {id: "3",name: "Hours",mFactor:1/60,show:(scope.totalCourseDuration>=60)},
           							 {id: "4",name: "Minutes",mFactor:1,show:(scope.totalCourseDuration>=1)}]; //mFactor is multiplication factor
           							

           							 angular.forEach(temp,function(obj){
           							 	if(obj.show){
           							 		scope.durationIn.push(obj);
           							 	}
           							 });
           							 //default duration type
									scope.selectedDuration=scope.durationIn[0].id;
									scope.changeDuration();
           		}
           		        });


             scope.popoverObject=scope.tlPopOver[scope.currentState]; //popover object

			
            

		}
	};
}]);
