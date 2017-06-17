var roomOne = require('roomOne');
//var roomTwo = require('roomTwo');



module.exports.loop = function () {
    
    //********************delete dead creeps****************************************************
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    //********************run various rooms*****************************************************
    roomOne.run(Game.spawns['Spawn1']);
    
    
    
}