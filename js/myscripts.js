// each grid is equal width and height
// each tile receive a three statuses : bomb, number blank
// when each tile is clicked, its understide is revealed
//     if bomb, game over
//     reveal  board
//     if number, tile is revealed
//     if blank, tile is revealed to be blank, and tiles in each direction (H V D) are revealed if they are numbers of blank (recursive function?);

function Tile(i){
    this.underside = i;
    this.index =i;
    this.adjacentBombs;
}
function Board(){
    this.board = [];
    this.size;
}

Board.prototype.makeBoard = function(size){
    var boardArea = size * size;
    for(var i = 1; i <= boardArea; i++){
        var newTile = new Tile(i);
        this.board.push(newTile);
    }
    this.size = size;
}
Board.prototype.makeBombs  = function(){
    //this will take a paramter in the future to determine how  many bombs are in a  game, ie difficulty
    var randNum = Math.floor((Math.random() * this.board.length) + 1);
    this.board[randNum].underside = "bomb";
  };

Board.prototype.makeNumbers =  function(){
    var size = parseInt(this.size);
    var numberPlaces = [];
    for(var i=0; i < this.board.length; i++){
        if(this.board[i].underside === "bomb"){
            var index = parseInt(this.board[i].index);
            if(index % size !== 0){
                numberPlaces.push(index-(size+1));
                numberPlaces.push(index+1);
                numberPlaces.push(index+size+1);
            }
            if((index-1) % size !== 0 ){
                numberPlaces.push(index-(size-1));
                numberPlaces.push(index-1);
                numberPlaces.push(index+size-1);
            }
                numberPlaces.push(index+size);
                numberPlaces.push(index-size);

        }
    }
    console.log(numberPlaces);
    };




$(function(){
    $("button").click(function(){
        var newBoard = new Board();
        var inputSize = $("#input").val();
        newBoard.makeBoard(inputSize);
        newBoard.makeBombs();
        newBoard.makeNumbers();
        newBoard.num
        console.log(newBoard);
        newBoard.board.forEach(function(i){
            $(".board").append("<p class='square'> "+i.underside+" </p>");
        });
    });
});
///if a bomb exists, run this equation to add numbers to other places using array of coordinates



// rules for determininig underside numbers of board :
// if tile.underside = bomb,
//     index-(size+1) , index +1, index+(size+1)  ++,
//         unless index % size ==0 //right panel after number
//     index-(size-1), index -1, index+(size-1)  ++
//         unless index +1 % size ==0;
//     index+size ++
//         unless bigger than size^2
//     index-size ++
//         unless smaller than zero
