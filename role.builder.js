var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(Memory.peace){
        
    	    if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('Ã°ÂÂÂ harvest');
    	    }
    	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
    	        creep.memory.building = true;
    	        creep.say('Ã°ÂÂÂ§ build');
    	    }
    
    	    if(creep.memory.building) {
    	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
    	    }
    	    else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
    	    }
        }else{
            creep.moveTo(Game.flags['PanicRoom'].pos);
        }
	}
};

module.exports = roleBuilder;
