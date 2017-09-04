var roleLabAssistant = {

/** @param {Creep} creep **/
	run: function(creep) {
		if(this.creep.memory.mineralOne && this.creep.memory.mineralTwo){
			
			
			
			
		}
	},
	init: function(creep){
		this.creep = creep;
		if(!this.creep.memory.step){
			this.creep.memory.step = 0;
		}
	},
	
		
};

module.exports = roleLabAssistant;