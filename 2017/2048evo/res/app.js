/**
 * Created by xiaomi on 2017/1/20.
 */

var GameBoard = React.createClass({
       render : function(){
              return <div className="app">
                            <span className="score">
                                   这里是分数
                            </span>
                            Hello world
                            <button>New Game</button>
                     </div>;
       }
});
React.render(<GameBoard />, document.body);