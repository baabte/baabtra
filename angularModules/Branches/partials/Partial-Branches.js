angular.module('baabtra').controller('BranchesCtrl',['$scope','$state','$alert','$timeout','localStorageService','$aside','branchSrv',function ($scope,$state,$alert,$timeout,localStorageService,$aside,branchSrv){

if( !angular.element('link#branchCss').length){
    angular.element('head').append('<link id="branchCss" href="bower_components/angular-ui-tree/demo/css/demo-horizontal.css" rel="stylesheet">');
}

$scope.branchTree=[];
$scope.branch="";
  var loginInfo=localStorageService.get('loginInfo');
  if(loginInfo===null||loginInfo.length===0){
       $location.path('/'); //setting the location path to login page if local storage contain null value.
    }
    if(localStorageService.get('loginInfo').length!==0){ //checking for data in local storage
      $scope.rm_id=loginInfo.roleMappingId.$oid; //gets the last logged role mapping id from local storage
      if(loginInfo.roleMappingObj[0].fkCompanyId==""){
        $scope.companyId='';
      }
      else{
        $scope.companyId=loginInfo.roleMappingObj[0].fkCompanyId.$oid;          
      }        
      $scope.roleId=loginInfo.roleMappingObj[0].fkRoleId;
      if($scope.roleId!=1 && $scope.roleId!=2){ //checking for login role id
          $state.go('home.main');
      }
    }
    branchSrv.fnLoadBranch($scope,"5457526122588a5db73e0b23");
        //$scope.companyId="5457526122588a5db73e0b23";

$scope.common = {
                connector: ["Flowchart", {cornerRadius:5}],
                //connector: ["State Machine"],
                anchor: ["Top", "Bottom"],
                endpoint:"Blank"
            };


$scope.drawLines = function(bTree){
  $timeout(function() {
  angular.forEach(bTree, function(node) {
        	jsPlumb.ready(function() {
            if (node.parent!=null) {
                    $scope.myInstanceOfJsPlumb = jsPlumb.connect({
                        source:node.parent, //node.parentId+"",
                        target:node._id, //node.id+"",
                        paintStyle:{ strokeStyle:"lightgray", lineWidth:3 },
                        endpointStyle:{ fillStyle:"lightgray", outlineColor:"gray" },
                        overlays:[ 
                            ["Arrow" , { width:12, length:12, location:0.67 }]
                        ]
                    }, $scope.common); 
            };
          });
          if (node.childrenObj!=undefined) {
                  $scope.drawLines(node.childrenObj);
          }; 	
    });
},100);
   
};

console.log($state);

$scope.tree1NodesOptions = { 
      dropped:function(event) {
        console.log(event);
        console.log(event.source.nodeScope.$modelValue.parent);
        console.log(event.dest.nodesScope.$parent.$modelValue._id);
        if (!angular.equals(event.source.nodeScope.$modelValue.parent,event.dest.nodesScope.$parent.$modelValue._id)) {
        event.source.nodesScope.$parent.$modelValue.children.splice(event.source.index,1);
        if (!event.source.nodesScope.$parent.$modelValue.children.length) {
          event.source.nodesScope.$parent.$modelValue.children=null;
        };
        event.source.nodeScope.$modelValue.parent = event.dest.nodesScope.$parent.$modelValue._id;
        event.dest.nodesScope.$parent.$modelValue.children.push(event.source.nodeScope.$modelValue._id);

        branchSrv.fnInsertBranch($scope,"5457526122588a5db73e0b23",$scope.branches,$scope.rm_id);
        };
      }
  }

$scope.$watch('branches',function (newValue,oldValue){
  if ($scope.branches != undefined) {
    console.log(jsPlumb);
    jsPlumb.detachEveryConnection();
    buildBranchTree(findRoots($scope.branches,null),null); 
    $scope.drawLines($scope.branchTree);
  };
  });

  function buildBranchTree(branchTree,index){
    if(index==null){
      index=0;
    }
    if (!angular.equals(branchTree[index].children,undefined)) {

      if (branchTree[index].children.length>0) {
        buildChildren(branchTree[index]);
        if (branchTree.length-1 > index) {      
        buildBranchTree(branchTree,++index);
      };
    };
    };
  };


  function findChildren(branch,index){
    if(index==null){
      index=0;
    }
    if (branch.children !=null) {
    if(branch.children.indexOf($scope.branches[index]._id)!=-1){
      if (branch.childrenObj==undefined){
        branch.childrenObj=[];
      };
      if($scope.branches[index].activeFlag){
      branch.childrenObj.push($scope.branches[index]);
    }
      buildChildren($scope.branches[index]);
    }
    };
    if (index < $scope.branches.length-1) {   
      findChildren(branch,++index)
    }
  }


  function buildChildren(branch)
  {
    findChildren(branch,null);
    
  };

function findRoots(branch,index){
    if(index==null){
      index=0;
    }
    if (branch[index].parent ==null){
      $scope.branchTree.push(branch[index]);
    }
    if (branch[index].children == null) {
      branch[index].childrenObj=[];
    };
    if (branch.length-1 > index) {
    findRoots(branch,++index)
    }
    return $scope.branchTree;
    }
var nodeData="";
$scope.newSubItem = function(scope) {
    $scope.updateBranch=false;
  $scope.addBranch=true;
  nodeData= scope.$modelValue;
  $scope.message="Create A New Branch Under ";
  $scope.CurrentTopBranch=nodeData._id;
  var myOtherAside = $aside({scope: $scope,placement:'bottom',animation:'am-fade-and-slide-bottom', template: 'angularModules/Branches/aside/aside-newBranch.html'});
  };

$scope.addSubBranch = function(branchDetails){
  angular.forEach($scope.branches,function(branch)
  {
    if (branch._id == nodeData._id) {
      if (branch.children == null) {
        branch.children=[];
      };
      branch.children.push(branchDetails.name);
    };
  });
  $scope.branches.push({ _id:branchDetails.name,
                           location:branchDetails.location,
                           email:branchDetails.email,
                           phone:branchDetails.phone,
                           children: null,
                           parent: nodeData._id,
                           activeFlag:1});
  branchSrv.fnInsertBranch($scope,"5457526122588a5db73e0b23",$scope.branches,$scope.rm_id);
   }

$scope.undoBranch = function(){
  lastDeletedBranch.activeFlag=1;
  angular.forEach($scope.branches,function(branch){
    if (lastDeletedBranch._id==branch._id) {
          branch.activeFlag=1;
        };
  });
  branchSrv.fnInsertBranch($scope,"5457526122588a5db73e0b23",$scope.branches,$scope.rm_id);
};
   $scope.removeBranch = function(node){
    node.$nodeScope.$modelValue.activeFlag=0;
    lastDeletedBranch=node.$nodeScope.$modelValue;
    branchSrv.fnInsertBranch($scope,"5457526122588a5db73e0b23",$scope.branches,$scope.rm_id);
    $alert({scope: $scope,title: '',container:'body',keyboard:true,animation:'am-fade-and-slide-top',template:'views/ui/angular-strap/alert.tpl.html',title:'Undo',content:'The branch has been deleted', placement: 'top', type: 'warning'});
};

$scope.editBranch = function(branch){
  lastEditBranch=branch;
  $scope.message="Update Details Of ";
  $scope.CurrentTopBranch=branch.$nodeScope.$modelValue._id;
  $scope.updateBranch=true;
  $scope.addBranch=false;
  $scope.branch={};
  var myOtherAside = $aside({scope:$scope,placement:'bottom',animation:'am-fade-and-slide-bottom', template: 'angularModules/Branches/aside/aside-newBranch.html'});
  $scope.branch.name=branch.$nodeScope.$modelValue._id;
  $scope.branch.email=branch.$nodeScope.$modelValue.email;
  $scope.branch.location=branch.$nodeScope.$modelValue.location;
  $scope.branch.phone=branch.$nodeScope.$modelValue.phone;
};

$scope.updateSubBranch = function(branch){
  
  if (!angular.equals(lastEditBranch.$nodeScope.$modelValue._id,$scope.branch.name)) {
    angular.forEach($scope.branches,function(branch){
      if (angular.equals(lastEditBranch.$nodeScope.$modelValue.parent,branch._id)) {
        for (var i = 0; i < branch.children.length; i++) {
            if (angular.equals(lastEditBranch.$nodeScope.$modelValue._id,branch.children[i])) {
              branch.children[i]=$scope.branch.name;
            };
        };
      };
    });
    lastEditBranch.$nodeScope.$modelValue._id=$scope.branch.name;
  };
  lastEditBranch.$nodeScope.$modelValue.email=$scope.branch.email;
  lastEditBranch.$nodeScope.$modelValue.location=$scope.branch.location;
  lastEditBranch.$nodeScope.$modelValue.phone=$scope.branch.phone;
  branchSrv.fnInsertBranch($scope,"5457526122588a5db73e0b23",$scope.branches,$scope.rm_id);
};
}]);
