## Members

<dl>
<dt><a href="#methods">methods</a></dt>
<dd><p>Methods to add to the socket object</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#AbstractMessage">AbstractMessage()</a></dt>
<dd><p>Abstract message class from which all socket.io message objects should derive</p>
</dd>
<dt><a href="#BuzzerStateMessage">BuzzerStateMessage(args)</a> ⇒ <code><a href="#BuzzerStateMessage">BuzzerStateMessage</a></code></dt>
<dd><p>This message is from server to client and provides the buzzer state message
or if not set, can be set using the setEnabled method.</p>
</dd>
<dt><a href="#ConfirmMessage">ConfirmMessage(code, message, args)</a> ⇒ <code><a href="#ConfirmMessage">ConfirmMessage</a></code></dt>
<dd><p>This message is a generic confirmation from the last request
You can set a confirmation code where 0 is OK, and other numbers represent
different error states.  There is also a string message field which can be
used to present an error message to the user.</p>
</dd>
<dt><a href="#ContestantBuzzerPress">ContestantBuzzerPress(args)</a> ⇒ <code><a href="#ContestantBuzzerPress">ContestantBuzzerPress</a></code></dt>
<dd><p>This message is from server to client and provides the contestant buzzer press event
No getter or setter, this message is only a trigger</p>
</dd>
<dt><a href="#ContestantJoinResponseMessage">ContestantJoinResponseMessage(args)</a> ⇒ <code><a href="#ContestantJoinResponseMessage">ContestantJoinResponseMessage</a></code></dt>
<dd><p>This message is from server to client and provides the contestant join response message
or if not set, can be set using the various set methods:
 setWasSuccessful(result) : void
 setErrorMessage(errorMessage) : void
 setParticipantId(participantId) : void</p>
</dd>
<dt><a href="#CreateGameConfirmMessage">CreateGameConfirmMessage(code, message, args)</a> ⇒ <code><a href="#CreateGameConfirmMessage">CreateGameConfirmMessage</a></code></dt>
<dd><p>This message is a confirmation response for a CreateGameMessage
You can set a confirmation code where 0 is OK, and other numbers represent
different error states.  There is also a string message field which can be
used to present an error message to the user.</p>
</dd>
<dt><a href="#CreateGameMessage">CreateGameMessage(settings)</a> ⇒ <code><a href="#CreateGameMessage">CreateGameMessage</a></code></dt>
<dd><p>This message is from client to server and provides the settings for a new
Game</p>
</dd>
<dt><a href="#HostBuzzerResetMessage">HostBuzzerResetMessage(args)</a> ⇒ <code><a href="#HostBuzzerResetMessage">HostBuzzerResetMessage</a></code></dt>
<dd><p>This message is from server to client and provides the host buzzer reset response
or if not set, can be set using the setState method</p>
</dd>
<dt><a href="#HostSessionCreateResponse">HostSessionCreateResponse(args)</a> ⇒ <code><a href="#HostSessionCreateResponse">HostSessionCreateResponse</a></code></dt>
<dd><p>This message is from server to client and provides the host create response
or if not set, can be set using the setSession method</p>
</dd>
<dt><a href="#InquireTeamLeaderPositionMessage">InquireTeamLeaderPositionMessage(args)</a> ⇒ <code><a href="#InquireTeamLeaderPositionMessage">InquireTeamLeaderPositionMessage</a></code></dt>
<dd><p>This message is from client to server and provides the team leader status of the client
or if not set, can be set using the setResponse method</p>
</dd>
<dt><a href="#JoinGameMessage">JoinGameMessage(args)</a> ⇒ <code><a href="#JoinGameMessage">JoinGameMessage</a></code></dt>
<dd><p>This message is from client to server and provides the gamecode of the client
or if not set, can be set using the setGameCode method</p>
</dd>
<dt><a href="#ParticipantJoinRequestMessage">ParticipantJoinRequestMessage(args)</a> ⇒ <code><a href="#ParticipantJoinRequestMessage">ParticipantJoinRequestMessage</a></code></dt>
<dd><p>This message is from client to server and provides the participant join request message
or if not set, can be set using the various set methods:
 sessionId(sessionId) : void
 participantId(participantId) : void
 username(username) : void
 isObserver(value) : void</p>
