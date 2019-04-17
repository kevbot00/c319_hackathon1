class Game {
    constructor( resources, buildings, tokens) {
        this.resources = resources;
        this.buildings = buildings;
        this.tokens = tokens;
        this.gameBoard = new Gameboard(this.resources, this.buildings, this.tokens);
        this.player1 = new Player();
        this.player2 = new Player();
        this.playerArray = [];
        this.playerArray.push( this.player1, this.player2);
        // false = player1 turn, true = player2 turn
        this.playerTurnIndex = 0;
        this.activePlayer = this.playerArray[this.playerTurnIndex];
        
        this.addEventListener = this.addEventListener.bind(this);
        this.checkResources = this.checkResources.bind(this);
        this.checkRequirement = this.checkRequirement.bind(this);
        this.addEventListener();



    }

    addEventListener(){
        $('.clay').click( this.checkResources );
        // $('.food').click( this.checkResources );
        $('.wood').click( this.checkResources );
        $('.stone').click( this.checkResources );
<<<<<<< HEAD
        // $('.building1').click( this.gameBoard );
        // $('.building2').click( this.gameBoard. );
        // $('.building3').click( this.gameBoard. );
=======
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
>>>>>>> 2568eb4e46a13df53aac6a39dda33b2f59ad5368
    }

    checkResources(){
        // var count = $(event.currentTarget)[0].childNodes[1].textContent;
        var count = $(event.currentTarget).children().text();
        var clayCount= this.resources[0].clay;
        var resourceName = $(event.currentTarget)[0].className;
        if (resourceName === 'clay' && this.resources[0].clay > 0 && this.activePlayer.storageCount > 0 && this.resources[0].limit > 0){
            this.resourceClicked( resourceName );
        } else if (resourceName === 'wood' && this.resources[0].clay > 0 && this.activePlayer.storageCount > 0 && this.resources[0].limit > 0){
            this.resourceClicked( resourceName );
        }   else if (resourceName === 'stone' && this.resources[0].clay > 0 && this.activePlayer.storageCount > 0 && this.resources[0].limit > 0){
            this.resourceClicked( resourceName );
        }  
    }
    resourceClicked( resource ){
        console.log(this.resources[0]);
        // this.resources[0].clay = this.resources[0].clay;
        switch (resource){
            case 'clay':
                this.resources[0].clay = parseInt(this.resources[0].clay) - 1;
                $(event.currentTarget).children().text(this.resources[0].clay);
                this.resources[0].limit--;
                this.activePlayer.storage.clay++;
                this.activePlayer.pioneers--;
                this.activePlayer.storageCount--;
                this.updateDomElement( 'clay' );
                if (this.playerTurnIndex === 0){
                    this.playerTurnIndex = 1;
                    this.activePlayer = this.playerArray[1];
                } else {
                    this.playerTurnIndex = 0;
                    this.activePlayer = this.playerArray[0];
                }      
                break;
            case 'wood':
                this.resources[1].wood = parseInt(this.resources[1].wood) - 1;
                $(event.currentTarget).children().text(this.resources[1].wood);
                this.resources[1].limit--;
                this.activePlayer.storage.wood++;
                this.activePlayer.pioneers--;
                this.activePlayer.storageCount--;
                this.updateDomElement( 'wood' );
                if (this.playerTurnIndex === 0){
                    this.playerTurnIndex = 1;
                    this.activePlayer = this.playerArray[1];
                } else {
                    this.playerTurnIndex = 0;
                    this.activePlayer = this.playerArray[0];
                }      
                break;
            case 'stone':
                this.resources[2].stone = parseInt(this.resources[2].stone) - 1;
                $(event.currentTarget).children().text(this.resources[2].stone);
                this.resources[2].limit--;
                this.activePlayer.storage.stone++;
                this.activePlayer.pioneers--;
                this.activePlayer.storageCount--;
                this.updateDomElement( 'stone' );
                if (this.playerTurnIndex === 0){
                    this.playerTurnIndex = 1;
                    this.activePlayer = this.playerArray[1];
                } else {
                    this.playerTurnIndex = 0;
                    this.activePlayer = this.playerArray[0];
                }      
                break;
                
                
        }
    }

    updateDomElement( resource ){
        var p1clayClass = $('.p1clayCounter');
        var p1pioneerClass = $('.p1pioneerCounter');
        var p1StorageCounter = $('.p1storageCounter');
        var p2clayClass = $('.p2clayCounter');
        var p2pioneerClass = $('.p2pioneerCounter');
        var p2StorageCounter = $('.p2storageCounter');

        if (this.activePlayer === this.playerArray[0]){
            // p1clayClass.text(this.player1.storage.clay);
            this.updatePlayerStorage( this.activePlayer, resource);
            p1pioneerClass.text(this.player1.pioneers);
            p1StorageCounter.text(this.player1.storageCount);   
            console.log(this.playerTurnIndex);
        } else {
            // p2clayClass.text(this.player2.storage.clay);
            this.updatePlayerStorage( this.activePlayer, resource);
            p2pioneerClass.text(this.player2.pioneers);
            p2StorageCounter.text(this.player2.storageCount);
        }
    }

    updatePlayerStorage( player, resource ){
        var p2clayClass = $('.p2clayCounter');
        if ( player === this.playerArray[0]){
            switch (resource){
                case 'clay':
                    $('.p1clayCounter').text(this.player1.storage.clay);
                    break;
                case 'wood':
                    $('.p1woodCounter').text(this.player1.storage.wood);
                    break;
                case 'stone':
                    $('.p1stoneCounter').text(this.player1.storage.stone);
                    break;

            }
        } else {
            switch (resource){
                case 'clay':
                    $('.p2clayCounter').text(this.player2.storage.clay);
                    break;
                case 'wood':
                    $('.p2woodCounter').text(this.player2.storage.wood);
                    break;
                case 'stone':
                    $('.p2stoneCounter').text(this.player2.storage.stone);
                    break;
            }
        }
        
    }

    render(){

    }
}