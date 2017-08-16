
var roleTrucker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.container;
        
        
        var spawn = Game.getObjectById(Game.spawns[creep.memory.spawnName].id);
        
        if(!spawn.memory.hostileInRoom){
            
                if(creep.memory.transferring && creep.carry.energy == 0) {
                    creep.memory.transferring = false;
                    creep.memory.container = null;
                    creep.say('collect');
        	    }
        	    if(!creep.memory.transferring && creep.carry.energy == creep.carryCapacity || creep.ticksToLive < 60) {
        	        creep.memory.transferring = true;
        	        creep.say('transfer');
        	    }
        
        	    if(creep.memory.transferring) {
        	       
        	       var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION ||
                                        structure.structureType == STRUCTURE_SPAWN ||
                                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                            }
                    });
        	       
        	        if(target) {
                        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        if(creep.room.storage){
                            if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage.pos);
                            }
                        }
                        
                    }
        	       
                }
                else {
                        
            			if(!creep.memory.container || Game.getObjectById(creep.memory.container).store[RESOURCE_ENERGY] == 0){
                            creep.memory.container = this.returnContainer(creep);
                        }
            			
            			if(creep.memory.container){
                			var container = Game.getObjectById(creep.memory.container);
                			if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                			    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                			} 
            			}
                    
        	        
        	        
        	    }
        }else{
            
                if(creep.memory.transferring && creep.carry.energy == 0) {
                    creep.memory.transferring = false;
                    creep.say('collect');
        	    }
        	    if(!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
        	        creep.memory.transferring = true;
        	        creep.say('transfer');
        	    }
        
        	    if(creep.memory.transferring) {
        	        
        	            
                        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;}});

                        
        	            if(target) {
                            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }	        
                }else{
                    if(creep.room.storage){
                        if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage.pos);
                        }
                    }
        	    }
            
            
        }
	    
    },
    returnContainer: function(creep){
    //find all none empty containers
    var allNoneEmptyContainers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => { return (structure.structureType === STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 0;}});
        
    //make array for all truckers other than this creep
    var truckerArray = []; 
        
    //loop through all creeps and add all truckers that are not this creep and in the same room as this creep to truckerArray
    for(let i in Game.creeps){
        let loopCreep = Game.creeps[i];
        if(loopCreep.memory.role === 'trucker' && loopCreep.pos.roomName === creep.pos.roomName && loopCreep.id !== creep.id){
            truckerArray.push(loopCreep);
        }
    }
        
    //go through truckers and if their target container is the same as the first in allNoneEmptyContainers push it the back of the list
    for(let x of truckerArray){
        //if statement skips if any truckers have undefined container or will throw and error
        if(x.memory.container && allNoneEmptyContainers[0]){
            if(x.memory.container.id === allNoneEmptyContainers[0].id){
                let item = allNoneEmptyContainers.shift();
                allNoneEmptyContainers.push(item);
            }
        }
    }
        
    //return the first container object in sorted list if there are no none empty containers return null
    var value = null;
    if(allNoneEmptyContainers[0]){
        value = allNoneEmptyContainers[0].id
    }
     return value;
        
   },
};

module.exports = roleTrucker;