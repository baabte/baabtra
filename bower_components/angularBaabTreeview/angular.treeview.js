/*
	@license Angular Treeview version 0.1.6
	ⓒ 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
	License: MIT
	[TREE attribute]
	angular-treeview: the treeview directive
	tree-id : each tree's unique id.
	tree-model : the tree model on $scope.
	node-id : each node's id
	node-label : each node's label
	node-children: each node's children
	<div
		data-angular-treeview="true"
		data-tree-id="tree"
		data-tree-model="roleList"
		data-node-id="roleId"
		data-node-label="roleName"
		data-node-children="children" >
	</div>
*/

(function ( angular ) {
	'use strict';

	angular.module( 'angularTreeview', [] ).directive( 'treeModel', ['$compile', function( $compile ) {
		return {
			restrict: 'A',
			link: function ( scope, element, attrs ) {


				//tree id
				var treeId = attrs.treeId;
				
				var nodeEdit = attrs.nodeEdit;
				// if(angular.equals(attrs.nodeEdit, 'true')){
				// 	var nodeEdit = 1;
				// }
				// else{
				// 	var nodeEdit = 0;
				// }
				

				//tree model
				var treeModel = attrs.treeModel;

				//node id
				var nodeId = attrs.nodeId || 'id';

				//node label
				var nodeLabel = attrs.nodeLabel || 'label';

				//children
				var nodeChildren = attrs.nodeChildren || 'children';

				//tree template
				var template =
					'<ul  >' +
						'<li data-ng-repeat="node in ' + treeModel + '">' +
							'<i class="mdi-navigation-unfold-more text-md"  data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)" ></i>' +

							'<i class="mdi-navigation-unfold-less text-md "  data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
							'<i class="mdi-content-send text-md"  data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
							'<span class="nodeItem" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
							'<span class="p-h nodeItem" ng-if="'+ nodeEdit +'">'

							+'<a href="" class="icon-grey p-h-xs"  data-nodrag ng-click="showPopupForAddChild(node)" data-placement="right" bs-tooltip data-title="Add a division under {{node.name}}"><i class="ti  ti-layers-alt" ></i><a/>'+
							'<a  href="" class="icon-grey p-h-xs" data-nodrag ng-click="editChild(node)" data-placement="right" bs-tooltip data-title="Edit {{node.name}}"><i class="fa fa-edit" ></i></a>'+
							'<a href="" class="icon-grey p-h-xs" ng-if="!node.parent" data-nodrag ng-click="removeChild(node)" data-placement="right" bs-tooltip data-title="Remove {{node.name}}"><i class="fa fa-trash-o" ></i></a></span>'+
							'<div data-node-edit="'+ nodeEdit +'" data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' +

						'</li>' +
					'</ul>';


				//check tree id, tree model
				if( treeId && treeModel ) {
					//root node
					if( attrs.angularTreeview ) {
					
						//create tree object if not exists
						scope[treeId] = scope[treeId] || {};

						//if node head clicks,
						scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function( selectedNode ){

							//Collapse or Expand
							selectedNode.collapsed = !selectedNode.collapsed;
						};

						//if node label clicks,
						scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function( selectedNode ){

							if(!selectedNode.children.length){

								scope.selectedData = selectedNode;

								//remove highlight from previous node
								if( scope[treeId].currentNode && scope[treeId].currentNode.selected ) {
									scope[treeId].currentNode.selected = undefined;
								}

								//set highlight to selected node
								selectedNode.selected = 'selected';

								//set currentNode
								scope[treeId].currentNode = selectedNode;
							}
							else{
								scope.selectedData = '';
							}
						};
					}

					//Rendering template.
					element.html('').append( $compile( template )( scope ) );
				}
			}
		};
	}]);
})( angular );



        	