var roomOne = require('roomOne');
var roomTwo = require('roomTwo');
var roomThree = require('roomThree');
var roomFour = require('roomFour')


module.exports.loop = function () {
    
    
    
    //********************delete dead creeps****************************************************
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    //********************run various rooms*****************************************************
    roomOne.run(Game.spawns['Spawn1'],Game.rooms['W63N36']);
    roomTwo.run(Game.spawns['Spawn2'],Game.rooms['W61N35']);
    roomThree.run(Game.spawns['Spawn3'],Game.rooms['W68N35']);
    roomFour.run(Game.spawns['Spawn4'],Game.rooms['W68N37']);
    
}