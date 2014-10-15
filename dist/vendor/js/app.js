angular.module("ZikCenter", ["mediaPlayer"]).controller("ZikCenterCtrl", function($scope, $http) {

        $http.get("/musics").success(function(data, status, headers, config) {

        $scope.musics = data;
        $scope.currentzik = null;
        $scope.wantpause = false;

        $scope.randomzik = function() {
                    var musicsLength = '';
                    for(var i = 0; i < $scope.musics.length; i++) {
                        musicsLength += i;
                    }
                    var chars = '0' + musicsLength.replace($scope.musics.length -1,'');
                    var stringLength = 1;
                    var number = '';
                    for(var i = 0; i < stringLength; i++) {
                        var rnum = Math.floor(Math.random() * chars.length);
                        number += chars.substring(rnum, rnum + 1);
                    }
                    if ($scope.lastnumber != number){
                        $scope.lastnumber = number;
                        $scope.lastzik = $scope.currentzik;
                        $scope.currentzik = $scope.musics[number];
                        $scope.audio.play();
                    }else{
                         $scope.randomzik();
                    }
        }


        $scope.setzik= function(zik) {
            $scope.currentzik = zik;
         }

        $scope.randomzik();
        $scope.$watch(function() {
            if ($scope.audio.ended){
                $scope.randomzik();
            }
            if (!$scope.wantpause){
                $scope.audio.play();
            }else{
                $scope.audio.pause();
            }
        });

        }).error(function(data, status, headers, config) {
            $scope.error = true;
        });
});