</dd>
<dt><a href="#ProtocolErrorMessage">ProtocolErrorMessage(message, args)</a> ⇒ <code><a href="#ProtocolErrorMessage">ProtocolErrorMessage</a></code></dt>
<dd><p>This message is sent in response to an invalid message received, typically
if it fails the jsonschema validation.
The code is set to 255, and message is empty string</p>
</dd>
<dt><a href="#RegisterNameMessage">RegisterNameMessage(args)</a> ⇒ <code><a href="#RegisterNameMessage">RegisterNameMessage</a></code></dt>
<dd><p>This message is from client to server and provides the name of the client
or if not set, can be set using the setName method</p>
</dd>
<dt><a href="#RequestTeamNameMessage">RequestTeamNameMessage(args)</a> ⇒ <code><a href="#RequestTeamNameMessage">RequestTeamNameMessage</a></code></dt>
<dd><p>This message is from client to server and provides the team name of the client
or if not set, can be set using the seTeamName method if client is a team leader or host</p>
</dd>
<dt><a href="#RoundWonMessage">RoundWonMessage(args)</a> ⇒ <code><a href="#RoundWonMessage">RoundWonMessage</a></code></dt>
<dd><p>This message is from server to client and provides the winner information message
or if not set, can be set using the various set methods:
 username(userName) : void
 userId(userId) : void
 teamName(teamName) : void
 teamId(teamId) : void</p>
</dd>
<dt><a href="#TeamLeaderPositionInquiryResponseMessage">TeamLeaderPositionInquiryResponseMessage(args)</a> ⇒ <code><a href="#TeamLeaderPositionInquiryResponseMessage">TeamLeaderPositionInquiryResponseMessage</a></code></dt>
<dd><p>This message is from server to client and provides the team leader status of the client
or if not set, can be set using the response method</p>
</dd>
<dt><a href="#AbstractContainer">AbstractContainer()</a></dt>
<dd><p>An abstract container object prototype for state information for the server</p>
</dd>
<dt><a href="#BuzzerError">BuzzerError(code, message, fileName, lineNumber)</a> ⇒ <code><a href="#BuzzerError">BuzzerError</a></code></dt>
<dd><p>Exception handler class for Buzzer.click</p>
</dd>
<dt><a href="#Clients">Clients()</a> ⇒ <code><a href="#Clients">Clients</a></code></dt>
<dd><p>Object that contains a list of all clients connections and their socket</p>
</dd>
<dt><a href="#Game">Game(settings)</a> ⇒ <code><a href="#Game">Game</a></code></dt>
<dd><p>Game object contains the data for this game, including other objects</p>
</dd>
<dt><a href="#Games">Games()</a> ⇒ <code><a href="#Games">Games</a></code></dt>
<dd><p>Games Class provides overarching state store for entire system where
games are added or removed</p>
</dd>
<dt><a href="#Hosts">Hosts()</a> ⇒ <code><a href="#Hosts">Hosts</a></code></dt>
<dd><p>Hosts object contains a list of all the Host sockets</p>
</dd>
<dt><a href="#restore">restore(msg)</a> ⇒ <code><a href="#AbstractMessage">AbstractMessage</a></code></dt>
<dd><p>Given json object received from remote endpoint, return a subclass of
AbstractMessage representing this message.  Null if there is an validation
error</p>
</dd>
<dt><a href="#create">create(name, args)</a> ⇒ <code><a href="#AbstractMessage">AbstractMessage</a></code></dt>
<dd><p>Create a new message object by the given name, and optionally initialised
with the values in the Object args, and return it.  Null if there was an
error</p>
</dd>
<dt><a href="#updateSocket">updateSocket(socket)</a></dt>
<dd><p>Add emitMessage and onMessage methods to object</p>
</dd>
<dt><a href="#Settings">Settings()</a> ⇒ <code><a href="#Settings">Settings</a></code></dt>
<dd><p>Settings object contains configuration options for this game</p>
</dd>
<dt><a href="#State">State()</a> ⇒ <code><a href="#State">State</a></code></dt>
<dd><p>State object contains the running state of this game</p>
</dd>
<dt><a href="#Team">Team()</a> ⇒ <code><a href="#Team">Team</a></code></dt>
<dd><p>Team object contains setting information for this team in a game</p>
</dd>
<dt><a href="#Teams">Teams()</a> ⇒ <code><a href="#Teams">Teams</a></code></dt>
<dd><p>Teams object contains a list of all the Team objects</p>
</dd>
</dl>

<a name="methods"></a>

## methods
Methods to add to the socket object

**Kind**: global variable  

