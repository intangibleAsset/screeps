
var roleGuardDog = {

    /** @param {creep} creep **/
    run: function(creep) {
        
        this.init(creep);
        
        var thisCreepsRoom = Game.rooms[this.creep.memory.roomName];
        if(this.creep.pos.roomName !== thisCreepsRoom.memory.baddieRoom){
            this.creep.moveTo(new RoomPosition(25,25,thisCreepsRoom.memory.baddieRoom, {visualizePathStyle: {stroke: '#ffffff'}}));
        }else{
            let theBads = this.creep.room.find(FIND_HOSTILE_CREEPS);
            if(theBads.length > 0){
                if(creep.attack(theBads[0])===ERR_NOT_IN_RANGE){
                    creep.moveTo(theBads[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }     
        
        

    },
    init: function(creep){
        this.creep = creep;
    },
	
};

module.exports = roleGuardDog;