class Player{
    constructor(color){
        this.color = color;
        this.victoryPoint = 0;
        this.tokenCount = 0;
        this.buildingsMade = 0;
        this.storageCount = 4;
        this.maxPioneers = 2;
        this.pioneers = 2;
        this.storage = {
            wood: 0,
            clay: 0,
            stone: 0,
            food: 0
        };
        this.playerArea = null;
    }

    updateStats( resource, delta, workerAdjust ){
        if(workerAdjust!==undefined){
            this.pioneers+=workerAdjust;
        }
        this.storage[resource]+=delta;
        this.storageCount-=delta;
        this.renderDomElements( resource );
    }

    addBuildingsMade(){
        this.buildingsMade++;
        this.renderDomElements();
    }

    updatePerBuilding ( resource, delta ){
        
        this.storage[resource]-=delta;
        this.storageCount+=delta;
        
        this.renderDomElements( resource );
    }

    updatePoints( points , tokens ){
        this.victoryPoint+=points;
        this.tokenCount += tokens;
    }

    updateBuildingWorkerAdjust( workerAdjust ){
        if(workerAdjust!==undefined){
            this.pioneers+=workerAdjust;
        }
    }

    resetPlayerPioneer(){
        this.pioneers = this.maxPioneers;
        this.playerArea.find('.pioneers').text(this.pioneers);
    }

    render(){
        this.playerArea = $("#playerDom").clone();
        
        this.playerArea.css({
            backgroundColor: 'light'+this.color,
        });
        return this.playerArea;
    }

    renderDomElements( resource ){
        this.playerArea.find('.pioneers').text(this.pioneers);
        this.playerArea.find('.'+resource).text(this.storage[resource]);
        this.playerArea.find('.buildings').text(this.buildingsMade);
        this.playerArea.find('.storage').text(this.storageCount);
        this.playerArea.find('.points').text(this.victoryPoint);
        this.playerArea.find('.tokens').text(this.tokenCount);
    }
}