require('prototype.creep');
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
    
    //********************spawner visual*******************************************************
    for(let i in Game.spawns){
        if(Game.spawns[i].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns[i].spawning.name];
            Game.spawns[i].room.visual.text(
                'New: ' + spawningCreep.memory.role,
                Game.spawns[i].pos.x + 1, 
                Game.spawns[i].pos.y, 
                {align: 'left', opacity: 1, font: 0.5});
        }
    }
    
    
}