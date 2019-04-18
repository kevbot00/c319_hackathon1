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

    addBuildingsToDom( building1, building2, building3 ){
        var newDiv = $('<div>')
            .addClass('babyDiv')
            .css('background-color', 'green')
            .text('Points: 3');
        $('.building1').append(newDiv);
    }

    checkRequirements( player , building ){
        if (this.buildings.building === null) {
            return;
        }

        var buildingReq = this.buildings[building].requirements;
        for (var key in buildingReq){
            if (buildingReq[key] > player.storage[key]){
                console.log(false);
                return false;
            }
        }

        return this.buildings[building];
        //if all true, start to decrement player storage as required
        //increment victory points
        //increment building made
        // decrement pioneers
        // change bulding to null
        //return resources to board

    }

    resetBuildingCards(){
        console.log('initial', this.buildings);
        for (var key in this.buildings){
            if (this.buildings[key] === null){
                this.buildings[key] = this.sourceBuildings.pop();
            }
        }
        
    }




}