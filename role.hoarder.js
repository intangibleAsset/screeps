var roleHoarder = {
    
    

    /** @param {Creep} creep **/
    run: function(creep) {
            
            this.init(creep);
        
    	    if(this.creep.carry.energy < this.creep.carryCapacity) {
                var sources = this.creep.room.find(FIND_SOURCES);
                if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                
                var target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                       }
                });
                
                
                if(target) {
                    if(this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            
	},
	init: function(creep){
	    this.creep = creep;
	},
};

module.exports = roleHoarder;