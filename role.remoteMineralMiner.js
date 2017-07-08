var um = require('utilityMethods');

var roleRemoteMineralMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
            creep.say('I am he');
            
            if(creep.memory.transferring && creep.carry.energy == 0) {
                creep.memory.transferring = false;
                creep.say('harvest');
    	    }
    	    if(!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
    	        creep.memory.transferring = true;
    	        creep.say('transfer');
    	    }
    
    	    if(creep.memory.transferring) {
    	        

    	        
            }else{
                
               var flagsArray = ['Terminus','1','2'];
    	        
    	       //um.followFlags(creep,flagsArray);

            }
                
        }
        

};

module.exports = roleRemoteMineralMiner;
