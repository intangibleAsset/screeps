var um = require('utilityMethods');

var roleGuardDog = {

    /** @param {creep} creep **/
    run: function(creep) {
            
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            var flagArray = ['The Kingdom','Eden','Hope Street','Destruction','NewEden','Greyland','Scotland','Erin','Terminus'];
            
            if(hostiles){
                if(creep.attack(hostiles[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }                
            }
            
            if(!hostiles){
                um.followFlags(creep,flagArray);
            }
            

            
            
            
    }
	
};

module.exports = roleGuardDog;