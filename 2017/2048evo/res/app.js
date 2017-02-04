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

var GameBoard = React.createClass({
       getInitialState: function(){
              return addTile(initial_board);  // 这里不直接返回initial_board，还要addTile是因为需要在空面板上加一个tile。
       },
       newGame: function(){
              this.setState(this.getInitialState());
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