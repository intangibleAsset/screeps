var roleReserver = {
    
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        this.init(creep);
        
        try{
    		if(!this.creep.pos.isEqualTo(this.creep.memory.controllerToReserve) && !this.creep.memory.atDestination){
    		    console.log('working?');
    			this.creep.moveTo(this.creep.memory.controllerToReserve, {visualizePathStyle: {stroke: '#ffaa00'}});
    		}else{
    		    this.creep.memory.atDestination = true;
    		}
    		
    		//every now and then check creep is at the right destination as the source assignment code can be buggy
    		if(this.creep.ticksToLive % 20 === 0){
    		    this.creep.memory.atDestination = false;
    		}
    		
    		if(this.creep.memory.atDestination){
    		    
                if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }  
                
    		}
            
        }
        catch(err){
            console.log(err + ' creep is probably still spawning ');
        }
        
    },
	init: function(creep){
	    this.creep = creep;
	}
};
module.exports = roleReserver;