var roleTrucker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        creep.memory.towerFiller;
        
        if(!Memory.hostileInRoom){
            
                if(creep.memory.transferring && creep.carry.energy == 0) {
                    creep.memory.transferring = false;
                    creep.say('collect');
        	    }
        	    if(!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
        	        creep.memory.transferring = true;
        	        creep.say('transfer');
        	    }
        
        	    if(creep.memory.transferring) {
        	       
        	       var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION ||
                                        structure.structureType == STRUCTURE_SPAWN ||
                                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                            }
                    });
        	       
        	        if(target) {
                        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage.pos);
                        }
                    }
        	       
                }
                else {
        			var container = creep.pos.findClosestByRange(FIND_STRUCTURES,{ filter: (structure) => { return(structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 151}});
        			if(container){
        			    if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        				    creep.moveTo(container);
        			    } 
        	        }
        	    }
        }else{
            
                if(creep.memory.transferring && creep.carry.energy == 0) {
                    creep.memory.transferring = false;
                    creep.say('collect');
        	    }
        	    if(!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
        	        creep.memory.transferring = true;
        	        creep.say('transfer');
        	    }
        
        	    if(creep.memory.transferring) {
        	        
        	            if(!creep.memory.towerFiller){
                            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;}});
        	            }else{
        	                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;}});
        	            }
                        
        	            if(target) {
                            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }	        
                }
                else {
                        if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage.pos);
                        }
        	    }
            
            
        }
	    
    }//end run
};

module.exports = roleTrucker;