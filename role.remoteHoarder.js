var roleRemoteHoarder = {

    run: function(creep) {
        
        this.init(creep);
        this.baddies();
        
        
		if(!this.creep.pos.isEqualTo(this.creep.memory.remoteSource) && !this.creep.memory.atDestination){
			
			this.creep.moveTo(this.creep.memory.remoteSource, {visualizePathStyle: {stroke: '#ffaa00'}});
		    
		}else if(this.creep.ticksToLive < 100){
		    
		    this.creep.memory.atDestination = true;
		    
		}else{
		    
		    this.creep.memory.atDestination = true;
		    
		}
		
		//every now and then check creep is at the right destination as the source assignment code can be buggy
		if(this.creep.ticksToLive % 40 === 0){
		    this.creep.memory.atDestination = false;
		}
		
		if(this.creep.memory.atDestination){
		    
		    if(this.creep.ticksToLive > 100){
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
        var container = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) =>  { return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity}});
	    var mySource = this.creep.pos.findClosestByRange(FIND_SOURCES);
        
		    
        if(this.creep.carry.energy < this.creep.carryCapacity){
		    this.creep.harvest(mySource);
	    }else{
	        if(container){
    	        if(container.hits < container.hitsMax){
    		        this.creep.repair(container);
    		        //leaves energy in the creep to run repair operation the lower the number the more it repairs (it cycles quicker)
    		        this.creep.transfer(container, RESOURCE_ENERGY,this.creep.carryCapacity * 0.2);
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
	    if(!this.creep.repairing && this.creep.carry.energy === this.creep.carryCapacity){
	        this.creep.memory.repairing = true;
	    }
	    
	    if(this.creep.memory.repairing){
	        let brokenStructures = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType === STRUCTURE_ROAD || STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax}});
	        if(this.creep.repair(brokenStructures) === ERR_NOT_IN_RANGE){
	            this.creep.moveTo(brokenStructures);
	        }
	    }else{
	        let source = this.creep.pos.findClosestByPath(FIND_SOURCES);
	        if(this.creep.harvest(source) === ERR_NOT_IN_RANGE){
    	        this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
    	    }
	        
	    }
	},
	baddies: function(){
	    var bads = this.creep.room.find(FIND_HOSTILE_CREEPS);
	    var thisRoom = Game.rooms[this.creep.memory.roomName];
	    if(bads.length > 0){
	        thisRoom.memory.baddieRoom = this.creep.pos.roomName;
	    }
	    
	}
};

module.exports = roleRemoteHoarder;