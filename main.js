$(document).ready(realStartApp);

var game;
var gameInput;
var tokens = [1,2,3,4,5,6];

var resources = {
    clay: {
        count: 9,
        maxCount: 9,
        playerLimit: 2,
        awardForFirst: 2,
        currentPlayers: []
    },
    wood: {
        count: 9,
        maxCount: 9,
        playerLimit: 2,
        awardForFirst: 2,
        currentPlayers: []
    },
    stone: {
        count: 9,
        maxCount: 9,
        playerLimit: 2,
        awardForFirst: 2,
        currentPlayers: []
    },
    food: {
        count: 9,
        maxCount: 9,
        playerLimit: Infinity,
        awardForFirst: 1,
        currentPlayers: []
    }
};

var buildings = [
{
    name: 'farm',
    points: 60,
    requirements:{
        wood: 1,
        clay: 2
    },
},
{
    name: 'barn',
    points: 60,
    requirements: {
        stone: 1,
        clay: 2
    }
},
{
    name: 'wheelbarrow',
    points: 60,
    requirements:{
        wood: 1,
        stone: 1
    },
},
{
    name: 'windmill',
    points: 60,
    requirements: {
        wood: 1,
        stone: 2
    }
},
{
    name: 'windmill',
    points: 60,
    requirements: {
        stone: 1,
        clay: 2
    }
},
{
    name: 'windmill',
    points: 60,
    requirements: {
        wood: 2,
        stone: 1
    }
},
{
    name: 'windmill',
    points: 40,
    requirements: {
        wood: 1,
        clay: 1
    }
},
{
    name: 'windmill',
    points: 40,
    requirements: {
        stone: 1,
        clay: 1
    }
}
];

function realStartApp(){
    gameInput = new GameInput();
}

function startApp( numPlayers ){
    game = new Game( resources, buildings, tokens);
    game.startGame( numPlayers );
}








