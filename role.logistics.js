var roleLogistics = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        this.init(creep);
        
        

            switch(this.creep.memory.task){
                case 'fillLink': 
                    try{
                    var thisRoom = Game.rooms[this.creep.memory.roomName];
                    var linkId = thisRoom.memory.storageLinkId;
                    var storageLink = Game.structures[linkId];
                    } catch (err){
                        console.log('error in logistics creep, maybe no links' + err);
                    }
                    if(storageLink){
                        if(this.transferring()){
                            if(this.creep.transfer(storageLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                                this.creep.moveTo(storageLink);
                            }
                        }else{
                           if(this.creep.withdraw(this.creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                               this.creep.moveTo(this.creep.room.storage);
                           } 
                        }
                    }                  
                    break;
                    
                case 'moveToTerminal':
                    if(_.sum(this.creep.room.terminal.store) <= 290000){
                        this.moveFromStorageToTerminal(this.creep.memory.resourceToMove);
                    }
                    break;
                
                case 'moveToStorage':
                    if(_.sum(this.creep.room.storage) <= 990000 ){
                        this.moveFromTerminalToStorage(this.creep.memory.resourceToMove);
                    }
                    break;
                    
            }

        
        
        
    },
    
    init: function(creep){
        this.creep = creep;
        if(!this.creep.memory.task){
            this.creep.memory.task = 'fillLink';
        }
        if(!this.creep.memory.resourceToMove){
            this.creep.memory.resourceToMove = RESOURCE_ENERGY;
        }

    },
    
    transferring: function(){
        if(!this.creep.memory.transferring && _.sum(this.creep.carry) === this.creep.carryCapacity){
            this.creep.memory.transferring = true;
            this.creep.say('transferring');
        }
        
        if(this.creep.memory.transferring && _.sum(this.creep.carry) === 0){
            this.creep.memory.transferring = false;
            this.creep.say('collecting');
        }
        
        return this.creep.memory.transferring;
    },
    
    toMuchEnergyInTerminal: function(energyLimit){
        var returnValue;
        if(this.creep.room.terminal.store[RESOURCE_ENERGY] > energyLimit){
            returnValue = true;
        }else{
            returnValue = false;
        }
        return returnValue;
    },
    moveFromTerminalToStorage: function(resource){
        if(this.transferring()){
            if(this.creep.transfer(this.creep.room.storage, resource)===ERR_NOT_IN_RANGE){
                this.creep.moveTo(this.creep.room.storage);
            }
            
        }else{
            if(this.creep.withdraw(this.creep.room.terminal, resource) === ERR_NOT_IN_RANGE){
                this.creep.moveTo(this.creep.room.terminal);
            }
        }        
    },
    moveFromStorageToTerminal: function(resource){
        if(this.transferring()){
            
            if(this.creep.transfer(this.creep.room.terminal, resource)===ERR_NOT_IN_RANGE){
                this.creep.moveTo(this.creep.room.terminal);
            }
            
        }else{
            
            if(this.creep.withdraw(this.creep.room.storage, resource) === ERR_NOT_IN_RANGE){
                this.creep.moveTo(this.creep.room.storage);
            }
            
        }        
    },
    fillTowers: function(){
        if(this.creep.room.storage && this.creep.room.storage.store[RESOURCE_ENERGY] >= this.creep.carryCapacity){
            if(this.transferring()){
                var towers = this.creep.room.find(FIND_STRUCTURES, {filter: function(structure){ return structure.structureType === STRUCTURE_TOWER}});
                if(this.creep.transfer(towers[0],RESOURCE_ENERGY)){
                    this.creep.moveTo(towers[0]);
                }
            }else{
                if(this.creep.withdraw(this.creep.room.storage,RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                    this.creep.moveTo(this.creep.room.storage);
                }
            }
        }else{
            console.log('no storage or storage empty in : ' + this.creep.memory.roomName);
        }
    },
    
    

};

module.exports = roleLogistics;