var roleMedic = {

    /** @param {creep} creep **/
    run: function(creep) {
            
        const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        
        
        if(target) {
            creep.moveTo(target);
            if(creep.pos.isNearTo(target)) {
                creep.heal(target);
            }
            else {
                creep.rangedHeal(target);
            }
        }else{
                creep.moveTo(Game.flags['Eden'].pos); 
                
        }
            
    }
	
};

module.exports = roleMedic;