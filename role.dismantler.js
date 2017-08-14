var um = require('utilityMethods');

var roleDismantler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
            if(creep.memory.atBase === undefined){
                creep.memory.atDestination = false;
                creep.memory.atBase = true;
            }
            
            if(creep.memory.transferring && _.sum(creep.carry) == 0) {
                creep.memory.transferring = false;
                creep.say('harvest');
    	    }
    	    if(!creep.memory.transferring && _.sum(creep.carry) == creep.carryCapacity || creep.ticksToLive < 120) {
    	        creep.memory.transferring = true;
    	        creep.say('transfer');
    	    }
    
    	    if(creep.memory.transferring) {
               var flagsArray1 = ['Riverlands'];
               if(creep.memory.atBase === (undefined || false)){
                   if(um.followFlags(creep,flagsArray1)){
                       creep.memory.atBase = true;
                       creep.memory.atDestination = false;
                   }
               }else{
                   
                    if(creep.room.storage){
                        if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }

                }    	        
    	        
    	        

    	        
            }else{
                
               var flagsArray2 = ['Riverlands'];
               if(creep.memory.atDestination === (undefined || false)){
                   if(um.followFlags(creep,flagsArray2)){
                       creep.memory.atDestination = true;
                       creep.memory.atBase = false;
                   }
               }else{
                   var wall = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: {structureType: STRUCTURE_WALL}});
                   if(creep.dismantle(wall) == ERR_NOT_IN_RANGE){
                       creep.moveTo(wall);
                   }
                   
                    
                }
                
            }
    }

};

module.exports = roleDismantler;