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
    this.blocked = false;
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
        newTile.index = i;
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
             if((number >=0 && number <this.area) &&this.board[number].underside !== "bomb"){
                this.board[number].underside += 1;
             }
         }, this);
    }
    // console.log(randNum);
    // console.log(numbersAroundBombs);
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
    if(board.board[input].underside === 0){
        adjacentTiles.forEach(function(next){
            if((board.board[next].revealed === false)){
                board.board[next].revealed = true;
                console.log(next + "revealed");
            if((board.board[next].underside === 0)){
                board.reveal(next);
                console.log("i am running at " +next);
                }
            }
        });
    }
    return adjacentTiles;
}//perfect, dont touch

// sample datat
// var newBoard = new Board();
// newBoard.makeBoard(3);
// newBoard.makeBombs(1);
Board.prototype.endGame = function(){
    this.board.forEach(function(tile){
        tile.revealed = true;
        tile.underside = "bomb";
    });
}

$(function(){
    $("button#easy").click(function(){
        var newBoard = new Board();
        newBoard.makeBoard(11);
        newBoard.makeBombs(18);
        console.log(newBoard);
        drawboard(newBoard);
        $(".board").addClass("boardEasy");
        $(".square").addClass("squareEasy");
    });
    $("button#medium").click(function(){
        var newBoard = new Board();
        newBoard.makeBoard(17);
        newBoard.makeBombs(18);
        console.log(newBoard);
        drawboard(newBoard);
        $(".board").addClass("boardMedium");
        $(".square").addClass("squareEasy");
    });
    $("button#difficult").click(function(){
        var newBoard = new Board();
        newBoard.makeBoard(24);
        newBoard.makeBombs(18);
        console.log(newBoard);
        drawboard(newBoard);
        $(".board").addClass("boardDifficult");
        $(".square").addClass("squareEasy");
    });
    var drawboard = function(boardObject){
        boardObject.board.forEach(function(tile){
        var tile = tile;
        if(tile.underside === "bomb"){
            $(".board").append("<span id=tile"+tile.index+" class='square bombtile '></span>");

            $("#tile"+tile.index).click(function(){
                if(tile.blocked === false){
                boardObject.endGame();
                boardObject.board.forEach(function(newTile){
                    if(newTile.revealed === true){
                        // $("#tile"+newTile.index).addClass("red");
                        $(".square").addClass("squareBomb");
                        $(".bombtile").html("<img class='bomb' src='img/bomb2.png'>");
                    }
                });
                }
            });

            $("#tile"+tile.index).contextmenu(function(){
                if(tile.blocked === false && tile.revealed === false){
                    $(this).html("<img src='img/flag.png'>");
                    tile.blocked = "flag";
                }
                else if(tile.blocked === "flag" && tile.revealed === false){
                    $(this).html("<img src='img/questionmark2.jpg'>");
                    tile.blocked = "questionmark";
                }
                else if(tile.revealed === false){
                    $(this).html(" ");
                    tile.blocked = false;
                }
            });

        }
        else{
        $(".board").append("<span id=tile"+tile.index+" class='square color"+tile.underside+"'>"+" "+"</span>");
        $("#tile"+tile.index).click(function(){
            if(tile.blocked === false){

            $(this).addClass("red");
            boardObject.reveal(tile.index);
            boardObject.board.forEach(function(newTile){
                if(newTile.revealed === true){
                    $("#tile"+newTile.index).addClass("red");
                    $("#tile"+newTile.index).html(newTile.underside);
                    }
                });
            }
        });
        //handles left click flag
        $("#tile"+tile.index).contextmenu(function(){
            if(tile.blocked === false && tile.revealed === false){
                $(this).html("<img src='img/flag.png'>");
                tile.blocked = "flag";
            }
            else if(tile.blocked === "flag" && tile.revealed === false){
                $(this).html("<img src='img/questionmark2.jpg'>");
                tile.blocked = "questionmark";
            }
            else if(tile.revealed === false){
                $(this).html(" ");
                tile.blocked = false;
            }
        });

        }
    });
    $(".square").hover(function(){
        $(this).toggleClass("pressed");
        $(this).toggleClass("red");
    });
}
    // $("button").click(function(){
    //     var newBoard = new Board();
    //     var inputSize = $("#input").val();
    //     newBoard.makeBoard(inputSize);
    //     newBoard.makeBombs(18);
    //     console.log(newBoard);
    //     drawboard(newBoard);
    // });
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
