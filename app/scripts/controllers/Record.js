var app = angular.module('record', [ "ngResource", "jwt-AuthHeader-Helper" ]);
var apiUrl = 'http://localhost:3005/records/';

//Cabecera por default a enviar a la API
var jsonHeader = {headers: {'Content-Type': 'application/json'}};

app.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
});

app.controller('RecordController', [ '$scope', '$http',

 function($scope, $http) {
   $scope.addRecord = function() {
     //estructura para crear el disco
     newRecord = {
       title:    $scope.title,
       year:     $scope.year,
       artist:  $scope.artist,
       cover:   $scope.cover,
       genre:  $scope.genre
     }

     console.log(newRecord);

     $http.post(apiUrl, newRecord, jsonHeader).success(function(data) {
       $scope.msg = 'Disco Agregado';
     }).error(function(data) {
       console.log(data);
       $scope.msg = data.message;
     });
   }
} ]);
