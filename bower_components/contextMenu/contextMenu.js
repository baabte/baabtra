angular.module('ui.bootstrap.contextMenu', [])

.directive('contextMenu', ['$parse',function ($parse) {
    var renderContextMenu = function ($scope, event, options) {
        if (!$) { var $ = angular.element; }
        $(event.currentTarget).addClass('context');
        var $contextMenu = $('<div>');
        $contextMenu.addClass('dropdown clearfix');
        var $ul = $('<ul>');
        $ul.addClass('dropdown-menu');
        $ul.attr({ 'role': 'menu' });
        $ul.css({
            display: 'block',
            position: 'absolute',
            left: (event.pageX-75) + 'px',
            // top: event.pageY + 'px'
            top: '0px'
        });
        angular.forEach(options, function (item, i) {
            var $li = $('<li>');
            if (item === null) {
                $li.addClass('divider');
            } else {
                $a = $('<a>');
                $a.attr({ tabindex: '-1', href: '#' });
                $a.text(typeof item[0] == 'string' ? item[0] : item[0].call($scope,$scope.$parent.tlpoint/$scope.durationIn[$scope.selectedDuration-1].mFactor));
                $li.append($a);
                $li.on('click', function ($event) {
                    $event.preventDefault();
                    clickedChiled=true;
                    $scope.$apply(function () {
                        $(event.currentTarget).removeClass('context');
                        $contextMenu.remove();
                        item[1].call($scope,$scope.$parent.tlpoint/$scope.durationIn[$scope.selectedDuration-1].mFactor);
                    });
                });
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
        //$(document).find('body')
        $(event.currentTarget).append($contextMenu);
        $contextMenu.on("mousedown", function (e) {
            if ($(e.target).hasClass('dropdown')) {
                $(event.currentTarget).removeClass('context');
                $contextMenu.remove();
            }
        }).on('contextMenu', function (event) {
            $(event.currentTarget).removeClass('context');
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
                                    var options = $scope.$eval(attrs.contextMenu);
                                    if (options instanceof Array) {
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

