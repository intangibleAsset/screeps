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
                creep.moveTo(Game.flags['Step one'].pos, {visualizePathStyle: {stroke: '#ffffff'}});
                if(creep.pos.isNearTo(Game.flags['Step one'].pos)){
                    creep.memory.step = 1;
                    
                }
            }
            
            if(creep.memory.step === 1){
                creep.moveTo(Game.flags['Riverlands'].pos, {visualizePathStyle: {stroke: '#ffffff'}});
                if(creep.pos.isNearTo(Game.flags['Riverlands'].pos)){
                    creep.memory.step = 2;
                    creep.memory.atRemoteRoom = true;
                }
            }
            
        }
        if(creep.memory.atRemoteRoom){
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        //creep.signController(creep.room.controller,"We tend to exalt our rigid empirical methods and technological advances, almost as if we're proud of what we've accomplished");

        
    }//end run
};
module.exports = roleReserver;