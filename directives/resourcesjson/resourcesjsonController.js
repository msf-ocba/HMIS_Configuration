Dhis2Api.directive('d2Resourcejson', function(){
	return{
		restrict: 'E',
		templateUrl: 'directives/resourcesjson/resourcesjsonView.html',
		scope: {
		      id: '@'
		    }
	}
	}); 
Dhis2Api.controller("d2ResourcejsonController", ['$scope',"commonvariable","loadjsonresource","DataElements", function ($scope,commonvariable,loadjsonresource,DataElements) {
	$scope.style=[];
    $scope.loadjson=function(){
       loadjsonresource.get($scope.id)
        .then(function(response){
                $scope.sections=response.data.vaccinationDataset;
        });
    }

    $scope.loadjson();
    $scope.selectgroup=function(key,skey){
        if($scope.style[skey]==undefined)
            $scope.style[skey]=[];
        if($scope.style[skey][key]=='' || $scope.style[skey][key]==undefined)
            $scope.style[skey][key]='info';
        else
            $scope.style[skey][key]='';


    };

    $scope.SeeNameDataelement=function(code){
        DataElements.Get({filter:'code:eq:'+code})
        .$promise.then(function(response){
                $scope.nameDataelement=response.dataElements[0].name;
        });
        

    }

    /// esto ya no se necesita pero es un codigo interesante que lee recursivamente el json ////
    $scope.toType = function(obj) {
        return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
    }

    $scope.readjson=function(datavalue){
         angular.forEach(datavalue, function(value, key){
                var typeobject=$scope.toType(value);
                if(typeobject=="array"||typeobject=="object")
                    $scope.readjson(value);
            });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////

    }]);
