## Modules

<dl>
<dt><a href="#module_GenericObjectFactory">GenericObjectFactory</a></dt>
<dd><p>Generic object factory</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#data">data</a></dt>
<dd><p>Holds the message payload.</p>
</dd>
<dt><a href="#protocol">protocol</a></dt>
<dd><p>Pulls definition from prototype.</p>
</dd>
<dt><a href="#type">type</a></dt>
<dd><p>Pulls definition from prototype.</p>
</dd>
<dt><a href="#schema">schema</a></dt>
<dd><p>Define the abstract message schema</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#AbstractMessage">AbstractMessage()</a></dt>
<dd><p>Abstract message class from which all socket.io message objects should derive.</p>
</dd>
<dt><a href="#BuzzerActionCommandMessage">BuzzerActionCommandMessage()</a> ⇒ <code><a href="#ErrorMessage">ErrorMessage</a></code></dt>
<dd><p>Represents message which is used to convey a buzzer related action command.</p>
</dd>
<dt><a href="#ContestantBuzzerPressMessage">ContestantBuzzerPressMessage()</a> ⇒ <code><a href="#SuccessMessage">SuccessMessage</a></code></dt>
<dd><p>Represents a message to convey a contestant buzzer press.</p>
</dd>
<dt><a href="#ContestantJoinRequestMessage">ContestantJoinRequestMessage()</a> ⇒ <code><a href="#ContestantJoinRequestMessage">ContestantJoinRequestMessage</a></code></dt>
<dd><p>Represent a message which is used to request the joining of a session by a contestant.</p>
</dd>
<dt><a href="#ContestantJoinResponseMessage">ContestantJoinResponseMessage()</a> ⇒ <code><a href="#ContestantJoinResponseMessage">ContestantJoinResponseMessage</a></code></dt>
<dd><p>Represent a message which to response to a @see <a href="#ContestantJoinRequestMessage">ContestantJoinRequestMessage</a>.</p>
</dd>
<dt><a href="#CreateSessionMessage">CreateSessionMessage()</a> ⇒ <code><a href="#CreateSessionMessage">CreateSessionMessage</a></code></dt>
<dd><p>Represents a message which is used to create a new session.</p>
</dd>
<dt><a href="#CreateSessionResponseMessage">CreateSessionResponseMessage()</a> ⇒ <code><a href="#CreateSessionResponseMessage">CreateSessionResponseMessage</a></code></dt>
<dd><p>Represents a message which is used to response to a @see <a href="#CreateSessionMessage">CreateSessionMessage</a> request.</p>
</dd>
<dt><a href="#ErrorMessage">ErrorMessage()</a> ⇒ <code><a href="#ErrorMessage">ErrorMessage</a></code></dt>
<dd><p>Represents message which is use to convey an error state.</p>
</dd>
<dt><a href="#HostSettingsUpdateMessage">HostSettingsUpdateMessage()</a> ⇒ <code><a href="#HostSettingsUpdateMessage">HostSettingsUpdateMessage</a></code></dt>
<dd><p>Represents a message to set the team name.</p>
</dd>
<dt><a href="#HostTeamLeaderSetRequestMessage">HostTeamLeaderSetRequestMessage()</a> ⇒ <code><a href="#HostTeamLeaderSetRequestMessage">HostTeamLeaderSetRequestMessage</a></code></dt>
<dd><p>Represents a message to set the team leader.</p>
</dd>
<dt><a href="#HostTeamNameUpdateRequestMessage">HostTeamNameUpdateRequestMessage()</a> ⇒ <code><a href="#HostTeamNameUpdateRequestMessage">HostTeamNameUpdateRequestMessage</a></code></dt>
<dd><p>Represents a message to set the team name.</p>
</dd>
<dt><a href="#InquireTeamLeaderResponseMessage">InquireTeamLeaderResponseMessage()</a> ⇒ <code><a href="#InquireTeamLeaderResponseMessage">InquireTeamLeaderResponseMessage</a></code></dt>
<dd><p>Represents a message to response to an inquiry about being a team leader.</p>
</dd>
<dt><a href="#ObserverUpdateMessage">ObserverUpdateMessage()</a> ⇒ <code><a href="#ObserverUpdateMessage">ObserverUpdateMessage</a></code></dt>
<dd><p>Represents a message which is use to convey game state update to registered observers.</p>
</dd>
<dt><a href="#RejoinSessionMessage">RejoinSessionMessage()</a> ⇒ <code><a href="#RejoinSessionMessage">RejoinSessionMessage</a></code></dt>
<dd><p>Represents a message which is used to request the rejoining of an existing session.</p>
</dd>
<dt><a href="#RoundWonMessage">RoundWonMessage()</a> ⇒ <code><a href="#ErrorMessage">ErrorMessage</a></code></dt>
<dd><p>Represents message which is use to convey winner information for when a session round is won.</p>
</dd>
<dt><a href="#SessionComplete">SessionComplete()</a> ⇒ <code><a href="#SessionComplete">SessionComplete</a></code></dt>
<dd><p>Represents a message to convey the session is now complete.</p>
</dd>
<dt><a href="#SessionCompleted">SessionCompleted()</a> ⇒ <code><a href="#SessionCompleted">SessionCompleted</a></code></dt>
<dd><p>Represents a message to convey the session is completed.</p>
</dd>
<dt><a href="#SessionInformationRequestMessage">SessionInformationRequestMessage()</a> ⇒ <code><a href="#SessionInformationRequestMessage">SessionInformationRequestMessage</a></code></dt>
<dd><p>Represents a request message to send session information.</p>
</dd>
<dt><a href="#SessionInformationResponseMessage">SessionInformationResponseMessage()</a> ⇒ <code><a href="#SessionInformationResponseMessage">SessionInformationResponseMessage</a></code></dt>
<dd><p>Represents a message which is use to convey the callers session information</p>
</dd>
<dt><a href="#SetTeamNameRequestMessage">SetTeamNameRequestMessage()</a> ⇒ <code><a href="#SetTeamNameRequestMessage">SetTeamNameRequestMessage</a></code></dt>
<dd><p>Represents a message to set the team name.</p>
</dd>
<dt><a href="#SuccessMessage">SuccessMessage()</a> ⇒ <code><a href="#SuccessMessage">SuccessMessage</a></code></dt>
<dd><p>Represents a message to convey a successful operation or request.</p>
</dd>
</dl>

