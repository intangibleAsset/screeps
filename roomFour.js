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
var roleRemoteBuilder = require('role.remoteBuilder');
var roleMineralMiner = require('role.mineralMiner');
var roleRemoteMineralMiner = require('role.remoteMineralMiner');
var roleGuardDog = require('role.guardDog');
var roleMover = require('role.mover');

var roomOne = {

    
    run: function(spawn,roomObj) {
        
        //sets roomObj.memory.spawnArray
        this.init(roomObj);
        //shows hud
        this.hud(roomObj);
        
        
        
        //const cost = Game.market.calcTransactionCost(25000, 'W68N37', 'W53N83');
        //console.log(cost);
        //console.log(Game.market.deal('594cbbf34a22922b5d5bf5cc',25000,"W68N37"));
        //console.log(spawn.room.terminal.send(RESOURCE_HYDROGEN,50000,'W68N37'));
        
        if(!spawn.memory.hostileInRoom){
            var HARVESTERS = 4;
            var UPGRADERS = 4;
            var BUILDERS = 0;
            var HOARDERS = 0;
            var HOARDERTWOS = 0;
            var TRUCKERS = 0;
            var TANKS = 0;
            var WALLREPPERS = 1;
            var REMOTE_HARVESTERS = 0;
            var MEDICS = 0;
            var INFANTRY = 0;
            var RESERVERS = 0;
            var REMOTE_BUILDERS = 0;
            var REMOTE_TANKS = 0;
            var MINERAL_MINERS = 0;
            var REMOTE_MINERAL_MINERS = 0;
            var GUARD_DOGS = 0;
            var MOVERS = 0;
        }else{
            var HARVESTERS = 0;
            var UPGRADERS = 0;
            var BUILDERS = 0;
            var HOARDERS = 0;
            var HOARDERTWOS = 0;
            var TRUCKERS = 0;
            var TANKS = 0;
            var WALLREPPERS = 0;
            var REMOTE_HARVESTERS = 0;
            var MEDICS = 0;
            var INFANTRY = 0;
            var RESERVERS = 0;        
        }
    
        
        var roleArray = [
            ['mover',[CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE],roleMover,MOVERS],            
            ['guarddog',[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],roleGuardDog,GUARD_DOGS],
            ['remotemineralminer',[WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleRemoteMineralMiner,REMOTE_MINERAL_MINERS],
            ['harvester',[WORK,CARRY,CARRY,MOVE,MOVE],roleHarvester,HARVESTERS],
            ['hoarder',[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],roleHoarder,HOARDERS],
            ['trucker',[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleTrucker,TRUCKERS],
            ['remoteharvester',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],roleRemoteHarvester,REMOTE_HARVESTERS],
            ['remoteBuilder',[TOUGH,TOUGH,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleRemoteBuilder,REMOTE_BUILDERS],
            ['reserver',[TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,CLAIM],roleReserver,RESERVERS],
            ['medic',[TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,HEAL,MOVE,HEAL],roleMedic,MEDICS],
            ['infantry',[TOUGH,MOVE,TOUGH,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE],roleInfantry,INFANTRY],
            ['upgrader',[WORK,CARRY,MOVE,MOVE],roleUpgrader,UPGRADERS],
            ['builder',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE],roleBuilder,BUILDERS],
            ['wallrepper',[WORK,CARRY,MOVE,MOVE],roleWallrepper,WALLREPPERS],
            ['tank',[TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE],roleTank,TANKS],
            ['hoadertwo',[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],roleHoarderTwo,HOARDERTWOS],
            ['mineralMiner',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE],roleMineralMiner,MINERAL_MINERS]
            
        ];
    
        //********************tower functions********************************************************
        
        //roleTower.run('5938757562b0d652193adbd1',spawn);
        //roleTower.run('594448126fb030030f61580f',spawn);
        
        
        //****************************safe mode trigger**********************************************
        
        if(Game.spawns[spawn.name].pos.findInRange(FIND_HOSTILE_CREEPS,6).length > 0){
            Game.spawns[spawn.name].room.controller.activateSafeMode();
            Game.notify('Room 4 under attack, safe mode activated');
        }
        
        //********************run labs***************************************************************
        //var labs = spawn.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}});
        //labs[0].runReaction(labs[1],labs[2]);
        //console.log(labs[0].mineralType) // -> OH
        //console.log(labs[1].mineralType) // -> O
        //console.log(labs[2].mineralType) // -> H
        
        //*******************mover function***********************************************************
        for(let i in Game.creeps){
            let creep = Game.creeps[i];
            if(creep.memory.role === 'mover' && creep.memory.spawnName === spawn.name){
                creep.memory.minerals = [RESOURCE_KEANIUM, RESOURCE_ZYNTHIUM, RESOURCE_ZYNTHIUM_KEANITE];
            }
        }
        
        //*****************************autospawning creeps*******************************************
        
        for(let i = 0; i < roleArray.length; i++){
            let temp = _.filter(Game.creeps, (creep) => creep.memory.role == roleArray[i][0] && creep.memory.spawnName === spawn.name);
            
            if(temp.length < roleArray[i][3]){
                var newName = Game.spawns[spawn.name].createCreep(roleArray[i][1], (roleArray[i][0] + ': ' + Math.floor((Math.random() * 9999) + 1)), {role: roleArray[i][0],spawnName: spawn.name});
                console.log('spawning new '+ roleArray[i][0] + ' : ' + newName +' from '+ spawn.name);
            }
        }
        
        //****************************remote harvesting helper***************************************
        
        var remoteSources = [
          new RoomPosition(11,4,'W63N35'),
          new RoomPosition(9,10,'W62N36'),
          new RoomPosition(23,41,'W63N37')
        ];
        
        
        var creepArray = []
        
        for(let i in Game.creeps){
            let creep = Game.creeps[i];
            if(creep.memory.role === 'remoteharvester' && creep.memory.spawnName == spawn.name){
                creepArray.push(creep);
            }
        }
        
        for(let i=0;i<creepArray.length;i++){
            creepArray[i].memory.remoteSource = remoteSources[i];
        }
        

        //*******************run this rooms creeps***************************************************
        
        var thisRoomsCreeps = _.filter(Game.creeps,(creep)=> creep.memory.spawnName === spawn.name );
        
        
        if(thisRoomsCreeps.length === 1){
            thisRoomsCreeps[0].memory.nerdPanic = true;
        }
        
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
  
    
        
    },
    
    init: function(roomObj){
        var spawnArray = [];
        for(let i in Game.spawns){
            if(Game.spawns[i].room.name === roomObj.name){
                spawnArray.push(i);
            }
        }
        roomObj.memory.spawnArray = spawnArray;
    },
    
    hud: function(roomObj){
        new RoomVisual(roomObj.name).text("Room : " + roomObj.name, 1, 0, {color: 'white', font: 0.5, align: 'left'});
        new RoomVisual(roomObj.name).text("Total energy capacity: "+roomObj.energyCapacityAvailable, 1, 1, {color: 'white', font: 0.5, align: 'left'});
        new RoomVisual(roomObj.name).text("Total energy available: "+roomObj.energyAvailable, 1, 2, {color: 'white', font: 0.5, align: 'left'});
    },
    
	
};

module.exports = roomOne;