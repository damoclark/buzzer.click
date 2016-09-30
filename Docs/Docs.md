## Modules

<dl>
<dt><a href="#module_AddContestantResponse">AddContestantResponse</a></dt>
<dd><p>Add contestant response module.</p>
</dd>
<dt><a href="#module_constants">constants</a></dt>
<dd><p>Constants module.</p>
</dd>
<dt><a href="#module_contestant">contestant</a></dt>
<dd><p>Contestant module.</p>
</dd>
<dt><a href="#module_host">host</a></dt>
<dd><p>Host module.</p>
</dd>
<dt><a href="#module_IdentifierUtility">IdentifierUtility</a></dt>
<dd><p>Identifier utility module.</p>
</dd>
<dt><a href="#module_messageFactory">messageFactory</a></dt>
<dd><p>Message factory module.</p>
</dd>
<dt><a href="#module_observer">observer</a></dt>
<dd><p>Observer module.</p>
</dd>
<dt><a href="#module_ParamCheck">ParamCheck</a></dt>
<dd><p>Param check module.</p>
</dd>
<dt><a href="#module_participant">participant</a></dt>
<dd><p>Participant module.</p>
</dd>
<dt><a href="#module_participants">participants</a></dt>
<dd><p>Participants module.</p>
</dd>
<dt><a href="#module_JS pollyfills">JS pollyfills</a></dt>
<dd><p>JS pollyfills module</p>
</dd>
<dt><a href="#module_room name factory">room name factory</a></dt>
<dd><p>RoomNameFactory module.</p>
</dd>
<dt><a href="#module_session">session</a></dt>
<dd><p>Session module.</p>
</dd>
<dt><a href="#module_sessions">sessions</a></dt>
<dd><p>Sessions module.</p>
</dd>
<dt><a href="#module_settings">settings</a></dt>
<dd><p>Settings module.</p>
</dd>
<dt><a href="#module_team">team</a></dt>
<dd><p>Team module.</p>
</dd>
<dt><a href="#module_team factory">team factory</a></dt>
<dd><p>TeamFactory module.</p>
</dd>
<dt><a href="#module_teams">teams</a></dt>
<dd><p>Teams module.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#socketIo">socketIo</a></dt>
<dd><p>This is the server for buzzer.click</p>
</dd>
</dl>

<a name="module_AddContestantResponse"></a>

## AddContestantResponse
Add contestant response module.