<a name="module_GenericObjectFactory"></a>

## GenericObjectFactory
Generic object factory


* [GenericObjectFactory](#module_GenericObjectFactory)
    * [~GenericObjectFactory](#module_GenericObjectFactory..GenericObjectFactory)
        * [new GenericObjectFactory()](#new_module_GenericObjectFactory..GenericObjectFactory_new)
        * [.type](#module_GenericObjectFactory..GenericObjectFactory+type)
        * [.create()](#module_GenericObjectFactory..GenericObjectFactory+create)

<a name="module_GenericObjectFactory..GenericObjectFactory"></a>

### GenericObjectFactory~GenericObjectFactory
**Kind**: inner class of <code>[GenericObjectFactory](#module_GenericObjectFactory)</code>  
**Access:** public  

* [~GenericObjectFactory](#module_GenericObjectFactory..GenericObjectFactory)
    * [new GenericObjectFactory()](#new_module_GenericObjectFactory..GenericObjectFactory_new)
    * [.type](#module_GenericObjectFactory..GenericObjectFactory+type)
    * [.create()](#module_GenericObjectFactory..GenericObjectFactory+create)

<a name="new_module_GenericObjectFactory..GenericObjectFactory_new"></a>

#### new GenericObjectFactory()
Represents a generic object factory

<a name="module_GenericObjectFactory..GenericObjectFactory+type"></a>

#### genericObjectFactory.type
Prototype name

**Kind**: instance property of <code>[GenericObjectFactory](#module_GenericObjectFactory..GenericObjectFactory)</code>  
<a name="module_GenericObjectFactory..GenericObjectFactory+create"></a>

#### genericObjectFactory.create()
Represents a method which converts a given obj to a generic representation

**Kind**: instance method of <code>[GenericObjectFactory](#module_GenericObjectFactory..GenericObjectFactory)</code>  
<a name="data"></a>

## data
Holds the message payload.

**Kind**: global variable  
<a name="protocol"></a>

## protocol
Pulls definition from prototype.

**Kind**: global variable  
<a name="type"></a>

## type
Pulls definition from prototype.

**Kind**: global variable  
<a name="schema"></a>

## schema
Define the abstract message schema

**Kind**: global variable  
<a name="AbstractMessage"></a>

## *AbstractMessage()*
Abstract message class from which all socket.io message objects should derive.

**Kind**: global abstract function  
**Access:** protected  

* *[AbstractMessage()](#AbstractMessage)*
    * *[.validate()](#AbstractMessage+validate) ⇒ <code>ValidatorResult</code>*
    * *[.isValid()](#AbstractMessage+isValid) ⇒ <code>Boolean</code>*

<a name="AbstractMessage+validate"></a>

### *abstractMessage.validate() ⇒ <code>ValidatorResult</code>*
Validate the data data structure for the instance or if provided
the data object that is passed to this method

**Kind**: instance method of <code>[AbstractMessage](#AbstractMessage)</code>  
**Access:** public  
<a name="AbstractMessage+isValid"></a>

### *abstractMessage.isValid() ⇒ <code>Boolean</code>*
Validate the data data structure for the instance or if provided
the data object that is passed to this method

**Kind**: instance method of <code>[AbstractMessage](#AbstractMessage)</code>  
**Returns**: <code>Boolean</code> - true if valid, otherwise false  
**Access:** public  
<a name="BuzzerActionCommandMessage"></a>

## BuzzerActionCommandMessage() ⇒ <code>[ErrorMessage](#ErrorMessage)</code>
Represents message which is used to convey a buzzer related action command.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="BuzzerActionCommandMessage+type"></a>

### buzzerActionCommandMessage.type
The type of this class.

**Kind**: instance property of <code>[BuzzerActionCommandMessage](#BuzzerActionCommandMessage)</code>  
**Access:** public  
<a name="ContestantBuzzerPressMessage"></a>

## ContestantBuzzerPressMessage() ⇒ <code>[SuccessMessage](#SuccessMessage)</code>
Represents a message to convey a contestant buzzer press.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="ContestantBuzzerPressMessage+type"></a>

### contestantBuzzerPressMessage.type
The type of this class.

**Kind**: instance property of <code>[ContestantBuzzerPressMessage](#ContestantBuzzerPressMessage)</code>  
**Access:** public  
<a name="ContestantJoinRequestMessage"></a>

## ContestantJoinRequestMessage() ⇒ <code>[ContestantJoinRequestMessage](#ContestantJoinRequestMessage)</code>
Represent a message which is used to request the joining of a session by a contestant.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="ContestantJoinRequestMessage+type"></a>

### contestantJoinRequestMessage.type
The type of this class

**Kind**: instance property of <code>[ContestantJoinRequestMessage](#ContestantJoinRequestMessage)</code>  
**Access:** public  
<a name="ContestantJoinResponseMessage"></a>

## ContestantJoinResponseMessage() ⇒ <code>[ContestantJoinResponseMessage](#ContestantJoinResponseMessage)</code>
Represent a message which to response to a @see [ContestantJoinRequestMessage](#ContestantJoinRequestMessage).

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="ContestantJoinResponseMessage+type"></a>

### contestantJoinResponseMessage.type
The type of this class

**Kind**: instance property of <code>[ContestantJoinResponseMessage](#ContestantJoinResponseMessage)</code>  
**Access:** public  
<a name="CreateSessionMessage"></a>

## CreateSessionMessage() ⇒ <code>[CreateSessionMessage](#CreateSessionMessage)</code>
Represents a message which is used to create a new session.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  

* [CreateSessionMessage()](#CreateSessionMessage) ⇒ <code>[CreateSessionMessage](#CreateSessionMessage)</code>
    * [.type](#CreateSessionMessage+type)
    * [.restore()](#CreateSessionMessage+restore)

<a name="CreateSessionMessage+type"></a>

### createSessionMessage.type
The type of this class.

**Kind**: instance property of <code>[CreateSessionMessage](#CreateSessionMessage)</code>  
**Access:** public  
<a name="CreateSessionMessage+restore"></a>

### createSessionMessage.restore()
Defines a custom restore routine that @see [MessageFactory](MessageFactory) will
call, when present, when restoring a message.

**Kind**: instance method of <code>[CreateSessionMessage](#CreateSessionMessage)</code>  
**Access:** public  
<a name="CreateSessionResponseMessage"></a>

## CreateSessionResponseMessage() ⇒ <code>[CreateSessionResponseMessage](#CreateSessionResponseMessage)</code>
Represents a message which is used to response to a @see [CreateSessionMessage](#CreateSessionMessage) request.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="CreateSessionResponseMessage+type"></a>

### createSessionResponseMessage.type
The type of this class.

**Kind**: instance property of <code>[CreateSessionResponseMessage](#CreateSessionResponseMessage)</code>  
**Access:** public  
<a name="ErrorMessage"></a>

## ErrorMessage() ⇒ <code>[ErrorMessage](#ErrorMessage)</code>
Represents message which is use to convey an error state.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="ErrorMessage+type"></a>

### errorMessage.type
The type of this class.

**Kind**: instance property of <code>[ErrorMessage](#ErrorMessage)</code>  
**Access:** public  
<a name="HostSettingsUpdateMessage"></a>

## HostSettingsUpdateMessage() ⇒ <code>[HostSettingsUpdateMessage](#HostSettingsUpdateMessage)</code>
Represents a message to set the team name.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="HostSettingsUpdateMessage+type"></a>

### hostSettingsUpdateMessage.type
The type of this class.

**Kind**: instance property of <code>[HostSettingsUpdateMessage](#HostSettingsUpdateMessage)</code>  
**Access:** public  
<a name="HostTeamLeaderSetRequestMessage"></a>

## HostTeamLeaderSetRequestMessage() ⇒ <code>[HostTeamLeaderSetRequestMessage](#HostTeamLeaderSetRequestMessage)</code>
Represents a message to set the team leader.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="HostTeamLeaderSetRequestMessage+type"></a>

### hostTeamLeaderSetRequestMessage.type
The type of this class.

**Kind**: instance property of <code>[HostTeamLeaderSetRequestMessage](#HostTeamLeaderSetRequestMessage)</code>  
**Access:** public  
<a name="HostTeamNameUpdateRequestMessage"></a>

## HostTeamNameUpdateRequestMessage() ⇒ <code>[HostTeamNameUpdateRequestMessage](#HostTeamNameUpdateRequestMessage)</code>
Represents a message to set the team name.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="HostTeamNameUpdateRequestMessage+type"></a>

### hostTeamNameUpdateRequestMessage.type
The type of this class.

**Kind**: instance property of <code>[HostTeamNameUpdateRequestMessage](#HostTeamNameUpdateRequestMessage)</code>  
**Access:** public  
<a name="InquireTeamLeaderResponseMessage"></a>

## InquireTeamLeaderResponseMessage() ⇒ <code>[InquireTeamLeaderResponseMessage](#InquireTeamLeaderResponseMessage)</code>
Represents a message to response to an inquiry about being a team leader.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="InquireTeamLeaderResponseMessage+type"></a>

### inquireTeamLeaderResponseMessage.type
The type of this class.

**Kind**: instance property of <code>[InquireTeamLeaderResponseMessage](#InquireTeamLeaderResponseMessage)</code>  
**Access:** public  
<a name="ObserverUpdateMessage"></a>

## ObserverUpdateMessage() ⇒ <code>[ObserverUpdateMessage](#ObserverUpdateMessage)</code>
Represents a message which is use to convey game state update to registered observers.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  

* [ObserverUpdateMessage()](#ObserverUpdateMessage) ⇒ <code>[ObserverUpdateMessage](#ObserverUpdateMessage)</code>
    * [.type](#ObserverUpdateMessage+type)
    * [.populate(the)](#ObserverUpdateMessage+populate)

<a name="ObserverUpdateMessage+type"></a>

### observerUpdateMessage.type
The type of this class.

**Kind**: instance property of <code>[ObserverUpdateMessage](#ObserverUpdateMessage)</code>  
**Access:** public  
<a name="ObserverUpdateMessage+populate"></a>

### observerUpdateMessage.populate(the)
Defines a method which prepares the session for sending. This involves converting the
session to a generic object representation and the removal of sensitive data.

**Kind**: instance method of <code>[ObserverUpdateMessage](#ObserverUpdateMessage)</code>  
**Access:** public  
**Throw**: when param session equates to false or is an incorrect type.  

| Param | Type | Description |
| --- | --- | --- |
| the | <code>Session</code> | session. |

<a name="RejoinSessionMessage"></a>

## RejoinSessionMessage() ⇒ <code>[RejoinSessionMessage](#RejoinSessionMessage)</code>
Represents a message which is used to request the rejoining of an existing session.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
**Note**: Can be used to initiate the connecting of observers.  
<a name="RejoinSessionMessage+type"></a>

### rejoinSessionMessage.type
The type of this class.

**Kind**: instance property of <code>[RejoinSessionMessage](#RejoinSessionMessage)</code>  
**Access:** public  
<a name="RoundWonMessage"></a>

## RoundWonMessage() ⇒ <code>[ErrorMessage](#ErrorMessage)</code>
Represents message which is use to convey winner information for when a session round is won.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="RoundWonMessage+type"></a>

### roundWonMessage.type
The type of this class.

**Kind**: instance property of <code>[RoundWonMessage](#RoundWonMessage)</code>  
**Access:** public  
<a name="SessionComplete"></a>

## SessionComplete() ⇒ <code>[SessionComplete](#SessionComplete)</code>
Represents a message to convey the session is now complete.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="SessionComplete+type"></a>

### sessionComplete.type
The type of this class.

**Kind**: instance property of <code>[SessionComplete](#SessionComplete)</code>  
**Access:** public  
<a name="SessionCompleted"></a>

## SessionCompleted() ⇒ <code>[SessionCompleted](#SessionCompleted)</code>
Represents a message to convey the session is completed.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="SessionCompleted+type"></a>

### sessionCompleted.type
The type of this class.

**Kind**: instance property of <code>[SessionCompleted](#SessionCompleted)</code>  
**Access:** public  
<a name="SessionInformationRequestMessage"></a>

## SessionInformationRequestMessage() ⇒ <code>[SessionInformationRequestMessage](#SessionInformationRequestMessage)</code>
Represents a request message to send session information.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="SessionInformationRequestMessage+type"></a>

### sessionInformationRequestMessage.type
The type of this class.

**Kind**: instance property of <code>[SessionInformationRequestMessage](#SessionInformationRequestMessage)</code>  
**Access:** public  
<a name="SessionInformationResponseMessage"></a>

## SessionInformationResponseMessage() ⇒ <code>[SessionInformationResponseMessage](#SessionInformationResponseMessage)</code>
Represents a message which is use to convey the callers session information

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  

* [SessionInformationResponseMessage()](#SessionInformationResponseMessage) ⇒ <code>[SessionInformationResponseMessage](#SessionInformationResponseMessage)</code>
    * [.type](#SessionInformationResponseMessage+type)
    * [.populate(the)](#SessionInformationResponseMessage+populate)

<a name="SessionInformationResponseMessage+type"></a>

### sessionInformationResponseMessage.type
The type of this class.

**Kind**: instance property of <code>[SessionInformationResponseMessage](#SessionInformationResponseMessage)</code>  
**Access:** public  
<a name="SessionInformationResponseMessage+populate"></a>

### sessionInformationResponseMessage.populate(the)
Defines a method which prepares and populates the info object.

**Kind**: instance method of <code>[SessionInformationResponseMessage](#SessionInformationResponseMessage)</code>  
**Access:** public  
**Throw**: when param session equates to false or is an incorrect type.  

| Param | Type | Description |
| --- | --- | --- |
| the | <code>Session</code> | session. |

<a name="SetTeamNameRequestMessage"></a>

## SetTeamNameRequestMessage() ⇒ <code>[SetTeamNameRequestMessage](#SetTeamNameRequestMessage)</code>
Represents a message to set the team name.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="SetTeamNameRequestMessage+type"></a>

### setTeamNameRequestMessage.type
The type of this class.

**Kind**: instance property of <code>[SetTeamNameRequestMessage](#SetTeamNameRequestMessage)</code>  
**Access:** public  
<a name="SuccessMessage"></a>

## SuccessMessage() ⇒ <code>[SuccessMessage](#SuccessMessage)</code>
Represents a message to convey a successful operation or request.

**Kind**: global function  
**Extends:** <code>[AbstractMessage](#AbstractMessage)</code>  
<a name="SuccessMessage+type"></a>

### successMessage.type
The type of this class.

**Kind**: instance property of <code>[SuccessMessage](#SuccessMessage)</code>  
**Access:** public  
