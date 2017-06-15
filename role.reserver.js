var roleReserver = {
    
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        creep.memory.atRemoteRoom;
        creep.memory.atBase;
        
        //set default spawn values
        
        if(creep.memory.atRemoteRoom == undefined){
            creep.memory.atRemoteRoom = false;
        }
        
        if(creep.memory.atBase == undefined){
            creep.memory.atBase = true;
        }
        
        if(creep.memory.atBase){
            creep.moveTo(Game.flags['NewEden'].pos)
                if(creep.pos.roomName == Game.flags['NewEden'].pos.roomName){
                    creep.memory.atRemoteRoom = true;
                    creep.memory.atBase = false;
                }
            
        }
        if(creep.memory.atRemoteRoom){
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        //creep.signController(creep.room.controller,'Hostile acts with be repaid in kind, so will co-operative ones. Message me if you intend either.');

        
    }//end run
};
module.exports = roleReserver;