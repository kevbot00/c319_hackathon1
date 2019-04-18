class Game {
    constructor( resources, buildings, tokens) {
        this.resources = resources;
        this.buildings = buildings;
        this.tokens = tokens;
        this.gameBoard = new Gameboard(this.resources, this.buildings, this.tokens);
        this.players = [];
        this.addPlayer('blue');
        this.addPlayer('yellow');

        // false = player1 turn, true = player2 turn
        this.playerTurnIndex = 0;
        this.addEventListener = this.addEventListener.bind(this);
        this.checkResources = this.checkResources.bind(this);
        this.checkBuildingRequirement = this.checkBuildingRequirement.bind(this);
        this.addEventListener();
    }


    addPlayer(color){
        var playerObj = new Player(color);
        var playerDom = playerObj.render();
        this.players.push(playerObj);
        $(".playerArea").append(playerDom);
    }

    addEventListener(){
        $('.clay').click(this.checkResources);
        $('.wood').click( this.checkResources );
        $('.stone').click( this.checkResources );

        $('.building1').click( this.checkBuildingRequirement);
        $('.building2').click( this.checkBuildingRequirement );
        $('.building3').click( this.checkBuildingRequirement );
    }

    checkBuildingRequirement(){
        var buildingClicked = $(event.currentTarget).attr('class');
        var buildingData = this.gameBoard.checkRequirements( this.players[this.playerTurnIndex], $(event.currentTarget).attr('class'));

        if (buildingData) {
            this.updateAll(buildingData);
            this.gameBoard.buildings[buildingClicked] = null;
        }
        
    }
    updateAll( buildingData ){
        debugger;
        for (var key in buildingData.requirements) {
            this.players[this.playerTurnIndex].updatePerBuilding( key, buildingData.requirements[key], buildingData.points, -1 );
            this.updateBuyback(key, buildingData.requirements);
            
        }
        this.players[this.playerTurnIndex].addBuildingsMade();
        this.gameBoard.buildings.buildingClicked = null;
    }
    updateBuyback( key, buildingData){
        var index = null;
        switch(key){
            case 'clay':
                index = 0;
                break;
            case 'wood':
                index = 1;
                break;
            case 'stone':
                index = 2;
                break;
        }
        this.resources[index][key] += buildingData[key];
        $(".resources").find('span.'+key).text(this.resources[index][key]);
    }


    checkResources(){
        var resource = $(event.currentTarget).children().attr('class');
        var resourceName = $(event.currentTarget)[0].className;
        if (resourceName === 'clay' && this.resources[0][resource] > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[0].limit){
            this.resourceClicked( resourceName , 0);
        } else if (resourceName === 'wood' && this.resources[1][resource] > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[1].limit){
            this.resourceClicked( resourceName , 1 );
        }   else if (resourceName === 'stone' && this.resources[2][resource] > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[2].limit){
            this.resourceClicked( resourceName , 2);
        }  
    }
    resourceClicked( resource , index ){
        this.resources[index][resource] = this.resources[index][resource] - 1;
        this.resources[index].limit = this.resources[index].limit - 1;
        $(".resources").find('span.'+resource).text(this.resources[index][resource]);
        this.players[this.playerTurnIndex].updateStats(resource, 1, -1);
        this.gotoNextPlayer();
        
    }
    gotoNextPlayer(){
        this.playerTurnIndex++;
        if(this.playerTurnIndex === this.players.length){
            this.playerTurnIndex = 0;
        }
    }

    resetTurn(){
        this.gameBoard.resetBuildingCards();
        console.log(this.players.length);
        for (var i = 0; i < this.players.length; i++){
            this.players[i].resetPlayerPioneer();
        }
        //reset resources limit
        this.resetResourceLimit();

    }

    resetResourceLimit(){
        for (var key in this.resources){
            this.resources[key].limit = 2;
        }
    }

}