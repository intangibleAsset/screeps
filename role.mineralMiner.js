var roleMineralMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.transferring && _.sum(creep.carry) == 0) {
            creep.memory.transferring = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.transferring && _.sum(creep.carry) == creep.carryCapacity || creep.ticksToLive < 40) {
	        creep.memory.transferring = true;
	        creep.say('transfer');
	    }

	    if(creep.memory.transferring) {
	        
            if(creep.room.storage){
                if(creep.transfer(creep.room.storage, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage.pos);
                }
            }
	       
        }
        else {
            var minerals = creep.pos.findClosestByPath(FIND_MINERALS);
	       
	        if(minerals) {
                if(creep.harvest(minerals, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(minerals, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{//moves creeps to spawn when nothing is being spawned to prevent blocking the energy source
                creep.moveTo(5,41);
            }
            }
            
        }

};

module.exports = roleMineralMiner;