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

Creep.prototype.withdrawFromLab = function(lab){
    if(this.creep.withdraw(lab,lab.mineralType)===ERR_NOT_IN_RANGE){
        this.creep.moveTo(lab, {visualizePathStyle: {stroke: '#ffffff'}});
    }
};