angular.module('ui.bootstrap.contextMenu', [])

.directive('contextMenu', ['$parse','$state','$aside','$templateCache','addCourseService','$rootScope','bbConfig',function ($parse,$state,$aside,$templateCache,addCourseService,$rootScope,bbConfig) {
    var renderContextMenu = function ($scope, event, options) {
        // taking current state for loading context menu
        var state=$state.current.name.split('.');
        state=state[state.length-1];

        if (!$) { var $ = angular.element; }

         // if contextmenucontents are not present don't render the menu
        if(options.length<1 || angular.equals(options[state].courseElementlist, undefined)){
            return 0;
        }
       
        
        
        //adding a class to the container of context menu
        $(event.currentTarget).parent().parent().parent().parent().addClass('context');
        var $contextMenu = $('<div id="tlContextMenu">');
        $contextMenu.addClass('dropdown clearfix');
        $contextMenu.css({height:'0px !important'});
        var $ul = $('<ul>');
        $ul.addClass('dropdown-menu');
        $ul.attr({ 'role': 'menu' });
        $ul.css({
            display: 'block',
            position: 'absolute',
            left: (event.pageX-75) + 'px',
            top: (event.pageY/2.1)-130+'px'
        });
        //creating a header for context menu
        var $headerA = $('<span>');
             $headerA.text($scope.ddlBindObject[$scope.selectedDuration-1].name.replace('s','')+" "+$scope.$parent.tlpoint);
             $headerA.addClass('font-bold '+options[state].colorClass+' p-xs col-xs-12');
             $ul.append($headerA);
            //creating context menu elements
        angular.forEach(options[state].courseElementlist, function (item, i) {
            var $li = $('<li>');
            if (angular.equals(item, null)) {
                $li.addClass('divider');
            }
            else{
                var $a = $('<a>');
                $a.addClass('context-menu-icon');
                $a.attr({ tabindex: '-1', href: '#' });
                var $i = $('<i>');
                $i.addClass('fa text-lt text-lg pull-left m-r-xs '+item.Icon);
                $a.append($i);
                var $span = $('<span>');
                $span.text(item.menuDisplayName);
                $span.addClass('font-normal m-l');
                $a.append($span);
                $li.on('click', function ($event) {
                    $event.preventDefault();
                    $scope.randomKey=Math.floor(Math.random()*1000,1000);
                    $scope.$parent.formData[$scope.instance]=new Object();//used to save datas from timeline
                    $scope.$parent.formData[$scope.randomKey]=new Object();
                    clickedChiled=true;
                    $scope.$apply(function () {
                        $(event.currentTarget).parent().parent().parent().parent().removeClass('context');
                        $contextMenu.remove();
                        $scope.item=item;
                        //taking template for form builder to take required inputs of 
                        //selected context menu
                        $scope.itemTemplate=item.courseElementTemplate;
                        //clearing data in preview object that is previously created
                        $scope.coursePreviewObj={};
                        $templateCache.put('course-element-popup.html','<div style="padding: 0px;" class="aside col-xs-6 m-h-n b-l" role="dialog">'
    +'<div class="box">'
    +'<div class="p '+options[state].colorClass+' font-bold">'
      +'<a ng-click="$hide()" class="pull-right text-white"><i class="fa fa-times"></i></a>'
      +'<i class="fa '+ item.Icon +' text-md m-r"></i>'
      +item.menuDisplayName
    +'</div>'
    +'<div class="box-row">'
      +'<div class="box-cell m-t">'
        +'<div class="box-inner col-xs-12">'
          +'<form novalidate xt-form class="form" name="courseElement" enctype="multipart/form-data">'
           +'<div fg-form fg-form-data="myFormData" form-data="$parent.formData.'+$scope.randomKey+'" fg-schema="itemTemplate"> </div>'
           +'<button type="submit" ng-click="saveMyFormData()" style="color:#fff!important;" ng-disabled = "courseElement.$invalid || !$root.valid" class="pull-right btn '+options[state].colorClass+'">Save</button>'
           +'<button type="submit" ng-click="createPreviewElement(\'tempCourseDocs\')" style="color:#fff!important;" ng-disabled = "courseElement.$invalid || !$root.valid" class="pull-left btn '+options[state].colorClass+'">Preview</button>'
          +'</form>'
          +'<course-element-preview tl-position="'+$scope.ddlBindObject[$scope.selectedDuration-1].name.replace('s','')+' '+$scope.$parent.tlpoint+'" preview-data="coursePreviewObj"></course-element-preview>'
+'</div></div></div></div></div>');
 $aside({scope: $scope, template:'course-element-popup.html', html:true});
                        //item.call($scope,$scope.$parent.tlpoint/$scope.ddlBindObject[$scope.selectedDuration-1].mFactor);
                    });
                });
                $li.append($a)
            }
            $ul.append($li);
        });
        $contextMenu.append($ul);
        var height = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        $contextMenu.css({
            width: '100%',
            height: height + 'px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999
        });
        $(event.currentTarget).parent().parent().parent().parent().append($contextMenu);
        $contextMenu.on("mousedown", function (e) {
            if ($(e.target).hasClass('dropdown')) {
                $(event.currentTarget).parent().parent().parent().parent().removeClass('context');
                $contextMenu.remove();
            }
        }).on('contextMenu', function (event) {
            $(event.currentTarget).parent().parent().parent().parent().removeClass('context');
            event.preventDefault();
            $contextMenu.remove();
        });
    };
    var clickedChiled=false;
    return {scope:true,link:function ($scope, element, attrs) {
        $scope.instance = $scope.$parent.tlpoint/$scope.ddlBindObject[$scope.selectedDuration-1].mFactor;
        $scope.ItsTimeToSaveDataToDB=false;
        $scope.weHaveGotAfile=false;
        

        $scope.createPreviewElement=function (path) {
            $scope.ItsTimeToSaveDataToDB=false; // check for object built successfully or not
            $scope.weHaveGotAfile=false;
            var fieldsTraversedCount=0;
            var totalFields=$scope.itemTemplate.fields.length;
            var temp = {}; // temp object for storing each elements in a course element
                    $scope.coursePreviewObj.elements=[]; // array for storing elements
                    $scope.coursePreviewObj.Name=$scope.item.Name; // course element name
                    $scope.coursePreviewObj.Icon=$scope.item.Icon; // course element icon
                    $scope.coursePreviewObj.iconBackground=$scope.item.iconBackground; // icon bg colour
                    $scope.coursePreviewObj.iconColor=$scope.item.iconColor; //icon colour
                    
               angular.forEach($scope.itemTemplate.fields,function(item){ // looping through item template
                    fieldsTraversedCount++;
                    if(!angular.equals(item.customlist,undefined)) //checking if it is having a custom attrib or not
                    {
                        temp[item.name]={}; // each elements in a course element will be stored like this (Ex: Title, file ..etc.)
                        var loopCounter=0; // a counter for all loops comes inside custom list of properties
                        var maxLoopValue=item.customlist.length;
                        var weHaveGotPreviewKey=false;
                        angular.forEach(item.customlist,function(customProperty){
                            loopCounter++;
                            // here we build object to store into db and to push into timeline
                            if(angular.equals(customProperty.value,'previewkey')){ // checking is there have a value for previewkey
                                weHaveGotPreviewKey=true;
                                temp[item.name].value=$scope.$parent.formData[$scope.randomKey][item.name];
                                temp[item.name].type=customProperty.text;
                                if(angular.equals(customProperty.text,"doc-viewer")){ // if it is a file, it should be stored in server to show preview through
                                                                                      // google doc preview
                                    $scope.weHaveGotAfile=true;
                                    var promise=addCourseService.fnCourseFileUpload(temp[item.name].value, path); // uploading file to the server
                                    promise.then(function(data){ // call back function for the fileupload
                                          temp[item.name].value='http://docs.google.com/gview?url='+bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','')+'&embedded=true';
                                          $scope.ItsTimeToSaveDataToDB=true;
                                    });
                                }
                                if(!$scope.weHaveGotAfile&&(fieldsTraversedCount==totalFields)){
                                    $scope.ItsTimeToSaveDataToDB=true;
                                }
                        }
                            else{

                                if((loopCounter==maxLoopValue)&&!weHaveGotPreviewKey){ // when count meets length of custom list and still
                                    temp[item.name]=$scope.$parent.formData[$scope.randomKey][item.name];
                                }
                            }
                        });
                        
                        
                    }
                    else{
                        temp[item.name]=$scope.$parent.formData[$scope.randomKey][item.name];
                    }
                    $scope.coursePreviewObj.elements.push(temp[item.name]);
                });
                    
        };
        //function for triggering when save button in aside 
        $scope.saveMyFormData = function () {
            

            $scope.createPreviewElement('courseDocs'); // building the needed object

            var courseObj={};
            
            if(!$scope.syncData.courseTimeline){
                $scope.syncData.courseTimeline={};
            }

            courseObj.key=$scope.instance+'.'+$scope.item.Name;
            courseObj[courseObj.key]=$scope.coursePreviewObj;

            
                if(!$scope.syncData.courseTimeline[$scope.instance]){
                                $scope.syncData.courseTimeline[$scope.instance]={};
                }
                if(!$scope.syncData.courseTimeline[$scope.instance][$scope.item.Name]){
                    $scope.syncData.courseTimeline[$scope.instance][$scope.item.Name]=[];
                }


              $scope.syncData.courseTimeline[$scope.instance][$scope.item.Name].push($scope.coursePreviewObj);


              // below function will trigger only when the object is built
              var unbindWatchOnThis=$scope.$watch('ItsTimeToSaveDataToDB',function(){
                if($scope.ItsTimeToSaveDataToDB===true){
                    addCourseService.saveCourseTimelineElement($scope, $scope.$parent.courseId, courseObj);//saving to database
                    unbindWatchOnThis(); // used to unbind this watch after triggering it once
                }
              });
        }
            element.on('click', function (event) {
                 event.preventDefault();
    
                setTimeout(function(){
                    if(!clickedChiled)
                    {
                                    $scope.$apply(function () {
                                    var options = $scope.callbackFunctions;
                                    if (options instanceof Object) {
                                        renderContextMenu($scope, event, options);
                                    } else {
                                        throw '"' + attrs.contextMenu + '" not an array';
                                    }
                                });
                    }
                    clickedChiled=false;
                },100);
            });
        }};
}]);