var um = require('utilityMethods');

var roleGuardDog = {

    /** @param {creep} creep **/
    run: function(creep) {
            
        if(!creep.pos.inRangeTo(Game.getObjectById('5839062db454aeb0592e3ee9'),2)){
            creep.moveTo(Game.getObjectById('5839062db454aeb0592e3ee9'));
        }else{
            creep.attack(Game.getObjectById('5839062db454aeb0592e3ee9'));
        }
        
    }
	
};

module.exports = roleGuardDog;