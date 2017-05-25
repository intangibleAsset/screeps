var roleWallrepper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var wall = Game.getObjectById(Memory.wall);


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
                  var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                         creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }

      }
};

module.exports = roleWallrepper;
