class Game {
    constructor( resources, buildings, tokens) {
        this.resources = resources;
        this.buildings = buildings;
        this.tokens = tokens;
        this.gameBoard = new Gameboard(this.resources, this.buildings, this.tokens);
        this.players = [];
        this.colors = ['blue', 'yellow', 'green', 'slategray'];
        this.playerTurnIndex = 0;
        this.checkResources = this.checkResources.bind(this);
        this.checkBuildingRequirement = this.checkBuildingRequirement.bind(this);
        this.addEventListener();
    }
    startGame(numPlayers){
        for (var colorI=0; colorI < numPlayers; colorI++){
            this.addPlayer( this.colors[colorI] );
        }
        this.players[this.playerTurnIndex].makeActive();
    }
    addPlayer(color){
        var playerObj = new Player(color);
        var playerDom = playerObj.render();
        this.players.push(playerObj);
        $(".playerArea").append(playerDom);
    }
    addEventListener(){
        $('.resourceContainer').click( this.checkResources );
        $('.buildingsContainer > div').click( this.checkBuildingRequirement );
        $('.reset-button').click( this.gameRefresh );
    }
    checkResources(){
        var resourceName = $(event.currentTarget).attr('data-resource');
        var resource = this.resources[resourceName];
        if(resource.playerLimit === resource.currentPlayers.length){
            console.error('too many players here');
            return;
        }
        if(resource.count===0){
            console.error('there are no more ' + resourceName + ' left');
            return;
        }
        var award = 1;
        if(resource.currentPlayers.length===0){
            console.log('first player, so getting '+ resource.awardForFirst)
            award = resource.awardForFirst;
        }
        if(resource.count < award){
            console.warn(`trying to take ${award} from ${resourceName}, but there is only ${resource.count}`);
            award = resource.count;
        }
        if(this.players[this.playerTurnIndex].storageCount < award) {
            console.warn(`current player could not store ${award}, can only store ${this.players[this.playerTurnIndex].storageCount}.  Only taking ${this.players[this.playerTurnIndex].storageCount}`);
            award = this.players[this.playerTurnIndex].storageCount;
        }
        resource.currentPlayers.push(this.players[this.playerTurnIndex]);
        this.resourceClicked( resourceName , award)
    }
    resourceClicked( resourceName , count ){
        var resource = this.resources[resourceName];
        resource.count-=count;
        console.log(`taking ${count} ${resourceName}, now at ${resource.count}`);
        $('.resourceContainer[data-resource='+resourceName+'] .resourceCount').text( resource.count );
        $('.resourceContainer[data-resource='+resourceName+'] .spotCount').text( resource.playerLimit - resource.currentPlayers.length );
        this.players[this.playerTurnIndex].updateStats(resourceName, count, -1);
        this.gotoNextPlayer();
    }
    checkBuildingRequirement(){
        var buildingClicked = $(event.currentTarget).attr('class');
        var buildingData = this.gameBoard.checkRequirements( this.players[this.playerTurnIndex], buildingClicked);
        if (buildingData) {
            this.updateAll(buildingData);
            this.gameBoard.clickedBuildingCards(buildingClicked);
            this.gotoNextPlayer();
        }
    }
    updateAll( buildingData ){
        var tokenValue = this.tokens.pop();
        this.players[this.playerTurnIndex].updatePoints( buildingData.points, tokenValue);
        this.players[this.playerTurnIndex].updateBuildingWorkerAdjust( -1 );
        for (var resource in buildingData.resources) {
            this.players[this.playerTurnIndex].updatePerBuilding( resource, buildingData.resources[resource]);
            this.updateBuyback(resource, buildingData.resources);
        }
        this.players[this.playerTurnIndex].addBuildingsMade( buildingData.points, tokenValue, -1 );
        
        $(event.currentTarget).empty().fadeOut(400);
    }
    updateBuyback( resourceName, buildingData){
        this.resources[resourceName].count += buildingData[resourceName];
        $('.resourceContainer[data-resource='+resourceName+'] .resourceCount').text( this.resources[resourceName].count );
    }
    gotoNextPlayer(){
        //if last player has 0 pioneers and not yet won the game, reset player turns
        if (this.players[this.players.length - 1].pioneers === 0 && this.players[this.players.length - 1].buildingsMade !== 2){
            this.resetTurn();
            this.resetResourceLimits();
            this.gameBoard.resetBuildingCards();
        } else if( this.players[this.playerTurnIndex].buildingsMade === 2  ){
            this.gameWin();
            return;
        }
        this.playerTurnIndex++;
        if(this.playerTurnIndex === this.players.length){
            this.playerTurnIndex = 0;
        } 
        for( var i = 0; i< this.players.length; i++){
            this.players[i].makeInactive();
        }
        this.players[this.playerTurnIndex].makeActive();
    }

    resetTurn(){
        for (var i = 0; i < this.players.length; i++){
            this.players[i].resetPlayerPioneer();
        }
        this.resetResourceLimits();
    }

    resetResourceLimits(){
        for (var resource in this.resources){
            this.resources[resource].playerLimit = 2;
            this.resources[resource].currentPlayers = [];
            this.resources.food.playerLimit = Infinity;
            $('.resourceContainer[data-resource='+resource+'] .spotCount').text( this.resources[resource].playerLimit );
        }
    }

    gameWin(){
        var highestPlayer = 0;
        for( var playerI = 1; playerI < this.players.length; playerI++){
            if(this.players[highestPlayer].getTotalPoints() < this.players[playerI].getTotalPoints()){
                highestPlayer = playerI;
            }
        }
        $('.message').text('Congrats! '+this.players[highestPlayer].name +(highestPlayer+1)+', you have conquered The River!');
        $('.congrats-modal').fadeIn();
    }

    gameRefresh(){
        location.reload();
    }
    
}