var roleReserver = {
    
    
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
        if(creep.memory.atRemoteRoom){
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        creep.signController(creep.room.controller,"correlation does not imply causation");

        
    }//end run
};
module.exports = roleReserver;