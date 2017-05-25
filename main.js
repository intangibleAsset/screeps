var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');
var roleWallrepper = require('role.wallrepper');

module.exports.loop = function () {
    
    //******************wallrepper helper function (probably could be done better)***************
    
    //function that sorts walls by hit points, finds the wall / rampart with the lowest and adds 2000 so all walls eventually get up to the 
    //same value then upgrade over time
    var wallstrength;
    var allWalls = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES,{filter: (structure) => {return(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART ) && structure.hits < structure.hitsMax;}});
    if(allWalls){
        allWalls.sort(function(a,b){return a.hits - b.hits;});
        wallstrength = allWalls[0].hits + 2000;
        Memory.wall = allWalls[0].id;
        console.log(wallstrength);
    }
    
    //*****************role arrays***************************************************************
    
    
    var roleArray = [
        ['harvester',[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleHarvester,4],
        ['upgrader',[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleUpgrader,2],
        ['builder',[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleBuilder,0],
        ['wallrepper',[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleWallrepper,3]
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