* [methods](#methods)
    * [.onMessage(event, fn)](#methods.onMessage)
    * [.emitMessage(message, fn)](#methods.emitMessage)

<a name="methods.onMessage"></a>

### methods.onMessage(event, fn)
Establish event handler for receiving an AbstractMessage message - overriden
method from Socket class

**Kind**: static method of <code>[methods](#methods)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of event to wait for |
| fn | <code>function</code> | Function to call on message |

<a name="methods.emitMessage"></a>

### methods.emitMessage(message, fn)
Emit an AbstractMessage message - overidden method from Socket class

**Kind**: static method of <code>[methods](#methods)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>[AbstractMessage](#AbstractMessage)</code> | A subclass of AbstractMessage to be sent |
| fn | <code>function</code> | An optional callack to execute to send a reply |

<a name="AbstractMessage"></a>

## AbstractMessage()
Abstract message class from which all socket.io message objects should derive

**Kind**: global function  

* [AbstractMessage()](#AbstractMessage)
    * [.validate()](#AbstractMessage+validate) ⇒ <code>Boolean</code>
    * [.set(args)](#AbstractMessage+set) ⇒ <code>[AbstractMessage](#AbstractMessage)</code>
    * [.get()](#AbstractMessage+get) ⇒ <code>Object</code>
    * [.getJSON()](#AbstractMessage+getJSON) ⇒ <code>Object</code>
    * [.getType()](#AbstractMessage+getType) ⇒ <code>String</code>

<a name="AbstractMessage+validate"></a>

### abstractMessage.validate() ⇒ <code>Boolean</code>
Validate the data datastructure for the instance or if provided
the data object that is passed to this method

**Kind**: instance method of <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>Boolean</code> - True if valid, otherwise false  
**Access:** public  
<a name="AbstractMessage+set"></a>

### abstractMessage.set(args) ⇒ <code>[AbstractMessage](#AbstractMessage)</code>
Set the data for the message object to args, replacing the same values that
existed before

**Kind**: instance method of <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[AbstractMessage](#AbstractMessage)</code> - Returns itself  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | data to replace what is in this instance |

<a name="AbstractMessage+get"></a>

### abstractMessage.get() ⇒ <code>Object</code>
Get the raw data from the message object

**Kind**: instance method of <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>Object</code> - Raw data object from message  
**Access:** public  
<a name="AbstractMessage+getJSON"></a>

### abstractMessage.getJSON() ⇒ <code>Object</code>
Get the JSON data structure as sent over the network for this object

**Kind**: instance method of <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>Object</code> - JSON data structure to be sent over network  
**Access:** public  
<a name="AbstractMessage+getType"></a>

### abstractMessage.getType() ⇒ <code>String</code>
Get the type of this message as a string

**Kind**: instance method of <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>String</code> - The type of this object as a string  
**Access:** public  
<a name="BuzzerStateMessage"></a>

## BuzzerStateMessage(args) ⇒ <code>[BuzzerStateMessage](#BuzzerStateMessage)</code>
This message is from server to client and provides the buzzer state message
or if not set, can be set using the setEnabled method.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[BuzzerStateMessage](#BuzzerStateMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="BuzzerStateMessage+type"></a>

### buzzerStateMessage.type
The type of this class

**Kind**: instance property of <code>[BuzzerStateMessage](#BuzzerStateMessage)</code>  
**Access:** public  
<a name="ConfirmMessage"></a>

## ConfirmMessage(code, message, args) ⇒ <code>[ConfirmMessage](#ConfirmMessage)</code>
This message is a generic confirmation from the last request
You can set a confirmation code where 0 is OK, and other numbers represent
different error states.  There is also a string message field which can be
used to present an error message to the user.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[ConfirmMessage](#ConfirmMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>Integer</code> | The confirmation code (if undefined, then 0 - OK) |
| message | <code>String</code> | The confirmation message string (if undefined, then '') |
| args | <code>Object</code> | The data for this message object |

<a name="ConfirmMessage+type"></a>

### confirmMessage.type
The type of this class

**Kind**: instance property of <code>[ConfirmMessage](#ConfirmMessage)</code>  
**Access:** public  
<a name="ContestantBuzzerPress"></a>

## ContestantBuzzerPress(args) ⇒ <code>[ContestantBuzzerPress](#ContestantBuzzerPress)</code>
This message is from server to client and provides the contestant buzzer press event
No getter or setter, this message is only a trigger

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[ContestantBuzzerPress](#ContestantBuzzerPress)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="ContestantBuzzerPress+type"></a>

### contestantBuzzerPress.type
The type of this class

**Kind**: instance property of <code>[ContestantBuzzerPress](#ContestantBuzzerPress)</code>  
**Access:** public  
<a name="ContestantJoinResponseMessage"></a>

## ContestantJoinResponseMessage(args) ⇒ <code>[ContestantJoinResponseMessage](#ContestantJoinResponseMessage)</code>
This message is from server to client and provides the contestant join response message
or if not set, can be set using the various set methods:
 setWasSuccessful(result) : void
 setErrorMessage(errorMessage) : void
 setParticipantId(participantId) : void

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[ContestantJoinResponseMessage](#ContestantJoinResponseMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="ContestantJoinResponseMessage+type"></a>

### contestantJoinResponseMessage.type
The type of this class

**Kind**: instance property of <code>[ContestantJoinResponseMessage](#ContestantJoinResponseMessage)</code>  
**Access:** public  
<a name="CreateGameConfirmMessage"></a>

## CreateGameConfirmMessage(code, message, args) ⇒ <code>[CreateGameConfirmMessage](#CreateGameConfirmMessage)</code>
This message is a confirmation response for a CreateGameMessage
You can set a confirmation code where 0 is OK, and other numbers represent
different error states.  There is also a string message field which can be
used to present an error message to the user.

**Kind**: global function  
**Extends:** <code>[ConfirmMessage](#ConfirmMessage)</code>  
**Returns**: <code>[CreateGameConfirmMessage](#CreateGameConfirmMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>Integer</code> | The confirmation code (if undefined, then 0 - OK) |
| message | <code>String</code> | The confirmation message string (if undefined, then "") |
| args | <code>Object</code> | The data for this message object |

<a name="CreateGameConfirmMessage+type"></a>

### createGameConfirmMessage.type
The type of this class

**Kind**: instance property of <code>[CreateGameConfirmMessage](#CreateGameConfirmMessage)</code>  
**Access:** public  
<a name="CreateGameMessage"></a>

## CreateGameMessage(settings) ⇒ <code>[CreateGameMessage](#CreateGameMessage)</code>
This message is from client to server and provides the settings for a new
Game

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[CreateGameMessage](#CreateGameMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>[Settings](#Settings)</code> | The settings instance for this message object |

<a name="CreateGameMessage+type"></a>

### createGameMessage.type
The type of this class

**Kind**: instance property of <code>[CreateGameMessage](#CreateGameMessage)</code>  
**Access:** public  
<a name="HostBuzzerResetMessage"></a>

## HostBuzzerResetMessage(args) ⇒ <code>[HostBuzzerResetMessage](#HostBuzzerResetMessage)</code>
This message is from server to client and provides the host buzzer reset response
or if not set, can be set using the setState method

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[HostBuzzerResetMessage](#HostBuzzerResetMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="HostBuzzerResetMessage+type"></a>

### hostBuzzerResetMessage.type
The type of this class

**Kind**: instance property of <code>[HostBuzzerResetMessage](#HostBuzzerResetMessage)</code>  
**Access:** public  
<a name="HostSessionCreateResponse"></a>

## HostSessionCreateResponse(args) ⇒ <code>[HostSessionCreateResponse](#HostSessionCreateResponse)</code>
This message is from server to client and provides the host create response
or if not set, can be set using the setSession method

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[HostSessionCreateResponse](#HostSessionCreateResponse)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="HostSessionCreateResponse+type"></a>

### hostSessionCreateResponse.type
The type of this class

**Kind**: instance property of <code>[HostSessionCreateResponse](#HostSessionCreateResponse)</code>  
**Access:** public  
<a name="InquireTeamLeaderPositionMessage"></a>

## InquireTeamLeaderPositionMessage(args) ⇒ <code>[InquireTeamLeaderPositionMessage](#InquireTeamLeaderPositionMessage)</code>
This message is from client to server and provides the team leader status of the client
or if not set, can be set using the setResponse method

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[InquireTeamLeaderPositionMessage](#InquireTeamLeaderPositionMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="InquireTeamLeaderPositionMessage+type"></a>

### inquireTeamLeaderPositionMessage.type
The type of this class

**Kind**: instance property of <code>[InquireTeamLeaderPositionMessage](#InquireTeamLeaderPositionMessage)</code>  
**Access:** public  
<a name="JoinGameMessage"></a>

## JoinGameMessage(args) ⇒ <code>[JoinGameMessage](#JoinGameMessage)</code>
This message is from client to server and provides the gamecode of the client
or if not set, can be set using the setGameCode method

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[JoinGameMessage](#JoinGameMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="JoinGameMessage+type"></a>

### joinGameMessage.type
The type of this class

**Kind**: instance property of <code>[JoinGameMessage](#JoinGameMessage)</code>  
**Access:** public  
<a name="ParticipantJoinRequestMessage"></a>

## ParticipantJoinRequestMessage(args) ⇒ <code>[ParticipantJoinRequestMessage](#ParticipantJoinRequestMessage)</code>
This message is from client to server and provides the participant join request message
or if not set, can be set using the various set methods:
 sessionId(sessionId) : void
 participantId(participantId) : void
 username(username) : void
 isObserver(value) : void

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[ParticipantJoinRequestMessage](#ParticipantJoinRequestMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="ParticipantJoinRequestMessage+type"></a>

### participantJoinRequestMessage.type
The type of this class

**Kind**: instance property of <code>[ParticipantJoinRequestMessage](#ParticipantJoinRequestMessage)</code>  
**Access:** public  
<a name="ProtocolErrorMessage"></a>

## ProtocolErrorMessage(message, args) ⇒ <code>[ProtocolErrorMessage](#ProtocolErrorMessage)</code>
This message is sent in response to an invalid message received, typically
if it fails the jsonschema validation.
The code is set to 255, and message is empty string

**Kind**: global function  
**Extends:** <code>[ConfirmMessage](#ConfirmMessage)</code>  
**Returns**: <code>[ProtocolErrorMessage](#ProtocolErrorMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The confirmation message string (if undefined, then '') |
| args | <code>Object</code> | The data for this message object |

<a name="ProtocolErrorMessage+type"></a>

### protocolErrorMessage.type
The type of this class

**Kind**: instance property of <code>[ProtocolErrorMessage](#ProtocolErrorMessage)</code>  
**Access:** public  
<a name="RegisterNameMessage"></a>

## RegisterNameMessage(args) ⇒ <code>[RegisterNameMessage](#RegisterNameMessage)</code>
This message is from client to server and provides the name of the client
or if not set, can be set using the setName method

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[RegisterNameMessage](#RegisterNameMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="RegisterNameMessage+type"></a>

### registerNameMessage.type
The type of this class

**Kind**: instance property of <code>[RegisterNameMessage](#RegisterNameMessage)</code>  
**Access:** public  
<a name="RequestTeamNameMessage"></a>

## RequestTeamNameMessage(args) ⇒ <code>[RequestTeamNameMessage](#RequestTeamNameMessage)</code>
This message is from client to server and provides the team name of the client
or if not set, can be set using the seTeamName method if client is a team leader or host

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[RequestTeamNameMessage](#RequestTeamNameMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="RequestTeamNameMessage+type"></a>

### requestTeamNameMessage.type
The type of this class

**Kind**: instance property of <code>[RequestTeamNameMessage](#RequestTeamNameMessage)</code>  
**Access:** public  
<a name="RoundWonMessage"></a>

## RoundWonMessage(args) ⇒ <code>[RoundWonMessage](#RoundWonMessage)</code>
This message is from server to client and provides the winner information message
or if not set, can be set using the various set methods:
 username(userName) : void
 userId(userId) : void
 teamName(teamName) : void
 teamId(teamId) : void

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[RoundWonMessage](#RoundWonMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="RoundWonMessage+type"></a>

### roundWonMessage.type
The type of this class

**Kind**: instance property of <code>[RoundWonMessage](#RoundWonMessage)</code>  
**Access:** public  
<a name="TeamLeaderPositionInquiryResponseMessage"></a>

## TeamLeaderPositionInquiryResponseMessage(args) ⇒ <code>[TeamLeaderPositionInquiryResponseMessage](#TeamLeaderPositionInquiryResponseMessage)</code>
This message is from server to client and provides the team leader status of the client
or if not set, can be set using the response method

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>[TeamLeaderPositionInquiryResponseMessage](#TeamLeaderPositionInquiryResponseMessage)</code> - An instance  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The data for this message object |

<a name="TeamLeaderPositionInquiryResponseMessage+type"></a>

### teamLeaderPositionInquiryResponseMessage.type
The type of this class

**Kind**: instance property of <code>[TeamLeaderPositionInquiryResponseMessage](#TeamLeaderPositionInquiryResponseMessage)</code>  
**Access:** public  
<a name="AbstractContainer"></a>

## AbstractContainer()
An abstract container object prototype for state information for the server

**Kind**: global function  

* [AbstractContainer()](#AbstractContainer)
    * [.hasId(id)](#AbstractContainer+hasId) ⇒ <code>Boolean</code>
    * [.add(o)](#AbstractContainer+add) ⇒ <code>[AbstractContainer](#AbstractContainer)</code>
    * [.remove(o)](#AbstractContainer+remove) ⇒ <code>[AbstractContainer](#AbstractContainer)</code>
    * [.get(id)](#AbstractContainer+get) ⇒ <code>[Game](#Game)</code>

<a name="AbstractContainer+hasId"></a>

### abstractContainer.hasId(id) ⇒ <code>Boolean</code>
Does System already have the given id

**Kind**: instance method of <code>[AbstractContainer](#AbstractContainer)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | id to lookup |

<a name="AbstractContainer+add"></a>

### abstractContainer.add(o) ⇒ <code>[AbstractContainer](#AbstractContainer)</code>
Add an object to the system

**Kind**: instance method of <code>[AbstractContainer](#AbstractContainer)</code>  
**Returns**: <code>[AbstractContainer](#AbstractContainer)</code> - Returns a copy of itself  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | A new object added to the system |

<a name="AbstractContainer+remove"></a>

### abstractContainer.remove(o) ⇒ <code>[AbstractContainer](#AbstractContainer)</code>
Remove an object from the system

**Kind**: instance method of <code>[AbstractContainer](#AbstractContainer)</code>  
**Returns**: <code>[AbstractContainer](#AbstractContainer)</code> - Returns a copy of itself  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> | An object to be removed from the system |

<a name="AbstractContainer+get"></a>

### abstractContainer.get(id) ⇒ <code>[Game](#Game)</code>
Returns an object with given id

**Kind**: instance method of <code>[AbstractContainer](#AbstractContainer)</code>  
**Returns**: <code>[Game](#Game)</code> - Returns an object represented by id  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | String representing the game |

<a name="BuzzerError"></a>

## BuzzerError(code, message, fileName, lineNumber) ⇒ <code>[BuzzerError](#BuzzerError)</code>
Exception handler class for Buzzer.click

**Kind**: global function  
**Extends:** <code>Error</code>  
**Returns**: <code>[BuzzerError](#BuzzerError)</code> - An instance of BuzzerError  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>Integer</code> | Error code number |
| message | <code>String</code> | Error message for the user |
| fileName | <code>String</code> | The filename where the error occurred (default to filename where called constructor) |
| lineNumber | <code>Integer</code> | The line number where the error occurred (default to line number where called constructor) |


* [BuzzerError(code, message, fileName, lineNumber)](#BuzzerError) ⇒ <code>[BuzzerError](#BuzzerError)</code>
    * [.setCode(code)](#BuzzerError+setCode) ⇒ <code>[BuzzerError](#BuzzerError)</code>
    * [.getCode()](#BuzzerError+getCode) ⇒ <code>Integer</code>
    * [.setMessage(message)](#BuzzerError+setMessage) ⇒ <code>[BuzzerError](#BuzzerError)</code>
    * [.getMessage()](#BuzzerError+getMessage) ⇒ <code>String</code>
    * [.setName(BuzzerError)](#BuzzerError+setName) ⇒ <code>[BuzzerError](#BuzzerError)</code>
    * [.getName()](#BuzzerError+getName) ⇒ <code>String</code>

<a name="BuzzerError+setCode"></a>

### buzzerError.setCode(code) ⇒ <code>[BuzzerError](#BuzzerError)</code>
Set the error code for this error object

**Kind**: instance method of <code>[BuzzerError](#BuzzerError)</code>  
**Returns**: <code>[BuzzerError](#BuzzerError)</code> - A reference to this  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>Integer</code> | The error code number (see codes in BuzzerError) |

<a name="BuzzerError+getCode"></a>

### buzzerError.getCode() ⇒ <code>Integer</code>
Get the error code for this error object

**Kind**: instance method of <code>[BuzzerError](#BuzzerError)</code>  
**Returns**: <code>Integer</code> - Error code set for this object  
**Access:** public  
<a name="BuzzerError+setMessage"></a>

### buzzerError.setMessage(message) ⇒ <code>[BuzzerError](#BuzzerError)</code>
Set the error message for this error object

**Kind**: instance method of <code>[BuzzerError](#BuzzerError)</code>  
**Returns**: <code>[BuzzerError](#BuzzerError)</code> - A reference to this  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | Error message string |

<a name="BuzzerError+getMessage"></a>

### buzzerError.getMessage() ⇒ <code>String</code>
Get the error message for this error object

**Kind**: instance method of <code>[BuzzerError](#BuzzerError)</code>  
**Returns**: <code>String</code> - Error message for this error object for user  
**Access:** public  
<a name="BuzzerError+setName"></a>

### buzzerError.setName(BuzzerError) ⇒ <code>[BuzzerError](#BuzzerError)</code>
Set the name of this error (default to BuzzerError)

**Kind**: instance method of <code>[BuzzerError](#BuzzerError)</code>  
**Returns**: <code>[BuzzerError](#BuzzerError)</code> - A reference to this  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| BuzzerError | <code>String</code> | The name to set for this error |

<a name="BuzzerError+getName"></a>

### buzzerError.getName() ⇒ <code>String</code>
Get the name of this error object

**Kind**: instance method of <code>[BuzzerError](#BuzzerError)</code>  
**Returns**: <code>String</code> - The name of this error message (default to BuzzerError)  
**Access:** public  
<a name="Clients"></a>

## Clients() ⇒ <code>[Clients](#Clients)</code>
Object that contains a list of all clients connections and their socket

**Kind**: global function  
**Extends:** <code>[AbstractContainer](#AbstractContainer)</code>  
**Returns**: <code>[Clients](#Clients)</code> - Object instance  
<a name="Clients+type"></a>

### clients.type
Prototype name

**Kind**: instance property of <code>[Clients](#Clients)</code>  
<a name="Game"></a>

## Game(settings) ⇒ <code>[Game](#Game)</code>
Game object contains the data for this game, including other objects

**Kind**: global function  
**Returns**: <code>[Game](#Game)</code> - Instance of Game data  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>[Settings](#Settings)</code> | An instance of settings with config for this game |


* [Game(settings)](#Game) ⇒ <code>[Game](#Game)</code>
    * [.type](#Game+type)
    * [.setSettings(settings)](#Game+setSettings) ⇒ <code>[Game](#Game)</code>

<a name="Game+type"></a>

### game.type
Prototype name

**Kind**: instance property of <code>[Game](#Game)</code>  
<a name="Game+setSettings"></a>

### game.setSettings(settings) ⇒ <code>[Game](#Game)</code>
Set the Game objects settings

**Kind**: instance method of <code>[Game](#Game)</code>  
**Returns**: <code>[Game](#Game)</code> - An instance of itself  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>[Settings](#Settings)</code> | an instance of Settings for this game |

<a name="Games"></a>

## Games() ⇒ <code>[Games](#Games)</code>
Games Class provides overarching state store for entire system where
games are added or removed

**Kind**: global function  
**Extends:** <code>[AbstractContainer](#AbstractContainer)</code>  
**Returns**: <code>[Games](#Games)</code> - Object instance  

* [Games()](#Games) ⇒ <code>[Games](#Games)</code>
    * [.hostCodes](#Games+hostCodes) : <code>Object</code>
    * [.gameCodes](#Games+gameCodes)
    * [.type](#Games+type)
    * [.hasHostCode(hostCode)](#Games+hasHostCode) ⇒ <code>Boolean</code>
    * [.hasGameCode(hostCode)](#Games+hasGameCode) ⇒ <code>Boolean</code>
    * [.add(game)](#Games+add) ⇒ <code>[Games](#Games)</code>
    * [.remove(o)](#Games+remove) ⇒ <code>[AbstractContainer](#AbstractContainer)</code>
    * [.getByHostCode(hostCode)](#Games+getByHostCode) ⇒ <code>[Game](#Game)</code>
    * [.getByGameCode(gameCode)](#Games+getByGameCode) ⇒ <code>[Game](#Game)</code>

<a name="Games+hostCodes"></a>

### games.hostCodes : <code>Object</code>
Holds hash of string-based codes used by hosts to host their games

**Kind**: instance property of <code>[Games](#Games)</code>  
<a name="Games+gameCodes"></a>

### games.gameCodes
Hold hash of string-based codes used by the participants to access the game

**Kind**: instance property of <code>[Games](#Games)</code>  
<a name="Games+type"></a>

### games.type
Prototype name

**Kind**: instance property of <code>[Games](#Games)</code>  
<a name="Games+hasHostCode"></a>

### games.hasHostCode(hostCode) ⇒ <code>Boolean</code>
Does Games already have the given host id

**Kind**: instance method of <code>[Games](#Games)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| hostCode | <code>String</code> | id to lookup |

<a name="Games+hasGameCode"></a>

### games.hasGameCode(hostCode) ⇒ <code>Boolean</code>
Does Games already have the given host id

**Kind**: instance method of <code>[Games](#Games)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| hostCode | <code>String</code> | id to lookup |

<a name="Games+add"></a>

### games.add(game) ⇒ <code>[Games](#Games)</code>
Add a game object to the games object

**Kind**: instance method of <code>[Games](#Games)</code>  
**Returns**: <code>[Games](#Games)</code> - Returns a copy of itself  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| game | <code>[Game](#Game)</code> | A new game added to the system |

<a name="Games+remove"></a>

### games.remove(o) ⇒ <code>[AbstractContainer](#AbstractContainer)</code>
Remove an object from the system

**Kind**: instance method of <code>[Games](#Games)</code>  
**Returns**: <code>[AbstractContainer](#AbstractContainer)</code> - Returns a copy of itself  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>[Game](#Game)</code> | A game object to be removed from the system |

<a name="Games+getByHostCode"></a>

### games.getByHostCode(hostCode) ⇒ <code>[Game](#Game)</code>
Returns a game object with given hostCode

**Kind**: instance method of <code>[Games](#Games)</code>  
**Returns**: <code>[Game](#Game)</code> - Returns a game object represented by hostCode  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| hostCode | <code>String</code> | host code string representing the game |

<a name="Games+getByGameCode"></a>

### games.getByGameCode(gameCode) ⇒ <code>[Game](#Game)</code>
Returns a game object with given gameCode for participants

**Kind**: instance method of <code>[Games](#Games)</code>  
**Returns**: <code>[Game](#Game)</code> - Returns a game object represented by gameCode  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| gameCode | <code>String</code> | game code string representing the game |

<a name="Hosts"></a>

## Hosts() ⇒ <code>[Hosts](#Hosts)</code>
Hosts object contains a list of all the Host sockets

**Kind**: global function  
**Extends:** <code>[AbstractContainer](#AbstractContainer)</code>  
**Returns**: <code>[Hosts](#Hosts)</code> - Instance  
<a name="Hosts+type"></a>

### hosts.type
Prototype name

**Kind**: instance property of <code>[Hosts](#Hosts)</code>  
<a name="restore"></a>

## restore(msg) ⇒ <code>[AbstractMessage](#AbstractMessage)</code>
Given json object received from remote endpoint, return a subclass of
AbstractMessage representing this message.  Null if there is an validation
error

**Kind**: global function  
**Returns**: <code>[AbstractMessage](#AbstractMessage)</code> - message object from json data  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>Object</code> &#124; <code>String</code> | JSON from client/server |

<a name="create"></a>

## create(name, args) ⇒ <code>[AbstractMessage](#AbstractMessage)</code>
Create a new message object by the given name, and optionally initialised
with the values in the Object args, and return it.  Null if there was an
error

**Kind**: global function  
**Returns**: <code>[AbstractMessage](#AbstractMessage)</code> - The message  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the message object to create |
| args | <code>Object</code> | Optional initial values to set for this instance |

<a name="updateSocket"></a>

## updateSocket(socket)
Add emitMessage and onMessage methods to object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Socket</code> | The socket object to add the methods to |

<a name="Settings"></a>

## Settings() ⇒ <code>[Settings](#Settings)</code>
Settings object contains configuration options for this game

**Kind**: global function  
**Returns**: <code>[Settings](#Settings)</code> - Instance of Settings  

* [Settings()](#Settings) ⇒ <code>[Settings](#Settings)</code>
    * [.data](#Settings+data)
    * [.type](#Settings+type)
    * [.setName(name)](#Settings+setName)
    * [.getName()](#Settings+getName)
    * [.setTeams(teams)](#Settings+setTeams)
    * [.hasTeams()](#Settings+hasTeams) ⇒ <code>Boolean</code>
    * [.setTimeLimit(time)](#Settings+setTimeLimit)
    * [.getTimeLimit()](#Settings+getTimeLimit) ⇒ <code>Integer</code>
    * [.setNameChange(nameChange)](#Settings+setNameChange)
    * [.getNameChange()](#Settings+getNameChange) ⇒ <code>Boolean</code>

<a name="Settings+data"></a>

### settings.data
Set default options for Settings

**Kind**: instance property of <code>[Settings](#Settings)</code>  
<a name="Settings+type"></a>

### settings.type
Prototype name

**Kind**: instance property of <code>[Settings](#Settings)</code>  
<a name="Settings+setName"></a>

### settings.setName(name)
Set the name for this game

**Kind**: instance method of <code>[Settings](#Settings)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the game |

<a name="Settings+getName"></a>

### settings.getName()
Get the name for this game

**Kind**: instance method of <code>[Settings](#Settings)</code>  
**Access:** public  
<a name="Settings+setTeams"></a>

### settings.setTeams(teams)
Set whether to use teams

**Kind**: instance method of <code>[Settings](#Settings)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| teams | <code>Boolean</code> | Whether to use teams in this game |

<a name="Settings+hasTeams"></a>

### settings.hasTeams() ⇒ <code>Boolean</code>
Does this game have teams

**Kind**: instance method of <code>[Settings](#Settings)</code>  
**Returns**: <code>Boolean</code> - True if has teams, otherwise false  
**Access:** public  
<a name="Settings+setTimeLimit"></a>

### settings.setTimeLimit(time)
Set whether game has a time limit to answer question

**Kind**: instance method of <code>[Settings](#Settings)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>Integer</code> | If null or 0, then no time limit, otherwise specify time in seconds to answer question |

<a name="Settings+getTimeLimit"></a>

### settings.getTimeLimit() ⇒ <code>Integer</code>
Does this game have a time limit to answer question

**Kind**: instance method of <code>[Settings](#Settings)</code>  
**Returns**: <code>Integer</code> - 0 If no time limit, otherwise number of
seconds per question  
**Access:** public  
<a name="Settings+setNameChange"></a>

### settings.setNameChange(nameChange)
Set whether teams or contestants can chnage thier name

**Kind**: instance method of <code>[Settings](#Settings)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| nameChange | <code>Boolean</code> | Whether team or contentant can change thier name |

<a name="Settings+getNameChange"></a>

### settings.getNameChange() ⇒ <code>Boolean</code>
Does this allow teams or contestants to change their name

**Kind**: instance method of <code>[Settings](#Settings)</code>  
**Returns**: <code>Boolean</code> - True if name changing is allowed, otherwise false  
**Access:** public  
<a name="State"></a>

## State() ⇒ <code>[State](#State)</code>
State object contains the running state of this game

**Kind**: global function  
**Returns**: <code>[State](#State)</code> - Instance of Settings  
<a name="State+type"></a>

### state.type
Prototype name

**Kind**: instance property of <code>[State](#State)</code>  
<a name="Team"></a>

## Team() ⇒ <code>[Team](#Team)</code>
Team object contains setting information for this team in a game

**Kind**: global function  
**Returns**: <code>[Team](#Team)</code> - Instance of Settings  
<a name="Team+type"></a>

### team.type
Prototype name

**Kind**: instance property of <code>[Team](#Team)</code>  
<a name="Teams"></a>

## Teams() ⇒ <code>[Teams](#Teams)</code>
Teams object contains a list of all the Team objects

**Kind**: global function  
**Extends:** <code>[AbstractContainer](#AbstractContainer)</code>  
**Returns**: <code>[Teams](#Teams)</code> - Instance of Teams  
<a name="Teams+type"></a>

### teams.type
Prototype name

**Kind**: instance property of <code>[Teams](#Teams)</code>  
