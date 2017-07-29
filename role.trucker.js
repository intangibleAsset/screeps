var um = require('utilityMethods');

var roleTrucker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.container;
        
        var spawn = Game.getObjectById(Game.spawns[creep.memory.spawnName].id);
        
        if(!spawn.memory.hostileInRoom){
            
                if(creep.memory.transferring && creep.carry.energy == 0) {
                    creep.memory.transferring = false;
                    creep.memory.container = null;
                    creep.say('collect');
        	    }
        	    if(!creep.memory.transferring && creep.carry.energy == creep.carryCapacity || creep.ticksToLive < 60) {
        	        creep.memory.transferring = true;
        	        creep.say('transfer');
        	    }
        
        	    if(creep.memory.transferring) {
        	       
        	       var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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
                        if(creep.room.storage){
                            if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage.pos);
                            }
                        }
                        
                    }
        	       
                }
                else {
                        
            			if(!creep.memory.container || Game.getObjectById(creep.memory.container).store[RESOURCE_ENERGY] == 0){
                            creep.memory.container = um.returnContainer(creep);
                        }
            			
            			if(creep.memory.container){
                			var container = Game.getObjectById(creep.memory.container);
                			if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                			    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
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
        	        
        	            
                        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;}});

                        
        	            if(target) {
                            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }	        
                }else{
                    if(creep.room.storage){
                        if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage.pos);
                        }
                    }
        	    }
            
            
        }
	    
    }//end run
};

module.exports = roleTrucker;