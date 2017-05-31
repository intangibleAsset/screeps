var remoteharvester = {
    
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        creep.memory.atRemoteRoom;
        creep.memory.deposit;
        creep.memory.atBase;
        
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
            creep.moveTo(Game.flags['NewEden']);
            if(creep.pos.roomName == Game.flags['NewEden'].pos.roomName){
                creep.memory.atRemoteRoom = true;
                //console.log('1');
            }
        }
        
        if(creep.pos.roomName != Game.flags['Eden'].pos.roomName){
            creep.memory.atBase = false;
            //console.log('2');
        }
        
        if(creep.memory.atRemoteRoom && !creep.memory.deposit && creep.carry.energy < creep.carryCapacity){
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
            creep.moveTo(Game.flags['Eden']);
            if(creep.pos.roomName == Game.flags['Eden'].pos.roomName){
                creep.memory.atBase = true;
                //console.log('5');
            }            
            
        }
        
        if(creep.memory.deposit && creep.memory.atBase){
	       var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
	       
	        if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage.pos);
                }
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