var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');

module.exports.loop = function () {
    
    
    var roleArray = [
        ['harvester',[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleHarvester,4],
        ['upgrader',[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleUpgrader,2],
        ['builder',[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleBuilder,0]
    ];
    
    //********************tower function********************************************************
    
    roleTower.run('5924a27e9ad4233b1ce2ea36');
    
    //********************delete dead creeps****************************************************
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    //********************spawner messager*******************************************************
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            'New: ' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
        //*****************************setting up memory roles for creeps************************
    
    for(let i = 0; i < roleArray.length; i++){
        let temp = _.filter(Game.creeps, (creep) => creep.memory.role == roleArray[i][0]);
        
        if(temp.length < roleArray[i][3]){
            var newName = Game.spawns['Spawn1'].createCreep(roleArray[i][1], (roleArray[i][0] + ': ' + Math.floor((Math.random() * 9999) + 1)), {role: roleArray[i][0]});
            console.log('spawning new '+ roleArray[i][0] + ' : ' + newName );
        }
    }
    //*******************run modules*************************************************************
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        for(let i = 0; i < roleArray.length; i++){
            if(creep.memory.role == roleArray[i][0]){
                roleArray[i][2].run(creep);
            }
        }
    }
    
    
}
