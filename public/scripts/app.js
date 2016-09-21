var ang= angular.module('myApp',[]);

ang.controller('MainCtrl',function($scope, $http){
    $http.get('/images').then(function(images){
      $scope.images=images.data;
    });
});

ang.controller('AdminCtrl',function($scope, $http){
    $http.get('/admin').then(function(donnees){
      $scope.images=donnees.data;
    });
});
