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