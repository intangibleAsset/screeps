var roleWallrepper = {

    /** @param {Creep} creep **/
    run: function(creep) {

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
                var wall = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL) && structure.energy < structure.energyCapacity;}});

       	        if(wall.length > 0) {
                       if(creep.repair(wall[0]) == ERR_NOT_IN_RANGE) {
                           creep.moveTo(wall[0], {visualizePathStyle: {stroke: '#ffffff'}});
                       }
                }
              }

      }
};

module.exports = roleWallrepper;
