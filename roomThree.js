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
var roleMover = require('role.mover');
var roleMineralMiner = require('role.mineralMiner');

var roomThree = {

    /** @param {creep} creep **/
    run: function(spawn) {
        
        new RoomVisual('W68N35').text("Room 3", 1, 0, {color: 'white', font: 0.5, align: 'left'});
        new RoomVisual('W68N35').text("Total energy capacity: "+spawn.room.energyCapacityAvailable, 1, 1, {color: 'white', font: 0.5, align: 'left'});
        new RoomVisual('W68N35').text("Total energy available: "+spawn.room.energyAvailable, 1, 2, {color: 'white', font: 0.5, align: 'left'});
        
        //const cost = Game.market.calcTransactionCost(15000, 'W68N35', 'W60N70');
        //console.log(cost);
        //console.log(Game.market.deal('595b831d1170f1650c7b6f56',35000,"W68N35"));

        //console.log(spawn.room.terminal.send(RESOURCE_ENERGY,40000,'W68N35'));

                
        
        if(!spawn.memory.hostileInRoom){
            var HARVESTERS = 1;
            var UPGRADERS = 2;
            var BUILDERS = 0;
            var HOARDERS = 1;
            var HOARDERTWOS = 1;
            var TRUCKERS = 3;
            var TANKS = 0;
            var WALLREPPERS = 1;
            var REMOTE_HARVESTERS = 0;
            var MEDICS = 0;
            var INFANTRY = 0;
            var RESERVERS = 0;
            var MOVERS = 1;
            var MINERAL_MINERS = 0;
        }else{
            var HARVESTERS = 1;
            var UPGRADERS = 0;
            var BUILDERS = 0;
            var HOARDERS = 0;
            var HOARDERTWOS = 0;
            var TRUCKERS = 1;
            var TANKS = 2;
            var WALLREPPERS = 0;
            var REMOTE_HARVESTERS = 0;
            var MEDICS = 1;
            var INFANTRY = 0;
            var RESERVERS = 0;        
        }
    
        
        var roleArray = [
            ['mover',[CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],roleMover,MOVERS],
            ['harvester',[WORK,CARRY,CARRY,MOVE,MOVE],roleHarvester,HARVESTERS],
            ['reserver',[CLAIM,MOVE],roleReserver,RESERVERS],
            ['medic',[TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,HEAL,MOVE,HEAL],roleMedic,MEDICS],
            ['infantry',[TOUGH,MOVE,TOUGH,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE],roleInfantry,INFANTRY],
            ['upgrader',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE],roleUpgrader,UPGRADERS],
            ['builder',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE],roleBuilder,BUILDERS],
            ['wallrepper',[WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],roleWallrepper,WALLREPPERS],
            ['tank',[TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK],roleTank,TANKS],
            ['hoarder',[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE],roleHoarder,HOARDERS],
            ['hoadertwo',[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE],roleHoarderTwo,HOARDERTWOS],
            ['trucker',[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleTrucker,TRUCKERS],
            ['remoteharvester',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE],roleRemoteHarvester,REMOTE_HARVESTERS],
            ['mineralMiner',[WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],roleMineralMiner,MINERAL_MINERS]            
        ];
    
        //********************tower functions********************************************************
        
        roleTower.run('595a980573eac720bae19849',spawn);
        roleTower.run('5967b60b578a690585935092',spawn);
        
        //****************************safe mode trigger**********************************************
        
        if(Game.spawns['Spawn2'].pos.findInRange(FIND_HOSTILE_CREEPS,6).length > 0){
            Game.spawns['Spawn2'].room.controller.activateSafeMode();
            Game.notify('Room 2 under attack, safe mode activated');
        }
        
        //********************run labs***************************************************************
        var labs = spawn.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}});
        labs[0].runReaction(labs[1],labs[2]);
        //console.log(labs[0].mineralType) // -> OH
        //console.log(labs[1].mineralType) // -> O
        //console.log(labs[2].mineralType) // -> H
        
        //*******************mover function***********************************************************
        for(let i in Game.creeps){
            let creep = Game.creeps[i];
            if(creep.memory.role === 'mover' && creep.memory.spawnName === spawn.name){
                creep.memory.minerals = [RESOURCE_LEMERGIUM, RESOURCE_UTRIUM, RESOURCE_UTRIUM_LEMERGITE];
            }
        }
        
        //*****************************autospawning creeps**************************************
        
        for(let i = 0; i < roleArray.length; i++){
            let temp = _.filter(Game.creeps, (creep) => creep.memory.role === roleArray[i][0] && creep.memory.spawnName === spawn.name);
            
            if(temp.length < roleArray[i][3]){
                var newName = Game.spawns[spawn.name].createCreep(roleArray[i][1], (roleArray[i][0] + ': ' + Math.floor((Math.random() * 9999) + 1)), {role: roleArray[i][0],spawnName: spawn.name});
                console.log('spawning new '+ roleArray[i][0] + ' : ' + newName +' from '+ spawn.name);
            }
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
  
    
        
    }
	
};

module.exports = roomThree;