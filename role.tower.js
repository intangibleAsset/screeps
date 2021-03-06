var roleTower = {

    /** @param {Creep} creep **/
    run: function(thisTower,spawn,roomObj) {
        
       
        var tower = thisTower;
        if(tower) {
            
            var closestHostile = tower.room.find(FIND_HOSTILE_CREEPS);
            if(closestHostile.length > 0) {
                tower.attack(closestHostile[closestHostile.length -1]);
                spawn.memory.hostileInRoom = true;
                roomObj.memory.hostileInRoom = true;
            }else{
                spawn.memory.hostileInRoom = false;
                roomObj.memory.hostileInRoom = false;
            }
            
            var damagedStructures = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_ROAD ||
                                    structure.structureType == STRUCTURE_CONTAINER ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_TOWER ||
                                    structure.structureType == STRUCTURE_STORAGE) && structure.hits < structure.hitsMax;
                        }
                });
            
            
            if(damagedStructures && (!spawn.memory.hostileInRoom)) {
                tower.repair(damagedStructures);
            }
            
            if(!spawn.memory.hostileInRoom){
                let damagedCreeps = tower.room.find(FIND_MY_CREEPS, { filter: (creep) => {return ( creep.hits < creep.hitsMax );}});
                tower.heal(damagedCreeps[0]);
            }
            
        }
        
	}
};

module.exports = roleTower;