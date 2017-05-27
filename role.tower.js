var roleTower = {

    /** @param {Creep} creep **/
    run: function(towerId) {
       
        var tower = Game.getObjectById(towerId);
        if(tower) {
            
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
                Game.spawns['Spawn1'].room.controller.activateSafeMode();
            }
            
            var damagedStructures = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_ROAD ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_TOWER ||
                                    structure.structureType == STRUCTURE_STORAGE) && structure.hits < structure.hitsMax;
                        }
                });
            
            
            if(damagedStructures) {
                tower.repair(damagedStructures);
            }
        }
        
	}
};

module.exports = roleTower;