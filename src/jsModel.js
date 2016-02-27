(function () {
	'use strict';

	angular
		.module('App')
		.factory('jsModel', jsModel);

	jsModel.$inject = [];

	/* @ngInject */
	function jsModel() {

		var jsModelObject = {isValid: {},schema: []};

		/***
		 * Load the schema for the model
		 * @param schema
		 *
		 * Option value for schema:
			 [
			 {
				 name: 'intTest',
				 type: 'int',
				 defaultValue: 12,
				 forceValidValue: true
			 },
			 {
				 name: 'stringTest',
				 type: 'string',
				 validation: function(value) { return value == 'ben'; },
				 defaultValue: 'cool',
				 cleanData: function (value) {
					 return 'ben - ' + value;
				 },
				 forceValidValue: false
			 },
			 {
				 name: 'stringNoDefaultValueTest'
			 }
			 ];
		 *
		 */
		jsModelObject.loadSchema = function(schema){

			// assign the properties
			for (var index = 0; index < schema.length; ++index) {
				defineNewProperty(jsModelObject, schema[index]);
			}

			this.schema = schema;

		};


		/***
		 * Responsible for loading existing data into the model
		 *
		 * @param data (key value)
		 */
		jsModelObject.loadData = function(data){

			// assign the properties
			for (var index = 0; index < data; ++index) {

				// restrict to only data keys that have been defined
				if(this['_'+index])
					this[index] = data[index];

			}

		};

		/***
		 * Return a clean object of the the model (without private objects)
		 * @returns {{}}
		 */
		jsModelObject.cleanObject = function () {
			var cleanObj = {};
			for (var index = 0; index < schema.length; ++index) {

				if (schema[index].cleanData)
					cleanObj[schema[index].name] = schema[index].cleanData(this[schema[index].name]);
				else
					cleanObj[schema[index].name] = this[schema[index].name];

			}
			return cleanObj;
		};


		//////////////////////////////////////////
		// Private methods
		//////////////////////////////////////////


		/***
		 * Checks if a value is valid by its type
		 * @param value
		 * @param type
		 * @param customValidation
		 * @returns bool
		 */
		function validateByType(value, type, customValidation) {

			// in case we got custom validation
			if(customValidation)
				return !!customValidation(value);

			// default validations
			switch (type) {
				case 'int':
					return !isNaN(value);
					break;
				default:
					// default code block
					return !(value == '' || value == null || value == undefined);
			}

		}

		/***
		 * Return a value by its type
		 * @param value
		 * @param type
		 * todo: add a custom filterValue type that could be used and defined on the schema
		 * @returns {*}
		 */
		function getValueByType(value, type) {

			switch (type) {
				case 'int':
					return parseInt(value) || null;
					break;
				default:
					// default code block
					return value;
			}

		}

		/***
		 * Define a new object property with a getter,setter and a default value
		 * @param obj
		 * @param config
		 */
		function defineNewProperty(obj, config) {

			Object.defineProperty(obj, config.name, {
				get: function () {
					return obj['_' + config.name];
				},
				set: function (value) {

					if (config.forceValidValue)
						obj['_' + config.name] = getValueByType(value, config.type, config.validation||null) || obj[config.name];
					else
						obj['_' + config.name] = value;

					obj.isValid[config.name] = validateByType(obj['_' + config.name], config.type,config.validation||null);

				},
				enumerable: true,
				configurable: false
			});

			// default value
			obj[config.name] = config.defaultValue || undefined;
		}

		return jsModelObject;

	}

})();