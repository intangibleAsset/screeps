var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        this.init(creep);

		if(creep.memory.upgrading && creep.carry.energy == 0) {
		    creep.memory.upgrading = false;
		    creep.say('harvest');
		    }
		    
		    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
			creep.memory.upgrading = true;
			creep.say('upgrade');
		    }

		    if(creep.memory.upgrading) {
    			if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    			creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
    		    }
    		}else {
    		    try{
            	    var thisRoom = Game.rooms[this.creep.memory.roomName];
                    var linkId = thisRoom.memory.controllerLinkId;
                    var controllerLink = Game.structures[linkId];
    		        
    		    }catch(err){
    		        console.log('error, probably no links in this room' + err)
    		    }
    		    
    		    if(controllerLink && controllerLink.energy > 0){
    		        if(this.creep.withdraw(controllerLink, RESOURCE_ENERGY)){
    		            this.creep.moveTo(controllerLink);
    		        }
    		        
    		    }
                else if(creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] !== 0){
                    if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage.pos);
                    }
    	        }else{
    	            var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
    		        
    		}
    },
    init: function(creep){
        this.creep = creep;
    }
};

module.exports = roleUpgrader;
