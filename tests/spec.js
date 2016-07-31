describe('Unit Test -', function(){

	'use strict'; 

	beforeEach(module('MyApp'));
	
	describe('MainCtrl -', function(){

		var myController = null;
		var $httpBackend = null;

		var ctrl, scope, httpMock;

		beforeEach(inject(function($controller, $rootScope, $interval){

			myController = $rootScope.$new();
			$controller('MainCtrl', {$scope: myController});

		}));

		beforeEach(inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;
		}));

		afterEach(function(){
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});


		it("Test load json data", function(){
			$httpBackend.expectGET('data/data.json').respond(
			{
			    "total": 1,
			    "data": {
			        "lightbox": {
			            "start": 0,
			            "finish": 100,
			            "duration": 2000
				    }
			    }
			}
			);
			myController.loadData();
			$httpBackend.flush();
			expect(myController.duration).toEqual(2000);
		});

		it("Initial Percentage must be 0", function(){
			expect(myController.percentage).toEqual(0);
		});

		it("Lightbox original visibility must be hidden", function(){
			expect(myController.inprogress).toEqual(false);
		});

		it("Progress status must not be completed at the beginning", function(){
			expect(myController.completed).toEqual(false);
		});

		it("Close button must hide the lightbox", function() {
			myController.close();
			expect(myController.inprogress).toEqual(false);
		});

		it("Check the increment loop function", function() {
			myController.percentage = 90;
			myController.loop();
			expect(myController.percentage).toEqual(91);
		});

		it("On completion progress label must be hidden", function() {
			myController.percentage = 100;
			myController.loop();
			expect(myController.loading).toEqual("hidden");
		});

		it("On completion completed label must be visible", function() {
			myController.percentage = 100;
			myController.loop();
			expect(myController.completed).toEqual("completed");
		});

	});

});