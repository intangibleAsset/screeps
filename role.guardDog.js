var um = require('utilityMethods');

var roleGuardDog = {

    /** @param {creep} creep **/
    run: function(creep) {
            
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            var flagArray = ['The Kingdom','Eden','Hope Street','Destruction','NewEden','Greyland','Scotland','Erin','Terminus'];
            
            if(hostiles.length > 0){
                if(creep.attack(hostiles[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    Game.notify('guardDog met a baddie in room '+creep.pos.roomName);
                }                
            }
            
            if(hostiles.length === 0){
                um.followFlags(creep,flagArray);
            }
            

            
            
            
    }
	
};

module.exports = roleGuardDog;