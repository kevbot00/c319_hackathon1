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
        this.checkRequirement = this.checkRequirement.bind(this);
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
        // $('.food').click( this.checkResources );
        $('.wood').click( this.checkResources );
        $('.stone').click( this.checkResources );

        $('.building1').click( this.checkRequirement);
        $('.building2').click( this.checkRequirement );
        $('.building3').click( this.checkRequirement );
    }

    checkRequirement(){
        var buildingClicked = $(event.currentTarget).attr('class');
        var buildingData = this.gameBoard.checkRequirements( this.players[this.playerTurnIndex], $(event.currentTarget).attr('class'));

        if (buildingData) {
            this.updateAll(buildingData);
            this.gameBoard.buildings[buildingClicked] = null;
        }
        
    }
    updateAll(buildingData){
        for (var key in buildingData.requirements) {
            this.players[this.playerTurnIndex].updatePerBuilding( key, buildingData.requirements[key], buildingData.points[key], -1 );
            console.log( this.players[this.playerTurnIndex] )

            this.resources[key] += buildingData.requirements[key];
        }
        this.gameBoard.buildings.buildingClicked = null;

        console.log(this.gameBoard.buildings.buildingClicked );
        console.log( this.players[this.playerTurnIndex]);


    }
    checkResources(){
        // var count = $(event.currentTarget)[0].childNodes[1].textContent;
        var count = $(event.currentTarget).children().text();
        var clayCount= this.resources[0].clay;
        var resourceName = $(event.currentTarget)[0].className;
        if (resourceName === 'clay' && this.resources[0].clay > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[0].limit > 0){
            this.resourceClicked( resourceName );
        } else if (resourceName === 'wood' && this.resources[0].clay > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[0].limit > 0){
            this.resourceClicked( resourceName );
        }   else if (resourceName === 'stone' && this.resources[0].clay > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[0].limit > 0){
            this.resourceClicked( resourceName );
        }  
    }
    resourceClicked( resource ){
        console.log(this.resources[0]);
        // this.resources[0].clay = this.resources[0].clay;
        this.resources[0][resource] = this.resources[0][resource] - 1;
        $(".resources").find('span.'+resource).text(this.resources[0][resource]);
        // $(event.currentTarget).children().text(this.resources[0][resource]);
        // this.resources[0].limit--;
        // this.players[this.playerTurnIndex].storage[resource]++;
        // this.players[this.playerTurnIndex].pioneers--;
        // this.players[this.playerTurnIndex].storageCount--;
        this.players[this.playerTurnIndex].updateStats(resource, 1, -1)
        this.gotoNextPlayer();
        
    }
    gotoNextPlayer(){
        this.playerTurnIndex++;
        if(this.playerTurnIndex===this.players.length){
            this.playerTurnIndex = 0;
        }
    }


    render(){

    }
}