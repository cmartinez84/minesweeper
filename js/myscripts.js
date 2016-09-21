// each grid is equal width and height
// each tile receive a three statuses : bomb, number blank
// when each tile is clicked, its understide is revealed
//     if bomb, game over
//     reveal  board
//     if number, tile is revealed
//     if blank, tile is revealed to be blank, and tiles in each direction (H V D) are revealed if they are numbers of blank (recursive function?);

function Tile(i){
    this.underside = 0;
    this.index =i;
    this.revealed ="false";
    // this.adjacentBombs = 0;
}
function Board(){
    this.board = [];
    this.size;
    this.area;
}

Board.prototype.makeBoard = function(size){
    var boardArea = size * size;
    for(var i = 1; i <= boardArea; i++){
        var newTile = new Tile(i);
        this.board.push(newTile);
    }
    this.size = size;
    this.area = size * size;
}

Board.prototype.makeBombs  = function(numberOfBombs){
    //this will take a paramter in the future to determine how  many bombs are in a  game, ie difficulty
    for(var i =1; i<=numberOfBombs; i++){
        var randNum = Math.floor((Math.random() * this.board.length) + 1);
        this.board[randNum-1].underside = "bomb";
        var numbersAroundBombs = this.adjacentArray(randNum);
         numbersAroundBombs.forEach(function(number){
             if(number >=0 && number <=( this.size *this.size)){
                this.board[number-1].underside += 1;
             }
         }, this)
    }
  };


//return array of adjacent tiles numbers, some invalid
    Board.prototype.adjacentArray =  function(tileNumber){
        var size = parseInt(this.size);
        var numberPlaces = [];
            numberPlaces.push(tileNumber+size);
            numberPlaces.push(tileNumber-size);
            if(tileNumber % size !== 0){
                numberPlaces.push(tileNumber-size+1);
                numberPlaces.push(tileNumber+1);
                numberPlaces.push(tileNumber+size+1);
            }
            if((tileNumber-1) % size !== 0 ){
                numberPlaces.push(tileNumber-size-1);
                numberPlaces.push(tileNumber-1);
                numberPlaces.push(tileNumber+size-1);
            }
            for(var i = 0; i < numberPlaces.length; i++){
                if((numberPlaces[i] >= this.area) ||(numberPlaces[i] < 0)){
                    numberPlaces.splice(i,1);
                }
            }
            return numberPlaces;
        };
        // console.log(numberPlaces);


    //changes tile # status to revealed: true as well as those for all others who have not been revealed. should reveal whole board
    // Board.prototype.reveal = function(input){
    //     var thisBoard = this.board;
    //     var adjacentTiles = this.adjacentArray(input);
    //     thisBoard[input-1].revealed = true;
    //     adjacentTiles.forEach(function(number){
    //         if(number < 0 ){
    //             adjacentTiles.splice(adjacentTiles.indexOf(number));
    //             console.log(adjacentTiles.indexOf(number));
    //         }
    //         else{
    //             console.log("else ran");
    //         }
    //     })
    //     console.log(adjacentTiles);
    //
    // }


var newBoard = new Board();
newBoard.makeBoard(4);


$(function(){
    $("button").click(function(){
        var newBoard = new Board();
        var inputSize = $("#input").val();
        newBoard.makeBoard(inputSize);
        newBoard.makeBombs(5);
        newBoard.board.forEach(function(tile){
            var tile = tile;
                $(".board").append("<p class='square'> </p>");
                    $(".square").last().click(function(){
                        $(this).addClass("red");
                    })
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
