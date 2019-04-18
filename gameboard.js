class Gameboard{
    constructor( sourceResources, sourceBuildings, sourceTokens ){
        this.sourceResources = sourceResources;
        this.sourceBuildings = sourceBuildings;
        this.sourceTokens = sourceTokens;
        
        this.building1 = null;
        this.building2 = null;
        this.building3 = null;
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
        this.building1 = this.sourceBuildings.pop();
        this.building2 = this.sourceBuildings.pop();
        this.building3 = this.sourceBuildings.pop();
    }
    addBuildingsToDom( building1, building2, building3 ){
        var newDiv = $('<div>').addClass('babyDiv');
        var divImg = newDiv.css('background-color', 'green').text('Points: 3');
        $('.building1').append(newDiv);
        

        // $()
    }

    checkRequirements( player , building ){
        var matchedProduction = [];
        // console.log(player, building );
        // for (var key in this.building1.requirements){
        //     console.log(key);
        //     for (var key in player.storage)

    }




}