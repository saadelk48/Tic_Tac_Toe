const GameBoard = (()=>{
    const board =["","","","","","","","",""];

    const getBoard =()=> board;

    const isCellAvailable =(index)=> board[index]==="";

    const placeSymbol = (index,symbole)=>{
        if(isCellAvailable(index)){
            board[index]=symbole;
        }
    };

    const printBoard =()=>{
        console.log(`
            ${board[0] || " "} | ${board[1] || " "} | ${board[2] || " "}
            ________

            ${board[3] || " "} | ${board[4] || " "} | ${board[5] || " "}

            ________

            ${board[6] || " "} | ${board[7] || " "} | ${board[8] || " "}
            `);
    };

    return{
        getBoard,placeSymbol,printBoard
    };
})();

const Player =(name,symbol)=>{
    return {name,symbol};
}

const GameController =(()=>{
    const board = GameBoard;
      

    const Player1 =Player("Player 1","X");
    const Player2 =Player("Player 2","O");

    let roundCount=0;

    let currentPlayer=Player1;
    const printNewRound = () => {
        board.printBoard();
        console.log(`${currentPlayer.name}'s turn.`);
    };
    const switchTurn =()=>{
        currentPlayer = currentPlayer === Player1 ? Player2 :Player1;
    };

    const PlayRound=(index)=>{
     
        board.placeSymbol(index,currentPlayer.symbol);
        roundCount++;
        
            if(checkWin(board.getBoard(),currentPlayer.symbol)){
                board.printBoard();
                console.log(`${currentPlayer.name} wins !`);
                return;
            }
            if(roundCount===9){
                board.printBoard();
                console.log("its a draw!");
                return;
            }   
        switchTurn();
        printNewRound();
        
        console.log(roundCount);
    };
    printNewRound();
    
    return{
        printNewRound,
        switchTurn,
        PlayRound
    };
    
})();

const checkWin = (board,symbol)=>{
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return winPatterns.some(pattern=>
     pattern.every(index => board[index] === symbol)
    );
};

const game=GameController;
game.PlayRound(0); 
game.PlayRound(4); 
game.PlayRound(8); 
game.PlayRound(1); 
game.PlayRound(7); 
game.PlayRound(6); 
game.PlayRound(2); 
game.PlayRound(5); 
game.PlayRound(3); 

