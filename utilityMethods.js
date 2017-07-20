var utilityMethods = {
   
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
   
   followFlags: function(creep,flagArray){
       if(!creep.memory.path){
           creep.memory.path = flagArray;
           creep.memory.step = 0;
       }
       
       if(creep.memory.path){
           if(creep.memory.step < creep.memory.path.length){
               creep.moveTo(Game.flags[creep.memory.path[creep.memory.step]], {visualizePathStyle: {stroke: '#ffffff'}});
               if(creep.pos.isNearTo(Game.flags[creep.memory.path[creep.memory.step]].pos)){
                   creep.memory.step += 1;
               }
           }
       
       
           if(creep.memory.path.length === creep.memory.step){
                creep.memory.path = null;
                creep.memory.step = 0;
                return true;
                
           }else{
               return false;
           }
       } 
    
       
   }

};

module.exports = utilityMethods;