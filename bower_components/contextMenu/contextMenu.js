angular.module('ui.bootstrap.contextMenu', [])

.directive('contextMenu', ['$parse','$state','$aside','$templateCache','addCourseService','$rootScope','bbConfig',function ($parse,$state,$aside,$templateCache,addCourseService,$rootScope,bbConfig) {
    var renderContextMenu = function ($scope, event, options) {
        if (!$) { var $ = angular.element; }
        if(options.length<1){
            return 0;
        }
        // taking current state for loading context menu
        var state=$state.current.name.split('.');
        state=state[state.length-1];
        
        //adding a class to the container of context menu
        $(event.currentTarget).parent().parent().parent().parent().addClass('context');
        var $contextMenu = $('<div>');
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
           +'<button type="submit" ng-click="createPreviewElement()" style="color:#fff!important;" ng-disabled = "courseElement.$invalid || !$root.valid" class="pull-left btn '+options[state].colorClass+'">Preview</button>'
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
        

        $scope.createPreviewElement=function () {
            var temp = {};
            if(angular.equals($scope.coursePreviewObj,undefined)){
            $scope.coursePreviewObj=[];
                    $scope.coursePreviewObj.elements=[];
                    $scope.coursePreviewObj.Name=$scope.item.Name;
                    $scope.coursePreviewObj.Icon=$scope.item.Icon;
                    $scope.coursePreviewObj.iconBackground=$scope.item.iconBackground;
                    $scope.coursePreviewObj.iconColor=$scope.item.iconColor;
            }
                    
               angular.forEach($scope.itemTemplate.fields,function(item){ // looping through item template
                    if(!angular.equals(item.customlist,undefined)) //checking if it is having a custom attrib or not
                    {
                        temp[item.name]={};
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
                                if(angular.equals(customProperty.text,"doc-viewer")){
                                    var promise=addCourseService.fnCourseFileUpload(temp[item.name].value);
                                    promise.then(function(data){
                                          temp[item.name].value='http://docs.google.com/gview?url='+bbConfig.BWS+'files/courseDocs/'+data.data.replace('"','').replace('"','')+'&embedded=true';
                                });
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
            

            $scope.createPreviewElement(); // building the needed object

            $scope.coursePreviewObj.Name=$scope.item.Name;
            $scope.coursePreviewObj.Icon=$scope.item.Icon;
            $scope.coursePreviewObj.iconBackground=$scope.item.iconBackground;
            $scope.coursePreviewObj.iconColor=$scope.item.iconColor;
            var courseObj={};
            
            if(!$scope.syncData.courseTimeline){
                $scope.syncData.courseTimeline={};
            }

            courseObj.key=$scope.instance+'.'+$scope.item.Name;
            courseObj[courseObj.key]=$scope.coursePreviewObj;

            // $scope.$parent.formData[$scope.randomKey].Name=$scope.item.Name;
            // $scope.$parent.formData[$scope.randomKey].Icon=$scope.item.Icon;
            // $scope.$parent.formData[$scope.randomKey].iconBackground=$scope.item.iconBackground;
            // $scope.$parent.formData[$scope.randomKey].iconColor=$scope.item.iconColor;
            // courseObj[courseObj.key]=$scope.$parent.formData[$scope.randomKey];
            
                if(!$scope.syncData.courseTimeline[$scope.instance]){
                                $scope.syncData.courseTimeline[$scope.instance]={};
                }
                if(!$scope.syncData.courseTimeline[$scope.instance][$scope.item.Name]){
                    $scope.syncData.courseTimeline[$scope.instance][$scope.item.Name]=[];
                }


              $scope.syncData.courseTimeline[$scope.instance][$scope.item.Name].push($scope.coursePreviewObj);
                //$scope.syncData.courseTimeline[$scope.instance][$scope.item.Name].push($scope.$parent.formData[$scope.randomKey]);
           //addCourseService.saveCourseTimelineElement($scope, $scope.$parent.courseId, courseObj);
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