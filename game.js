class Game {
    constructor( resources, buildings, tokens) {
        this.resources = resources;
        this.buildings = buildings;
        this.tokens = tokens;
        // this.playerArray = [];
        this.gameBoard = new Gameboard();
        this.player1 = new Player();
        // this.player2 = new Player();
        // false = player1 turn, true = player2 turn
        this.playerTurn = false;
        this.addEventListener = this.addEventListener.bind(this);
        this.checkResources = this.checkResources.bind(this);


    }

    startGame(){
        this.addEventListener();
    
    }

    addEventListener(){
        $('.clay').click( this.checkResources );
        $('.food').click( this.checkResources );
        $('.wood').click( this.checkResources );
        $('.stone').click( this.checkResources );
    }

    checkResources(){
        // var count = $(event.currentTarget)[0].childNodes[1].textContent;
        var count = $(event.currentTarget).children().text();
        var clayCount= this.resources[0].clay;
    
        var resourceName = $(event.currentTarget)[0].className;
        console.log(resourceName);
        console.log($(event.currentTarget).children().text());
        if (resourceName === 'clay' && this.resources[0].clay > 0 && this.player1.storageCount > 0 && this.resources[0].limit > 0){
            // clayCount = Number(clayCount) - 1;
            // //update DOM count element
            // $(event.currentTarget).children().text(clayCount);
            // //decrement the limit
            // this.resources[0].limit--;
            // //add to player storage
            // this.player1.storage.clay++;
            // console.log(this.player1.storage.clay);
            // $('.p1clayCounter').text(this.player1.storage.clay++);
            this.resourceClicked( resourceName );
        }    
    }
    resourceClicked( resource ){
        var clayCount= this.resources[0].clay;
        switch (resource){
            case 'clay':
                clayCount = Number(clayCount) - 1;
                $(event.currentTarget).children().text(clayCount);
                this.resources[0].limit--;
                this.player1.storage.clay++;
                $('.p1clayCounter').text(this.player1.storage.clay++);
                
        }
    }

    render(){

    }
}