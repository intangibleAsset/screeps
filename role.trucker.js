var roleTrucker = {

    /** @param {Creep} creep **/
    run: function(creep) {

            if(creep.memory.transferring && creep.carry.energy == 0) {
                creep.memory.transferring = false;
                creep.say('collect');
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
                }else{
                    if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage.pos);
                    }
                }
    	       
            }
            else {
    			var container = creep.room.find(FIND_STRUCTURES,{ filter: (structure) => { return(structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 0}});
    			if(container.length > 0){
    			    if(creep.withdraw(container[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    				    creep.moveTo(container[0]);
    			    } 
    	        }
    	    }
	    
    }//end run
};

module.exports = roleTrucker;