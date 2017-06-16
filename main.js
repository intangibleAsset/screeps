var roomOne = require('roomOne');
//var roomTwo = require('roomTwo');



module.exports.loop = function () {
    
    //********************run various rooms*****************************************************
    roomOne.run(Game.spawns['Spawn1']);
    

    
    
    
    //********************delete dead creeps****************************************************
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    
}