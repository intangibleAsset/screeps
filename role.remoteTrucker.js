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
            
            
            
        }else{
            if(this.creep.memory.remoteSource){
                
                
                
            }
        }
    
    
    },
    
    init: function(creep){
        this.creep = creep;
        if(!this.creep.memory.step){
            this.creep.memory.step = 0;
        }
    },
    
};

module.exports = roleRemoteTrucker;