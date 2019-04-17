class Game {
    constructor( resources, buildings, tokens) {
        this.resources = resources;
        this.buildings = buildings;
        this.tokens = tokens;
        this.gameBoard = new Gameboard();
        this.player1 = new Player();
        this.player2 = new Player();
        this.playerArray = [];
        this.playerArray.push( this.player1, this.player2);
        // false = player1 turn, true = player2 turn

        
        this.playerTurnIndex = 0;
        this.activePlayer = this.playerArray[this.playerTurnIndex];
        
        this.addEventListener = this.addEventListener.bind(this);
        this.checkResources = this.checkResources.bind(this);
        // this.updateDomElement = this.updateDomElement.bind(this);
        this.addEventListener();



    }

    startGame(){
        
    
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
        console.log(this.activePlayer);
        if (resourceName === 'clay' && this.resources[0].clay > 0 && this.activePlayer.storageCount > 0 && this.resources[0].limit > 0){
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
        debugger;
        var clayCount= this.resources[0].clay;
        switch (resource){
            case 'clay':
                clayCount = parseInt(clayCount) - 1;
                $(event.currentTarget).children().text(clayCount);
                this.resources[0].limit--;
                this.activePlayer.storage.clay++;
                this.activePlayer.pioneers--;
                this.activePlayer.storageCount--;
                this.updateDomElement();
                if (this.playerTurnIndex === 0){

                    this.playerIndex = 1;
                    this.activePlayer = this.playerArray[1];
                    
                } else {
                    this.playerIndex = 0;
                    this.activePlayer = this.playerArray[0];
                }
                
                
        }
    }

    updateDomElement(){

        var p1clayClass = $('.p1clayCounter');
        var p1pioneerClass = $('.p1pioneerCounter');
        var p1StorageCounter = $('.p1storageCounter');
        var p2clayClass = $('.p2clayCounter');
        var p2pioneerClass = $('.p2pioneerCounter');
        var p2StorageCounter = $('.p2storageCounter');
        debugger;
        if (this.activePlayer === this.playerArray[0]){
            p1clayClass.text(this.player1.storage.clay);
            p1pioneerClass.text(this.player1.pioneers);
            p1StorageCounter.text(this.player1.storageCount);
            
            console.log(this.playerTurnIndex);
        } else {
            p2clayClass.text(this.player2.storage.clay);
            p2pioneerClass.text(this.player2.pioneers);
            p2StorageCounter.text(this.player2.storageCount);
        }
    }

    render(){

    }
}