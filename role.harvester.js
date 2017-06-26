var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.transferring && creep.carry.energy == 0) {
            creep.memory.transferring = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.transferring = true;
	        creep.say('transfer');
	    }

	    if(creep.memory.transferring) {
	       
	       var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
	       
	        if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{//moves creeps to spawn when nothing is being spawned to prevent blocking the energy source
                creep.moveTo(30,35);
            }
	       
        }
        else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
        }

};

module.exports = roleHarvester;
