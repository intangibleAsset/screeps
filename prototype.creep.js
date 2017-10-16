Creep.prototype.transferring = function(){
        //returns true if the creep is transferring or false otherwise
        if(!this.memory.transferring && _.sum(this.carry) === this.carryCapacity){
            this.memory.transferring = true;
        }
        
        if(this.memory.transferring && _.sum(this.carry) === 0){
            this.memory.transferring = false;
        }
        
        return this.memory.transferring;
};

Creep.prototype.withdrawFromTerminal = function(resource){
    if(this.withdraw(this.room.terminal,resource)===ERR_NOT_IN_RANGE){
        this.moveTo(this.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}});
    }
};

Creep.prototype.transferToTerminal = function(){
    let resource;
    for(property in this.carry){
        resource = property;
    }
    if(this.transfer(this.room.terminal,mineral)===ERR_NOT_IN_RANGE){
        this.moveTo(this.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}});   
    }
};

Creep.prototype.withdrawFromLab = function(lab){
    //just takes the mineral that is already in the lab out
    if(this.withdraw(lab,lab.mineralType)===ERR_NOT_IN_RANGE){
        this.moveTo(lab, {visualizePathStyle: {stroke: '#ffffff'}});
    }
};

Creep.prototype.transferToLab = function(lab){
    //should work if creep is only carrying one type of resource
    let resource;
    for(property in this.carry){
        resource = property;
    }
    if(this.transfer(lab,mineral)===ERR_NOT_IN_RANGE){
        this.moveTo(lab, {visualizePathStyle: {stroke: '#ffffff'}});   
    }
};


