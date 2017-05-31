var roleWallrepper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        //if statement ot set creeps target to repair so it dumps energy into one wall, otherwise they flit from one low hit point wall to another
        if(!creep.memory.currentWall){
            creep.memory.currentWall = Memory.wall;
        }
        
        var wall = Game.getObjectById(creep.memory.currentWall);


              if(creep.memory.repairing && creep.carry.energy == 0) {
                  creep.memory.repairing = false;
                  creep.memory.currentWall = false;
                  creep.say('harvest');
        	    }
        	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
        	        creep.memory.repairing = true;
        	        creep.say('repair');
        	    }

        	    if(creep.memory.repairing) {    
           	                
                    if(creep.repair(wall) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(wall.pos, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    
                }else{
                        if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage.pos);
                        }
                }

      }
};

module.exports = roleWallrepper;
