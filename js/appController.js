angular.module('appMaps', ['uiGmapgoogle-maps'])
    .controller('mainCtrl', function ($scope, $rootScope, $timeout, $log, $q, $http) {
        $scope.location = 'sydney';
        $scope.type = 'Food';
        $scope.listItems = [];
        $scope.cityMarkers = [];
        $scope.coordsUpdates = 0;
        $scope.dynamicMoveCtr = 0;
        var cnt = 0;

        function displayData(result) {
            $scope.position = ['0,0'];
            $scope.cityMarkers.length = 0;
            $scope.listItems.length = 0;
            $scope.map = {
                center: {
                    latitude: result.response.geocode.center.lat,
                    longitude: result.response.geocode.center.lng
                }, zoom: 7
            };
            var elements = result.response.groups[0].items;
            for (var i = 0; i < elements.length; i++) {
                $scope.listItems[i] = elements[i].venue;

                var marker = {
                    id: i,
                    latitude: $scope.listItems[i].location.lat,
                    longitude: $scope.listItems[i].location.lng,
                    title: $scope.listItems[i].name,
                    name: $scope.listItems[i].location.address,
                    showWindow: true,
                    url: $scope.listItems[i].url,
                    panTo: true,
                    icon: google.maps.icon
                };
                $scope.cityMarkers.push(marker);
            }
        }

        $scope.searchClick = function () {
            getLocation();
            cnt++;
        };

        var getLocation = function () {
            var results = this;
            $http.get("https://api.foursquare.com/v2/venues/explore/?near=" + $scope.location +
                "&venuePhotos=1&section=" + $scope.type +
                "&client_id=FHNVW0RNM0MK5WT1HEA1V2BHYFPIJNP2Y3HNV05BFVZDFZ0E&&" +
                "client_secret=M1BDWESYNYZOETXW1OFWMVRVW4CPJV2IWIRWJE3FSUWHDZFQ&&v=20131124").success(function (data) {
                results = data;
                displayData(results);
            });
        }
        if (cnt == 0) {
            getLocation();
        }
    });