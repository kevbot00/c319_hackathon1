class Gameboard{
    constructor( sourceResources, sourceBuildings, sourceTokens ){
        this.sourceResources = sourceResources;
        this.sourceBuildings = sourceBuildings;
        this.sourceTokens = sourceTokens;
        this.buildings = {
            building1: null,
            building2: null,
            building3: null,
            building4: null
        };
        this.checkRequirements = this.checkRequirements.bind(this);
        // this.clickedBuildingCards = this.clickedBuildingCards.bind(this);
        this.shuffle( this.sourceBuildings );
        this.dealBuildingCards();
        this.addBuildingsToDom();
    }
    shuffle( thingToShuffle ){
        for( var cardI = thingToShuffle.length-1; cardI>0; cardI--){
            var randomIndex = Math.floor(Math.random() * cardI);
            var temp = thingToShuffle[randomIndex];
            thingToShuffle[randomIndex] = thingToShuffle[cardI];
            thingToShuffle[cardI] = temp;
        }
    }
    dealBuildingCards(){
        this.buildings.building1 = this.sourceBuildings.pop();
        this.buildings.building2 = this.sourceBuildings.pop();
        this.buildings.building3 = this.sourceBuildings.pop();
        this.buildings.building4 = this.sourceBuildings.pop();
    }
    addBuildingsToDom(){
        for (var building in this.buildings) {
            var resources = '';
            var req = this.buildings[building].requirements;
            for (var x in req){
                resources = req[x] + ' ' + x + ", " + resources;
                resources = resources.slice(0,-1);
            }
            var pointVal = $('<div>').text('Points: ' + this.buildings[building].points);
            var requirements = $('<div>').text('Requires: ' + resources);
            var newDiv = $('<div>')
            .addClass('babyDiv')
            .css({'height': '100%'})
            .append( pointVal, requirements);
            $('.'+building).append(newDiv);
        }
    }

    resetBuildingCards(){
        for (var building in this.buildings){
            if (this.buildings[building] === null){
                this.buildings[building] = this.sourceBuildings.pop();
                var resources = '';
                var req = this.buildings[building].requirements;
                for (var x in req){
                    resources = req[x] + ' ' + x + ", " + resources;
                    resources = resources.slice(0,-1);
                }
                var pointVal = $('<div>').text('Points: ' + this.buildings[building].points);
                var requirements = $('<div>').text('Requires: ' + resources);
                var newDiv = $('<div>')
                .addClass('babyDiv')
                .css({'height': '100%'})
                .append( pointVal, requirements);
                $('.'+building).append(newDiv);
                $('.'+building).fadeIn(400);
            }
        }
    }

    checkRequirements( player , building ){
        if (this.buildings[building] === null) {
            return;
        }
        var playerResources = player.getStorage();
        var totalResourceNeeded = this.getTotalResourceUsed( playerResources , building );
        if (!totalResourceNeeded){
            console.warn('not enough resource, pick a different building');
            return false;
        }
        totalResourceNeeded.points = this.buildings[building].points;
        return totalResourceNeeded;
    }

    getTotalResourceUsed( playerStorage , building ){

        var playerResourcesAvailableCount = null;
        var totalResourcesNeeded = null;
        var buildingRequirement = this.buildings[building].requirements;
        // adds total resources needed from building tile
        // adds types of resources needed
        for (var resourceNeeded in buildingRequirement){
            totalResourcesNeeded += buildingRequirement[resourceNeeded];
        }
        // adds total resources in players storage
        for (var availableResource in playerStorage ){
            playerResourcesAvailableCount += playerStorage[availableResource];
        }
        // if player's total resource is less than total building resources need
        //return false
        if (playerResourcesAvailableCount < totalResourcesNeeded){
            return false;
        }

        return this.checkPlayerResource( buildingRequirement , playerStorage );
    }

    checkPlayerResource( buildingReq , playerResources ){
        var playerResourcesNeeded = 
        {
            resources: 
            {
                food: 0,
                stone: 0,
                clay: 0,
                wood: 0
            }
        };

        // var buildingRequirement = this.buildings[building].requirements;
        var playerFoodAvailable = playerResources.food;
        //for building req and playerResources needed
        for (var resource in buildingReq){
            // if player has enough resource, add to playerResourcesNeeded object
            if (playerResources[resource] >= buildingReq[resource]){
                playerResourcesNeeded.resources[resource] += buildingReq[resource];
            } // else if player doesn't have enough resource but have food to make up that resource, add the food and resource needed to playerResourcesNeeded object    
            else if ( playerResources[resource] + playerFoodAvailable >= buildingReq[resource]){
                playerResourcesNeeded.resources.food += buildingReq[resource] - playerResources[resource];
                playerResourcesNeeded.resources[resource] += playerResources[resource];
                playerFoodAvailable--;
            } else {
                return false;
            }
        }
        playerResourcesNeeded.points = buildingReq.points;
        return playerResourcesNeeded;
    }

    replaceBuildCard( ){
            buildingReq.food = buildingReq[key] + playerFoodUsed || 1;
            playerFoodUsed += buildingReq[key] || 1;
            currentFoodUsed += buildingReq[key] || 1;
            playerFoodRemaining -= buildingReq[key];
            buildingReq[key] -= currentFoodUsed || 1;   
            player.storage.food = playerFoodRemaining;
            currentFoodUsed = 0;
            player.storage.food = playerFoodRemaining;
    }
    clickedBuildingCards( building ){
        this.buildings[building] = null;
    }
}