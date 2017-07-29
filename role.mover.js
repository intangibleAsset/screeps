var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
                //need to generalise this with creep.carrycapacity .... otherwise creep can only have 200 carry capacity
        
                var spawn = Game.spawns[creep.memory.spawnName];
                var labs = spawn.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}});
        
                if(creep.memory.step === undefined){
                    creep.memory.step = 0;
                }

                if(creep.memory.transferring && _.sum(creep.carry) === 0) {
                    creep.memory.transferring = false;
                    creep.say('harvest');
        	    }
        	    if(!creep.memory.transferring && _.sum(creep.carry) === creep.carryCapacity) {
        	        creep.memory.transferring = true;
        	        creep.say('transfer');
        	    }
        
        	    if(creep.memory.transferring) {

        	        if(creep.memory.step === 0){
        	            if(creep.transfer(labs[1], creep.memory.minerals[0]) === ERR_NOT_IN_RANGE){
        	                creep.moveTo(labs[1]);
        	            }else{
							creep.memory.step += 1;
						}
							
        	        }
        	        
        	        if(creep.memory.step === 1){
        	            if(creep.transfer(labs[2], creep.memory.minerals[1]) === ERR_NOT_IN_RANGE){
        	                creep.moveTo(labs[2]);
        	            }else{
							creep.memory.step += 1;
						}        	            
        	        }
        	        
        	        if(creep.memory.step === 2){
        	            if(creep.transfer(creep.room.terminal,creep.memory.minerals[2]) === ERR_NOT_IN_RANGE){
        	                creep.moveTo(creep.moveTo(creep.room.storage));
        	            }else{
        	                creep.memory.step = 0;
        	            }
        	        }
        	        

        	        

                }else{
                    
                    if(creep.memory.minerals[0]){
                        if(creep.memory.step === 0 && creep.room.terminal.store[creep.memory.minerals[0]] > 200 && labs[1].mineralAmount < 2801){
                            if(creep.withdraw(creep.room.terminal, creep.memory.minerals[0]) == ERR_NOT_IN_RANGE){
                                creep.moveTo(creep.room.terminal);
                            }
                        }
                    }
                    
                    if(creep.memory.step === 0 && labs[1].mineralAmount > 2801){
                        creep.memory.step += 1;
                    }
                    
                    if(creep.memory.step === 1 && creep.room.terminal.store[creep.memory.minerals[1]] > 200 && labs[2].mineralAmount < 2801){
                        if(creep.withdraw(creep.room.terminal, creep.memory.minerals[1]) == ERR_NOT_IN_RANGE){
                            creep.moveTo(creep.room.terminal);
                        }
                    }
                    
                    if(creep.memory.step === 1 && labs[2].mineralAmount > 2801){
                        creep.memory.step += 1;
                    }
                    
                    if(creep.memory.step === 2 && labs[0].mineralAmount > 200){
        	            if(creep.withdraw(labs[0], creep.memory.minerals[2]) === ERR_NOT_IN_RANGE){
        	                creep.moveTo(labs[0]);
        	            }
                    }                    
                    
                    if(creep.memory.step === 2 && labs[0].mineralAmount < 200){
                           creep.memory.step = 0;
                    }
                    

                }
                    
        
    }

};

module.exports = roleMover;