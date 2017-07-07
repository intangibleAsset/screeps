var roleInfantry = {

    /** @param {creep} creep **/
    run: function(creep) {
            
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            
            if(creep.rangedAttack(hostiles[0]) === ERR_NOT_IN_RANGE){
                //creep.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ffffff'}});
                creep.moveTo(46,7);
            }
            
            
    }
	
};


module.exports = roleInfantry;