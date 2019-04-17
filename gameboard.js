class Gameboard{
    constructor(){
        // this.checkResources = this.checkResources.bind(this);
        this.resource = null;
    }

    checkResources(){
        var count = $(this)[0].childNodes[1].textContent;
        console.log(count);
        if (count > 0){
            this.resource = count--;
        }
        console.log(this.resource)
    }
}