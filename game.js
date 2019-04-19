class Game {
    constructor( resources, buildings, tokens) {
        this.resources = resources;
        this.buildings = buildings;
        this.tokens = tokens;
        this.gameBoard = new Gameboard(this.resources, this.buildings, this.tokens);
        this.players = [];
        this.addPlayer('blue');
        this.addPlayer('yellow');
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
        $('.clay').click( this.checkResources );
        $('.wood').click( this.checkResources );
        $('.stone').click( this.checkResources );
        $('.food').click( this.checkResources );
        $('.building1').click( this.checkBuildingRequirement );
        $('.building2').click( this.checkBuildingRequirement );
        $('.building3').click( this.checkBuildingRequirement );
        $('.reset-button').click( this.gameRefresh );
    }

    checkResources(){
        var resource = $(event.currentTarget).children().attr('class');
        var resourceName = $(event.currentTarget)[0].className;
        if (resource === 'clay' && this.resources[0][resource] > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[0].limit){
            this.resourceClicked( resource , 0);
        } else if (resource === 'wood' && this.resources[1][resource] > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[1].limit){
            this.resourceClicked( resource , 1 );
        }   else if (resource === 'stone' && this.resources[2][resource] > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[2].limit){
            this.resourceClicked( resource , 2);
        }  else if (resource === 'food' && this.resources[3][resource] > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[3].limit){
            this.resourceClicked( resource , 3);
        }
    }

    resourceClicked( resource , index ){
        this.resources[index][resource] = this.resources[index][resource] - 1;
        this.resources[index].limit = this.resources[index].limit - 1;
        console.log(this.resources[index].limit);
        $(".resources").find('span.'+resource).text(this.resources[index][resource]);
        $(".resources").find('span.'+resource+'limit').text(this.resources[index].limit);
        this.players[this.playerTurnIndex].updateStats(resource, 1, -1);
        this.gotoNextPlayer();
    }

    checkBuildingRequirement(){
        var buildingClicked = $(event.currentTarget).attr('class');
        var buildingData = this.gameBoard.checkRequirements( this.players[this.playerTurnIndex], buildingClicked);
        if (buildingData && buildingClicked) {
            this.updateAll(buildingData);
            this.gameBoard.clickedBuildingCards(buildingClicked);
            this.gotoNextPlayer();
        }
    }

    updateAll( buildingData ){
        var tokenValue = this.tokens.pop();
        this.players[this.playerTurnIndex].updatePoints( buildingData.points, tokenValue);
        this.players[this.playerTurnIndex].updateBuildingWorkerAdjust( -1 );
        for (var key in buildingData.requirements) {
            this.players[this.playerTurnIndex].updatePerBuilding( key, buildingData.requirements[key]);
            this.updateBuyback(key, buildingData.requirements);
        }
        this.players[this.playerTurnIndex].addBuildingsMade( buildingData.points, tokenValue, -1 );
        $(event.currentTarget).children().fadeOut(500);
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
            case 'food':
                index = 3;
                break;
        }
        this.resources[index][key] += buildingData[key];
        $(".resources").find('span.'+key).text(this.resources[index][key]);
    }
    
    gotoNextPlayer(){
        if( this.players[0].pioneers === 0 && this.players[1].pioneers === 0 && this.players[0].buildingsMade !== 2 && this.players[1].buildingsMade !== 2 ){
            this.resetTurn();
            this.resetResourceLimit();
            this.gameBoard.resetBuildingCards();
        } else if( this.players[0].buildingsMade === 2 || this.players[1].buildingsMade === 2 ){
            var message = '';
            if( this.players[0].victoryPoint + this.players[0].tokenCount > this.players[1].victoryPoint + this.players[1].tokenCount ){
                message = 'Player 1';    
            } else {
                message = 'Player 2';
            }
            this.gameWin(message);
        }
        this.playerTurnIndex++;
        if(this.playerTurnIndex === this.players.length){
            this.playerTurnIndex = 0;
            $('span.blue').text('Player 1 Turn');
            $('span.yellow').text('Player 2');
            return;
        } 
        $('span.yellow').text('Player 2 Turn');
        $('span.blue').text('Player 1');
    }

    gameWin(message){
        $('.message').text(message + ' congrats! You have conquered The River!');
        $('.congrats-modal').fadeIn();
 
    }

    gameRefresh(){
        location.reload();
    }

    resetTurn(){
        for (var i = 0; i < this.players.length; i++){
            this.players[i].resetPlayerPioneer();
        }
        this.resetResourceLimit();
    }

    resetResourceLimit(){
        for (var key in this.resources){
            this.resources[key].limit = 4;
            this.resources[3].limit = Infinity;
        }
    }
}