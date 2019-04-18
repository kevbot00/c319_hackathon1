class Player{
    constructor(color){
        this.color = color;
        this.maxPioneers = 2;
        this.pioneers = 2;
        this.storage = {
            wood: 0,
            clay: 0,
            stone: 0
        }
        this.storageCount = 2;
        this.tokenCount = 0;
        this.victoryPoint = 0;
        this.playerArea = null;
    }
    updateStats( resource, delta, workerAdjust ){
        if(workerAdjust!==undefined){
            this.pioneers+=workerAdjust;
        }
        this.storage[resource]+=delta;
        this.storageCount-=delta;
        this.playerArea.find('.pioneers').text(this.pioneers);
        this.playerArea.find('.'+resource).text(this.storage[resource]);
        this.playerArea.find('.storage').text(this.storageCount);
    }
    updatePerBuilding ( resource, delta, points, workerAdjust){
        if(workerAdjust!==undefined){
            this.pioneers+=workerAdjust;
        }
        this.storage[resource]-=delta;
        this.storageCount+=delta;
        this.victoryPoint+=points;
        // DOM manipulation
        this.playerArea.find('.pioneers').text(this.pioneers);
        this.playerArea.find('.'+resource).text(this.storage[resource]);
        this.playerArea.find('.storage').text(this.storageCount);
        this.playerArea.find('.points').text(this.victoryPoint);
    }
    render(){
        this.playerArea = $("#playerDom").clone();
        this.playerArea.css({
            backgroundColor: 'light'+this.color
        })
        return this.playerArea;
    }

}