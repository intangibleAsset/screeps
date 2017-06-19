var roleRemoteTank = {
    
    
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
            creep.moveTo(Game.flags['Kill'].pos, {visualizePathStyle: {stroke: '#ffffff'}})
                if(creep.pos.roomName == Game.flags['Kill'].pos.roomName){
                    creep.memory.atRemoteRoom = true;
                    creep.memory.atBase = false;
                }
            
        }
        if(creep.memory.atRemoteRoom){
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            if(creep.attack(hostiles[0]) === ERR_NOT_IN_RANGE){
                creep.moveTo(hostiles[0].pos, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }

        
    }//end run
};
module.exports = roleRemoteTank;