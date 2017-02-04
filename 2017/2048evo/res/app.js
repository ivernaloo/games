/**
 * Created by xiaomi on 2017/1/20.
 */
var initial_board = { // board object, define the whole board position array
       a1:null,a2:null,a3:null,a4:null,
       b1:null,b2:null,b3:null,b4:null,
       c1:null,c2:null,c3:null,c4:null,
       d1:null,d2:null,d3:null,d4:null
};

/*
* helper function filter the availabe_space
* @function
* @param {object} board - board object collection
* @return {Array} - available spaces
* */
function available_spaces(board){
       return Object.keys(board).filter(function(key){
              return board[key] == null;
       });
}


/*
* helper - add the tiles on the board
* @function
* @param {object} board - board object collection
* */
function addTile(board){
       // get a random place for set the tile
       var location = available_spaces(board).sort(function(){
              return 0.5 - Math.random();
       }).pop();

       if(location){
              var two_or_four = Math.floor(Math.random() * 2, 0) ? 2 : 4; // random generate the 2,4
              var _board = newTile(board, location, two_or_four);

              return _board;
       }

       // available_spaces/random location/random 2,4
       return board;
}

/*
* add tile on the place
* @param {object} board - status
* @param {location} string - the location of board
* @param tile position
* @return new board status
* */
function newTile(board, location, value){
       var new_board = {};
       Object.keys(board).forEach(function(key, i){
              new_board[key] = (key == location) ? value : board[key];
       });
       return new_board;
}

function fold_board(board, lines){
       //copy reference
       var new_board = board;  // cache board status
       lines.forEach(function(line){ // read the child of the board collections
              var new_line = fold_line(board, line); // collision between line.
              console.log("new_line : ", new_line)
              Object.keys(new_line).forEach(function(key){
                     //mutate reference while building up board
                     // new_board = set_tile(new_board, key, new_line[key]);
              });
       });
       return new_board;
}

function fold_order(xs, ys, reverse_keys){
       return xs.map(function(x){ // traverse x axis
              return ys.map(function(y){  // traverse y axis
                     var key = [x,y]; // combine axis to coordinate
                     if(reverse_keys){ // reverse the order
                            return key.reverse().join("");
                     }
                     return key.join("");
              });
       });
}
function fold_line(board, line){
       // tiles is a array collection about the element for occupied
       var tiles = line.map(function(key){ // traverse the matrix and return the line which contain array data
              return board[key]; // get the value in the board object
       }).filter(function(tile){
              return tile !== null; // filter and return used_space
       });
       var new_tiles = [];
       if(tiles){

              for(var i=0; i<tiles.length; i++){
                     var tile = tiles[i];
                     if(tile){
                            var next_tile = tiles[i+1];
                            if(next_tile && tile == next_tile ){
                                   new_tiles.push( tile * 2)
                            }
                            else {
                                   new_tiles.push(tile)
                            }
                     }
              }
       }

       var new_line = {};
       line.forEach(function(key, i){
              new_line[key] = new_tiles[i] || null;
       });
       return new_line;
}

function tile_value(tile){
       console.log("tile : ", tile);
       return tile ? tile.values[tile.values.length-1] : null;
}

var left = fold_order(["a","b","c","d"], ["1","2","3","4"], false);
var right = fold_order(["a","b","c","d"], ["4","3","2","1"], false);
var up = fold_order(["1","2","3","4"], ["a","b","c","d"], true);
var down = fold_order( ["1","2","3","4"], ["d","c","b","a"], true);

var GameBoard = React.createClass({
       getInitialState: function(){
              return addTile(initial_board);  // 这里不直接返回initial_board，还要addTile是因为需要在空面板上加一个tile。
       },
       newGame: function(){
              this.setState(this.getInitialState());
       },
       keyHandler: function(e){
              var directions = {
                     37: left,
                     38: up,
                     39: right,
                     40: down
              };

              // combine nearby
              // fold_board(this.state, directions[e.keyCode])

              // set new position
       },
       componentDidMount: function(){
              window.addEventListener("keydown", this.keyHandler, false)
       },
       render : function(){
              return <div className="app">
                            <span className="score">
                                   这里是分数
                            </span>
                            Hello world
                            <Tiles board={this.state}/>
                            <button onClick={this.newGame}>New Game</button>
                     </div>;
       }
});
var Tiles = React.createClass({
       render : function(){
              var board = this.props.board; // object collection
              var tiles = Object.keys(board); // translate objec to array
              return <div className="board">{
                     tiles.map(function(key){
                            return <span className={key}>{board[key]}</span>;
                     })
              }</div>
       }
});
React.render(<GameBoard />, document.body);