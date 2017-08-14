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
var roleDismantler = require('role.dismantler');
var roleMineralMiner = require('role.mineralMiner');
var roleMover = require('role.mover');

var roomTwo = {

    /** @param {creep} creep **/
    run: function(spawn,roomObj) {
        
        this.init(roomObj);
        this.hud();
        this.runTowers();
        this.triggerSafeMode();
        
        //const cost = Game.market.calcTransactionCost(30000, 'W61N35', 'W50N70');
        //console.log(cost);
        //console.log(Game.market.deal('598d6c3f83489728eb9c2ff3',29000,"W61N35"));

        //console.log(spawn.room.terminal.send(RESOURCE_ENERGY,1000,'W62N38'));

        
 
 
        if(!spawn.memory.hostileInRoom){
            var HARVESTERS = 1;
            var UPGRADERS = 2;
            var BUILDERS = 0;
            var HOARDERS = 1;
            var HOARDERTWOS = 1;
            var TRUCKERS = 2;
            var TANKS = 0;
            var WALLREPPERS = 1;
            var REMOTE_HARVESTERS = 8;
            var MEDICS = 0;
            var INFANTRY = 0;
            var MINERAL_MINERS = 0;
            var RESERVERS = 0;
            var DISMANTLERS = 0;
            var MOVERS = 1;
        }else{
            var HARVESTERS = 1;
            var UPGRADERS = 0;
            var BUILDERS = 0;
            var HOARDERS = 0;
            var HOARDERTWOS = 0;
            var TRUCKERS = 1;
            var TANKS = 3;
            var WALLREPPERS = 0;
            var REMOTE_HARVESTERS = 0;
            var MEDICS = 2;
            var INFANTRY = 0;
            var RESERVERS = 0;        
        }
    
        
        var roleArray = [
            ['mover',[CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE],roleMover,MOVERS],
            ['dismantler',[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleDismantler,DISMANTLERS],
            ['harvester',[WORK,CARRY,MOVE,MOVE],roleHarvester,HARVESTERS],
            ['reserver',[CLAIM,MOVE],roleReserver,RESERVERS],
            ['medic',[TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,HEAL,MOVE,HEAL],roleMedic,MEDICS],
            ['infantry',[TOUGH,MOVE,TOUGH,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE],roleInfantry,INFANTRY],
            ['upgrader',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE],roleUpgrader,UPGRADERS],
            ['builder',[WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleBuilder,BUILDERS],
            ['wallrepper',[WORK,CARRY,CARRY,MOVE,MOVE,MOVE],roleWallrepper,WALLREPPERS],
            ['tank',[TOUGH,TOUGH,TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE],roleTank,TANKS],
            ['hoarder',[WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],roleHoarder,HOARDERS],
            ['hoadertwo',[WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],roleHoarderTwo,HOARDERTWOS],
            ['trucker',[CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],roleTrucker,TRUCKERS],
            ['remoteharvester',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],roleRemoteHarvester,REMOTE_HARVESTERS],
            ['mineralMiner',[WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],roleMineralMiner,MINERAL_MINERS]
        ];
    
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
                creep.memory.minerals = [RESOURCE_GHODIUM_HYDRIDE, RESOURCE_HYDROXIDE, RESOURCE_GHODIUM_ACID];
                creep.memory.reset = true;
            }
        }
        
        
        //*****************************autospawning creeps**************************************
        
        for(let i = 0; i < roleArray.length; i++){
            let temp = _.filter(Game.creeps, (creep) => creep.memory.role === roleArray[i][0] && creep.memory.spawnName === spawn.name);
            
            if(temp.length < roleArray[i][3]){
                var newName = Game.spawns[spawn.name].createCreep(roleArray[i][1], (roleArray[i][0] + ': ' + Math.floor((Math.random() * 9999) + 1)), {role: roleArray[i][0],spawnName: spawn.name, roomName: this.obj.name});
                console.log('spawning new '+ roleArray[i][0] + ' : ' + newName +' from '+ spawn.name);
            }
        }

        //****************************remote harvesting helper***************************************
        var remoteSources = [
          new RoomPosition(35,20,'W61N36'),
          new RoomPosition(8,39,'W61N36'),
          new RoomPosition(9,28,'W62N35'),
          new RoomPosition(41,3,'W62N35'),
          new RoomPosition(34,28,'W62N34'),
          new RoomPosition(34,42,'W62N34'),
          new RoomPosition(30,28,'W61N34'),
          new RoomPosition(14,33,'W61N34')
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
        this.spawnNameArray = spawnArray;
        this.obj = roomObj;
    },
    
    hud: function(){
        new RoomVisual(this.obj.name).text("Room : " + this.obj.name, 1, 0, {color: 'white', font: 0.5, align: 'left'});
        new RoomVisual(this.obj.name).text("Total energy capacity: "+this.obj.energyCapacityAvailable, 1, 1, {color: 'white', font: 0.5, align: 'left'});
        new RoomVisual(this.obj.name).text("Total energy available: "+this.obj.energyAvailable, 1, 2, {color: 'white', font: 0.5, align: 'left'});
    },
	runTowers: function(){
        let towers = this.obj.find(FIND_MY_STRUCTURES, {filter:{ structureType: STRUCTURE_TOWER}});
        for(let i of towers){
            roleTower.run(i,Game.spawns[this.spawnNameArray[0]]);
            
        }
	}, 
	triggerSafeMode: function(){
        if(Game.spawns[this.spawnNameArray[0]].pos.findInRange(FIND_HOSTILE_CREEPS,6).length > 0){
            Game.spawns[this.spawnNameArray[0]].room.controller.activateSafeMode();
            Game.notify('Room ' + this.obj.name + ' under attack, safe mode activated');
        }	    
	},

};

module.exports = roomTwo;