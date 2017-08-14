var roleHoarder = {
    
    

    /** @param {Creep} creep **/
    run: function(creep) {
            
        
    	    if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                       }
                });
                
                
                if(target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }

        
	}//end run
};

module.exports = roleHoarder;