var roleMineralMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var roomMineral = creep.room.find(FIND_MINERALS);
        
        if(creep.memory.transferring && _.sum(creep.carry) == 0) {
            creep.memory.transferring = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.transferring && _.sum(creep.carry) == creep.carryCapacity || creep.ticksToLive < 40) {
	        creep.memory.transferring = true;
	        creep.say('transfer');
	    }

	    if(creep.memory.transferring) {
	        
            if(creep.room.terminal){
                
                if(creep.transfer(creep.room.terminal, roomMineral[0].mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal.pos);
                }
            }
	       
        }
        else {
                
    	        if(roomMineral) {
                    if(creep.harvest(roomMineral[0], roomMineral[0].mineralType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roomMineral[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                
            }
            
        }

};

module.exports = roleMineralMiner;