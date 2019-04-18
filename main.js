$(document).ready(startApp);

var game;
var resources = [{
    clay: 9,
    limit: 4
},
{
    wood: 9,
    limit: 1
},
{
    stone: 9,
    limit: 1
},
{
    food: 4,
    limit: Infinity
}
];

var buildings = [
{
    name: 'farm',
    points: 100,
    requirements:{
        wood: 1,
        clay: 2
    },
},
{
    name: 'barn',
    points: 100,
    requirements: {
        wood: 1,
        clay: 2
    }
},
{
    name: 'wheelbarrow',
    points: 100,
    requirements:{
        wood: 1,
        clay: 2
    },
},
{
    name: 'windmill',
    points: 100,
    requirements: {
        wood: 1,
        clay: 2
    }
}
];

var tokens = [1,2,3,4,5,6];


function startApp(){
    game = new Game( resources, buildings, tokens);
    // game.startGame();
}