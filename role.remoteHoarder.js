var roleRemoteHoarder = {

    run: function(creep) {
        
        this.init(creep);
        
		//go to destination if not there head to location
		if(!this.creep.pos.isEqualTo(this.creep.memory.remoteSource)){
			this.creep.moveTo(this.creep.memory.remoteSource, {visualizePathStyle: {stroke: '#ffaa00'}});
		}else{
		    this.creep.memory.atDestination = true;
		}
		
		if(this.creep.memory.atDestination){
		    if(this.creep.ticksToLive > 200){
                this.hoarding();
		    }else{
		        this.repairing();
		    }
 
		}
		
        
		

	},
	init: function(creep){
	    this.creep = creep;
	},
	
	hoarding: function(){
        var container = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) =>  { return (structure.structureType == STRUCTURE_CONTAINER)}});
	    var mySource = this.creep.pos.findClosestByRange(FIND_SOURCES);

		    
        if(this.creep.carry.energy < this.creep.carryCapacity){
		    this.creep.harvest(mySource);
	    }else{
	        if(container){
    	            if(container.hits < container.hitsMax){
    		            this.creep.repair(container);
    		        }else{
    		            this.creep.transfer(container, RESOURCE_ENERGY);
    		        }
		    }
		        
        }
	},
	repairing: function(){
	    if(this.creep.memory.repairing && this.creep.carry.energy === 0){
	        this.creep.memory.repairing = false;
	    }
	    if(!this.creep.memory.repairing && this.creep.carry.energy < this.creep.carryCapacity){
	        this.creep.memory.repairing = true;
	    }
	    
	    if(this.creep.memory.repairing){
	        let brokenStructures = this.creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType === STRUCTURE_ROAD || STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax}});
	        if(this.creep.repair(brokenStructures[0]) === ERR_NOT_IN_RANGE){
	            this.creep.moveTo(brokenStructures[0]);
	        }
	    }else{
	        let source = this.creep.pos.findClosestByPath(FIND_SOURCES);
	        if(this.creep.carry.energy < this.creep.carryCapacity){
    	        if(this.creep.harvest(source) === ERR_NOT_IN_RANGE){
    	            this.creep.moveTo(source);
    	        }
	        }
	    }
	},
};

module.exports = roleRemoteHoarder;