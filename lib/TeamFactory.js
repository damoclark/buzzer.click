var ParamCheck = require('./ParamCheck');
var Teams = require('./Teams');
var Team = require('./Team');
var Settings = require('./Settings');

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
    'Greedy Guineapigs',
    'Knowledgeable Panthers',
    'Cooing Hippopotamuss',
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
    'Melodic Flys',
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

    var names = this._names.slice().sort(function(a, b) {
        return Math.random() > 0.5 ? 1 : 0;
    });

    for (var i = 0; i < settings.maxTeams; i++) {
        var t = new Team();
        t.teamName = i < names.length - 1 ? names[i] : 'Team ' + i;
        teams.add(t);
    }
};

//Export the class
module.exports = new TeamFactory();
