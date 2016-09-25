var ParamCheck = require('./ParamCheck');
var Teams = require('./Teams');
var Team = require('./Team');
var Settings = require('./Settings');
var union = require('arr-union');
var constants = require('./Constants');
var random = require('random-js')();

/**
 * TeamFactory module.
 * @module team factory
 */

/**
 * Represents a team factory
 * @public
 * @constructor
 */
function TeamFactory() {

}

/**
 * Prototype name
 */
TeamFactory.prototype.type = 'TeamFactory';

/**
 * @private
 */
TeamFactory.prototype._names = [
    'Defective Hornets',
    'Vast Dolphins',
    'Ahead Sharks',
    'Resonant Zebras',
    'Three Owls',
    'Tan Bison',
    'Teeny-tiny Kangaroos',
    'Resolute Nightingales',
    'Vengeful Elks',
    'Spotless Frogs',
    'Good Larks',
    'Craven Apes',
    'Equable Seals',
    'Bright Worms',
    'Greedy Birds',
    'Knowledgeable Panthers',
    'Cooing Hippopotamuses',
    'Violet Porcupines',
    'Tough Hedgehogs',
    'Lucky Crabs',
    'Deep Bears',
    'Pale Moles',
    'Eminent Salamanders',
    'Evasive Donkeys',
    'Second-hand Buffalos',
    'Exciting Squirrels',
    'Ashamed Shrews',
    'Dysfunctional Gazelles',
    'Plastic Antelopes',
    'Plant Wolves',
    'Various Turtles',
    'Sassy Chimpanzees',
    'Acceptable Koalas',
    'Cautious Sheep',
    'Wanting Eagles',
    'Industrious Dogfishes',
    'Tacky Hamsters',
    'Diligent Turkeys',
    'Spiffy Stinkbugs',
    'Lackadaisical Louses',
    'Snotty Monkeys',
    'Melodic Flies',
    'Tiny Lobsters',
    'Messy Mules',
    'Different Jellyfishes',
    'Foregoing Walruses',
    'Spiritual Magpies',
    'Abject Penguins',
    'Therapeutic Hornets',
    'Pointless Dolphins',
    'Jealous Sharks',
    'Aromatic Zebras',
    'Wacky Owls',
    'Happy Bisons',
    'Penitent Kangaroos',
    'Adjoining Nightingales',
    'Concerned Elks',
    'Imperfect Frogs',
    'Cloistered Larks',
    'Likeable Apes',
    'Inconclusive Seals'
];

/**
 * Defines a factory method which create teams, number determined by the passed
 * in settings, to populate the given teams collection.
 * @public
 * @param  {Teams} teams
 * @param  {Settings} settings
 * @throw when param teams equates to false or is an incorrect type.
 * @throw when param settings equates to false or is an incorrect type.
 * @throw when @see {@link Settings.maxTeams} is less than or equal to 0.
 * @throw when @see {@link Settings.validate} is not valid.
 */
TeamFactory.prototype.create = function(teams, settings) {
    if (!new ParamCheck().isInstanceAndTypeOf(teams, Teams) || !teams) {
        throw new Error('Argument `teams` is invalid. It is required and must be of the correct type.');
    }
    if (!new ParamCheck().isInstanceAndTypeOf(settings, Settings) || !settings) {
        throw new Error('Argument `settings` is invalid. It is required and must be of the correct type.');
    }
    if (settings.maxTeams < 1) {
        throw new Error('Settings must have a team size of greater than 0.');
    }
    var [r, e] = settings.validate();
    if (!r) {
        throw new Error('Settings must be valid. Error was: ' + e);
    }

    var names = this._names.slice().sort(function(a, b) {
        var r = random.integer(0, 2);
        return r === 0 ? 0 : (r === 1 ? -1 : 1);
    });

    if (settings.teamNames.length > 0) {
        names = union(settings.teamNames, names);
    }

    var teamsToAdd = settings.maxTeams === constants.UNLIMITED ? 1 : settings.maxTeams;

    for (var i = 0; i < teamsToAdd; i++) {
        var t = new Team();
        t.teamName = i < names.length - 1 ? names[i] : 'Team ' + i;
        teams.add(t);
    }
};

/**
 * Defines a factory method add a new team to an existing session.
 * @public
 * @param  {Teams} teams
 * @param  {Settings} settings
 * @throw when param teams equates to false or is an incorrect type.
 * @throw when param settings equates to false or is an incorrect type.
 * @return  {Team} team.
 */
TeamFactory.prototype.add = function(teams, settings) {
    if (!new ParamCheck().isInstanceAndTypeOf(teams, Teams) || !teams) {
        throw new Error('Argument `teams` is invalid. It is required and must be of the correct type.');
    }
    if (!new ParamCheck().isInstanceAndTypeOf(settings, Settings) || !settings) {
        throw new Error('Argument `settings` is invalid. It is required and must be of the correct type.');
    }
    if (settings.maxTeams < 1) {
        throw new Error('Settings must have a team size of greater than 0.');
    }

    var names = this._names.slice().sort(function(a, b) {
        var r = random.integer(0, 2);
        return r === 0 ? 0 : (r === 1 ? -1 : 1);
    });

    if (settings.teamNames.length > 0) {
        names = union(settings.teamNames, names);
    }

    var teamNames = [];

    teams.all.forEach(function(n) {
        teamNames.push(n.teamName);
    });

    names = names.filter(function(n) {
        return teamNames.indexOf(n) < 0;
    });

    var t = new Team();
    t.teamName = names.length > 0 ? names[0] : 'Team ' + teamNames.length + 1;
    teams.add(t);
    return t;
};

//Export the class
module.exports = new TeamFactory();
