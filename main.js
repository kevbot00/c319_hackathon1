$(document).ready(startApp);

var game;
var resources = [{
    clay: 9,
    limit: 1
},
{
    wood: 9,
    limit: 1
},
{
    brick: 9,
    limit: 1
}
];

var buildings = [
{
    name: 'farm',
    requirements:{
        clay: 1,
        wood: 1
    },
},
{
    name: 'barn',
    requirements: {
        wood: 1,
        brick: 1
    }
}
];

var tokens = [1,2,3,4,5,6];


function startApp(){
    game = new Game( resources, buildings, tokens);
    game.startGame();
    game.render();
}