# jsmodel
JavaScript models, just like we got server-side. Each model has a schema that defines each of
its attribute's type (string,int or custom validation) and additional custom configurations

# basic usage
```
var schema = [
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
             			 prepare: function (value) {
             				 return 'ben - ' + value;
             			 },
             			 forceValidValue: false
             		 },
             		 {
             			 name: 'stringNoDefaultValueTest'
             		 }
             		 ];

var model = new jsModel(schema);
```


# to do
- add a "validate" method that checks the "isValid" properties and returns a bool stating if the model is valid or not
- tests
- ability to add new schema types dynamically and use them in schema
- ability to have custom filter functions for each schema property (first name, last name) or type (int,string,email)