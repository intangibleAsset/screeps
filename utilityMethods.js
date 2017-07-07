var utilityMethods = {
    
    assignSource: function (creep){
        //equally assigns sources between creeps currently set for all creeps in all rooms
        var sources = creep.room.find(FIND_SOURCES);
        var sourceArray = [];
       
        for(let i = 0; i < sources.length; i++){
            sourceArray.push([i,0])
        }
        
        
        
        for(let i in Game.creeps){
            var loopCreep = Game.creeps[i];
            for(let x of sourceArray){
                if(loopCreep.memory.source === x[0]){
                    x[1] += 1;
                }
            }
        }
        
        let temp = sourceArray.sort(function(a,b){ return a[1] - b[1]; });
        creep.memory.source = sourceArray[0][0];
        
   }, //note the comma after the first method. It would appear that this is because functions can be variables it makes sense as dictionary notation
   
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
       if(creep.memory.path === (null || undefined)){
           creep.memory.path = flagArray;
           creep.memory.step = 0;
       }
       
       while(creep.memory.step < flagArray.length){
           creep.moveTo(flagArray[creep.memory.step], {visualizePathStyle: {stroke: '#ffffff'}});
           if(creep.pos.isNearTo(Game.flags[creep.memory.flagArray[creep.memory.step]].pos)){
               creep.memory.step += 1;
           }
       }
       
       if(flagArray.length === creep.memory.step){
            creep.memory.path = null;
            creep.memory.step = 0;
       }
            
    
       
   }

};

module.exports = utilityMethods;