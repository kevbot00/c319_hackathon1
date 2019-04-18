class Player{
    constructor(color){
        this.color = color;
        this.victoryPoint = 0;
        this.tokenCount = 0;
        this.buildingsMade = 0;
        this.storageCount = 2;
        this.maxPioneers = 2;
        this.pioneers = 2;
        this.storage = {
            wood: 0,
            clay: 0,
            stone: 0
        };
        this.playerArea = null;
    }

    updateStats( resource, delta ){
        this.storage[resource]+=delta;
        this.storageCount-=delta;
        this.renderDomElements( resource );
        // this.playerArea.find('.pioneers').text(this.pioneers);
        // this.playerArea.find('.'+resource).text(this.storage[resource]);
        // this.playerArea.find('.storage').text(this.storageCount);
    }

    addBuildingsMade( buildingValue, tokenValue, workerAdjust ){
        if(workerAdjust!==undefined){
            this.pioneers+=workerAdjust;
        }
        this.buildingsMade++;
        this.victoryPoint+=tokenValue + buildingValue;
        this.tokenCount++;
        this.renderDomElements();
    }

    updatePerBuilding ( resource, delta ){
        this.storage[resource]-=delta;
        this.storageCount+=delta;
        // DOM manipulation
        this.renderDomElements( resource );
        // this.playerArea.find('.pioneers').text(this.pioneers);
        // this.playerArea.find('.'+resource).text(this.storage[resource]);
        // this.playerArea.find('.storage').text(this.storageCount);
        // this.playerArea.find('.points').text(this.victoryPoint);
    }

    resetPlayerPioneer(){
        this.pioneers = this.maxPioneers;
        this.playerArea.find('.pioneers').text(this.pioneers);
    }

    render(){
        this.playerArea = $("#playerDom").clone();
    
        this.playerArea.css({
            backgroundColor: 'light'+this.color
        });
        return this.playerArea;
    }

    renderDomElements( resource ){
        this.playerArea.find('.pioneers').text(this.pioneers);
        this.playerArea.find('.'+resource).text(this.storage[resource]);
        this.playerArea.find('.buildings').text(this.buildingsMade);
        this.playerArea.find('.storage').text(this.storageCount);
        this.playerArea.find('.points').text(this.victoryPoint);
    }

    //check if buildings made === 2
        //display winner
        //reset game

}