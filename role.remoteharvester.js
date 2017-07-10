var remoteharvester = {
    
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        
        var baseFlag = Game.spawns[creep.memory.spawnName].room.find(FIND_FLAGS)[0];

        
        creep.memory.atRemoteRoom;
        creep.memory.deposit;
        creep.memory.atBase;
        creep.memory.flag;
        
        //set default spawn values
        
        if(creep.memory.atRemoteRoom == undefined){
            creep.memory.atRemoteRoom = false;
        }
        
        if(creep.memory.deposit == undefined){
            creep.memory.deposit = false;
        }
        if(creep.memory.atBase == undefined){
            creep.memory.atBase = true;
        }
        
        
        
        if(!creep.memory.atRemoteRoom && !creep.memory.deposit){
            creep.moveTo(Game.flags[creep.memory.flag]);
            if(creep.pos.roomName == Game.flags[creep.memory.flag].pos.roomName){
                creep.memory.atRemoteRoom = true;
                //console.log('1');
            }
        }
        
        if(creep.pos.roomName != baseFlag.pos.roomName){
            creep.memory.atBase = false;
            //console.log('2');
        }
        
        if(creep.memory.atRemoteRoom && !creep.memory.deposit && (creep.carry.energy < creep.carryCapacity || creep.ticksToLive < 60)){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            //console.log('3');
        }
        
        if(!creep.memory.deposit && creep.carryCapacity == creep.carry.energy){
            creep.memory.deposit = true;
            //console.log('4');
        }
        
        if(creep.memory.deposit && !creep.memory.atBase){
            creep.moveTo(baseFlag);
            if(creep.pos.roomName == baseFlag.pos.roomName){
                creep.memory.atBase = true;
                //console.log('5');
            }            
            
        }
        
        if(creep.memory.deposit && creep.memory.atBase){

                if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage.pos);
                }
        }
        
        if(creep.memory.atBase && creep.memory.deposit && creep.carry.energy == 0){
            creep.memory.deposit = false;
            creep.memory.atRemoteRoom = false;
            //console.log('7');
        }
        //at remote room needs clearing up as its not checked at the right time
        
    }//end run
};
module.exports = remoteharvester;