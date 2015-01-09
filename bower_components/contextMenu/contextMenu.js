angular.module('ui.bootstrap.contextMenu', [])

.directive('contextMenu', ['$parse',function ($parse) {
    var renderContextMenu = function ($scope, event, options) {
        if (!$) { var $ = angular.element; }
        if(options.length<1){
            return 0;
        }
        
        console.log(options.step2.courseElementlist);
        $(event.currentTarget).parent().parent().parent().parent().addClass('context');
        var $contextMenu = $('<div>');
        $contextMenu.addClass('dropdown clearfix');
        var $ul = $('<ul>');
        $ul.addClass('dropdown-menu');
        $ul.attr({ 'role': 'menu' });
        $ul.css({
            display: 'block',
            position: 'absolute',
            left: (event.pageX-75) + 'px',
            top: (event.pageY/2.1)-130+'px'
        });
        var $headerA = $('<span>');
             $headerA.text($scope.ddlBindObject[$scope.selectedDuration-1].name.replace('s','')+" "+$scope.$parent.tlpoint);
             $headerA.addClass('font-bold bg-cadetblue p-xs col-xs-12');
             $ul.append($headerA);
        angular.forEach(options.step2.courseElementlist, function (item, i) {
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
                    clickedChiled=true;
                    $scope.$apply(function () {
                        $(event.currentTarget).parent().parent().parent().parent().removeClass('context');
                        $contextMenu.remove();
                        console.log(item);
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