var roleRemoteTrucker = {

    run: function(creep) {
        
        console.log(this.atSource());
        
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
                console.log('transferring');
                if(this.atBase()){
                    console.log('placing in storage');
                    this.placeInStorage();
                }else{
                    this.creep.moveTo(new RoomPosition(25,25,this.creep.memory.roomName),{visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                console.log('not transferring');
                if(this.atSource()){
                    console.log('at storage');
                    this.harvestFromContainer();
                }else{
                    console.log('moving to storage');
                    this.creep.moveTo(this.creep.memory.remoteSource, {visualizePathStyle: {stroke: '#ffaa00'}});
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
        console.log('harvest being called');
        let container = this.creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => { return (structure.structureType === STRUCTURE_CONTAINER)}});
        if(this.creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
            this.creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },
    placeInStorage: function(){
        if(this.creep.transfer(this.creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
            this.creep.moveTo(this.creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}});
        }        
    },
    
};

module.exports = roleRemoteTrucker;