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
        $('.clay').click(this.checkResources);
        // $('.food').click( this.checkResources );
        $('.wood').click( this.checkResources );
        $('.stone').click( this.checkResources );

        $('.building1').click( this.checkRequirement);
        $('.building2').click( this.checkRequirement );
        $('.building3').click( this.checkRequirement );
    }

    checkRequirement(){
        if (this.playerTurnIndex === 0){
            this.gameBoard.checkRequirements( this.player1, $(event.currentTarget));
        } else {
            this.gameBoard.checkRequirements( this.player2, $(event.currentTarget));
        }
    }

    checkResources(){
        
        // var count = $(event.currentTarget)[0].childNodes[1].textContent;
        // console.log($(event.currentTarget).children().attr('class'));
        var resource = $(event.currentTarget).children().attr('class');
        console.log(this.resources[1]);
        console.log(this.players[this.playerTurnIndex].storageCount);
        var count = $(event.currentTarget).children().text();
        var clayCount= this.resources[0].clay;
        var resourceName = $(event.currentTarget)[0].className;
        debugger;
        if (resourceName === 'clay' && this.resources[0][resource] > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[0].limit){
            this.resourceClicked( resourceName , 0);
        } else if (resourceName === 'wood' && this.resources[1][resource] > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[1].limit){
            this.resourceClicked( resourceName , 1 );
        }   else if (resourceName === 'stone' && this.resources[2][resource] > 0 && this.players[this.playerTurnIndex].storageCount > 0 && this.resources[2].limit){
            this.resourceClicked( resourceName , 2);
        }  
    }
    resourceClicked( resource , index ){
        // console.log(this.resources[0]);
        // this.resources[0].clay = this.resources[0].clay;
        this.resources[index][resource] = this.resources[index][resource] - 1;
        this.resources[index].limit = this.resources[index].limit - 1
        $(".resources").find('span.'+resource).text(this.resources[index][resource]);
        // $(event.currentTarget).children().text(this.resources[0][resource]);
        // this.resources[0].limit--;
        // this.players[this.playerTurnIndex].storage[resource]++;
        // this.players[this.playerTurnIndex].pioneers--;
        // this.players[this.playerTurnIndex].storageCount--;
        this.players[this.playerTurnIndex].updateStats(resource, 1, -1);
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