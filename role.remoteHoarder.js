var roleRemoteHoarder = {
    
    

    /** @param {Creep} creep **/
    run: function(creep) {
            
        
    	    if(creep.carry.energy < creep.carryCapacity) {
    	        if(creep.memory.remoteLocation !== creep.pos){
    	            creep.moveTo(creep.memory.remoteLocation);
    	        }else{
                    var source = creep.pos.findClosestByPath(FIND_SOURCES);
                    creep.harvest(source);     
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

module.exports = roleRemoteHoarder;