var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');
var roleWallrepper = require('role.wallrepper');
var roleTank = require('role.tank');
var roleHoarder = require('role.hoarder');
var roleHoarderTwo = require('role.hoardertwo');
var roleTrucker = require('role.trucker');
var roleMedic = require('role.medic');
var roleReserver = require('role.reserver');
var roleRemoteBuilder = require('role.remoteBuilder');
var roleMineralMiner = require('role.mineralMiner');
var roleGuardDog = require('role.guardDog');
var roleMover = require('role.mover');
var roleDismantler = require('role.dismantler');
var roleRemoteHoarder = require('role.remoteHoarder');
var roleRemoteTrucker = require('role.remoteTrucker');
var roleLogistics = require('role.logistics')

var roomOne = {

    /** @param {creep} creep **/
    run: function(spawn,roomObj) {
        
        
        this.init(roomObj);
        this.hud();
        this.runTowers();
        this.triggerSafeMode();
        //mining code
        var remSources = [
            new RoomPosition(23,41,'W63N37'),
            new RoomPosition(9,10,'W62N36'),
            new RoomPosition(11,4,'W63N35'),
        ]
        this.miningOp(remSources);  
        
        
        
        
        
        //const cost = Game.market.calcTransactionCost(25000, 'W63N36', 'W53N83');
        //console.log(cost);
        //console.log(Game.market.deal('598d82816c990032745e290c',21000,"W63N36"));
        //console.log(spawn.room.terminal.send(RESOURCE_HYDROGEN,280,'W61N35'));
        
        if(!this.obj.memory.hostileInRoom){
            var HARVESTERS = 1;
            var UPGRADERS = 3;
            var BUILDERS = 0;
            var HOARDERS = 1;
            var HOARDERTWOS = 1;
            var TRUCKERS = 3;
            var TANKS = 0;
            var WALLREPPERS = 1;
            var MEDICS = 0;
            var RESERVERS = 0;
            var REMOTE_BUILDERS = 0;
            var REMOTE_TANKS = 0;
            var MINERAL_MINERS = 0;
            var GUARD_DOGS = 1;
            var MOVERS = 0;
            var REMOTE_HOARDER = 3;
            var REMOTE_TRUCKERS = 3;
            var LOGISTICS = 1;
        }else{
            var HARVESTERS = 1;
            var UPGRADERS = 0;
            var BUILDERS = 0;
            var HOARDERS = 0;
            var HOARDERTWOS = 0;
            var TRUCKERS = 2;
            var TANKS = 2;
            var WALLREPPERS = 0;
            var REMOTE_HARVESTERS = 0;
            var MEDICS = 0;
            var INFANTRY = 3;
            var RESERVERS = 0;        
        }
    
        
        var roleArray = [
            ['logistics',[CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],roleLogistics,LOGISTICS],
            ['remoteTrucker',[CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,WORK,MOVE],roleRemoteTrucker,REMOTE_TRUCKERS],
            ['remoteHoarder',[CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY],roleRemoteHoarder,REMOTE_HOARDER],
            ['mover',[CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE],roleMover,MOVERS],            
            ['guarddog',[TOUGH,MOVE,TOUGH,MOVE,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],roleGuardDog,GUARD_DOGS],
            ['harvester',[WORK,CARRY,CARRY,MOVE,MOVE],roleHarvester,HARVESTERS],
            ['hoarder',[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],roleHoarder,HOARDERS],
            ['trucker',[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleTrucker,TRUCKERS],
            ['remoteBuilder',[TOUGH,TOUGH,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleRemoteBuilder,REMOTE_BUILDERS],
            ['reserver',[TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,CLAIM],roleReserver,RESERVERS],
            ['medic',[TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,HEAL,MOVE,HEAL],roleMedic,MEDICS],
            ['upgrader',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE],roleUpgrader,UPGRADERS],
            ['builder',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE],roleBuilder,BUILDERS],
            ['wallrepper',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE],roleWallrepper,WALLREPPERS],
            ['tank',[TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE],roleTank,TANKS],
            ['hoadertwo',[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],roleHoarderTwo,HOARDERTWOS],
            ['mineralMiner',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE],roleMineralMiner,MINERAL_MINERS]
            
        ];
        
        this.autoSpawn(roleArray);
        //this.spawnMessage();
    
        
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
                creep.memory.minerals = [RESOURCE_GHODIUM_ACID, RESOURCE_CATALYST, RESOURCE_CATALYZED_GHODIUM_ACID];
                creep.memory.reset = true;
            }
        }

        
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

        
    },
    
    init: function(roomObj){
        var spawnArray = [];
        for(let i in Game.spawns){
            if(Game.spawns[i].room.name === roomObj.name){
                spawnArray.push(i);
            }
        }
        this.obj = roomObj;
        this.obj.memory.spawnNameArray = spawnArray;
        if(!this.obj.memory.baddieRoom){
            this.obj.memory.baddieRoom = this.obj.name;
        }
    },
    
    autoSpawn: function(roleArray){
        
        for(let i = 0; i < roleArray.length; i++){
            let temp = _.filter(Game.creeps, (creep) => creep.memory.role === roleArray[i][0] && (creep.memory.spawnName === this.obj.memory.spawnNameArray[0] || creep.memory.roomName === this.obj.name));
            
            var chosenSpawn;
            
            for(let i = 0; i < this.obj.memory.spawnNameArray.length; i++){
                let roomSpawn = Game.spawns[this.obj.memory.spawnNameArray[i]];
                if(!roomSpawn.spawning){
                    chosenSpawn = roomSpawn;
                }
            }
            
            if(!chosenSpawn){
                chosenSpawn = Game.spawns[this.obj.memory.spawnNameArray[0]];
            }
            
            if(temp.length < roleArray[i][3]){
                var newName = chosenSpawn.createCreep(roleArray[i][1], (roleArray[i][0] + ': ' + Math.floor((Math.random() * 9999) + 1)), {role: roleArray[i][0],spawnName: this.obj.memory.spawnNameArray[0], roomName: this.obj.name});
                console.log('spawning new '+ roleArray[i][0] + ' : ' + newName +' from '+ this.obj.name);
            }
        }
        
    },
    
    spawnMessage: function(){
        for(let i in Game.spawns){
            if(Game.spawns[i].spawning) { 
                var spawningCreep = Game.creeps[Game.spawns[i].spawning.name];
                Game.spawns[i].room.visual.text(
                    'New: ' + spawningCreep.memory.role,
                    Game.spawns[i].pos.x + 1, 
                    Game.spawns[i].pos.y, 
                    {align: 'left', opacity: 0.8, font: 0.5});
            }
        }
    },
    
    hud: function(){
        new RoomVisual(this.obj.name).text("Room : " + this.obj.name, 1, 0, {color: 'white', font: 0.5, align: 'left'});
        new RoomVisual(this.obj.name).text("Total energy capacity: "+this.obj.energyCapacityAvailable, 1, 1, {color: 'white', font: 0.5, align: 'left'});
        new RoomVisual(this.obj.name).text("Total energy available: "+this.obj.energyAvailable, 1, 2, {color: 'white', font: 0.5, align: 'left'});
    },
	runTowers: function(){
        let towers = this.obj.find(FIND_MY_STRUCTURES, {filter:{ structureType: STRUCTURE_TOWER}});
        for(let i of towers){
            roleTower.run(i,Game.spawns[this.obj.memory.spawnNameArray[0]],this.obj);
            
        }
	}, 
	triggerSafeMode: function(){
        if(Game.spawns[this.obj.memory.spawnNameArray[0]].pos.findInRange(FIND_HOSTILE_CREEPS,6).length > 0){
            Game.spawns[this.obj.memory.spawnNameArray[0]].room.controller.activateSafeMode();
            Game.notify('Room ' + this.obj.name + ' under attack, safe mode activated');
        }	    
	},
	miningOp: function(sourceArray){
	    var hoarderArray = [];
	    var truckerArray = [];
	    
        for(let i in Game.creeps){
            let creep = Game.creeps[i];
            if(creep.memory.role === 'remoteHoarder' && (creep.memory.roomName === this.obj.name || creep.memory.spawnName === this.obj.memory.spawnNameArray[0])){
                hoarderArray.push(creep);
            }
        }
        
        for(let i in Game.creeps){
            let creep = Game.creeps[i];
            if(creep.memory.role === 'remoteTrucker' && (creep.memory.roomName === this.obj.name || creep.memory.spawnName === this.obj.memory.spawnNameArray[0])){
                truckerArray.push(creep);
            }
        }
        
        for(let i=0; i < hoarderArray.length; i++){
            hoarderArray[i].memory.remoteSource = sourceArray[i];
        }
        
        for(let i=0; i < truckerArray.length; i++){
            truckerArray[i].memory.remoteSource = sourceArray[i];
        }
	},
	reserve: function(roomPos){
	    let reserverArray = [];
	    
	    for(let i in Game.creeps){
	        let creep = Game.creeps[i];
            if(creep.memory.role === 'reserver' && (creep.memory.roomName === this.obj.name || creep.memory.spawnName === this.obj.memory.spawnNameArray[0])){
                reserverArray.push(creep);
            }
	    }
	    for(let i=0; i < reserverArray.length; i++){
            reserverArray[i].memory.controllerToReserve = roomPos[i];
        }
	},
	
};

module.exports = roomOne;