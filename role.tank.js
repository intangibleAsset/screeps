var roleTank = {

    /** @param {creep} creep **/
    run: function(creep) {
            
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            
            if(creep.attack(hostiles[0]) === ERR_NOT_IN_RANGE){
                creep.moveTo(hostiles[0].pos, {visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                creep.moveTo(Game.flags['Eden']);
            }
            
            
    }
	
};

module.exports = roleTank;