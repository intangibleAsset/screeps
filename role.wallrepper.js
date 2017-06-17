var roleWallrepper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
            creep.memory.wallstrength;
            var wall;
            
            var allWalls = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES,{filter: (structure) => {return(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART ) && structure.hits < structure.hitsMax;}});
            if(allWalls){
                allWalls.sort(function(a,b){return a.hits - b.hits;});
                creep.memory.wallstrength = allWalls[0].hits + 2000;
                wall = allWalls[0];
                }


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
