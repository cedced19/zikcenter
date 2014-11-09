angular.module("ZikCenter", ["mediaPlayer"]).controller("ZikCenterCtrl",['$scope', '$http', function($scope, $http) {

        $http.get("/musics").success(function(data) {

        $scope.musics = data;
        $scope.currentzik = null;
        $scope.wantpause = false;

        $scope.randomzik = function() {
                    var number = Math.floor(Math.random()*($scope.musics.length));
                    if ($scope.lastzik != $scope.musics[number]){
                        $scope.lastzik = $scope.currentzik;
                        $scope.currentzik = $scope.musics[number];
                    }else{
                         $scope.randomzik();
                    }
        }


        $scope.setzik= function(zik) {
            $scope.lastzik = $scope.currentzik;
            $scope.currentzik = zik;
         }

        $scope.randomzik();
        $scope.$watch(function() {
            if ($scope.audio.ended){
                $scope.randomzik();
            }
            if ($scope.wantpause){
                $scope.audio.pause();
            }else{
                $scope.audio.play();
            }
        });

        }).error(function() {
            $scope.error = true;
        });
}]);