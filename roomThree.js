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
var roleDismantler = require('role.dismantler');
var roleRemoteHoarder = require('role.remoteHoarder');
var roleRemoteTrucker = require('role.remoteTrucker');
var roleLogistics = require('role.logistics');
var roleLabAssistant = require('role.labAssistant');

var roomThree = {

    /** @param {creep} creep **/
    run: function(spawn,roomObj) {
        
        this.init(roomObj);
        this.hud();
        this.runTowers();
        this.triggerSafeMode(); 
        this.autoTransfer('W68N37');
        
        
        //array of mining locations passed to mining op
        var remSources = [
            new RoomPosition(11,13,'W67N35'),
            new RoomPosition(13,11,'W69N35')
        ];
        this.miningOp(remSources);
        //link code///////////////////////////////////////
        var controllerLink = Game.structures['59afb5f4a1a2ef07b639ebb8'];
        var storageLink = Game.structures['59af9e516347856565d9798c'];
        var sourceOneLink = undefined;
        var sourceTwoLink = undefined;     
        this.registerLinks(controllerLink,storageLink,sourceOneLink,sourceTwoLink);
        this.runLinks(controllerLink,storageLink,sourceOneLink,sourceTwoLink);
        //Lab code////////////////////////////////////////
        this.registerLabs('59750f54165da1212bb3f9e5','5976366be9ee3c7774177685');
        this.runLabs(this.firstLabId,this.secondLabId); 
        this.mineralsToCombine(RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_GHODIUM_ACID,false);
        
        
        //const cost = Game.market.calcTransactionCost(20000, 'W68N35', 'W50S10');
        //console.log(cost);
        //console.log(Game.market.deal('59be6048f852936b19ed9f60',15000,"W68N35"));
        //console.log(spawn.room.terminal.send(RESOURCE_ENERGY,170000,'W61N35'));

                
        
        if(!this.obj.memory.hostileInRoom){
            var HARVESTERS = 1;
            var UPGRADERS = 1;
            var BUILDERS = 0;
            var HOARDERS = 1;
            var HOARDERTWOS = 1;
            var TRUCKERS = 2;
            var TANKS = 0;
            var WALLREPPERS = 1;
            var MEDICS = 0;
            var RESERVERS = 0;
            var MINERAL_MINERS = 0;
            var REMOTE_BUILDERS = 0;
            var REMOTE_HOARDER = 2;
            var REMOTE_TRUCKERS = 2;
            var GUARD_DOGS = 1;
            var LOGISTICS = 1;
            var LAB_ASSISTANTS = 0;
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
            ['labAssistant',[CARRY,MOVE],roleLabAssistant,LAB_ASSISTANTS],
            ['logistics',[CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],roleLogistics,LOGISTICS],
            ['guarddog',[TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK],roleGuardDog,GUARD_DOGS],
            ['remoteTrucker',[CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],roleRemoteTrucker,REMOTE_TRUCKERS],
            ['remoteHoarder',[CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY],roleRemoteHoarder,REMOTE_HOARDER],
            ['remoteBuilder',[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleRemoteBuilder,REMOTE_BUILDERS],            
            ['harvester',[WORK,CARRY,CARRY,MOVE,MOVE],roleHarvester,HARVESTERS],
            ['reserver',[CLAIM,MOVE],roleReserver,RESERVERS],
            ['medic',[TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,HEAL,MOVE,HEAL],roleMedic,MEDICS],
            ['upgrader',[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE],roleUpgrader,UPGRADERS],
            ['builder',[WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE,WORK,CARRY,MOVE,MOVE],roleBuilder,BUILDERS],
            ['wallrepper',[WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],roleWallrepper,WALLREPPERS],
            ['tank',[TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK],roleTank,TANKS],
            ['hoarder',[WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE],roleHoarder,HOARDERS],
            ['hoadertwo',[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE],roleHoarderTwo,HOARDERTWOS],
            ['trucker',[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],roleTrucker,TRUCKERS],
            ['mineralMiner',[WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],roleMineralMiner,MINERAL_MINERS]            
        ];
        
        this.autoSpawn(roleArray);

        
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
	runLinks: function(controllerLink,storageLink,sourceOneLink,sourceTwoLink){
	    if(storageLink){
    	    if(storageLink.energy == storageLink.energyCapacity){
    	        storageLink.transferEnergy(controllerLink);
    	    }
	    }
	    if(sourceOneLink){
    	    if(sourceOneLink.energy == sourceOneLink.energyCapacity){
    	        sourceOneLink.transferEnergy(controllerLink);
    	    }
	    }
	    if(sourceTwoLink){
    	    if(sourceTwoLink.energy == sourceTwoLink.energyCapacity){
    	        sourceTwoLink.transferEnergy(controllerLink);
    	    }
	    }
	},
	registerLinks: function(controllerLink,storageLink,sourceOneLink,sourceTwoLink){
	    if(controllerLink){
	        this.obj.memory.controllerLinkId = controllerLink.id;
	    }
	    if(storageLink){
	        this.obj.memory.storageLinkId = storageLink.id;
	    }
	    if(sourceOneLink){
	        this.obj.memory.sourceOneLinkId = sourceOneLink.id;
	    }
	    if(sourceTwoLink){
	        this.obj.memory.sourceTwoLinkId = sourceTwoLink.id;
	    }
	},
	registerLabs: function(firstLabId, secondLabId){
	    this.obj.memory.firstLabId = firstLabId;
	    this.obj.memory.secondLabId = secondLabId;
	},
	runLabs: function(firstLabId, secondLabId){
	    let labs = this.obj.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}});
        let index1 = labs.indexOf(Game.getObjectById(this.obj.memory.firstLabId));
        let index2 = labs.indexOf(Game.getObjectById(this.obj.memory.secondLabId));
        if(index1 > -1){
            labs.splice(index1,1);
        }
        if(index2 > -1){
            labs.splice(index2,1);
        }
        for(let i of labs){
            i.runReaction(Game.getObjectById(this.obj.memory.firstLabId),Game.getObjectById(this.obj.memory.secondLabId));
        }
	},
    mineralsToCombine: function(mineralOne,mineralTwo,reset){
    	for(let i in Game.creeps){
    		let creep = Game.creeps[i];
    		if(creep.memory.role === 'labAssistant' && creep.memory.roomName === this.obj.name){
    			creep.memory.mineralOne = mineralOne;
    			creep.memory.mineralTwo = mineralTwo;
    			creep.memory.reset = reset;
    		}
    	}
    },
	autoTransfer: function(transferRoom){
	    if(this.obj.terminal.store[RESOURCE_ENERGY] > 49999){
	        if(!this.obj.terminal.send(RESOURCE_ENERGY,40000,transferRoom)){
	            console.log('insufficient energy in terminal to transfer from ' + this.obj.name + ' to ' + transferRoom)
	        }
	    }
	},
	
};

module.exports = roomThree;