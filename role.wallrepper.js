var roleWallrepper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
            creep.memory.wallstrength;
            var wall;
            
            var allWalls = Game.spawns[creep.memory.spawnName].room.find(FIND_STRUCTURES,{filter: (structure) => {return(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART ) && structure.hits < structure.hitsMax;}});
            if(allWalls){
                allWalls.sort(function(a,b){return a.hits - b.hits;});
                creep.memory.wallstrength = allWalls[0].hits + 2000;
                wall = allWalls[0];
                }
                
            //if statement ot set creeps target to repair so it dumps energy into one wall, otherwise they flit from one low hit point wall to another
            if(!creep.memory.currentWall){
                creep.memory.currentWall = wall.id;
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
           	                
                    if(creep.repair(Game.getObjectById(creep.memory.currentWall)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.currentWall).pos, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    
                }else{
                        if(creep.room.storage){
                            if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage.pos);
                            }
                        }else{
                            var sources = creep.room.find(FIND_SOURCES);
                            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        }
                }

      }
};

module.exports = roleWallrepper;
