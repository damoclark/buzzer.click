var validate = require('jsonschema').validate ;
var data = { type: 'JoinGameMessage' } ;
var schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "http://jsonschema.net",
  "type": "object",
  "properties": {
    "type": {
      "id": "http://jsonschema.net/type",
      "type": "string",
			"pattern": "^JoinGameMessage$"
    },
    "gamecode": {
      "id": "http://jsonschema.net/gamecode",
      "type": "string"
    }
  },
  "required": [
    "type",
    "gamecode"
  ]
} ;

var result = validate(data,schema) ;

if (result.valid)
	console.log('validated!') ;
else
	console.log('not validated!') ;
