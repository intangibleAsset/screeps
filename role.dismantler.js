
var roleDismantler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.transferring && creep.carry.energy == 0) {
            creep.memory.transferring = false;
            creep.say('harvest');
        }
        
        if(!creep.memory.transferring && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transferring = true;
        	creep.say('transfer');
        }
        
        if(creep.memory.transferring){
            creep.drop(RESOURCE_ENERGY);
        }else{
            
                creep.moveTo(Game.flags['Marshland']);
                var dismantleTarget = creep.pos.findClosestByPath(FIND_STRUCTURES);
                creep.dismantle(dismantleTarget);
            }
                
    }

};

module.exports = roleDismantler;