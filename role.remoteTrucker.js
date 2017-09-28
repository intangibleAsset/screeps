var roleRemoteTrucker = {

    run: function(creep) {
        
            this.init(creep);
            
            if(this.creep.memory.transferring && this.creep.carry.energy == 0) {
                this.creep.memory.transferring = false;
                this.creep.say('harvest');
            }
            
            if(!this.creep.memory.transferring && this.creep.carry.energy == this.creep.carryCapacity) {
                this.creep.memory.transferring = true;
                this.creep.say('transfer');
            }
            
            if(this.creep.memory.transferring){
                if(this.atBase()){
                    this.transferEnergy();
                }else{
                    this.creep.moveTo(new RoomPosition(25,25,this.creep.memory.roomName),{visualizePathStyle: {stroke: '#ffaa00'}});
                    this.repairRoadStandingOn();
                }
            }else{
                try{
                    if(this.atSource()){
                        this.harvestFromContainer();
                    }else{
                        this.creep.moveTo(this.creep.memory.remoteSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                catch(err){
                    console.log('something went wrong in remoteTrucker: ' + err);
                }
            }
                

    
    },
    
    init: function(creep){
        this.creep = creep;
    },
    atSource: function(){
        var value;
        if(this.creep){
            if(this.creep.pos.inRangeTo(this.creep.memory.remoteSource,4)){
                value = true;
            }else{
                value = false;
            }
            return value;
        }
    },
    atBase: function(){
        let value;
        if(this.creep.pos.roomName === this.creep.memory.roomName){
            value = true;
        }else{
            value = false;
        }
        return value;
    },
    harvestFromContainer: function(){
        let container = this.creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => { return (structure.structureType === STRUCTURE_CONTAINER)}});
        if(this.creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
            this.creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },
    transferEnergy: function(){
        var target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER ||
                        structure.structureType === STRUCTURE_LAB ||
                        structure.structureType === STRUCTURE_POWER_SPAWN ||
                        structure.structureType === STRUCTURE_NUKER) && structure.energy < structure.energyCapacity;
                }});
        	       
        if(target) {
                if(this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                if(this.creep.room.terminal){
                    if(this.creep.room.terminal.store[RESOURCE_ENERGY] > 50000){
                        if(this.creep.room.storage){
                            if(this.creep.transfer(this.creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                this.creep.moveTo(this.creep.room.storage.pos,{visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }else{
                            if(this.creep.transfer(this.creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                this.creep.moveTo(this.creep.room.terminal.pos,{visualizePathStyle: {stroke: '#ffffff'}});
                            }
                    }   
                }else{
                    if(this.creep.room.storage){
                        if(this.creep.transfer(this.creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            this.creep.moveTo(this.creep.room.storage.pos,{visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        let container = this.creep.room.find(FIND_STRUCTURES, 
                            {filter: function(structure){
                                return (structure.structureType === STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                            }}
                        );
                        try{
                            if(this.creep.transfer(container[0],RESOURCE_ENERGY)===ERR_NOT_IN_RANGE){
                                this.creep.moveTo(container[0]);
                            }
                        }catch(err){
                            console.log('no where to put energy in '+ this.creep.room.name);
                        }
                    }
                }
                  
            }
    },
    repairRoadStandingOn: function(){
        var repairTarget = this.creep.pos.lookFor(LOOK_STRUCTURES);
        function checkRoad(index){
            return index.structureType === STRUCTURE_ROAD;
        }
        repairTarget = repairTarget.filter(checkRoad);
        if(repairTarget.length > 0){
             this.creep.repair(repairTarget[0]);
        }
    },
    
};

module.exports = roleRemoteTrucker;