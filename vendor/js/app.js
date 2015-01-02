angular.module('ZikCenter', ['mediaPlayer']).controller('ZikCenterCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/api').success(function (data) {
      $scope.musics = data;
      $scope.currentzik = null;
      $scope.wantpause = false;
        
      $scope.random = function () {
        var number = Math.floor(Math.random() * $scope.musics.length);
        if ($scope.currentzik != $scope.musics[number]) {
          $scope.lastzik = $scope.currentzik;
          $scope.currentzik = $scope.musics[number];
        } else {
          $scope.random();
        }
      };
        
      $scope.refresh = function () {
        $http.get('/api/refresh').success(function (data) {
          $scope.musics = data;
        });
      };
        
      $scope.setzik = function (zik) {
        if (zik !== null) {
          $scope.lastzik = $scope.currentzik;
          $scope.currentzik = zik;
        }
      };
        
      $scope.random();
      $scope.$watch(function () {
        if ($scope.audio.ended) {
          $scope.random();
        }
        if ($scope.wantpause) {
          $scope.audio.pause();
        } else {
          $scope.audio.play();
        }
      });
    }).error(function () {
      $scope.error = true;
    });
  }
]);