var roleRemoteBuilder = {
    
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
		//go to destination if not there head to location
		if(!creep.pos.isEqualTo(new RoomPosition(35,19,'W69N36'))){
			creep.moveTo(new RoomPosition(35,19,'W69N36'), {visualizePathStyle: {stroke: '#ffaa00'}});
		}else{
		    creep.memory.atDestination = true;
		}
		
		if(creep.memory.atDestination){
            
            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('harvest');
        	}
        	
        	if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
        	    creep.memory.building = true;
        	    creep.say('build');
            }
            
            if(creep.memory.building){
                
    	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
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
module.exports = roleRemoteBuilder;