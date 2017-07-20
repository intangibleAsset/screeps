var um = require('utilityMethods');

var roleRemoteMineralMiner = {

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
               var flagsArray1 = ['1','Terminus','Eden'];
               if(creep.memory.atBase === (undefined || false)){
                   if(um.followFlags(creep,flagsArray1)){
                       creep.memory.atBase = true;
                       creep.memory.atDestination = false;
                   }
               }else{
                   
                   
                   
                    if(creep.room.terminal){
                        if(creep.transfer(creep.room.terminal, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.terminal.pos, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        if(creep.transfer(creep.room.storage, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.storage.pos, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }

                }    	        
    	        
    	        

    	        
            }else{
                
               var flagsArray2 = ['Terminus','1','2'];
               if(creep.memory.atDestination === (undefined || false)){
                   if(um.followFlags(creep,flagsArray2)){
                       creep.memory.atDestination = true;
                       creep.memory.atBase = false;
                   }
               }else{
                   
                    var minerals = creep.pos.findClosestByPath(FIND_MINERALS);
    	       
        	        if(minerals) {
                        if(creep.harvest(minerals, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(minerals, {visualizePathStyle: {stroke: '#ffffff'}});
                        }                   
                    }

                }
                
            }
    }

};

module.exports = roleRemoteMineralMiner;
