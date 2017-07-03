var roomOne = require('roomOne');
var roomTwo = require('roomTwo');
var roomThree = require('roomThree');



module.exports.loop = function () {
    
    //********************delete dead creeps****************************************************
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    //********************run various rooms*****************************************************
    roomOne.run(Game.spawns['Spawn1']);
    roomTwo.run(Game.spawns['Spawn2']);
    roomThree.run(Game.spawns['Spawn3']);
    
    
}