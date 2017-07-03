var roleRemoteBuilder = {
    
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        creep.memory.atRemoteRoom;
        creep.memory.atBase;
        creep.memory.step;
        
        //set default spawn values
        
        if(creep.memory.atRemoteRoom == undefined){
            creep.memory.atRemoteRoom = false;
        }
        
        if(creep.memory.atBase == undefined){
            creep.memory.atBase = true;
        }
        
        if(creep.memory.atBase){
            if(!creep.memory.full){
                if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage.pos);
                }
                if(creep.carry.energy == creep.carryCapacity){
                    creep.memory.full = true;
                }
            }else{
                if(!creep.memory.step){
                creep.moveTo(Game.flags['Terminus'].pos, {visualizePathStyle: {stroke: '#ffffff'}});
                console.log('going terminus');
                if(creep.pos.isNearTo(Game.flags['Terminus'].pos)){
                    creep.memory.step = 1;
                    
                }
            }
            
            if(creep.memory.step === 1){
                creep.moveTo(Game.flags['1'].pos, {visualizePathStyle: {stroke: '#ffffff'}});
                console.log('going flag 1');
                if(creep.pos.isNearTo(Game.flags['1'].pos)){
                    creep.memory.step = 2;
                }
            }
            
            if(creep.memory.step === 2){
                creep.moveTo(Game.flags['2'].pos, {visualizePathStyle: {stroke: '#ffffff'}});
                if(creep.pos.isNearTo(Game.flags['2'].pos)){
                    creep.memory.step = 3;
                }
            }
            
            if(creep.memory.step === 3){
                creep.moveTo(Game.flags['3'].pos, {visualizePathStyle: {stroke: '#ffffff'}});
                if(creep.pos.isNearTo(Game.flags['3'].pos)){
                    creep.memory.step = 4;
                }
            }
            
            if(creep.memory.step === 4){
            creep.moveTo(Game.flags['Aunsou'].pos, {visualizePathStyle: {stroke: '#ffffff'}});
                if(creep.pos.isNearTo(Game.flags['Aunsou'].pos)){
                    creep.memory.atRemoteRoom = true;
                    creep.memory.atBase = false;
                }
            }
            }
            
        }
        if(creep.memory.atRemoteRoom){
    	    if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('harvest');
    	    }
    	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
    	        creep.memory.building = true;
    	        creep.say('build');
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
        }

        
    }//end run
};
module.exports = roleRemoteBuilder;