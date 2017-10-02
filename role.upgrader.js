var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        this.init(creep);

        console.log(creep.transferring());

		if(this.creep.memory.upgrading && this.creep.carry.energy == 0) {
		    this.creep.memory.upgrading = false;
		    this.creep.say('harvest');
		    }
		    
		    if(!this.creep.memory.upgrading && this.creep.carry.energy == this.creep.carryCapacity) {
			this.creep.memory.upgrading = true;
			this.creep.say('upgrade');
		    }

		    if(this.creep.memory.upgrading) {
		        if(!this.isBoosted()&&this.boostingLab()){
                    let lab = this.boostingLab();
                    if(lab.boostCreep(this.creep)===ERR_NOT_IN_RANGE){
                        this.creep.moveTo(lab);
                    }
                }else{
        			if(this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
        			    this.creep.moveTo(this.creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
        		    }                    
                }

    		}else {
    		    try{
            	    var thisRoom = Game.rooms[this.creep.memory.roomName];
                    var linkId = thisRoom.memory.controllerLinkId;
                    var controllerLink = Game.structures[linkId];
    		        
    		    }catch(err){
    		        console.log('error, probably no links in this room' + err)
    		    }
    		    
    		    if(controllerLink && controllerLink.energy > 0){
    		        if(this.creep.withdraw(controllerLink, RESOURCE_ENERGY)){
    		            this.creep.moveTo(controllerLink);
    		        }
    		        
    		    }else if(this.creep.room.storage && this.creep.room.storage.store[RESOURCE_ENERGY] !== 0){
                    if(this.creep.withdraw(this.creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.creep.moveTo(this.creep.room.storage.pos);
                    }
                }else if(this.creep.room.storage && this.creep.room.storage.store[RESOURCE_ENERGY] === 0 
                && this.creep.room.terminal && this.creep.room.terminal.store[RESOURCE_ENERGY] > this.creep.carryCapacity){
                    if(this.creep.withdraw(this.creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                        this.creep.moveTo(this.creep.room.terminal);
                    }
    	            
    	        }else{
    	            var sources = this.creep.room.find(FIND_SOURCES);
                    if(this.creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        this.creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
    		        
    		}
    },
    init: function(creep){
        this.creep = creep;
    },
    isBoosted: function(){
        var body = this.creep.body;
        var boosted = false;
        for(let i of body){
            if(i.boost){
                boosted = true;
            }
        }
        return boosted;
    },
    boostingLab: function(){
        let workParts = _.filter(this.creep.body,function(part){
            return part.type === WORK;
        });
        
        let amountOfWorkParts = workParts.length;
        let energyRequired = amountOfWorkParts * 20;
        let mineralsRequired = amountOfWorkParts * 30;
        
        let labs = this.creep.room.find(FIND_STRUCTURES,
            {filter: (structure) => {
                return (structure.structureType === STRUCTURE_LAB)&&(structure.energy >= energyRequired)&&
                (structure.mineralType === RESOURCE_CATALYZED_GHODIUM_ACID)&&(structure.mineralAmount >= mineralsRequired);
            }}
        );
        return labs[0];
    },

};

module.exports = roleUpgrader;