* [AddContestantResponse](#module_AddContestantResponse)
    * [~AddContestantResponse](#module_AddContestantResponse..AddContestantResponse)
        * [new AddContestantResponse()](#new_module_AddContestantResponse..AddContestantResponse_new)
        * [.type](#module_AddContestantResponse..AddContestantResponse+type)
        * [.setSuccessful()](#module_AddContestantResponse..AddContestantResponse+setSuccessful)
        * [.setNotSuccessful(String)](#module_AddContestantResponse..AddContestantResponse+setNotSuccessful)

<a name="module_AddContestantResponse..AddContestantResponse"></a>

### AddContestantResponse~AddContestantResponse
**Kind**: inner class of <code>[AddContestantResponse](#module_AddContestantResponse)</code>  
**Access:** public  

* [~AddContestantResponse](#module_AddContestantResponse..AddContestantResponse)
    * [new AddContestantResponse()](#new_module_AddContestantResponse..AddContestantResponse_new)
    * [.type](#module_AddContestantResponse..AddContestantResponse+type)
    * [.setSuccessful()](#module_AddContestantResponse..AddContestantResponse+setSuccessful)
    * [.setNotSuccessful(String)](#module_AddContestantResponse..AddContestantResponse+setNotSuccessful)

<a name="new_module_AddContestantResponse..AddContestantResponse_new"></a>

#### new AddContestantResponse()
Represents an add contestant response.

<a name="module_AddContestantResponse..AddContestantResponse+type"></a>

#### addContestantResponse.type
Prototype name

**Kind**: instance property of <code>[AddContestantResponse](#module_AddContestantResponse..AddContestantResponse)</code>  
<a name="module_AddContestantResponse..AddContestantResponse+setSuccessful"></a>

#### addContestantResponse.setSuccessful()
Defines a method to set the response as successful.

**Kind**: instance method of <code>[AddContestantResponse](#module_AddContestantResponse..AddContestantResponse)</code>  
**Access:** public  
**See**: {@Link wasSuccessful}  
<a name="module_AddContestantResponse..AddContestantResponse+setNotSuccessful"></a>

#### addContestantResponse.setNotSuccessful(String)
Defines a method to set the response as not successful.

**Kind**: instance method of <code>[AddContestantResponse](#module_AddContestantResponse..AddContestantResponse)</code>  
**Access:** public  
**See{@link**: errorMessage}  
**See{@link**: wasSuccessful}  
**Throw**: when param errorMessage equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| String | <code>errorMessage</code> | 

<a name="module_constants"></a>

## constants
Constants module.


* [constants](#module_constants)
    * [~Constants](#module_constants..Constants)
        * [new Constants()](#new_module_constants..Constants_new)
        * [.gameStates](#module_constants..Constants+gameStates)
            * [.PENDING](#module_constants..Constants+gameStates.PENDING)
            * [.BUZZER_LOCK](#module_constants..Constants+gameStates.BUZZER_LOCK)
            * [.READY](#module_constants..Constants+gameStates.READY)
            * [.COMPLETED](#module_constants..Constants+gameStates.COMPLETED)
        * [.teamLeaderSelectionMethod](#module_constants..Constants+teamLeaderSelectionMethod)
            * [.RANDOM](#module_constants..Constants+teamLeaderSelectionMethod.RANDOM)
            * [.PLAYER_CHOICE](#module_constants..Constants+teamLeaderSelectionMethod.PLAYER_CHOICE)
            * [.all](#module_constants..Constants+teamLeaderSelectionMethod.all)
        * [.teamSelectionMethod](#module_constants..Constants+teamSelectionMethod)
            * [.SMALLEST_TEAM](#module_constants..Constants+teamSelectionMethod.SMALLEST_TEAM)
            * [.PLAYER_CHOICE](#module_constants..Constants+teamSelectionMethod.PLAYER_CHOICE)
            * [.all](#module_constants..Constants+teamSelectionMethod.all)
        * [.teamNameEdit](#module_constants..Constants+teamNameEdit)
            * [.AUTO](#module_constants..Constants+teamNameEdit.AUTO)
            * [.ALLOW](#module_constants..Constants+teamNameEdit.ALLOW)
            * [.MANUAL](#module_constants..Constants+teamNameEdit.MANUAL)
            * [.all](#module_constants..Constants+teamNameEdit.all)
        * [.buzzerActionCommands](#module_constants..Constants+buzzerActionCommands)
            * [.ACCEPT](#module_constants..Constants+buzzerActionCommands.ACCEPT)
            * [.REJECT](#module_constants..Constants+buzzerActionCommands.REJECT)
            * [.RESET](#module_constants..Constants+buzzerActionCommands.RESET)
            * [.DISABLE](#module_constants..Constants+buzzerActionCommands.DISABLE)
            * [.ENABLE](#module_constants..Constants+buzzerActionCommands.ENABLE)
            * [.all](#module_constants..Constants+buzzerActionCommands.all)
        * [.socketMessageNames](#module_constants..Constants+socketMessageNames)
            * [.DISCONNECT](#module_constants..Constants+socketMessageNames.DISCONNECT)
            * [.BUZZER_ACTION_COMMAND](#module_constants..Constants+socketMessageNames.BUZZER_ACTION_COMMAND)
            * [.CONTESTANT_BUZZER_PRESS](#module_constants..Constants+socketMessageNames.CONTESTANT_BUZZER_PRESS)
            * [.CONTESTANT_JOIN_REQUEST](#module_constants..Constants+socketMessageNames.CONTESTANT_JOIN_REQUEST)
            * [.CONTESTANT_JOIN_RESPONSE](#module_constants..Constants+socketMessageNames.CONTESTANT_JOIN_RESPONSE)
            * [.CREATE_SESSION](#module_constants..Constants+socketMessageNames.CREATE_SESSION)
            * [.CREATE_SESSION_RESPONSE](#module_constants..Constants+socketMessageNames.CREATE_SESSION_RESPONSE)
            * [.ERROR](#module_constants..Constants+socketMessageNames.ERROR)
            * [.HOST_SETTINGS_UPDATE_MESSAGE](#module_constants..Constants+socketMessageNames.HOST_SETTINGS_UPDATE_MESSAGE)
            * [.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE)
            * [.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE)
            * [.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE](#module_constants..Constants+socketMessageNames.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE)
            * [.OBSERVER_UPDATE](#module_constants..Constants+socketMessageNames.OBSERVER_UPDATE)
            * [.REJOIN_SESSION](#module_constants..Constants+socketMessageNames.REJOIN_SESSION)
            * [.ROUND_WON_MESSAGE](#module_constants..Constants+socketMessageNames.ROUND_WON_MESSAGE)
            * [.SESSION_COMPLETE](#module_constants..Constants+socketMessageNames.SESSION_COMPLETE)
            * [.SESSION_COMPLETED](#module_constants..Constants+socketMessageNames.SESSION_COMPLETED)
            * [.SESSION_INFORMATION_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.SESSION_INFORMATION_REQUEST_MESSAGE)
            * [.SESSION_INFORMATION_RESPONSE_MESSAGE](#module_constants..Constants+socketMessageNames.SESSION_INFORMATION_RESPONSE_MESSAGE)
            * [.SET_TEAM_NAME_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.SET_TEAM_NAME_REQUEST_MESSAGE)
            * [.SUCCESS](#module_constants..Constants+socketMessageNames.SUCCESS)
        * [.rejoinAs](#module_constants..Constants+rejoinAs)
            * [.HOST](#module_constants..Constants+rejoinAs.HOST)
            * [.CONTESTANT](#module_constants..Constants+rejoinAs.CONTESTANT)
            * [.OBSERVER](#module_constants..Constants+rejoinAs.OBSERVER)
        * [.messages](#module_constants..Constants+messages)
            * [.MAXIMUM_SESSION_SIZED_REACHED](#module_constants..Constants+messages.MAXIMUM_SESSION_SIZED_REACHED)
            * [.USERNAME_TAKEN](#module_constants..Constants+messages.USERNAME_TAKEN)
            * [.COULD_NOT_COMPLETE_SESSION_NOT_HOST](#module_constants..Constants+messages.COULD_NOT_COMPLETE_SESSION_NOT_HOST)
            * [.COULD_NOT_ACCEPT_BUZZER_PRESS_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_ACCEPT_BUZZER_PRESS_NOT_CONTESTANT)
            * [.COULD_NOT_ACCEPT_REQUEST_NOT_HOST](#module_constants..Constants+messages.COULD_NOT_ACCEPT_REQUEST_NOT_HOST)
            * [.COULD_NOT_PROCESS_REQUEST_GAME_STATE_WILL_NOT_ALLOW](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_GAME_STATE_WILL_NOT_ALLOW)
            * [.BUZZER_PRESS_NOT_ACCEPTED](#module_constants..Constants+messages.BUZZER_PRESS_NOT_ACCEPTED)
            * [.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED](#module_constants..Constants+messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED)
            * [.SESSION_COULD_NOT_BE_FOUND](#module_constants..Constants+messages.SESSION_COULD_NOT_BE_FOUND)
            * [.COULD_NOT_REJOIN_NOT_HOST](#module_constants..Constants+messages.COULD_NOT_REJOIN_NOT_HOST)
            * [.COULD_NOT_REJOIN_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_REJOIN_NOT_CONTESTANT)
            * [.COULD_NOT_REJOIN_UNKNOWN](#module_constants..Constants+messages.COULD_NOT_REJOIN_UNKNOWN)
            * [.TEAMS_ARE_FULL](#module_constants..Constants+messages.TEAMS_ARE_FULL)
            * [.USERNAME_CONTAINS_PROFANITY](#module_constants..Constants+messages.USERNAME_CONTAINS_PROFANITY)
            * [.USERNAME_IS_REQUIRED](#module_constants..Constants+messages.USERNAME_IS_REQUIRED)
            * [.COULD_NOT_ACCEPT_TEAM_LEADER_RESPONSE_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_LEADER_RESPONSE_NOT_CONTESTANT)
            * [.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_FULFILLED](#module_constants..Constants+messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_FULFILLED)
            * [.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_NOT_CONTESTANT)
            * [.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER)
            * [.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_AS_TEAM_NAME_EMPTY](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_AS_TEAM_NAME_EMPTY)
            * [.COULD_NOT_ACCEPT_TEAM_NAME_CONTAINS_PROFANITY](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_CONTAINS_PROFANITY)
            * [.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE)
            * [.COULD_NOT_ACCEPT_TEAM_NAME_SETTINGS_NOT_ALLOW](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_SETTINGS_NOT_ALLOW)
            * [.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND)
            * [.COULD_NOT_PROCESS_REQUEST_CONTESTANT_NOT_FOUND](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_NOT_FOUND)
            * [.COULD_NOT_PROCESS_REQUEST_CONTESTANT_OR_HOST_NOT_FOUND](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_OR_HOST_NOT_FOUND)
            * [.TEAM_SIZE_MUST_BE_GREATER_THAN_ZERO](#module_constants..Constants+messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ZERO)
            * [.SESSION_NAME_REQUIRED](#module_constants..Constants+messages.SESSION_NAME_REQUIRED)
            * [.MAX_TEAMS_MUST_BE_GREATER_THAN_ZERO](#module_constants..Constants+messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ZERO)
            * [.TEAM_NAMES_MUST_BE_UNIQUE](#module_constants..Constants+messages.TEAM_NAMES_MUST_BE_UNIQUE)
            * [.TEAMS_OR_TEAM_SIZE_UNLIMITED_NOT_BOTH](#module_constants..Constants+messages.TEAMS_OR_TEAM_SIZE_UNLIMITED_NOT_BOTH)
            * [.TEAM_SIZE_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS](#module_constants..Constants+messages.TEAM_SIZE_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS)
            * [.MAX_TEAMS_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS](#module_constants..Constants+messages.MAX_TEAMS_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS)
            * [.TEAM_NAMES_MUST_NOT_BE_USED_WHEN_NOT_USING_TEAMS](#module_constants..Constants+messages.TEAM_NAMES_MUST_NOT_BE_USED_WHEN_NOT_USING_TEAMS)
            * [.MAX_CONTESTANTS_MUST_BE_ZERO_WHEN_USING_TEAMS](#module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_ZERO_WHEN_USING_TEAMS)
            * [.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ZERO](#module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ZERO)
            * [.PLAYER_CANNOT_CHOICE_OWN_TEAM_WHEN_USING_UNLIMITED_TEAMS](#module_constants..Constants+messages.PLAYER_CANNOT_CHOICE_OWN_TEAM_WHEN_USING_UNLIMITED_TEAMS)
            * [.CONTESTANT_MUST_CHOOSE_TEAM](#module_constants..Constants+messages.CONTESTANT_MUST_CHOOSE_TEAM)
            * [.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ALREADY_CONNECTED](#module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ALREADY_CONNECTED)
            * [.TEAM_SIZE_MUST_BE_GREATER_THAN_ALREADY_SET](#module_constants..Constants+messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ALREADY_SET)
            * [.MAX_TEAMS_MUST_BE_GREATER_THAN_ALREADY_SET](#module_constants..Constants+messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ALREADY_SET)
            * [.MAX_TEAMS_CANNOT_BE_CHANGED_WHEN_PLAYER_CHOICE](#module_constants..Constants+messages.MAX_TEAMS_CANNOT_BE_CHANGED_WHEN_PLAYER_CHOICE)
        * [.UNLIMITED](#module_constants..Constants+UNLIMITED)

<a name="module_constants..Constants"></a>

### constants~Constants
**Kind**: inner class of <code>[constants](#module_constants)</code>  
**Access:** public  

* [~Constants](#module_constants..Constants)
    * [new Constants()](#new_module_constants..Constants_new)
    * [.gameStates](#module_constants..Constants+gameStates)
        * [.PENDING](#module_constants..Constants+gameStates.PENDING)
        * [.BUZZER_LOCK](#module_constants..Constants+gameStates.BUZZER_LOCK)
        * [.READY](#module_constants..Constants+gameStates.READY)
        * [.COMPLETED](#module_constants..Constants+gameStates.COMPLETED)
    * [.teamLeaderSelectionMethod](#module_constants..Constants+teamLeaderSelectionMethod)
        * [.RANDOM](#module_constants..Constants+teamLeaderSelectionMethod.RANDOM)
        * [.PLAYER_CHOICE](#module_constants..Constants+teamLeaderSelectionMethod.PLAYER_CHOICE)
        * [.all](#module_constants..Constants+teamLeaderSelectionMethod.all)
    * [.teamSelectionMethod](#module_constants..Constants+teamSelectionMethod)
        * [.SMALLEST_TEAM](#module_constants..Constants+teamSelectionMethod.SMALLEST_TEAM)
        * [.PLAYER_CHOICE](#module_constants..Constants+teamSelectionMethod.PLAYER_CHOICE)
        * [.all](#module_constants..Constants+teamSelectionMethod.all)
    * [.teamNameEdit](#module_constants..Constants+teamNameEdit)
        * [.AUTO](#module_constants..Constants+teamNameEdit.AUTO)
        * [.ALLOW](#module_constants..Constants+teamNameEdit.ALLOW)
        * [.MANUAL](#module_constants..Constants+teamNameEdit.MANUAL)
        * [.all](#module_constants..Constants+teamNameEdit.all)
    * [.buzzerActionCommands](#module_constants..Constants+buzzerActionCommands)
        * [.ACCEPT](#module_constants..Constants+buzzerActionCommands.ACCEPT)
        * [.REJECT](#module_constants..Constants+buzzerActionCommands.REJECT)
        * [.RESET](#module_constants..Constants+buzzerActionCommands.RESET)
        * [.DISABLE](#module_constants..Constants+buzzerActionCommands.DISABLE)
        * [.ENABLE](#module_constants..Constants+buzzerActionCommands.ENABLE)
        * [.all](#module_constants..Constants+buzzerActionCommands.all)
    * [.socketMessageNames](#module_constants..Constants+socketMessageNames)
        * [.DISCONNECT](#module_constants..Constants+socketMessageNames.DISCONNECT)
        * [.BUZZER_ACTION_COMMAND](#module_constants..Constants+socketMessageNames.BUZZER_ACTION_COMMAND)
        * [.CONTESTANT_BUZZER_PRESS](#module_constants..Constants+socketMessageNames.CONTESTANT_BUZZER_PRESS)
        * [.CONTESTANT_JOIN_REQUEST](#module_constants..Constants+socketMessageNames.CONTESTANT_JOIN_REQUEST)
        * [.CONTESTANT_JOIN_RESPONSE](#module_constants..Constants+socketMessageNames.CONTESTANT_JOIN_RESPONSE)
        * [.CREATE_SESSION](#module_constants..Constants+socketMessageNames.CREATE_SESSION)
        * [.CREATE_SESSION_RESPONSE](#module_constants..Constants+socketMessageNames.CREATE_SESSION_RESPONSE)
        * [.ERROR](#module_constants..Constants+socketMessageNames.ERROR)
        * [.HOST_SETTINGS_UPDATE_MESSAGE](#module_constants..Constants+socketMessageNames.HOST_SETTINGS_UPDATE_MESSAGE)
        * [.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE)
        * [.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE)
        * [.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE](#module_constants..Constants+socketMessageNames.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE)
        * [.OBSERVER_UPDATE](#module_constants..Constants+socketMessageNames.OBSERVER_UPDATE)
        * [.REJOIN_SESSION](#module_constants..Constants+socketMessageNames.REJOIN_SESSION)
        * [.ROUND_WON_MESSAGE](#module_constants..Constants+socketMessageNames.ROUND_WON_MESSAGE)
        * [.SESSION_COMPLETE](#module_constants..Constants+socketMessageNames.SESSION_COMPLETE)
        * [.SESSION_COMPLETED](#module_constants..Constants+socketMessageNames.SESSION_COMPLETED)
        * [.SESSION_INFORMATION_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.SESSION_INFORMATION_REQUEST_MESSAGE)
        * [.SESSION_INFORMATION_RESPONSE_MESSAGE](#module_constants..Constants+socketMessageNames.SESSION_INFORMATION_RESPONSE_MESSAGE)
        * [.SET_TEAM_NAME_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.SET_TEAM_NAME_REQUEST_MESSAGE)
        * [.SUCCESS](#module_constants..Constants+socketMessageNames.SUCCESS)
    * [.rejoinAs](#module_constants..Constants+rejoinAs)
        * [.HOST](#module_constants..Constants+rejoinAs.HOST)
        * [.CONTESTANT](#module_constants..Constants+rejoinAs.CONTESTANT)
        * [.OBSERVER](#module_constants..Constants+rejoinAs.OBSERVER)
    * [.messages](#module_constants..Constants+messages)
        * [.MAXIMUM_SESSION_SIZED_REACHED](#module_constants..Constants+messages.MAXIMUM_SESSION_SIZED_REACHED)
        * [.USERNAME_TAKEN](#module_constants..Constants+messages.USERNAME_TAKEN)
        * [.COULD_NOT_COMPLETE_SESSION_NOT_HOST](#module_constants..Constants+messages.COULD_NOT_COMPLETE_SESSION_NOT_HOST)
        * [.COULD_NOT_ACCEPT_BUZZER_PRESS_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_ACCEPT_BUZZER_PRESS_NOT_CONTESTANT)
        * [.COULD_NOT_ACCEPT_REQUEST_NOT_HOST](#module_constants..Constants+messages.COULD_NOT_ACCEPT_REQUEST_NOT_HOST)
        * [.COULD_NOT_PROCESS_REQUEST_GAME_STATE_WILL_NOT_ALLOW](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_GAME_STATE_WILL_NOT_ALLOW)
        * [.BUZZER_PRESS_NOT_ACCEPTED](#module_constants..Constants+messages.BUZZER_PRESS_NOT_ACCEPTED)
        * [.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED](#module_constants..Constants+messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED)
        * [.SESSION_COULD_NOT_BE_FOUND](#module_constants..Constants+messages.SESSION_COULD_NOT_BE_FOUND)
        * [.COULD_NOT_REJOIN_NOT_HOST](#module_constants..Constants+messages.COULD_NOT_REJOIN_NOT_HOST)
        * [.COULD_NOT_REJOIN_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_REJOIN_NOT_CONTESTANT)
        * [.COULD_NOT_REJOIN_UNKNOWN](#module_constants..Constants+messages.COULD_NOT_REJOIN_UNKNOWN)
        * [.TEAMS_ARE_FULL](#module_constants..Constants+messages.TEAMS_ARE_FULL)
        * [.USERNAME_CONTAINS_PROFANITY](#module_constants..Constants+messages.USERNAME_CONTAINS_PROFANITY)
        * [.USERNAME_IS_REQUIRED](#module_constants..Constants+messages.USERNAME_IS_REQUIRED)
        * [.COULD_NOT_ACCEPT_TEAM_LEADER_RESPONSE_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_LEADER_RESPONSE_NOT_CONTESTANT)
        * [.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_FULFILLED](#module_constants..Constants+messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_FULFILLED)
        * [.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_NOT_CONTESTANT)
        * [.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER)
        * [.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_AS_TEAM_NAME_EMPTY](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_AS_TEAM_NAME_EMPTY)
        * [.COULD_NOT_ACCEPT_TEAM_NAME_CONTAINS_PROFANITY](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_CONTAINS_PROFANITY)
        * [.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE)
        * [.COULD_NOT_ACCEPT_TEAM_NAME_SETTINGS_NOT_ALLOW](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_SETTINGS_NOT_ALLOW)
        * [.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND)
        * [.COULD_NOT_PROCESS_REQUEST_CONTESTANT_NOT_FOUND](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_NOT_FOUND)
        * [.COULD_NOT_PROCESS_REQUEST_CONTESTANT_OR_HOST_NOT_FOUND](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_OR_HOST_NOT_FOUND)
        * [.TEAM_SIZE_MUST_BE_GREATER_THAN_ZERO](#module_constants..Constants+messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ZERO)
        * [.SESSION_NAME_REQUIRED](#module_constants..Constants+messages.SESSION_NAME_REQUIRED)
        * [.MAX_TEAMS_MUST_BE_GREATER_THAN_ZERO](#module_constants..Constants+messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ZERO)
        * [.TEAM_NAMES_MUST_BE_UNIQUE](#module_constants..Constants+messages.TEAM_NAMES_MUST_BE_UNIQUE)
        * [.TEAMS_OR_TEAM_SIZE_UNLIMITED_NOT_BOTH](#module_constants..Constants+messages.TEAMS_OR_TEAM_SIZE_UNLIMITED_NOT_BOTH)
        * [.TEAM_SIZE_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS](#module_constants..Constants+messages.TEAM_SIZE_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS)
        * [.MAX_TEAMS_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS](#module_constants..Constants+messages.MAX_TEAMS_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS)
        * [.TEAM_NAMES_MUST_NOT_BE_USED_WHEN_NOT_USING_TEAMS](#module_constants..Constants+messages.TEAM_NAMES_MUST_NOT_BE_USED_WHEN_NOT_USING_TEAMS)
        * [.MAX_CONTESTANTS_MUST_BE_ZERO_WHEN_USING_TEAMS](#module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_ZERO_WHEN_USING_TEAMS)
        * [.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ZERO](#module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ZERO)
        * [.PLAYER_CANNOT_CHOICE_OWN_TEAM_WHEN_USING_UNLIMITED_TEAMS](#module_constants..Constants+messages.PLAYER_CANNOT_CHOICE_OWN_TEAM_WHEN_USING_UNLIMITED_TEAMS)
        * [.CONTESTANT_MUST_CHOOSE_TEAM](#module_constants..Constants+messages.CONTESTANT_MUST_CHOOSE_TEAM)
        * [.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ALREADY_CONNECTED](#module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ALREADY_CONNECTED)
        * [.TEAM_SIZE_MUST_BE_GREATER_THAN_ALREADY_SET](#module_constants..Constants+messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ALREADY_SET)
        * [.MAX_TEAMS_MUST_BE_GREATER_THAN_ALREADY_SET](#module_constants..Constants+messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ALREADY_SET)
        * [.MAX_TEAMS_CANNOT_BE_CHANGED_WHEN_PLAYER_CHOICE](#module_constants..Constants+messages.MAX_TEAMS_CANNOT_BE_CHANGED_WHEN_PLAYER_CHOICE)
    * [.UNLIMITED](#module_constants..Constants+UNLIMITED)

<a name="new_module_constants..Constants_new"></a>

#### new Constants()
Represents a singleton object that holds constants defined for use
within the application.

<a name="module_constants..Constants+gameStates"></a>

#### constants.gameStates
Is an object which holds the game states.

**Kind**: instance property of <code>[Constants](#module_constants..Constants)</code>  
**Access:** public  

* [.gameStates](#module_constants..Constants+gameStates)
    * [.PENDING](#module_constants..Constants+gameStates.PENDING)
    * [.BUZZER_LOCK](#module_constants..Constants+gameStates.BUZZER_LOCK)
    * [.READY](#module_constants..Constants+gameStates.READY)
    * [.COMPLETED](#module_constants..Constants+gameStates.COMPLETED)

<a name="module_constants..Constants+gameStates.PENDING"></a>

##### gameStates.PENDING
Game state pending buzzer was pressed and is now waiting for host determination.

**Kind**: static constant of <code>[gameStates](#module_constants..Constants+gameStates)</code>  
**Access:** public  
<a name="module_constants..Constants+gameStates.BUZZER_LOCK"></a>

##### gameStates.BUZZER_LOCK
Game state buzzer lock - no contestant can press buzzer.

**Kind**: static constant of <code>[gameStates](#module_constants..Constants+gameStates)</code>  
**Access:** public  
<a name="module_constants..Constants+gameStates.READY"></a>

##### gameStates.READY
Game state ready, wait for buzzer press, disable buzzers or complete session.

**Kind**: static constant of <code>[gameStates](#module_constants..Constants+gameStates)</code>  
**Access:** public  
<a name="module_constants..Constants+gameStates.COMPLETED"></a>

##### gameStates.COMPLETED
Game state completed, the session is now over.

**Kind**: static constant of <code>[gameStates](#module_constants..Constants+gameStates)</code>  
**Access:** public  
<a name="module_constants..Constants+teamLeaderSelectionMethod"></a>

#### constants.teamLeaderSelectionMethod
Is an object which holds team leader selection method constants.

**Kind**: instance property of <code>[Constants](#module_constants..Constants)</code>  
**Access:** public  

* [.teamLeaderSelectionMethod](#module_constants..Constants+teamLeaderSelectionMethod)
    * [.RANDOM](#module_constants..Constants+teamLeaderSelectionMethod.RANDOM)
    * [.PLAYER_CHOICE](#module_constants..Constants+teamLeaderSelectionMethod.PLAYER_CHOICE)
    * [.all](#module_constants..Constants+teamLeaderSelectionMethod.all)

<a name="module_constants..Constants+teamLeaderSelectionMethod.RANDOM"></a>

##### teamLeaderSelectionMethod.RANDOM
Manual team leader selection.

**Kind**: static constant of <code>[teamLeaderSelectionMethod](#module_constants..Constants+teamLeaderSelectionMethod)</code>  
**Access:** public  
<a name="module_constants..Constants+teamLeaderSelectionMethod.PLAYER_CHOICE"></a>

##### teamLeaderSelectionMethod.PLAYER_CHOICE
Auto team selection.

**Kind**: static constant of <code>[teamLeaderSelectionMethod](#module_constants..Constants+teamLeaderSelectionMethod)</code>  
**Access:** public  
<a name="module_constants..Constants+teamLeaderSelectionMethod.all"></a>

##### teamLeaderSelectionMethod.all
A special constants which holds all constant values.

**Kind**: static constant of <code>[teamLeaderSelectionMethod](#module_constants..Constants+teamLeaderSelectionMethod)</code>  
<a name="module_constants..Constants+teamSelectionMethod"></a>

#### constants.teamSelectionMethod
Is an object which holds the team selection method constants.

**Kind**: instance property of <code>[Constants](#module_constants..Constants)</code>  
**Access:** public  

* [.teamSelectionMethod](#module_constants..Constants+teamSelectionMethod)
    * [.SMALLEST_TEAM](#module_constants..Constants+teamSelectionMethod.SMALLEST_TEAM)
    * [.PLAYER_CHOICE](#module_constants..Constants+teamSelectionMethod.PLAYER_CHOICE)
    * [.all](#module_constants..Constants+teamSelectionMethod.all)

<a name="module_constants..Constants+teamSelectionMethod.SMALLEST_TEAM"></a>

##### teamSelectionMethod.SMALLEST_TEAM
Smallest team.

**Kind**: static constant of <code>[teamSelectionMethod](#module_constants..Constants+teamSelectionMethod)</code>  
**Access:** public  
<a name="module_constants..Constants+teamSelectionMethod.PLAYER_CHOICE"></a>

##### teamSelectionMethod.PLAYER_CHOICE
Player choice.

**Kind**: static constant of <code>[teamSelectionMethod](#module_constants..Constants+teamSelectionMethod)</code>  
**Access:** public  
<a name="module_constants..Constants+teamSelectionMethod.all"></a>

##### teamSelectionMethod.all
A special constants which holds all constant values.

**Kind**: static constant of <code>[teamSelectionMethod](#module_constants..Constants+teamSelectionMethod)</code>  
<a name="module_constants..Constants+teamNameEdit"></a>

#### constants.teamNameEdit
Is an object which holds team name edit constants.

**Kind**: instance property of <code>[Constants](#module_constants..Constants)</code>  
**Access:** public  

* [.teamNameEdit](#module_constants..Constants+teamNameEdit)
    * [.AUTO](#module_constants..Constants+teamNameEdit.AUTO)
    * [.ALLOW](#module_constants..Constants+teamNameEdit.ALLOW)
    * [.MANUAL](#module_constants..Constants+teamNameEdit.MANUAL)
    * [.all](#module_constants..Constants+teamNameEdit.all)

<a name="module_constants..Constants+teamNameEdit.AUTO"></a>

##### teamNameEdit.AUTO
Team names are automatically assigned.

**Kind**: static constant of <code>[teamNameEdit](#module_constants..Constants+teamNameEdit)</code>  
**Access:** public  
<a name="module_constants..Constants+teamNameEdit.ALLOW"></a>

##### teamNameEdit.ALLOW
Teams name are automatically assigned, but editable by team leader.

**Kind**: static constant of <code>[teamNameEdit](#module_constants..Constants+teamNameEdit)</code>  
**Access:** public  
<a name="module_constants..Constants+teamNameEdit.MANUAL"></a>

##### teamNameEdit.MANUAL
Teams name manually set by the host.

**Kind**: static constant of <code>[teamNameEdit](#module_constants..Constants+teamNameEdit)</code>  
**Access:** public  
<a name="module_constants..Constants+teamNameEdit.all"></a>

##### teamNameEdit.all
A special constants which holds all constant values.

**Kind**: static constant of <code>[teamNameEdit](#module_constants..Constants+teamNameEdit)</code>  
<a name="module_constants..Constants+buzzerActionCommands"></a>

#### constants.buzzerActionCommands
Is an object which holds host buzzer action commands.

**Kind**: instance property of <code>[Constants](#module_constants..Constants)</code>  
**Access:** public  

* [.buzzerActionCommands](#module_constants..Constants+buzzerActionCommands)
    * [.ACCEPT](#module_constants..Constants+buzzerActionCommands.ACCEPT)
    * [.REJECT](#module_constants..Constants+buzzerActionCommands.REJECT)
    * [.RESET](#module_constants..Constants+buzzerActionCommands.RESET)
    * [.DISABLE](#module_constants..Constants+buzzerActionCommands.DISABLE)
    * [.ENABLE](#module_constants..Constants+buzzerActionCommands.ENABLE)
    * [.all](#module_constants..Constants+buzzerActionCommands.all)

<a name="module_constants..Constants+buzzerActionCommands.ACCEPT"></a>

##### buzzerActionCommands.ACCEPT
Buzzer input is accepted.

**Kind**: static constant of <code>[buzzerActionCommands](#module_constants..Constants+buzzerActionCommands)</code>  
**Access:** public  
<a name="module_constants..Constants+buzzerActionCommands.REJECT"></a>

##### buzzerActionCommands.REJECT
Buzzer input is rejected.

**Kind**: static constant of <code>[buzzerActionCommands](#module_constants..Constants+buzzerActionCommands)</code>  
**Access:** public  
<a name="module_constants..Constants+buzzerActionCommands.RESET"></a>

##### buzzerActionCommands.RESET
Buzzer inputs are to reset.

**Kind**: static constant of <code>[buzzerActionCommands](#module_constants..Constants+buzzerActionCommands)</code>  
**Access:** public  
<a name="module_constants..Constants+buzzerActionCommands.DISABLE"></a>

##### buzzerActionCommands.DISABLE
Buzzer inputs are to be disabled.

**Kind**: static constant of <code>[buzzerActionCommands](#module_constants..Constants+buzzerActionCommands)</code>  
**Access:** public  
<a name="module_constants..Constants+buzzerActionCommands.ENABLE"></a>

##### buzzerActionCommands.ENABLE
Buzzer inputs are to be enabled.

**Kind**: static constant of <code>[buzzerActionCommands](#module_constants..Constants+buzzerActionCommands)</code>  
**Access:** public  
<a name="module_constants..Constants+buzzerActionCommands.all"></a>

##### buzzerActionCommands.all
A special constants which holds all constant values.

**Kind**: static constant of <code>[buzzerActionCommands](#module_constants..Constants+buzzerActionCommands)</code>  
<a name="module_constants..Constants+socketMessageNames"></a>

#### constants.socketMessageNames
Is an object which holds sock message type name constants.

**Kind**: instance property of <code>[Constants](#module_constants..Constants)</code>  
**Access:** public  

* [.socketMessageNames](#module_constants..Constants+socketMessageNames)
    * [.DISCONNECT](#module_constants..Constants+socketMessageNames.DISCONNECT)
    * [.BUZZER_ACTION_COMMAND](#module_constants..Constants+socketMessageNames.BUZZER_ACTION_COMMAND)
    * [.CONTESTANT_BUZZER_PRESS](#module_constants..Constants+socketMessageNames.CONTESTANT_BUZZER_PRESS)
    * [.CONTESTANT_JOIN_REQUEST](#module_constants..Constants+socketMessageNames.CONTESTANT_JOIN_REQUEST)
    * [.CONTESTANT_JOIN_RESPONSE](#module_constants..Constants+socketMessageNames.CONTESTANT_JOIN_RESPONSE)
    * [.CREATE_SESSION](#module_constants..Constants+socketMessageNames.CREATE_SESSION)
    * [.CREATE_SESSION_RESPONSE](#module_constants..Constants+socketMessageNames.CREATE_SESSION_RESPONSE)
    * [.ERROR](#module_constants..Constants+socketMessageNames.ERROR)
    * [.HOST_SETTINGS_UPDATE_MESSAGE](#module_constants..Constants+socketMessageNames.HOST_SETTINGS_UPDATE_MESSAGE)
    * [.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE)
    * [.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE)
    * [.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE](#module_constants..Constants+socketMessageNames.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE)
    * [.OBSERVER_UPDATE](#module_constants..Constants+socketMessageNames.OBSERVER_UPDATE)
    * [.REJOIN_SESSION](#module_constants..Constants+socketMessageNames.REJOIN_SESSION)
    * [.ROUND_WON_MESSAGE](#module_constants..Constants+socketMessageNames.ROUND_WON_MESSAGE)
    * [.SESSION_COMPLETE](#module_constants..Constants+socketMessageNames.SESSION_COMPLETE)
    * [.SESSION_COMPLETED](#module_constants..Constants+socketMessageNames.SESSION_COMPLETED)
    * [.SESSION_INFORMATION_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.SESSION_INFORMATION_REQUEST_MESSAGE)
    * [.SESSION_INFORMATION_RESPONSE_MESSAGE](#module_constants..Constants+socketMessageNames.SESSION_INFORMATION_RESPONSE_MESSAGE)
    * [.SET_TEAM_NAME_REQUEST_MESSAGE](#module_constants..Constants+socketMessageNames.SET_TEAM_NAME_REQUEST_MESSAGE)
    * [.SUCCESS](#module_constants..Constants+socketMessageNames.SUCCESS)

<a name="module_constants..Constants+socketMessageNames.DISCONNECT"></a>

##### socketMessageNames.DISCONNECT
Socket disconnect

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.BUZZER_ACTION_COMMAND"></a>

##### socketMessageNames.BUZZER_ACTION_COMMAND
Buzzer action command message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.CONTESTANT_BUZZER_PRESS"></a>

##### socketMessageNames.CONTESTANT_BUZZER_PRESS
Contestant contestant buzzer press message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.CONTESTANT_JOIN_REQUEST"></a>

##### socketMessageNames.CONTESTANT_JOIN_REQUEST
Contestant join response message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.CONTESTANT_JOIN_RESPONSE"></a>

##### socketMessageNames.CONTESTANT_JOIN_RESPONSE
Contestant join request message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.CREATE_SESSION"></a>

##### socketMessageNames.CREATE_SESSION
Create session message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.CREATE_SESSION_RESPONSE"></a>

##### socketMessageNames.CREATE_SESSION_RESPONSE
Create session response message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.ERROR"></a>

##### socketMessageNames.ERROR
Error message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.HOST_SETTINGS_UPDATE_MESSAGE"></a>

##### socketMessageNames.HOST_SETTINGS_UPDATE_MESSAGE
Host settings update message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE"></a>

##### socketMessageNames.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE
Host team leader set request message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE"></a>

##### socketMessageNames.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE
Host team name update request message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE"></a>

##### socketMessageNames.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE
Inquire team leader response message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.OBSERVER_UPDATE"></a>

##### socketMessageNames.OBSERVER_UPDATE
Observer update message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.REJOIN_SESSION"></a>

##### socketMessageNames.REJOIN_SESSION
Rejoin session message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.ROUND_WON_MESSAGE"></a>

##### socketMessageNames.ROUND_WON_MESSAGE
Round won message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.SESSION_COMPLETE"></a>

##### socketMessageNames.SESSION_COMPLETE
Session complete message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.SESSION_COMPLETED"></a>

##### socketMessageNames.SESSION_COMPLETED
Session completed message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.SESSION_INFORMATION_REQUEST_MESSAGE"></a>

##### socketMessageNames.SESSION_INFORMATION_REQUEST_MESSAGE
Session information request message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.SESSION_INFORMATION_RESPONSE_MESSAGE"></a>

##### socketMessageNames.SESSION_INFORMATION_RESPONSE_MESSAGE
Session information response message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.SET_TEAM_NAME_REQUEST_MESSAGE"></a>

##### socketMessageNames.SET_TEAM_NAME_REQUEST_MESSAGE
Set team name request message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+socketMessageNames.SUCCESS"></a>

##### socketMessageNames.SUCCESS
Success message.

**Kind**: static constant of <code>[socketMessageNames](#module_constants..Constants+socketMessageNames)</code>  
**Access:** public  
<a name="module_constants..Constants+rejoinAs"></a>

#### constants.rejoinAs
Is an object which holds rejoin as constants.

**Kind**: instance property of <code>[Constants](#module_constants..Constants)</code>  
**Access:** public  

* [.rejoinAs](#module_constants..Constants+rejoinAs)
    * [.HOST](#module_constants..Constants+rejoinAs.HOST)
    * [.CONTESTANT](#module_constants..Constants+rejoinAs.CONTESTANT)
    * [.OBSERVER](#module_constants..Constants+rejoinAs.OBSERVER)

<a name="module_constants..Constants+rejoinAs.HOST"></a>

##### rejoinAs.HOST
Rejoin as host.

**Kind**: static constant of <code>[rejoinAs](#module_constants..Constants+rejoinAs)</code>  
**Access:** public  
<a name="module_constants..Constants+rejoinAs.CONTESTANT"></a>

##### rejoinAs.CONTESTANT
Rejoin as contestant.

**Kind**: static constant of <code>[rejoinAs](#module_constants..Constants+rejoinAs)</code>  
**Access:** public  
<a name="module_constants..Constants+rejoinAs.OBSERVER"></a>

##### rejoinAs.OBSERVER
Rejoin as observer.

**Kind**: static constant of <code>[rejoinAs](#module_constants..Constants+rejoinAs)</code>  
**Access:** public  
<a name="module_constants..Constants+messages"></a>

#### constants.messages
Is an object which holds messages.

**Kind**: instance property of <code>[Constants](#module_constants..Constants)</code>  
**Access:** public  

* [.messages](#module_constants..Constants+messages)
    * [.MAXIMUM_SESSION_SIZED_REACHED](#module_constants..Constants+messages.MAXIMUM_SESSION_SIZED_REACHED)
    * [.USERNAME_TAKEN](#module_constants..Constants+messages.USERNAME_TAKEN)
    * [.COULD_NOT_COMPLETE_SESSION_NOT_HOST](#module_constants..Constants+messages.COULD_NOT_COMPLETE_SESSION_NOT_HOST)
    * [.COULD_NOT_ACCEPT_BUZZER_PRESS_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_ACCEPT_BUZZER_PRESS_NOT_CONTESTANT)
    * [.COULD_NOT_ACCEPT_REQUEST_NOT_HOST](#module_constants..Constants+messages.COULD_NOT_ACCEPT_REQUEST_NOT_HOST)
    * [.COULD_NOT_PROCESS_REQUEST_GAME_STATE_WILL_NOT_ALLOW](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_GAME_STATE_WILL_NOT_ALLOW)
    * [.BUZZER_PRESS_NOT_ACCEPTED](#module_constants..Constants+messages.BUZZER_PRESS_NOT_ACCEPTED)
    * [.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED](#module_constants..Constants+messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED)
    * [.SESSION_COULD_NOT_BE_FOUND](#module_constants..Constants+messages.SESSION_COULD_NOT_BE_FOUND)
    * [.COULD_NOT_REJOIN_NOT_HOST](#module_constants..Constants+messages.COULD_NOT_REJOIN_NOT_HOST)
    * [.COULD_NOT_REJOIN_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_REJOIN_NOT_CONTESTANT)
    * [.COULD_NOT_REJOIN_UNKNOWN](#module_constants..Constants+messages.COULD_NOT_REJOIN_UNKNOWN)
    * [.TEAMS_ARE_FULL](#module_constants..Constants+messages.TEAMS_ARE_FULL)
    * [.USERNAME_CONTAINS_PROFANITY](#module_constants..Constants+messages.USERNAME_CONTAINS_PROFANITY)
    * [.USERNAME_IS_REQUIRED](#module_constants..Constants+messages.USERNAME_IS_REQUIRED)
    * [.COULD_NOT_ACCEPT_TEAM_LEADER_RESPONSE_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_LEADER_RESPONSE_NOT_CONTESTANT)
    * [.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_FULFILLED](#module_constants..Constants+messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_FULFILLED)
    * [.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_NOT_CONTESTANT](#module_constants..Constants+messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_NOT_CONTESTANT)
    * [.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER)
    * [.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_AS_TEAM_NAME_EMPTY](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_AS_TEAM_NAME_EMPTY)
    * [.COULD_NOT_ACCEPT_TEAM_NAME_CONTAINS_PROFANITY](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_CONTAINS_PROFANITY)
    * [.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE)
    * [.COULD_NOT_ACCEPT_TEAM_NAME_SETTINGS_NOT_ALLOW](#module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_SETTINGS_NOT_ALLOW)
    * [.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND)
    * [.COULD_NOT_PROCESS_REQUEST_CONTESTANT_NOT_FOUND](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_NOT_FOUND)
    * [.COULD_NOT_PROCESS_REQUEST_CONTESTANT_OR_HOST_NOT_FOUND](#module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_OR_HOST_NOT_FOUND)
    * [.TEAM_SIZE_MUST_BE_GREATER_THAN_ZERO](#module_constants..Constants+messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ZERO)
    * [.SESSION_NAME_REQUIRED](#module_constants..Constants+messages.SESSION_NAME_REQUIRED)
    * [.MAX_TEAMS_MUST_BE_GREATER_THAN_ZERO](#module_constants..Constants+messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ZERO)
    * [.TEAM_NAMES_MUST_BE_UNIQUE](#module_constants..Constants+messages.TEAM_NAMES_MUST_BE_UNIQUE)
    * [.TEAMS_OR_TEAM_SIZE_UNLIMITED_NOT_BOTH](#module_constants..Constants+messages.TEAMS_OR_TEAM_SIZE_UNLIMITED_NOT_BOTH)
    * [.TEAM_SIZE_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS](#module_constants..Constants+messages.TEAM_SIZE_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS)
    * [.MAX_TEAMS_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS](#module_constants..Constants+messages.MAX_TEAMS_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS)
    * [.TEAM_NAMES_MUST_NOT_BE_USED_WHEN_NOT_USING_TEAMS](#module_constants..Constants+messages.TEAM_NAMES_MUST_NOT_BE_USED_WHEN_NOT_USING_TEAMS)
    * [.MAX_CONTESTANTS_MUST_BE_ZERO_WHEN_USING_TEAMS](#module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_ZERO_WHEN_USING_TEAMS)
    * [.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ZERO](#module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ZERO)
    * [.PLAYER_CANNOT_CHOICE_OWN_TEAM_WHEN_USING_UNLIMITED_TEAMS](#module_constants..Constants+messages.PLAYER_CANNOT_CHOICE_OWN_TEAM_WHEN_USING_UNLIMITED_TEAMS)
    * [.CONTESTANT_MUST_CHOOSE_TEAM](#module_constants..Constants+messages.CONTESTANT_MUST_CHOOSE_TEAM)
    * [.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ALREADY_CONNECTED](#module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ALREADY_CONNECTED)
    * [.TEAM_SIZE_MUST_BE_GREATER_THAN_ALREADY_SET](#module_constants..Constants+messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ALREADY_SET)
    * [.MAX_TEAMS_MUST_BE_GREATER_THAN_ALREADY_SET](#module_constants..Constants+messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ALREADY_SET)
    * [.MAX_TEAMS_CANNOT_BE_CHANGED_WHEN_PLAYER_CHOICE](#module_constants..Constants+messages.MAX_TEAMS_CANNOT_BE_CHANGED_WHEN_PLAYER_CHOICE)

<a name="module_constants..Constants+messages.MAXIMUM_SESSION_SIZED_REACHED"></a>

##### messages.MAXIMUM_SESSION_SIZED_REACHED
Message: Maximum session sized reached.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.USERNAME_TAKEN"></a>

##### messages.USERNAME_TAKEN
Message: Username has already been taken.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_COMPLETE_SESSION_NOT_HOST"></a>

##### messages.COULD_NOT_COMPLETE_SESSION_NOT_HOST
Message: Could not complete session, as  you are not the host.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_ACCEPT_BUZZER_PRESS_NOT_CONTESTANT"></a>

##### messages.COULD_NOT_ACCEPT_BUZZER_PRESS_NOT_CONTESTANT
Message: Could not accept buzzer press, as you are not a contestant.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_ACCEPT_REQUEST_NOT_HOST"></a>

##### messages.COULD_NOT_ACCEPT_REQUEST_NOT_HOST
Message: Could not accept request, as you are not the host.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_GAME_STATE_WILL_NOT_ALLOW"></a>

##### messages.COULD_NOT_PROCESS_REQUEST_GAME_STATE_WILL_NOT_ALLOW
Message: Could process the request, as it is not valid for the current game state.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.BUZZER_PRESS_NOT_ACCEPTED"></a>

##### messages.BUZZER_PRESS_NOT_ACCEPTED
Message: Buzzer press was not accepted by session.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED"></a>

##### messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED
Message: Session could not be found or is completed.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.SESSION_COULD_NOT_BE_FOUND"></a>

##### messages.SESSION_COULD_NOT_BE_FOUND
Message: Session could not be found.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_REJOIN_NOT_HOST"></a>

##### messages.COULD_NOT_REJOIN_NOT_HOST
Message: Could not rejoin as host, as you are not the host!

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_REJOIN_NOT_CONTESTANT"></a>

##### messages.COULD_NOT_REJOIN_NOT_CONTESTANT
Message: Could not rejoin a contestant, as you are not a contestant!

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_REJOIN_UNKNOWN"></a>

##### messages.COULD_NOT_REJOIN_UNKNOWN
Message: Could not rejoin, as `join as` constant is unknown.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.TEAMS_ARE_FULL"></a>

##### messages.TEAMS_ARE_FULL
Message: Teams are full message.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.USERNAME_CONTAINS_PROFANITY"></a>

##### messages.USERNAME_CONTAINS_PROFANITY
Message: Username contains profanity!

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.USERNAME_IS_REQUIRED"></a>

##### messages.USERNAME_IS_REQUIRED
Message: Username is required.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_LEADER_RESPONSE_NOT_CONTESTANT"></a>

##### messages.COULD_NOT_ACCEPT_TEAM_LEADER_RESPONSE_NOT_CONTESTANT
Message: Could not accept team leader response, as you are not a contestant!

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_FULFILLED"></a>

##### messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_FULFILLED
Message: Could not promote to team leader, as position has already been fulfilled.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_NOT_CONTESTANT"></a>

##### messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_NOT_CONTESTANT
Message: Could not promote to team leader, as contestant does not belong to team.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER"></a>

##### messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER
Message: Could not accept team name request, as you are not a contestant or either do not belong to a team or
are not the team leader!

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_AS_TEAM_NAME_EMPTY"></a>

##### messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_AS_TEAM_NAME_EMPTY
Message: Could not accept team name request, as you are not a contestant or either do not belong to a team or
are not the team leader!

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_CONTAINS_PROFANITY"></a>

##### messages.COULD_NOT_ACCEPT_TEAM_NAME_CONTAINS_PROFANITY
Message: Could not accept team name change as it contains profanity!

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE"></a>

##### messages.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE
Message: Could not accept team name change as it is already being used.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_ACCEPT_TEAM_NAME_SETTINGS_NOT_ALLOW"></a>

##### messages.COULD_NOT_ACCEPT_TEAM_NAME_SETTINGS_NOT_ALLOW
Message: Could not accept team name change as the session settings do not allow it.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND"></a>

##### messages.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND
Message: Could not process request, as the team could not be found.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_NOT_FOUND"></a>

##### messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_NOT_FOUND
Message: Could not process request, as the contestant could not be found.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_OR_HOST_NOT_FOUND"></a>

##### messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_OR_HOST_NOT_FOUND
Message: Could not process request, as a contestant or host could not be found.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ZERO"></a>

##### messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ZERO
Message: Team size must be greater than 0 when using teams.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.SESSION_NAME_REQUIRED"></a>

##### messages.SESSION_NAME_REQUIRED
Message: A session name is required.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ZERO"></a>

##### messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ZERO
Message: Max teams must be greater than 0 when using teams.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.TEAM_NAMES_MUST_BE_UNIQUE"></a>

##### messages.TEAM_NAMES_MUST_BE_UNIQUE
Message: Team names must be unique.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.TEAMS_OR_TEAM_SIZE_UNLIMITED_NOT_BOTH"></a>

##### messages.TEAMS_OR_TEAM_SIZE_UNLIMITED_NOT_BOTH
Message: Either number of teams or team size can be unlimited, not both.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.TEAM_SIZE_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS"></a>

##### messages.TEAM_SIZE_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS
Message: Team size must be 0 when not using teams.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.MAX_TEAMS_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS"></a>

##### messages.MAX_TEAMS_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS
Message: Max teams must be 0 when not using teams.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.TEAM_NAMES_MUST_NOT_BE_USED_WHEN_NOT_USING_TEAMS"></a>

##### messages.TEAM_NAMES_MUST_NOT_BE_USED_WHEN_NOT_USING_TEAMS
Message: Team names cannot be used for a non-team based session.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_ZERO_WHEN_USING_TEAMS"></a>

##### messages.MAX_CONTESTANTS_MUST_BE_ZERO_WHEN_USING_TEAMS
Message: Max contestants must be greater than 0 when not using teams.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ZERO"></a>

##### messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ZERO
Message: Max contestants must be 0 when using teams.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.PLAYER_CANNOT_CHOICE_OWN_TEAM_WHEN_USING_UNLIMITED_TEAMS"></a>

##### messages.PLAYER_CANNOT_CHOICE_OWN_TEAM_WHEN_USING_UNLIMITED_TEAMS
Message: A player cannot choose their own team when unlimited teams are configured.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.CONTESTANT_MUST_CHOOSE_TEAM"></a>

##### messages.CONTESTANT_MUST_CHOOSE_TEAM
Message: The contestant must choose a team.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ALREADY_CONNECTED"></a>

##### messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ALREADY_CONNECTED
Message: Max contestants must be greater than the amount already connected.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ALREADY_SET"></a>

##### messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ALREADY_SET
Message: Team size must be greater than the already set size.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ALREADY_SET"></a>

##### messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ALREADY_SET
Message: Max teams must be greater than the already set size.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+messages.MAX_TEAMS_CANNOT_BE_CHANGED_WHEN_PLAYER_CHOICE"></a>

##### messages.MAX_TEAMS_CANNOT_BE_CHANGED_WHEN_PLAYER_CHOICE
Message: Cannot be changed when team selection is player choice.

**Kind**: static constant of <code>[messages](#module_constants..Constants+messages)</code>  
**Access:** public  
<a name="module_constants..Constants+UNLIMITED"></a>

#### constants.UNLIMITED
Is the constant value which means unlimited.

**Kind**: instance constant of <code>[Constants](#module_constants..Constants)</code>  
**Access:** public  
<a name="module_contestant"></a>

## contestant
Contestant module.


* [contestant](#module_contestant)
    * [~Contestant](#module_contestant..Contestant) ⇐ <code>Participant</code>
        * [new Contestant()](#new_module_contestant..Contestant_new)
        * _instance_
            * [.type](#module_contestant..Contestant+type)
            * [.incrementScore()](#module_contestant..Contestant+incrementScore)
        * _static_
            * [.prototype](#module_contestant..Contestant.prototype)

<a name="module_contestant..Contestant"></a>

### contestant~Contestant ⇐ <code>Participant</code>
**Kind**: inner class of <code>[contestant](#module_contestant)</code>  
**Extends:** <code>Participant</code>  
**Access:** public  

* [~Contestant](#module_contestant..Contestant) ⇐ <code>Participant</code>
    * [new Contestant()](#new_module_contestant..Contestant_new)
    * _instance_
        * [.type](#module_contestant..Contestant+type)
        * [.incrementScore()](#module_contestant..Contestant+incrementScore)
    * _static_
        * [.prototype](#module_contestant..Contestant.prototype)

<a name="new_module_contestant..Contestant_new"></a>

#### new Contestant()
Represents a contestant participant.

<a name="module_contestant..Contestant+type"></a>

#### contestant.type
Prototype name

**Kind**: instance property of <code>[Contestant](#module_contestant..Contestant)</code>  
<a name="module_contestant..Contestant+incrementScore"></a>

#### contestant.incrementScore()
Defines a method to increment the contestant's score.

**Kind**: instance method of <code>[Contestant](#module_contestant..Contestant)</code>  
**Access:** public  
**See**: [score](score)  
<a name="module_contestant..Contestant.prototype"></a>

#### Contestant.prototype
Contestant is a subclass of Participant.

**Kind**: static property of <code>[Contestant](#module_contestant..Contestant)</code>  
<a name="module_host"></a>

## host
Host module.


* [host](#module_host)
    * [~Host](#module_host..Host) ⇐ <code>Participant</code>
        * [new Host()](#new_module_host..Host_new)
        * _instance_
            * [.type](#module_host..Host+type)
        * _static_
            * [.prototype](#module_host..Host.prototype)

<a name="module_host..Host"></a>

### host~Host ⇐ <code>Participant</code>
**Kind**: inner class of <code>[host](#module_host)</code>  
**Extends:** <code>Participant</code>  
**Access:** public  

* [~Host](#module_host..Host) ⇐ <code>Participant</code>
    * [new Host()](#new_module_host..Host_new)
    * _instance_
        * [.type](#module_host..Host+type)
    * _static_
        * [.prototype](#module_host..Host.prototype)

<a name="new_module_host..Host_new"></a>

#### new Host()
Represents a host participant.

<a name="module_host..Host+type"></a>

#### host.type
Prototype name

**Kind**: instance property of <code>[Host](#module_host..Host)</code>  
<a name="module_host..Host.prototype"></a>

#### Host.prototype
Contestant is a subclass of Participant.

**Kind**: static property of <code>[Host](#module_host..Host)</code>  
<a name="module_IdentifierUtility"></a>

## IdentifierUtility
Identifier utility module.


* [IdentifierUtility](#module_IdentifierUtility)
    * [~IdentifierUtility](#module_IdentifierUtility..IdentifierUtility)
        * [new IdentifierUtility()](#new_module_IdentifierUtility..IdentifierUtility_new)
        * [.type](#module_IdentifierUtility..IdentifierUtility+type)
        * [.registerSessionIdsInUse(ids)](#module_IdentifierUtility..IdentifierUtility+registerSessionIdsInUse)
        * [.releaseSessionId(id)](#module_IdentifierUtility..IdentifierUtility+releaseSessionId)
        * [.generateSessionId()](#module_IdentifierUtility..IdentifierUtility+generateSessionId) ⇒ <code>String</code>
        * [.generateParticipantId()](#module_IdentifierUtility..IdentifierUtility+generateParticipantId) ⇒ <code>String</code>

<a name="module_IdentifierUtility..IdentifierUtility"></a>

### IdentifierUtility~IdentifierUtility
**Kind**: inner class of <code>[IdentifierUtility](#module_IdentifierUtility)</code>  
**Access:** public  

* [~IdentifierUtility](#module_IdentifierUtility..IdentifierUtility)
    * [new IdentifierUtility()](#new_module_IdentifierUtility..IdentifierUtility_new)
    * [.type](#module_IdentifierUtility..IdentifierUtility+type)
    * [.registerSessionIdsInUse(ids)](#module_IdentifierUtility..IdentifierUtility+registerSessionIdsInUse)
    * [.releaseSessionId(id)](#module_IdentifierUtility..IdentifierUtility+releaseSessionId)
    * [.generateSessionId()](#module_IdentifierUtility..IdentifierUtility+generateSessionId) ⇒ <code>String</code>
    * [.generateParticipantId()](#module_IdentifierUtility..IdentifierUtility+generateParticipantId) ⇒ <code>String</code>

<a name="new_module_IdentifierUtility..IdentifierUtility_new"></a>

#### new IdentifierUtility()
Represents a identifier utility.

<a name="module_IdentifierUtility..IdentifierUtility+type"></a>

#### identifierUtility.type
Prototype name

**Kind**: instance property of <code>[IdentifierUtility](#module_IdentifierUtility..IdentifierUtility)</code>  
<a name="module_IdentifierUtility..IdentifierUtility+registerSessionIdsInUse"></a>

#### identifierUtility.registerSessionIdsInUse(ids)
Defines a method to register session ids that are in use, but were not generated
by the current application.

**Kind**: instance method of <code>[IdentifierUtility](#module_IdentifierUtility..IdentifierUtility)</code>  
**Access:** public  
**Throw**: when param ids is an incorrect type.  

| Param | Type |
| --- | --- |
| ids | <code>Array.&lt;String&gt;</code> | 

<a name="module_IdentifierUtility..IdentifierUtility+releaseSessionId"></a>

#### identifierUtility.releaseSessionId(id)
Defines a method to release a registered session id allowing it to be reused.

**Kind**: instance method of <code>[IdentifierUtility](#module_IdentifierUtility..IdentifierUtility)</code>  
**Access:** public  
**Throw**: when param id equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="module_IdentifierUtility..IdentifierUtility+generateSessionId"></a>

#### identifierUtility.generateSessionId() ⇒ <code>String</code>
Defines a method which generates a new session id. A session id will not contain
characters which are confusing, such as 0 and O or 1 and I.

**Kind**: instance method of <code>[IdentifierUtility](#module_IdentifierUtility..IdentifierUtility)</code>  
**Returns**: <code>String</code> - a new session id which is unique and @see[keyLength](keyLength) in length.  
**Access:** public  
<a name="module_IdentifierUtility..IdentifierUtility+generateParticipantId"></a>

#### identifierUtility.generateParticipantId() ⇒ <code>String</code>
Defines a method which generates a new participant id, which is actually just a UUID.

**Kind**: instance method of <code>[IdentifierUtility](#module_IdentifierUtility..IdentifierUtility)</code>  
**Returns**: <code>String</code> - a new participant id (UUID).  
**Access:** public  
<a name="module_messageFactory"></a>

## messageFactory
Message factory module.


* [messageFactory](#module_messageFactory)
    * [~MessageFactory](#module_messageFactory..MessageFactory)
        * [new MessageFactory()](#new_module_messageFactory..MessageFactory_new)
        * [.type](#module_messageFactory..MessageFactory+type)
        * [.create(messageName)](#module_messageFactory..MessageFactory+create) ⇒ <code>\*</code>
        * [.restore(messageName)](#module_messageFactory..MessageFactory+restore) ⇒ <code>\*</code>

<a name="module_messageFactory..MessageFactory"></a>

### messageFactory~MessageFactory
**Kind**: inner class of <code>[messageFactory](#module_messageFactory)</code>  
**Access:** public  

* [~MessageFactory](#module_messageFactory..MessageFactory)
    * [new MessageFactory()](#new_module_messageFactory..MessageFactory_new)
    * [.type](#module_messageFactory..MessageFactory+type)
    * [.create(messageName)](#module_messageFactory..MessageFactory+create) ⇒ <code>\*</code>
    * [.restore(messageName)](#module_messageFactory..MessageFactory+restore) ⇒ <code>\*</code>

<a name="new_module_messageFactory..MessageFactory_new"></a>

#### new MessageFactory()
Represents a message factory.

<a name="module_messageFactory..MessageFactory+type"></a>

#### messageFactory.type
Prototype name

**Kind**: instance property of <code>[MessageFactory](#module_messageFactory..MessageFactory)</code>  
<a name="module_messageFactory..MessageFactory+create"></a>

#### messageFactory.create(messageName) ⇒ <code>\*</code>
Defines a method to create socket message instances.

**Kind**: instance method of <code>[MessageFactory](#module_messageFactory..MessageFactory)</code>  
**Returns**: <code>\*</code> - the message instance.  
**Access:** public  
**Throw**: if the message name does not match back to a message.  

| Param | Type |
| --- | --- |
| messageName | <code>String</code> | 

<a name="module_messageFactory..MessageFactory+restore"></a>

#### messageFactory.restore(messageName) ⇒ <code>\*</code>
Defines a method to restore a message to its strongly typed counterpart.

**Kind**: instance method of <code>[MessageFactory](#module_messageFactory..MessageFactory)</code>  
**Returns**: <code>\*</code> - the message instance.  
**Access:** public  
**Throw**: if the protocol does not match.  
**Throw**: if the expected type does not match the message type.  
**Throw**: if the restored message does not pass JSON schema validation.  

| Param | Type |
| --- | --- |
| messageName | <code>String</code> | 

<a name="module_observer"></a>

## observer
Observer module.


* [observer](#module_observer)
    * [~Observer](#module_observer..Observer) ⇐ <code>Participant</code>
        * [new Observer()](#new_module_observer..Observer_new)
        * _instance_
            * [.type](#module_observer..Observer+type)
        * _static_
            * [.prototype](#module_observer..Observer.prototype)

<a name="module_observer..Observer"></a>

### observer~Observer ⇐ <code>Participant</code>
**Kind**: inner class of <code>[observer](#module_observer)</code>  
**Extends:** <code>Participant</code>  
**Access:** public  

* [~Observer](#module_observer..Observer) ⇐ <code>Participant</code>
    * [new Observer()](#new_module_observer..Observer_new)
    * _instance_
        * [.type](#module_observer..Observer+type)
    * _static_
        * [.prototype](#module_observer..Observer.prototype)

<a name="new_module_observer..Observer_new"></a>

#### new Observer()
Represents a observer participant.

<a name="module_observer..Observer+type"></a>

#### observer.type
Prototype name

**Kind**: instance property of <code>[Observer](#module_observer..Observer)</code>  
<a name="module_observer..Observer.prototype"></a>

#### Observer.prototype
Contestant is a subclass of Participant.

**Kind**: static property of <code>[Observer](#module_observer..Observer)</code>  
<a name="module_ParamCheck"></a>

## ParamCheck
Param check module.


* [ParamCheck](#module_ParamCheck)
    * [~ParamCheck](#module_ParamCheck..ParamCheck)
        * [new ParamCheck()](#new_module_ParamCheck..ParamCheck_new)
        * [.type](#module_ParamCheck..ParamCheck+type)
        * [.isInstanceAndTypeOf(obj, typeOrName)](#module_ParamCheck..ParamCheck+isInstanceAndTypeOf) ⇒ <code>Boolean</code>

<a name="module_ParamCheck..ParamCheck"></a>

### ParamCheck~ParamCheck
**Kind**: inner class of <code>[ParamCheck](#module_ParamCheck)</code>  
**Access:** public  

* [~ParamCheck](#module_ParamCheck..ParamCheck)
    * [new ParamCheck()](#new_module_ParamCheck..ParamCheck_new)
    * [.type](#module_ParamCheck..ParamCheck+type)
    * [.isInstanceAndTypeOf(obj, typeOrName)](#module_ParamCheck..ParamCheck+isInstanceAndTypeOf) ⇒ <code>Boolean</code>

<a name="new_module_ParamCheck..ParamCheck_new"></a>

#### new ParamCheck()
Represents a param checker.

<a name="module_ParamCheck..ParamCheck+type"></a>

#### paramCheck.type
Prototype name

**Kind**: instance property of <code>[ParamCheck](#module_ParamCheck..ParamCheck)</code>  
<a name="module_ParamCheck..ParamCheck+isInstanceAndTypeOf"></a>

#### paramCheck.isInstanceAndTypeOf(obj, typeOrName) ⇒ <code>Boolean</code>
Defines a method which will check the given obj is not undefined, null, or not
specified typeOrName.

**Kind**: instance method of <code>[ParamCheck](#module_ParamCheck..ParamCheck)</code>  
**Returns**: <code>Boolean</code> - true when obj is defined, not null and matches the type specified by typeOrName.  
**Access:** public  

| Param | Type |
| --- | --- |
| obj | <code>\*</code> | 
| typeOrName | <code>String</code> &#124; <code>function</code> | 

**Example**  
```js
// built-in type
var result1 = new ParamCheck().isInstanceAndTypeOf(1, 'Number');
// User defined type
var result2 = new ParamCheck().isInstanceAndTypeOf(new ParamCheck(), ParamCheck);
```
<a name="module_participant"></a>

## participant
Participant module.


* [participant](#module_participant)
    * [~Participant](#module_participant..Participant) ⇐ <code>EventEmitter</code>
        * [new Participant()](#new_module_participant..Participant_new)
        * [.type](#module_participant..Participant+type)
        * [.disconnect()](#module_participant..Participant+disconnect)
        * [.reconnect()](#module_participant..Participant+reconnect)

<a name="module_participant..Participant"></a>

### participant~Participant ⇐ <code>EventEmitter</code>
**Kind**: inner class of <code>[participant](#module_participant)</code>  
**Extends:** <code>EventEmitter</code>  
**Access:** public  

* [~Participant](#module_participant..Participant) ⇐ <code>EventEmitter</code>
    * [new Participant()](#new_module_participant..Participant_new)
    * [.type](#module_participant..Participant+type)
    * [.disconnect()](#module_participant..Participant+disconnect)
    * [.reconnect()](#module_participant..Participant+reconnect)

<a name="new_module_participant..Participant_new"></a>

#### new Participant()
Represents a participant.

<a name="module_participant..Participant+type"></a>

#### participant.type
Prototype name

**Kind**: instance property of <code>[Participant](#module_participant..Participant)</code>  
<a name="module_participant..Participant+disconnect"></a>

#### participant.disconnect()
Defines a method to change the participant to disconnected.

**Kind**: instance method of <code>[Participant](#module_participant..Participant)</code>  
**Access:** public  
**See**

- [isDisconnected](isDisconnected)
- [Reconnect](Reconnect)

<a name="module_participant..Participant+reconnect"></a>

#### participant.reconnect()
Defines a method to change the participant to connected.

**Kind**: instance method of <code>[Participant](#module_participant..Participant)</code>  
**Access:** public  
**See**

- [isDisconnected](isDisconnected)
- [Disconnect](Disconnect)

<a name="module_participants"></a>

## participants
Participants module.


* [participants](#module_participants)
    * [~Participants](#module_participants..Participants) ⇐ <code>EventEmitter</code>
        * [new Participants()](#new_module_participants..Participants_new)
        * [.type](#module_participants..Participants+type)
        * [.contains(id)](#module_participants..Participants+contains) ⇒ <code>Boolean</code>
        * [.getById(id)](#module_participants..Participants+getById) ⇒ <code>Participant</code>
        * [.add(participant)](#module_participants..Participants+add)
        * [.remove(participant)](#module_participants..Participants+remove) ⇒ <code>Boolean</code>
        * [.removeById(participant)](#module_participants..Participants+removeById) ⇒ <code>Boolean</code>

<a name="module_participants..Participants"></a>

### participants~Participants ⇐ <code>EventEmitter</code>
**Kind**: inner class of <code>[participants](#module_participants)</code>  
**Extends:** <code>EventEmitter</code>  
**Access:** public  

* [~Participants](#module_participants..Participants) ⇐ <code>EventEmitter</code>
    * [new Participants()](#new_module_participants..Participants_new)
    * [.type](#module_participants..Participants+type)
    * [.contains(id)](#module_participants..Participants+contains) ⇒ <code>Boolean</code>
    * [.getById(id)](#module_participants..Participants+getById) ⇒ <code>Participant</code>
    * [.add(participant)](#module_participants..Participants+add)
    * [.remove(participant)](#module_participants..Participants+remove) ⇒ <code>Boolean</code>
    * [.removeById(participant)](#module_participants..Participants+removeById) ⇒ <code>Boolean</code>

<a name="new_module_participants..Participants_new"></a>

#### new Participants()
Represents a @see [Participant](Participant) collection.

<a name="module_participants..Participants+type"></a>

#### participants.type
Prototype name

**Kind**: instance property of <code>[Participants](#module_participants..Participants)</code>  
<a name="module_participants..Participants+contains"></a>

#### participants.contains(id) ⇒ <code>Boolean</code>
Defines a method which checks if the a participant is registered with the given id.

**Kind**: instance method of <code>[Participants](#module_participants..Participants)</code>  
**Returns**: <code>Boolean</code> - true if the id matches an existing participant; else false.  
**Throw**: when param id equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="module_participants..Participants+getById"></a>

#### participants.getById(id) ⇒ <code>Participant</code>
Defines a method to get a participant by id.

**Kind**: instance method of <code>[Participants](#module_participants..Participants)</code>  
**Returns**: <code>Participant</code> - the participant when found; else null.  
**Throw**: when param id equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="module_participants..Participants+add"></a>

#### participants.add(participant)
Defines a method which adds (registers) a participant with the participants collection.

**Kind**: instance method of <code>[Participants](#module_participants..Participants)</code>  
**Access:** public  
**Throw**: when param participant equates to false or is an incorrect type.  
**Throw**: when the participant's id is already registered.  

| Param | Type |
| --- | --- |
| participant | <code>Participant</code> | 

<a name="module_participants..Participants+remove"></a>

#### participants.remove(participant) ⇒ <code>Boolean</code>
Defines a method which removes a participant from the participants collection.

**Kind**: instance method of <code>[Participants](#module_participants..Participants)</code>  
**Returns**: <code>Boolean</code> - true if the participant was removed successfully; else false.  
**Access:** public  
**Throw**: when param participant equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| participant | <code>Participant</code> | 

<a name="module_participants..Participants+removeById"></a>

#### participants.removeById(participant) ⇒ <code>Boolean</code>
Defines a method which removes a participant from the participants collection by their

**Kind**: instance method of <code>[Participants](#module_participants..Participants)</code>  
**Returns**: <code>Boolean</code> - true if the participant was removed successfully; else false.  
**Access:** public  
**See{@link**: participant.id}.  
**Throw**: when param id equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| participant | <code>Participant</code> | 

<a name="module_JS pollyfills"></a>

## JS pollyfills
JS pollyfills module

<a name="module_room name factory"></a>

## room name factory
RoomNameFactory module.


* [room name factory](#module_room name factory)
    * [~RoomNameFactory](#module_room name factory..RoomNameFactory)
        * [new RoomNameFactory()](#new_module_room name factory..RoomNameFactory_new)
        * [.type](#module_room name factory..RoomNameFactory+type)

<a name="module_room name factory..RoomNameFactory"></a>

### room name factory~RoomNameFactory
**Kind**: inner class of <code>[room name factory](#module_room name factory)</code>  
**Access:** public  

* [~RoomNameFactory](#module_room name factory..RoomNameFactory)
    * [new RoomNameFactory()](#new_module_room name factory..RoomNameFactory_new)
    * [.type](#module_room name factory..RoomNameFactory+type)

<a name="new_module_room name factory..RoomNameFactory_new"></a>

#### new RoomNameFactory()
Represents a room name factory.

<a name="module_room name factory..RoomNameFactory+type"></a>

#### roomNameFactory.type
Prototype name

**Kind**: instance property of <code>[RoomNameFactory](#module_room name factory..RoomNameFactory)</code>  
<a name="module_session"></a>

## session
Session module.


* [session](#module_session)
    * [~Session](#module_session..Session)
        * [new Session(id, settings, host)](#new_module_session..Session_new)
        * [.type](#module_session..Session+type)
        * [.incrementRoundsPlayed()](#module_session..Session+incrementRoundsPlayed)
        * [.addContestant(contestant, teamName)](#module_session..Session+addContestant) ⇒ <code>AddContestantResponse</code>
        * [.complete()](#module_session..Session+complete) ⇒ <code>AddContestantResponse</code>
        * [.subscribeForStateChange(event, callback)](#module_session..Session+subscribeForStateChange) ⇒ <code>AddContestantResponse</code>
        * [.tryBuzzerPressRegister(contestantId)](#module_session..Session+tryBuzzerPressRegister) ⇒ <code>Boolean</code>
        * [.tryBuzzerAction(action)](#module_session..Session+tryBuzzerAction) ⇒ <code>Boolean</code>
        * [.updateSessionName(session)](#module_session..Session+updateSessionName)
        * [.updateMaxContestants()](#module_session..Session+updateMaxContestants) ⇒ <code>Boolean</code> &#124; <code>String</code>
        * [.updateTeamSize()](#module_session..Session+updateTeamSize) ⇒ <code>Boolean</code> &#124; <code>String</code>
        * [.updateMaxTeams()](#module_session..Session+updateMaxTeams) ⇒ <code>Boolean</code> &#124; <code>String</code>

<a name="module_session..Session"></a>

### session~Session
**Kind**: inner class of <code>[session](#module_session)</code>  
**Access:** public  
**Throw**: when param id equates to false or is an incorrect type.  
**Throw**: when param settings equates to false or is an incorrect type.  

* [~Session](#module_session..Session)
    * [new Session(id, settings, host)](#new_module_session..Session_new)
    * [.type](#module_session..Session+type)
    * [.incrementRoundsPlayed()](#module_session..Session+incrementRoundsPlayed)
    * [.addContestant(contestant, teamName)](#module_session..Session+addContestant) ⇒ <code>AddContestantResponse</code>
    * [.complete()](#module_session..Session+complete) ⇒ <code>AddContestantResponse</code>
    * [.subscribeForStateChange(event, callback)](#module_session..Session+subscribeForStateChange) ⇒ <code>AddContestantResponse</code>
    * [.tryBuzzerPressRegister(contestantId)](#module_session..Session+tryBuzzerPressRegister) ⇒ <code>Boolean</code>
    * [.tryBuzzerAction(action)](#module_session..Session+tryBuzzerAction) ⇒ <code>Boolean</code>
    * [.updateSessionName(session)](#module_session..Session+updateSessionName)
    * [.updateMaxContestants()](#module_session..Session+updateMaxContestants) ⇒ <code>Boolean</code> &#124; <code>String</code>
    * [.updateTeamSize()](#module_session..Session+updateTeamSize) ⇒ <code>Boolean</code> &#124; <code>String</code>
    * [.updateMaxTeams()](#module_session..Session+updateMaxTeams) ⇒ <code>Boolean</code> &#124; <code>String</code>

<a name="new_module_session..Session_new"></a>

#### new Session(id, settings, host)
Represents a session.


| Param | Type |
| --- | --- |
| id | <code>String</code> | 
| settings | <code>Settings</code> | 
| host | <code>Host</code> | 

<a name="module_session..Session+type"></a>

#### session.type
Prototype name

**Kind**: instance property of <code>[Session](#module_session..Session)</code>  
<a name="module_session..Session+incrementRoundsPlayed"></a>

#### session.incrementRoundsPlayed()
Defines a method to increment the rounds played.

**Kind**: instance method of <code>[Session](#module_session..Session)</code>  
**Access:** public  
**See**: [roundsPlayed](roundsPlayed)  
<a name="module_session..Session+addContestant"></a>

#### session.addContestant(contestant, teamName) ⇒ <code>AddContestantResponse</code>
Defines a method to add a contestant to the session.

**Kind**: instance method of <code>[Session](#module_session..Session)</code>  
**Returns**: <code>AddContestantResponse</code> - a complex response of success or not.  
**Access:** public  
**Throw**: when param contestant equates to false or is an incorrect type.  
**Throw**: when param teamName is required and equates to false or is an incorrect type.  

| Param | Type | Description |
| --- | --- | --- |
| contestant | <code>Contestant</code> |  |
| teamName | <code>String</code> | optional|required when settings.teamSelectionMethod = PLAYER_CHOICE. |

<a name="module_session..Session+complete"></a>

#### session.complete() ⇒ <code>AddContestantResponse</code>
Defines a method to complete the session.

**Kind**: instance method of <code>[Session](#module_session..Session)</code>  
**Returns**: <code>AddContestantResponse</code> - a complex response of success or not.  
**Access:** public  
**Throw**: when session state cannot transition to complete.  
<a name="module_session..Session+subscribeForStateChange"></a>

#### session.subscribeForStateChange(event, callback) ⇒ <code>AddContestantResponse</code>
Defines a method to subscribe for state change events.

**Kind**: instance method of <code>[Session](#module_session..Session)</code>  
**Returns**: <code>AddContestantResponse</code> - a complex response of success or not.  
**Access:** public  
**Throw**: when session state cannot transition to complete.  

| Param | Type |
| --- | --- |
| event | <code>String</code> | 
| callback | <code>function</code> | 

<a name="module_session..Session+tryBuzzerPressRegister"></a>

#### session.tryBuzzerPressRegister(contestantId) ⇒ <code>Boolean</code>
Defines a method which tries to register a buzzer press for the given
contestant id.

**Kind**: instance method of <code>[Session](#module_session..Session)</code>  
**Returns**: <code>Boolean</code> - true when the buzzer press was accepted; else false.  
**Access:** public  

| Param | Type |
| --- | --- |
| contestantId | <code>Number</code> | 

<a name="module_session..Session+tryBuzzerAction"></a>

#### session.tryBuzzerAction(action) ⇒ <code>Boolean</code>
Defines a method which tries the buzzer action.

**Kind**: instance method of <code>[Session](#module_session..Session)</code>  
**Returns**: <code>Boolean</code> - true if the buzzer action was accepted; else false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| action | <code>Number</code> | @see [constants.buzzerActionCommands](constants.buzzerActionCommands). |

<a name="module_session..Session+updateSessionName"></a>

#### session.updateSessionName(session)
Defines a method which updates the session's name.

**Kind**: instance method of <code>[Session](#module_session..Session)</code>  
**Access:** public  
**Throw**: when param name is required and equates to false or is an incorrect type.  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>String</code> | name. |

<a name="module_session..Session+updateMaxContestants"></a>

#### session.updateMaxContestants() ⇒ <code>Boolean</code> &#124; <code>String</code>
Defines a method which updates the max contestants for this session.

**Kind**: instance method of <code>[Session](#module_session..Session)</code>  
**Returns**: <code>Boolean</code> &#124; <code>String</code> - the result.  
**Access:** public  
**Throw**: when param maxContestants is required and equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| maxContestants. | <code>Number</code> | 

<a name="module_session..Session+updateTeamSize"></a>

#### session.updateTeamSize() ⇒ <code>Boolean</code> &#124; <code>String</code>
Defines a method which updates the team size for this session.

**Kind**: instance method of <code>[Session](#module_session..Session)</code>  
**Returns**: <code>Boolean</code> &#124; <code>String</code> - the result.  
**Access:** public  
**Throw**: when param teamSize is required and equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| teamSize. | <code>Number</code> | 

<a name="module_session..Session+updateMaxTeams"></a>

#### session.updateMaxTeams() ⇒ <code>Boolean</code> &#124; <code>String</code>
Defines a method which updates the max teams for this session.

**Kind**: instance method of <code>[Session](#module_session..Session)</code>  
**Returns**: <code>Boolean</code> &#124; <code>String</code> - the result.  
**Access:** public  
**Throw**: when param maxTeams is required and equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| maxTeams. | <code>Number</code> | 

<a name="module_sessions"></a>

## sessions
Sessions module.


* [sessions](#module_sessions)
    * [~Sessions](#module_sessions..Sessions)
        * [new Sessions()](#new_module_sessions..Sessions_new)
        * [.type](#module_sessions..Sessions+type)
        * [.add(Host, Settings)](#module_sessions..Sessions+add) ⇒ <code>Session</code>
        * [.getById(String)](#module_sessions..Sessions+getById) ⇒
        * [.purgeCompleted()](#module_sessions..Sessions+purgeCompleted)

<a name="module_sessions..Sessions"></a>

### sessions~Sessions
**Kind**: inner class of <code>[sessions](#module_sessions)</code>  
**Access:** public  

* [~Sessions](#module_sessions..Sessions)
    * [new Sessions()](#new_module_sessions..Sessions_new)
    * [.type](#module_sessions..Sessions+type)
    * [.add(Host, Settings)](#module_sessions..Sessions+add) ⇒ <code>Session</code>
    * [.getById(String)](#module_sessions..Sessions+getById) ⇒
    * [.purgeCompleted()](#module_sessions..Sessions+purgeCompleted)

<a name="new_module_sessions..Sessions_new"></a>

#### new Sessions()
Represents a @see [Session](Session) collection.

<a name="module_sessions..Sessions+type"></a>

#### sessions.type
Prototype name

**Kind**: instance property of <code>[Sessions](#module_sessions..Sessions)</code>  
<a name="module_sessions..Sessions+add"></a>

#### sessions.add(Host, Settings) ⇒ <code>Session</code>
Defines a method to add a session.

**Kind**: instance method of <code>[Sessions](#module_sessions..Sessions)</code>  
**Returns**: <code>Session</code> - the newly added session.  
**Access:** public  
**Throw**: when param host equates to false or is an incorrect type.  
**Throw**: when param settings equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| Host | <code>host</code> | 
| Settings | <code>settings</code> | 

<a name="module_sessions..Sessions+getById"></a>

#### sessions.getById(String) ⇒
Defines a method which gets a registered session by @see[session.id](session.id).

**Kind**: instance method of <code>[Sessions](#module_sessions..Sessions)</code>  
**Returns**: session matching the given id; or, null.  
**Access:** public  
**Throw**: when param id equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| String | <code>id</code> | 

<a name="module_sessions..Sessions+purgeCompleted"></a>

#### sessions.purgeCompleted()
Defines a method which removes sessions which have been completed.

**Kind**: instance method of <code>[Sessions](#module_sessions..Sessions)</code>  
**Access:** public  
<a name="module_settings"></a>

## settings
Settings module.


* [settings](#module_settings)
    * [~Settings](#module_settings..Settings)
        * [new Settings()](#new_module_settings..Settings_new)
        * [.type](#module_settings..Settings+type)
        * [.validate()](#module_settings..Settings+validate) ⇒ <code>Boolean</code> &#124; <code>String</code>

<a name="module_settings..Settings"></a>

### settings~Settings
**Kind**: inner class of <code>[settings](#module_settings)</code>  

* [~Settings](#module_settings..Settings)
    * [new Settings()](#new_module_settings..Settings_new)
    * [.type](#module_settings..Settings+type)
    * [.validate()](#module_settings..Settings+validate) ⇒ <code>Boolean</code> &#124; <code>String</code>

<a name="new_module_settings..Settings_new"></a>

#### new Settings()
Represents a the settings for a session.

<a name="module_settings..Settings+type"></a>

#### settings.type
Prototype name

**Kind**: instance property of <code>[Settings](#module_settings..Settings)</code>  
<a name="module_settings..Settings+validate"></a>

#### settings.validate() ⇒ <code>Boolean</code> &#124; <code>String</code>
Defines a method to validate whether the settings, in their current state, are valid for use to create a session.

**Kind**: instance method of <code>[Settings](#module_settings..Settings)</code>  
**Returns**: <code>Boolean</code> &#124; <code>String</code> - true when settings are valid; else false and the fail reason.  
**Access:** public  
<a name="module_team"></a>

## team
Team module.


* [team](#module_team)
    * [~Team](#module_team..Team)
        * [new Team()](#new_module_team..Team_new)
        * [.type](#module_team..Team+type)
        * [.tryAssignTeamLeader(contestant, hostOverride)](#module_team..Team+tryAssignTeamLeader) ⇒ <code>Boolean</code> &#124; <code>String</code>
        * [.tryChangeName(teamName, settings)](#module_team..Team+tryChangeName) ⇒ <code>Boolean</code> &#124; <code>String</code>
        * [.getContestantByUsername(username)](#module_team..Team+getContestantByUsername) ⇒ <code>Contestant</code>

<a name="module_team..Team"></a>

### team~Team
**Kind**: inner class of <code>[team](#module_team)</code>  

* [~Team](#module_team..Team)
    * [new Team()](#new_module_team..Team_new)
    * [.type](#module_team..Team+type)
    * [.tryAssignTeamLeader(contestant, hostOverride)](#module_team..Team+tryAssignTeamLeader) ⇒ <code>Boolean</code> &#124; <code>String</code>
    * [.tryChangeName(teamName, settings)](#module_team..Team+tryChangeName) ⇒ <code>Boolean</code> &#124; <code>String</code>
    * [.getContestantByUsername(username)](#module_team..Team+getContestantByUsername) ⇒ <code>Contestant</code>

<a name="new_module_team..Team_new"></a>

#### new Team()
Represents a team

<a name="module_team..Team+type"></a>

#### team.type
Prototype name

**Kind**: instance property of <code>[Team](#module_team..Team)</code>  
<a name="module_team..Team+tryAssignTeamLeader"></a>

#### team.tryAssignTeamLeader(contestant, hostOverride) ⇒ <code>Boolean</code> &#124; <code>String</code>
Defines a method to try assign a team leader.

**Kind**: instance method of <code>[Team](#module_team..Team)</code>  
**Returns**: <code>Boolean</code> &#124; <code>String</code> - whether the operation was successful, and when not, the
error message as to why it failed.  
**Access:** public  
**See{@link**: Contestant}.  
**Throw**: when param contestant equates to false or is an incorrect type.  
**Throw**: when param hostOverride is an incorrect type.  

| Param | Type | Description |
| --- | --- | --- |
| contestant | <code>Contestant</code> |  |
| hostOverride | <code>Boolean</code> | when set will ignore the current team leader and overwrite. |

<a name="module_team..Team+tryChangeName"></a>

#### team.tryChangeName(teamName, settings) ⇒ <code>Boolean</code> &#124; <code>String</code>
Defines a method to try update the team name.

**Kind**: instance method of <code>[Team](#module_team..Team)</code>  
**Returns**: <code>Boolean</code> &#124; <code>String</code> - whether the operation was successful, and when not, the
error message as to why it failed.  
**Access:** public  
**See{@link**: Settings}.  
**Throw**: when param teamName equates to false or is an incorrect type.  
**Throw**: when param settings equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| teamName | <code>String</code> | 
| settings | <code>Settings</code> | 

<a name="module_team..Team+getContestantByUsername"></a>

#### team.getContestantByUsername(username) ⇒ <code>Contestant</code>
Defines a method to get a contestant, who belong to the team, by their username.

**Kind**: instance method of <code>[Team](#module_team..Team)</code>  
**Returns**: <code>Contestant</code> - the contestant when found; else null.  
**Throw**: when param username equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| username | <code>String</code> | 

<a name="module_team factory"></a>

## team factory
TeamFactory module.


* [team factory](#module_team factory)
    * [~TeamFactory](#module_team factory..TeamFactory)
        * [new TeamFactory()](#new_module_team factory..TeamFactory_new)
        * [.type](#module_team factory..TeamFactory+type)
        * [.create(teams, settings)](#module_team factory..TeamFactory+create)
        * [.add(teams, settings)](#module_team factory..TeamFactory+add) ⇒ <code>Team</code>

<a name="module_team factory..TeamFactory"></a>

### team factory~TeamFactory
**Kind**: inner class of <code>[team factory](#module_team factory)</code>  
**Access:** public  

* [~TeamFactory](#module_team factory..TeamFactory)
    * [new TeamFactory()](#new_module_team factory..TeamFactory_new)
    * [.type](#module_team factory..TeamFactory+type)
    * [.create(teams, settings)](#module_team factory..TeamFactory+create)
    * [.add(teams, settings)](#module_team factory..TeamFactory+add) ⇒ <code>Team</code>

<a name="new_module_team factory..TeamFactory_new"></a>

#### new TeamFactory()
Represents a team factory

<a name="module_team factory..TeamFactory+type"></a>

#### teamFactory.type
Prototype name

**Kind**: instance property of <code>[TeamFactory](#module_team factory..TeamFactory)</code>  
<a name="module_team factory..TeamFactory+create"></a>

#### teamFactory.create(teams, settings)
Defines a factory method which create teams, number determined by the passed
in settings, to populate the given teams collection.

**Kind**: instance method of <code>[TeamFactory](#module_team factory..TeamFactory)</code>  
**Access:** public  
**Throw**: when param teams equates to false or is an incorrect type.  
**Throw**: when param settings equates to false or is an incorrect type.  
**Throw**: when @see [Settings.maxTeams](Settings.maxTeams) is less than or equal to 0.  
**Throw**: when @see [Settings.validate](Settings.validate) is not valid.  

| Param | Type |
| --- | --- |
| teams | <code>Teams</code> | 
| settings | <code>Settings</code> | 

<a name="module_team factory..TeamFactory+add"></a>

#### teamFactory.add(teams, settings) ⇒ <code>Team</code>
Defines a factory method add a new team to an existing session.

**Kind**: instance method of <code>[TeamFactory](#module_team factory..TeamFactory)</code>  
**Returns**: <code>Team</code> - team.  
**Access:** public  
**Throw**: when param teams equates to false or is an incorrect type.  
**Throw**: when param settings equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| teams | <code>Teams</code> | 
| settings | <code>Settings</code> | 

<a name="module_teams"></a>

## teams
Teams module.


* [teams](#module_teams)
    * [~Teams](#module_teams..Teams)
        * [new Teams()](#new_module_teams..Teams_new)
        * [.type](#module_teams..Teams+type)
        * [.contains(teamName)](#module_teams..Teams+contains) ⇒ <code>Boolean</code>
        * [.getByTeamName(teamName)](#module_teams..Teams+getByTeamName) ⇒ <code>Team</code>
        * [.add(team)](#module_teams..Teams+add)
        * [.remove(team)](#module_teams..Teams+remove) ⇒ <code>Boolean</code>
        * [.removeByTeamName(team)](#module_teams..Teams+removeByTeamName) ⇒ <code>Boolean</code>
        * [.addContestant(contestant, settings, inquireTeamLeaderCallback, teamName)](#module_teams..Teams+addContestant) ⇒ <code>Boolean</code> &#124; <code>String</code>
        * [.getByContestant(contestant)](#module_teams..Teams+getByContestant) ⇒ <code>Team</code>
        * [.getAvailable(settings)](#module_teams..Teams+getAvailable) ⇒ <code>Array.&lt;Team&gt;</code>

<a name="module_teams..Teams"></a>

### teams~Teams
**Kind**: inner class of <code>[teams](#module_teams)</code>  
**Access:** public  

* [~Teams](#module_teams..Teams)
    * [new Teams()](#new_module_teams..Teams_new)
    * [.type](#module_teams..Teams+type)
    * [.contains(teamName)](#module_teams..Teams+contains) ⇒ <code>Boolean</code>
    * [.getByTeamName(teamName)](#module_teams..Teams+getByTeamName) ⇒ <code>Team</code>
    * [.add(team)](#module_teams..Teams+add)
    * [.remove(team)](#module_teams..Teams+remove) ⇒ <code>Boolean</code>
    * [.removeByTeamName(team)](#module_teams..Teams+removeByTeamName) ⇒ <code>Boolean</code>
    * [.addContestant(contestant, settings, inquireTeamLeaderCallback, teamName)](#module_teams..Teams+addContestant) ⇒ <code>Boolean</code> &#124; <code>String</code>
    * [.getByContestant(contestant)](#module_teams..Teams+getByContestant) ⇒ <code>Team</code>
    * [.getAvailable(settings)](#module_teams..Teams+getAvailable) ⇒ <code>Array.&lt;Team&gt;</code>

<a name="new_module_teams..Teams_new"></a>

#### new Teams()
Represents a @see [Team](Team) collection.

<a name="module_teams..Teams+type"></a>

#### teams.type
Prototype name

**Kind**: instance property of <code>[Teams](#module_teams..Teams)</code>  
<a name="module_teams..Teams+contains"></a>

#### teams.contains(teamName) ⇒ <code>Boolean</code>
Defines a method which checks if the a team is registered with the given name.

**Kind**: instance method of <code>[Teams](#module_teams..Teams)</code>  
**Returns**: <code>Boolean</code> - True if the teamName matches an existing team; else false.  
**Throw**: when param teamName equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| teamName | <code>String</code> | 

<a name="module_teams..Teams+getByTeamName"></a>

#### teams.getByTeamName(teamName) ⇒ <code>Team</code>
Defines a method which gets a team by the team name.

**Kind**: instance method of <code>[Teams](#module_teams..Teams)</code>  
**Returns**: <code>Team</code> - the team with the matching name; else null.  
**Access:** public  
**See{@link**: Team}.  
**Throw**: when param teamName equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| teamName | <code>String</code> | 

<a name="module_teams..Teams+add"></a>

#### teams.add(team)
Defines a method which adds (registers) a team with the teams collection.

**Kind**: instance method of <code>[Teams](#module_teams..Teams)</code>  
**Access:** public  
**Throw**: when param team equates to false or is an incorrect type.  
**Throw**: when the team's name is already registered.  

| Param | Type |
| --- | --- |
| team | <code>Team</code> | 

<a name="module_teams..Teams+remove"></a>

#### teams.remove(team) ⇒ <code>Boolean</code>
Defines a method which removes a team from the teams collection.

**Kind**: instance method of <code>[Teams](#module_teams..Teams)</code>  
**Returns**: <code>Boolean</code> - true if the team was removed successfully; else false.  
**Access:** public  
**Throw**: when param team equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| team | <code>Team</code> | 

<a name="module_teams..Teams+removeByTeamName"></a>

#### teams.removeByTeamName(team) ⇒ <code>Boolean</code>
Defines a method which removes a team from the teams collection by their

**Kind**: instance method of <code>[Teams](#module_teams..Teams)</code>  
**Returns**: <code>Boolean</code> - true if the team was removed successfully; else false.  
**Access:** public  
**See{@link**: team.teamName}.  
**Throw**: when param teamName equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| team | <code>Team</code> | 

<a name="module_teams..Teams+addContestant"></a>

#### teams.addContestant(contestant, settings, inquireTeamLeaderCallback, teamName) ⇒ <code>Boolean</code> &#124; <code>String</code>
Defines a method which adds a contestant to a team.

**Kind**: instance method of <code>[Teams](#module_teams..Teams)</code>  
**Returns**: <code>Boolean</code> &#124; <code>String</code> - the result.  
**Access:** public  
**See{@link**: Team}.  
**See{@link**: Contestant}.  
**Throw**: when param contestant equates to false or is an incorrect type.  
**Throw**: when param settings equates to false or is an incorrect type.  
**Throw**: when param inquireTeamLeaderCallback equates to false or is an incorrect type.  
**Throw**: when param teamName is required and equates to false or is an incorrect type.  
**Throw**: when @see [Settings.hasTeams](Settings.hasTeams) is false.  

| Param | Type | Description |
| --- | --- | --- |
| contestant | <code>Contestant</code> |  |
| settings | <code>Settings</code> |  |
| inquireTeamLeaderCallback | <code>function</code> |  |
| teamName | <code>String</code> | optional|required when settings.teamSelectionMethod = PLAYER_CHOICE. |

<a name="module_teams..Teams+getByContestant"></a>

#### teams.getByContestant(contestant) ⇒ <code>Team</code>
Defines a method which gets a team by contestant.

**Kind**: instance method of <code>[Teams](#module_teams..Teams)</code>  
**Returns**: <code>Team</code> - the team the contest belongs to; else null.  
**Access:** public  
**See{@link**: Team}.  
**See{@link**: Contestant}.  
**Throw**: when param contestant equates to false or is an incorrect type.  

| Param | Type |
| --- | --- |
| contestant | <code>Contestant</code> | 

<a name="module_teams..Teams+getAvailable"></a>

#### teams.getAvailable(settings) ⇒ <code>Array.&lt;Team&gt;</code>
Defines a method which gets all teams which are available for a contestant to join.

**Kind**: instance method of <code>[Teams](#module_teams..Teams)</code>  
**Returns**: <code>Array.&lt;Team&gt;</code> - the teams a contestant may join.  
**Access:** public  
**See{@link**: Team}.  
**See{@link**: Contestant}.  

| Param | Type |
| --- | --- |
| settings | <code>Settings</code> | 

<a name="socketIo"></a>

## socketIo
This is the server for buzzer.click

**Kind**: global variable  
