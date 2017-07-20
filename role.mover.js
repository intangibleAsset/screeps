var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        

                if(creep.memory.transferring && _.sum(creep.carry) === 0) {
                    creep.memory.transferring = false;
                    creep.say('harvest');
        	    }
        	    if(!creep.memory.transferring && _.sum(creep.carry) === creep.carryCapacity) {
        	        creep.memory.transferring = true;
        	        creep.say('transfer');
        	    }
        
        	    if(creep.memory.transferring) {
        	       /*
        	       var labs = creep.room.find(FIND_STRUCTURES, {filter:{structureType: STRUCTURE_LAB}});
        	       
        	        if(labs.length > 0) {
                        if(creep.transfer(labs[1], RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(labs[1], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    */
                    /*
                    if(creep.transfer(creep.room.terminal,RESOURCE_HYDROXIDE)==ERR_NOT_IN_RANGE){
                        creep.moveTo(creep.room.terminal);    
                    }
        	        */
                }else{
                    /*
                    var labs = creep.room.find(FIND_STRUCTURES, {filter:{structureType: STRUCTURE_LAB}});
                    
                    if(labs.length > 0) {
                        if(creep.withdraw(labs[1], RESOURCE_HYDROXIDE) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(labs[1], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    */
                    /*
        	        if(creep.room.terminal) {
                        if(creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    */
                }
                    
        
    }

};

module.exports = roleMover;
