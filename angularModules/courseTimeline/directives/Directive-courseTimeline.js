angular.module('baabtra').directive('courseTimeline',['$state','$rootScope', function($state,$rootScope) {
	return {
		restrict: 'E', // to use as an element . Use 'A' to use as an attribute
		replace: true,
		scope: {
		totalDuration:"=totalDuration",
		ddlBindObject:"=ddlBindObject",
		callbackFunctions:"=callbackFunctions",
		syncData:"=syncData",
		tlElements:"=tlElements",
		errTooltip:"=errTooltip",
		valid:"=valid"
		},
		templateUrl: 'angularModules/courseTimeline/directives/Directive-courseTimeline.html',
		link: function(scope, element, attrs, fn) {
			//setting selected duration type as first object
			scope.selectedDuration="1";

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

		

			//function to change the appearance of the timeline whilst the change in the dropdownlist		 
			scope.durationIn=[];
			scope.changeDuration=function(selectedDuration){
				if(!angular.equals(selectedDuration,undefined))
				{
					scope.selectedDuration=selectedDuration;
				}
				if(scope.durationIn.length<1){
					scope.duration=scope.totalDuration;
				}
				else{
					var name=scope.ddlBindObject[scope.selectedDuration-1].name;
				name = name.replace('s','');
				scope.selectedDurType=name;
				scope.duration=scope.totalDuration*scope.ddlBindObject[scope.selectedDuration-1].mFactor;
				
				}
				scope.setMinWidth(15);
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
      console.log('Scrollbar show');
    });
    scope.$on('scrollbar.hide', function(){
      console.log('Scrollbar hide');
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
            

			
            

		}
	};
}]);
