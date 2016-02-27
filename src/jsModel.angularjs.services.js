/**
 * Created by Ben Yitzhaki on 27/02/2016.
 */
(function () {
	'use strict';

	angular
		.module('jsModel')
		.factory('jsModel', jsModel);

	jsModel.$inject = ['$window'];

	/* @ngInject */
	function jsModel($window) {

		var jsModel = $window.jsModel;

		// remove the global instance
		try {
			delete $window.jsModel;
		}
		catch (e) {
			$window.jsModel = undefined;
		}

		return jsModel;

	}

})();