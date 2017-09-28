var roleLabAssistant = {

/** @param {Creep} creep **/
	run: function(creep) {
	    
	    this.init(creep);
	    
	    var step = this.creep.memory.step;
	    
		if(this.creep.memory.mineralOne && this.creep.memory.mineralTwo 
		    && _.sum(this.creep.room.terminal.store) < 250000 && !this.creep.memory.reset){
		        
            
			if(!this.transferring()){
			    
			    if(this.isLabOne(this.labs[step])){
			        if(this.terminalHasMineral(this.creep.memory.mineralOne)){
			            this.withdrawFromTerminal(this.creep.memory.mineralOne);
			        }else{
			            this.nextStep();
			        }
		            
			    }else if(this.isLabTwo(this.labs[step])){
                    if(this.terminalHasMineral(this.creep.memory.mineralTwo)){
			            this.withdrawFromTerminal(this.creep.memory.mineralTwo);
			        }else{
			            this.nextStep();
			        }			        
			    }else{
			        if(this.labHasEnoughMinerals(this.labs[step])){
			            this.withdrawFromLab(this.labs[this.creep.memory.step]);
			        }else{
			            this.nextStep();
			        }
			    }
                
			}else{
			    if(this.isLabOne(this.labs[step])){
		            this.transferToLab(this.labs[step]);
			    }else if(this.isLabTwo(this.labs[step])){
			        this.transferToLab(this.labs[step]);
			    }else{
                    this.transferToTerminal();
			    }
			}
		}else{
		    console.log('no minerals have been assigned, the terminal is nearly full or the labs are being reset');
		}
		
		if(this.creep.memory.reset){
		    if(!this.transferring()){
		       this.emptyLab(this.labs[step]);
		    }else{
		        this.transferToTerminal();
		    }
		}
	},
	init: function(creep){
		this.creep = creep;
		if(!this.creep.memory.step){
			this.creep.memory.step = 0;
		}
		this.labs = this.creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}});
	},
    transferring: function(){
        if(!this.creep.memory.transferring && _.sum(this.creep.carry) === this.creep.carryCapacity){
            this.creep.memory.transferring = true;
            this.creep.say('transferring');
        }
        
        if(this.creep.memory.transferring && _.sum(this.creep.carry) === 0){
            this.creep.memory.transferring = false;
            this.nextStep();
            this.creep.say('collecting');
        }
        
        return this.creep.memory.transferring;
    },
	nextStep: function(){
		if(this.creep.memory.step < this.labs.length -1){
			this.creep.memory.step++;
		}else{
			this.creep.memory.step = 0;
		}
	},
	isLabOne: function(lab){
	    if(lab.id === this.creep.room.memory.firstLabId){
	        return true;
	    }else{
	        return false;
	    }
	},
	isLabTwo: function(lab){
	    if(lab.id === this.creep.room.memory.secondLabId){
	        return true;
	    }else{
	        return false;
	    }
	},
	terminalHasMineral: function(mineral){
	    if(mineral in this.creep.room.terminal.store){
	        return true;
	    }else{
	        this.creep.memory.reset = true;
	        return false;
	    }
	},
	labHasEnoughMinerals: function(lab){
	    if(lab.mineralAmount >= this.creep.carryCapacity){
	        return true;
	    }else{
	        return false;
	    }
	},
	withdrawFromTerminal: function(mineral){
	    if(this.creep.withdraw(this.creep.room.terminal,mineral)===ERR_NOT_IN_RANGE){
	        this.creep.moveTo(this.creep.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}});
	    }
	},
	withdrawFromLab: function(lab){
	    if(this.creep.withdraw(lab,lab.mineralType)===ERR_NOT_IN_RANGE){
	        this.creep.moveTo(lab, {visualizePathStyle: {stroke: '#ffffff'}});
	    }
	},
	transferToTerminal: function(){
	    let mineral;
	    for(property in this.creep.carry){
	        mineral = property;
	    }
	    if(this.creep.transfer(this.creep.room.terminal,mineral)===ERR_NOT_IN_RANGE){
	        this.creep.moveTo(this.creep.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}});
	    }
	},
	transferToLab: function(lab){
	    let mineral;
	    for(property in this.creep.carry){
	        mineral = property;
	    }
	    if(this.creep.transfer(lab,mineral)===ERR_NOT_IN_RANGE){
	        this.creep.moveTo(lab, {visualizePathStyle: {stroke: '#ffffff'}});   
	    }
	},
	emptyLab: function(lab){
	    if(lab.mineralAmount > 0){
	        if(this.creep.withdraw(lab, lab.mineralType) === ERR_NOT_IN_RANGE){
	            this.creep.moveTo(lab, {visualizePathStyle: {stroke: '#ffffff'}});
	        }else{
	            this.creep.memory.transferring = true;
	        }
	    }else{
	        this.nextStep();
	    }
	},
		
};

module.exports = roleLabAssistant;