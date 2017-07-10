var roleTank = {

    /** @param {creep} creep **/
    run: function(creep) {
            
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            //creep.moveTo(Game.flags['Terminus'], {visualizePathStyle: {stroke: '#ffffff'}});
            
            if(creep.attack(hostiles[0]) === ERR_NOT_IN_RANGE){
                creep.moveTo(hostiles[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            
    }
	
};

module.exports = roleTank;