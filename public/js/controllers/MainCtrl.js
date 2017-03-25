angular.module('MainCtrl', ['ionic']).controller('MainController', ['$scope', '$rootScope', '$http', '$compile', function($scope, $rootScope, $http, $compile) {
	//$scope.user = 'Welcome!';
	$rootScope.latlong;

	$scope.saveData = function(){
		console.log('saved!');
	}

	// function removeMarkers(){
	// 	for(var i=0; i<markers.length; i++){
	// 		markers[i].setMap(null);
	// 	}
	// }

	$http.get('/me')
		.then(function (success){
			console.log("success getting user from /me endpoint", success);
            if(success.data.userName!==""){
                $rootScope.user = success.data.userName;
                $scope.isAdmin = success.data.verified;
                $scope.currentUser = success.data;
                console.log($scope.currentUser);
            }
			console.log($rootScope.user);
			console.log($scope.isAdmin);
			console.log("Success: "+success);
		},function (error){
			console.log("error: " + error);
		});

	$http.get('/fetchAllPlaces')
		.then(function (data){
			$scope.allPlaces = data.data;
			console.log('Success fetching places');
		},function (error){
			console.log('Fail');
		});

	$scope.upvote = function(place){
		console.log('Upvote place', place);
		$http.post('/upvote', {place: place}).then(function(success){
			console.log('upvoted!');
		})
	}
	$scope.logout = function(){
		$http.get('/api/logout').then(function(success){
			// refreshing will bring the user to the login page
			location.href="/"
		});
	}

	$scope.downvote = function(place){
		console.log('Downvote place', place);
		$http.post('/downvote', {place: place}).then(function(success){
			console.log('downvoted!');
		})
	}

	$scope.verify = function(id){
		console.log(id);
		if($scope.isAdmin){
			var data = {placeId:id};
			console.log('Hai thar');
			$http.post('/verify', data).then(function (data){
				console.log('verifying...');
			},function (error){
				console.log(error);
			});
		} else {
			console.log('Nice try pal');
		}
		
	}

	$scope.content = null;
	//$http.get('/data/galway_playgrounds.json').then(yay, nay);

	function yay(response) {
		$scope.contents = response;
		console.log('galway playgrounds loaded!');
		for (var i =0;i<response.data.data.length;i++){
			$scope.playgrounds.push(response.data.data[i].Playground + ', ' + response.data.data[i].Location_o);
			//console.log(i);
			console.log(response.data.data[i].Playground + ', ' + response.data.data[i].Location_o);

		}
	}
	function nay(response) {
		console.log('error loading playgrounds');
		console.log(response);
	}
}]);