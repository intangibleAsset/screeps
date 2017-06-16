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

var roomOne = {

    /** @param {creep} creep **/
    run: function(spawn) {
        
    ///////////start/////////////////////////////////////////////////////////////////////////////////////////
    
    var HARVESTERS = 0;
    var UPGRADERS = 0;
    var BUILDERS = 0;
    var HOARDERS = 1;
    var HOARDERTWOS = 1;
    var TRUCKERS = 2;
    var TANKS = 0;
    var WALLREPPERS = 0;
    var REMOTE_HARVESTERS = 0;
    var MEDICS = 0;
    var INFANTRY = 0;
    var RESERVERS = 0;
        
    var roleArray = [
        ['reserver',[CLAIM,MOVE],roleReserver,RESERVERS],
        ['medic',[TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,HEAL,MOVE,HEAL],roleMedic,MEDICS],
        ['harvester',[WORK,CARRY,CARRY,MOVE,MOVE],roleHarvester,HARVESTERS],
        ['infantry',[TOUGH,MOVE,TOUGH,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE],roleInfantry,INFANTRY],
        ['upgrader',[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleUpgrader,UPGRADERS],
        ['builder',[WORK,CARRY,MOVE],roleBuilder,BUILDERS],
        ['wallrepper',[WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],roleWallrepper,WALLREPPERS],
        ['tank',[TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE],roleTank,TANKS],
        ['hoarder',[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],roleHoarder,HOARDERS],
        ['hoadertwo',[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],roleHoarderTwo,HOARDERTWOS],
        ['trucker',[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleTrucker,TRUCKERS],
        ['remoteharvester',[WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleRemoteHarvester,REMOTE_HARVESTERS]
    ];
    
    //********************tower functions********************************************************
    
    roleTower.run('5938757562b0d652193adbd1');
    
    //*****************************autospawning creeps**************************************
    
    for(let i = 0; i < roleArray.length; i++){
        let temp = _.filter(Game.creeps, (creep) => creep.memory.role == roleArray[i][0] && creep.memory.spawnName === spawn.name);
        
        if(temp.length < roleArray[i][3]){
            var newName = Game.spawns['Spawn1'].createCreep(roleArray[i][1], (roleArray[i][0] + ': ' + Math.floor((Math.random() * 9999) + 1)), {role: roleArray[i][0],spawnName: spawn.name});
            console.log('spawning new '+ roleArray[i][0] + ' : ' + newName );
        }
    }
    


    //*******************run this rooms creeps***************************************************
    
    var thisRoomsCreeps = _.filter(Game.creeps,(creep)=> creep.memory.spawnName === spawn.name );
    console.log(thisRoomsCreeps);
    
    for(var creep of thisRoomsCreeps) {
        
        for(let i = 0; i < roleArray.length; i++){
            if(creep.memory.role == roleArray[i][0]){
                roleArray[i][2].run(creep);
            }
        }
    }

    //********************spawner messager*******************************************************
    
    if(Game.spawns[spawn.name].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns[spawn.name].spawning.name];
        Game.spawns[spawn.name].room.visual.text(
            'New: ' + spawningCreep.memory.role,
            Game.spawns[spawn.name].pos.x + 1, 
            Game.spawns[spawn.name].pos.y, 
            {align: 'left', opacity: 0.8});
    }
  
    
    //////////end////////////////////////////////////////////////////////////////////////////////////////////
        
    }
	
};

module.exports = roomOne;