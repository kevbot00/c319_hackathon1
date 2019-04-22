class GameInput{
    constructor(){
        this.handleInput = this.handleInput.bind( this );
        this.attachHandlers();
    }
    attachHandlers(){
        $("#submitInput").click( this.handleInput );
        $("#userInput").focus( this.clearInput );
        $("#userInput").keypress(function(e){
            if(e.keyCode===13) {
                $("#submitInput").click();
            }
        });
    }
    handleInput(){
        var userInput = parseInt( $("#userInput").val());
        if(userInput<2 || userInput>4){
            this.displayResult('Must be from 2 to 4 players!');
            return;
        }
        startApp(userInput);
        $('.start-modal').hide();
    }
    clearInput(){
        $("#userInput").val('');
    }
    displayResult(message){
        $("#display").text( message );
    }
}