class Game {
    constructor( resources, buildings, tokens) {
        this.resources = resources;
        this.buildings = buildings;
        this.tokens = tokens;
        // this.playerArray = [];
        this.gameBoard = new Gameboard();
        this.player1 = new Player();
        this.player2 = new Player();
        // false = player1 turn, true = player2 turn
        this.playerTurn = false;
        this.addEventListener = this.addEventListener.bind(this);

    }

    startGame(){
        this.addEventListener();
    
    }

    addEventListener(){
        $('.clay').click( this.gameBoard.checkResources );
        $('.food').click( this.checkResources );
        $('.wood').click( this.checkResources );
        $('.stone').click( this.checkResources );
    }






    render(){

    }
}