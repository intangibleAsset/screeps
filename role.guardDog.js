var um = require('utilityMethods');

var roleGuardDog = {

    /** @param {creep} creep **/
    run: function(creep) {
            
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            var hostilesRoomArray = Game.spawns['Spawn1'].memory.bads;
            
            
            if(hostiles.length > 0){
                if(creep.attack(hostiles[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                
                
            
            }else{
               creep.moveTo(new RoomPosition(12,12,'W61N34)')); 

            }

    }
	
};

module.exports = roleGuardDog;