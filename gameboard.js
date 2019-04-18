class Gameboard{
    constructor( sourceResources, sourceBuildings, sourceTokens ){
        this.sourceResources = sourceResources;
        this.sourceBuildings = sourceBuildings;
        this.sourceTokens = sourceTokens;
        this.buildings = {
            building1: null,
            building2: null,
            building3: null
        };
        this.checkRequirements = this.checkRequirements.bind(this);
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
            // var image = $('<img>').attr('src', 'images/building.png');

            var newDiv = $('<div>')
            .addClass('babyDiv')
            .css({'height': '100%'})
            .append( pointVal, requirements)
            $('.'+building).append(newDiv);
        }
    }

    checkRequirements( player , building ){
        if (this.buildings.building === null) {
            return;
        }
        var foodCount = 0;
        var buildingReq = this.buildings[building].requirements;
        for (var key in buildingReq){
            if (buildingReq[key] > player.storage[key] + player.storage.food){
                return false;
            } else if (player.storage.food){
                if (buildingReq[key] > player.storage.food){
                    buildingReq.food = buildingReq[key] - player.storage.food + foodCount || 1;
                    foodCount += buildingReq[key] - player.storage.food || 1;
                    buildingReq[key] -= buildingReq[key] - foodCount || 1;
                } else {
                    buildingReq.food = player.storage.food - buildingReq[key] + foodCount || 1;
                    foodCount += player.storage.food - buildingReq[key] || 1;
                    buildingReq[key] -= buildingReq[key] - foodCount || 1;
                } 
                player.storage.food = buildingReq.food;
            }
        }
        player.storage.food = foodCount;
        return this.buildings[building];
    }

    resetBuildingCards(){
        for (var key in this.buildings){
            if (this.buildings[key] === null){
                this.buildings[key] = this.sourceBuildings.pop();
            }
        }
        
    }




}