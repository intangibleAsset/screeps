var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');
var roleWallrepper = require('role.wallrepper');
var roleTank = require('role.tank');
var roleHoarder = require('role.hoarder');
var roleHoarderTwo = require('role.hoardertwo');
var roleTrucker = require('role.trucker');
var roleRemoteHarvester = require('role.remoteharvester');
var roleMedic = require('role.medic');
var roleInfantry = require('role.infantry');
var roleReserver = require('role.reserver');

module.exports.loop = function () {
    
    Memory.hostileInRoom;
    
    //******************Unit amounts*************************************************************
    if(!Memory.hostileInRoom){
        var HARVESTERS = 1;
        var UPGRADERS = 2;
        var BUILDERS = 0;
        var HOARDERS = 1;
        var HOARDERTWOS = 1;
        var TRUCKERS = 2;
        var TANKS = 1;
        var WALLREPPERS = 1;
        var REMOTE_HARVESTERS = 2;
        var MEDICS = 1;
        var INFANTRY = 1;
        var RESERVERS = 0;
        
        
    }else{
        var HARVESTERS = 1;
        var UPGRADERS = 0;
        var BUILDERS = 0;
        var HOARDERS = 0;
        var HOARDERTWOS = 0;
        var TRUCKERS = 2;
        var TANKS = 5;
        var MEDICS = 3;
        var WALLREPPERS = 0;
        var INFANTRY = 3;
        
        //give one trucker the role of filling the tower
        var towerFiller = false;
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role === 'trucker'){
                if(creep.memory.towerFiller){
                    towerFiller = true;
                }
            }
        }
        if(!towerFiller){
            for(var name in Game.creeps) {
                var creep = Game.creeps[name];
                let x = false;
                if(creep.memory.role === 'trucker'){
                    creep.memory.towerFiller = true;
                    x = true;
                }
                
                if(x){
                    break;
                }
                
            }
        }

        
    }
    
    //******************setup a unit to anchor the logi on***************************************
    
    var tank = _.filter(Game.creeps, (creep) => creep.memory.role == 'tank');
    if(tank[0]){
        Memory.captain = tank[0].id;
    }
    
    //******************wallrepper helper function (probably could be done better)***************
    
    //function that sorts walls by hit points, finds the wall / rampart with the lowest and adds 2000 so all walls eventually get up to the 
    //same value then upgrade over time
    var wallstrength;
    var allWalls = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES,{filter: (structure) => {return(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART ) && structure.hits < structure.hitsMax;}});
    if(allWalls){
        allWalls.sort(function(a,b){return a.hits - b.hits;});
        wallstrength = allWalls[0].hits + 2000;
        Memory.wall = allWalls[0].id;
        //console.log(wallstrength);
    }
    
    //*****************role arrays***************************************************************
    
    
    var roleArray = [
        ['reserver',[CLAIM,MOVE],roleReserver,RESERVERS],
        ['medic',[TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,HEAL,MOVE,HEAL],roleMedic,MEDICS],
        ['harvester',[WORK,CARRY,CARRY,MOVE,MOVE],roleHarvester,HARVESTERS],
        ['infantry',[TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE],roleInfantry,INFANTRY],
        ['upgrader',[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleUpgrader,UPGRADERS],
        ['builder',[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleBuilder,BUILDERS],
        ['wallrepper',[WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleWallrepper,WALLREPPERS],
        ['tank',[TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE],roleTank,TANKS],
        ['hoarder',[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],roleHoarder,HOARDERS],
        ['hoadertwo',[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE],roleHoarderTwo,HOARDERTWOS],
        ['trucker',[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleTrucker,TRUCKERS],
        ['remoteharvester',[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleRemoteHarvester,REMOTE_HARVESTERS]
    ];
    
    //********************tower functions********************************************************
    
    roleTower.run('5924a27e9ad4233b1ce2ea36');
    roleTower.run('5930a8f3b6369e8f4cad12a4');
    
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
        //*****************************autospawning creeps**************************************
    
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
        //console.log(JSON.stringify(creep));
        
        for(let i = 0; i < roleArray.length; i++){
            if(creep.memory.role == roleArray[i][0]){
                roleArray[i][2].run(creep);
            }
        }
    }
    
    
}
