var ParamCheck = require('./ParamCheck');

function Session() {

}

Session.prototype.type = 'Session';

Session.prototype.id = null;
//Session.prototype.participants: Participants
//Session.prototype.teams: Teams
//Session.prototype.settings: SessionSettings
Session.prototype.roundsPlayed = 0;
//Session.prototype.state = ;

//Export the class
module.exports = Session;



/*
IdentifierUtility
--
+ generateSessionId(): String
+ generateSessionParticipantId(): String
// This is a comment
// (--) This is a section break
// Line break (\n) enter in-between text for line break
*/

// function Session(id, settings, host) {
//     this.id = id;
//     this.settings = settings;
//     this.host = host;
// }

/*Session
--
- id: String
- participants: Participants
- teams: Teams
- settings: SessionSettings
- roundsPlayed: Int
- state: StateMachine
--
+ getHost(): Host
+ getContestants(): Array[Contestants]
+ addContestant(contestant: Contestant): AddContestantResponse
+ getObservers(): Array[Observer]
+ getRoundsPlayed(): Int
+ incrementRoundsPlayed(): void
+ isSessionCompleted(): Boolean

*/