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
    this.revealed = false;
    // this.adjacentBombs = 0;
}
function Board(){
    this.board = [];
    this.size;
    this.area;
}

Board.prototype.makeBoard = function(size){
    this.area = size * size;
    this.size = size;
    for(var i = 0; i < this.area; i++){
        var newTile = new Tile(i);
        this.board.push(newTile);
    }
}

Board.prototype.makeBombs  = function(numberOfBombs){
    //this will take a paramter in the future to determine how  many bombs are in a  game, ie difficulty
    for(var i =0; i< numberOfBombs; i++){
        var randNum = Math.floor((Math.random() * this.area) + 1);
        this.board[randNum].underside = "bomb";
        var numbersAroundBombs = this.adjacentArray(randNum);
         numbersAroundBombs.forEach(function(number){
             if(number >=0 && number <this.area){
                this.board[number].underside += 1;
                console.log(this.board[number].underside);
             }
         }, this);
    }
    console.log(randNum);
    console.log(numbersAroundBombs);
};//perfect

//
//return array of adjacent tiles numbers, some invalid
Board.prototype.adjacentArray =  function(tileNumber){
        var tileNumber = tileNumber +1;
        var size = parseInt(this.size);
        var area = this.area;
        var numberPlaces = [];
        var alteredPlaces = [];
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
                if((numberPlaces[i] <= area) && (numberPlaces[i] > 0)){
                    alteredPlaces.push(numberPlaces[i]-1);
                }
        };
        return alteredPlaces; //actualy tiles indexes works with displayperfect
}

    //changes tile # status to revealed: true as well as those for all others who have not been revealed. should reveal whole board
    Board.prototype.reveal = function(input){
        var board = this;
        var adjacentTiles = this.adjacentArray(input);
        this.board[input].revealed = true;
        adjacentTiles.forEach(function(next){
            if((board.board[next].revealed === false)){
                board.board[next].revealed = true;
                board.reveal(next);
                console.log(next + "revealed");
            }
            else{
            }
        })
    }


var newBoard = new Board();
newBoard.makeBoard(3);
// newBoard.makeBombs(1);


$(function(){
    $("button").click(function(){
        var newBoard = new Board();
        var inputSize = $("#input").val();
        newBoard.makeBoard(inputSize);
        newBoard.makeBombs(1);
        console.log(newBoard);
        var drawboard = function(boardObject){
            boardObject.board.forEach(function(tile){
                var tile = tile;
                    $(".board").append("<p class='square'> </p>");
                        $(".square").last().click(function(){
                            boardObject.reveal(tile.index);
                            $(this).html(tile.revealed);
                            drawboard(this);
                        });
                    });
            }
        drawboard(newBoard);
        $(".board").click(function(){
            $(this).empty();
            drawboard(newBoard);
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
