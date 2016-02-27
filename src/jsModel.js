//(function() {
"use strict";


var jsModel = function () {

	var jsModelObject = {isValid : {}};

	var modelAttributes = [
		{
			name: 'intTest',
			type: 'int',
			defaultValue: 12,
			forceValidValue: true
		},
		{
			name: 'stringTest',
			type: 'string',
			defaultValue: 'cool',
			rawData: function (value) {
				return 'ben - ' + value;
			},
			forceValidValue: false
		},
		{
			name: 'stringNoDefaultValueTest'
		}
	];

	// assign the properties
	for (var index = 0; index < modelAttributes.length; ++index) {
		defineNewProperty(jsModelObject, modelAttributes[index]);
	}

	/***
	 * Return a raw object of the the model (without private objects)
	 * @returns {{}}
	 */
	jsModelObject.rawObject = function () {
		var raw = {};
		for (var index = 0; index < modelAttributes.length; ++index) {

			if (modelAttributes[index].rawData)
				raw[modelAttributes[index].name] = modelAttributes[index].rawData(this[modelAttributes[index].name]);
			else
				raw[modelAttributes[index].name] = this[modelAttributes[index].name];

		}
		return raw;
	};



	//////////////////////////////////////////
	// Private methods
	//////////////////////////////////////////


	/***
	 * Checks if a value is valid by its type
	 * @param value
	 * @param type
	 * @returns {*}
	 */
	function validateByType(value, type) {

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
	 * @returns {*}
	 */
	function getValueByType(value, type) {

		switch (type) {
			case 'int':
				return parseInt(value)||null;
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

				if(config.forceValidValue)
					obj['_' + config.name] = getValueByType(value,config.type)||obj[config.name];
				else
					obj['_' + config.name] = value;

				obj.isValid[config.name] = validateByType(obj['_' + config.name], config.type);

			},
			enumerable: true,
			configurable: false
		});

		// default value
		obj[config.name] = config.defaultValue||undefined;
	}

	return jsModelObject;


};


//})();