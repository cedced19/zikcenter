angular.module("ZikCenter", ["mediaPlayer"]).controller("ZikCenterCtrl", function($scope, $http) {

        $http.get("/musics").success(function(data, status, headers, config) {

        $scope.musics = data;
        $scope.currentZik = null;

        $scope.randomZik = function() {
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
                        $scope.lastnumber = number
                        $scope.currentZik = $scope.musics[number];
                        $scope.audio.play();
                    }else{
                         $scope.randomZik();
                    }
        }

        $scope.setZik= function(zik) {
            $scope.currentZik = zik;
         }

        $scope.$watch(function() {
            $scope.audio.playing;
            $scope.audio.play();
        }, function(status) {
            if (!status){
                $scope.randomZik();
            }
        });

        }).error(function(data, status, headers, config) {
            $scope.error = true;
        });
});