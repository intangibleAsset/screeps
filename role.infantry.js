var roleInfantry = {

    /** @param {creep} creep **/
    run: function(creep) {
            
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            
            if(creep.rangedAttack(hostiles[0]) === ERR_NOT_IN_RANGE){
                creep.moveTo(hostiles[0].pos.x + 2, hostiles[0].pos.y + 2, {visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                creep.moveTo(Game.flags['Eden']);
            }
            
            
    }
	
};


module.exports = roleInfantry;