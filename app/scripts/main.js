var MyApp = angular.module('MyApp', []);

MyApp.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.reset = function(){
		//Resetting variables
		$scope.percentage = 0;
		$scope.progress = {'width': 0+'%'};
		$scope.inprogress = false;
		$scope.finish = 'hidden';
		$scope.loading = '';
		$scope.completed= false;
	}

	$scope.close = function(){
		$scope.inprogress = false;
	}

	$scope.reset();	
	
	$scope.$watch('percentage', function() {
		$scope.progress = {'width': $scope.percentage +'%'};
	});
	
	
	$scope.loop = function () {
		if ($scope.percentage < 100){
			$scope.percentage++;
		}
		else{
			$scope.loading = 'hidden';
			$scope.finish = '';
			$scope.completed = 'completed';
		}
	};
	
	$scope.loadData = function() {
		$http.get('data/data.json')
			.then(function(response) {
				$scope.duration = parseInt(response.data.data.lightbox.duration);
				$scope.start();
			});
	};
	
	$scope.start = function(){
		$scope.inprogress = true;
		$scope.loop();

		setTimeout(function(){
			$scope.start();
			$scope.$apply();
		}, $scope.duration / 100 * 22);
	}	
	
}]);