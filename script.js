const GameBoard = (()=>{
    const board =["","","","","","","","",""];

    const getBoard =()=> board;

    const isCellAvailable =(index)=> board[index]==="";

    const placeSymbol = (index,symbole)=>{
        if(isCellAvailable(index)){
            board[index]=symbole;
        }
    };
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = ""; // Reset each cell
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
        getBoard,placeSymbol,printBoard,resetBoard
    };
})();

const Player =(name,symbol,mark,caracter)=>{
    return {name,symbol,mark,caracter};
}

const GameController =(Player1,Player2)=>{
    const board = GameBoard;
    let roundCount=0;
    let currentPlayer=Player1;
    const printNewRound = () => {
        board.printBoard();
      //  console.log(`${currentPlayer.name}'s turn.`);
    };
    const switchTurn =()=>{
        currentPlayer = currentPlayer === Player1 ? Player2 :Player1;
    };

    const getActivePlayer=()=>{
        return currentPlayer;
    };
    const updateTurnDisplay = () => {
        document.querySelector('.Player-one-container p').textContent = currentPlayer === Player1 ? "Your Turn" : "";
        document.querySelector('.Player-two-container p').textContent = currentPlayer === Player2 ? "Your Turn" : "";
    };
    
    const updateCell = (index, mark) => {
        const cell = document.querySelector(`#id${index}`);
        cell.innerHTML = `<img style="width: 100px; border-radius: 20px;" src="pictures/${mark}.webp" alt="${mark}">`;
    };

    const disableBoard = () => {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.style.pointerEvents = "none"; // Disable clicks on cells
        });
    };

    document.querySelector('.restart').addEventListener('click',()=>{
        document.querySelector('.winner').textContent="";
        document.querySelectorAll('.cell').forEach(cell=>{
            cell.innerHTML="";
            cell.style.pointerEvents ="";
        });
        roundCount=0;
        currentPlayer=Player1;
        board.resetBoard();
        document.querySelector('.winner').textContent = ""; // Clear the winner message
        updateTurnDisplay(); // Display the current player's turn
        printNewRound();
        document.querySelector('.new-game').style.display="none";
        document.querySelector('.restart').style.display="none";
    });
    document.querySelector('.new-game').addEventListener('click',()=>{
        document.querySelector('.winner').textContent="";
        document.querySelectorAll('.cell').forEach(cell=>{
            cell.innerHTML="";
            cell.style.pointerEvents ="";
        });
        roundCount=0;
        currentPlayer=Player1;
        board.resetBoard();
        document.querySelector('.winner').textContent = ""; // Clear the winner message
        updateTurnDisplay(); // Display the current player's turn
        printNewRound();
        document.querySelector('.new-game').style.display="none";
        document.querySelector('.restart').style.display="none";
    
        document.querySelector('.forms').style.display ="";
        document.querySelector('.container').style.display="none";
    });
    
    const PlayRound=(index)=>{
     
        board.placeSymbol(index,currentPlayer.symbol);
        updateCell(index, currentPlayer.mark);
        roundCount++;
        
            if(checkWin(board.getBoard(),currentPlayer.symbol)){
                board.printBoard();
                console.log(`${currentPlayer.name} wins !`);
                disableBoard();
                document.querySelector('.winner').textContent=`${currentPlayer.name} wins !`;
                document.querySelector('.new-game').style.display="";
                document.querySelector('.restart').style.display="";
                document.querySelector('.Player-one-container p').textContent="";
                document.querySelector('.Player-two-container p').textContent="";
                return;
            }
            if(roundCount===9){
                board.printBoard();
                console.log("its a draw!");
                disableBoard();
                document.querySelector('.winner').textContent='its a draw !';
                document.querySelector('.new-game').style.display="";
                document.querySelector('.restart').style.display="";
                document.querySelector('.Player-one-container p').textContent="";
                document.querySelector('.Player-two-container p').textContent="";
                return;
            }   
        switchTurn();
        updateTurnDisplay();
        printNewRound();
        
        console.log(roundCount);
    };
    printNewRound();
    
    return{
        printNewRound,
        switchTurn,
        PlayRound,
        getActivePlayer,
        updateTurnDisplay,
        updateCell
    };
    
};

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


// working on getting and handling data and visual feed back
document.querySelector('.container').style.display="none";
document.querySelector('.new-game').style.display="none";
document.querySelector('.restart').style.display="none";

//function to assign .selected to the selected character for both players
function assignSelectedCharacter(player){
    document.querySelectorAll(` ${player} form .caracters .char-box`).forEach(box =>{
    box.addEventListener('click' , (e) =>{
        document.querySelectorAll(` ${player} form .caracters .char-box`).forEach(box => box.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        const charBoxes = document.querySelectorAll(` ${player} form .caracters .char-box`)
        console.log(charBoxes);
    });
});
}
assignSelectedCharacter('.player-one');
assignSelectedCharacter('.player-two');
//function to assign .selected to the selected character player two
// document.querySelectorAll('.player-two form .caracters .char-box').forEach(box =>{
//     box.addEventListener('click' , (e) =>{
//         document.querySelectorAll('.player-two form .caracters .char-box').forEach(box => box.classList.remove('selected'));
//         e.currentTarget.classList.add('selected');
//         const charBoxes = document.querySelectorAll('.player-two form .caracters .char-box');
//         console.log(charBoxes);
//     });
// });


// function to assign .selected to the selected mark for both players
function assignSelectedMark(player){
document.querySelectorAll(` ${player} form .marks .wep-box`).forEach(box =>{
    box.addEventListener('click' , (e) =>{
        document.querySelectorAll(` ${player} form .marks .wep-box`).forEach(box => box.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        const charBoxes = document.querySelectorAll(` ${player} form .marks .wep-box`);
        console.log(charBoxes);
    });
});
}

assignSelectedMark('.player-one');
assignSelectedMark('.player-two');
// document.querySelectorAll('.player-one form .marks .wep-box').forEach(box =>{
//     box.addEventListener('click' , (e) =>{
//         document.querySelectorAll('.player-one form .marks .wep-box').forEach(box => box.classList.remove('selected'));
//         e.currentTarget.classList.add('selected');
//         const charBoxes = document.querySelectorAll('.player-one form .marks .wep-box');
//         console.log(charBoxes);
//     });
// });


//function to getting and handling data

const getPlayersData = ()=>{
    const playerOneName = document.querySelector('.player-one form #name').value;
    const playerOneCharacter = document.querySelector('.player-one form .caracters .selected').id;
    const playerOneMark = document.querySelector('.player-one form .marks .selected').id;

    const playerTwoName = document.querySelector('.player-two form #Name').value;
    const playerTwoCharacter = document.querySelector('.player-two form .caracters .selected').id;
    const playerTwoMark = document.querySelector('.player-two form .marks .selected').id;


    if(playerOneName=="" || playerTwoName=="" ||playerOneCharacter=="" || playerTwoCharacter =="" ||playerOneMark==""||playerTwoMark==""){
        alert("All fields must be filled before starting the game");
        return;
    }

    if(playerOneMark==playerTwoMark){
        alert("choose diffrent marks");
        return
    }

    const playerOne = Player(playerOneName,"X",playerOneMark,playerOneCharacter);

    const playerTwo =Player(playerTwoName,"O",playerTwoMark,playerTwoCharacter);

    return {playerOne,playerTwo};
};


document.querySelector('#start').addEventListener('click',()=>{
    const players=getPlayersData();
    if(players){
        document.querySelector('.forms').style.display = 'none';
        document.querySelector('.container').style.display="";
        const { playerOne, playerTwo } = players;
        
        document.querySelector('.Player-one-container .character img').src =`pictures/SkinIcon_${playerOne.caracter}_Classic.webp`;
        document.querySelector('.Player-two-container .character img').src =`pictures/SkinIcon_${playerTwo.caracter}_Classic.webp`;
        document.querySelector('.Player-one-container .mark img').src =`pictures/${playerOne.mark}.webp`;
        document.querySelector('.Player-two-container .mark img').src =`pictures/${playerTwo.mark}.webp`;
    
        const game = GameController(playerOne,playerTwo);
    
    
        game.updateTurnDisplay();
        
        document.querySelectorAll('.cell').forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if(cell.innerHTML===""){
                game.PlayRound(index); 
                activePlayer = game.getActivePlayer();
                console.log(activePlayer);
                }else{
                    cell.style.pointerEvents = "none"; 
                }
            });
        });
    }else{
        return;
    }


});


document.querySelector('.restart').addEventListener('click',()=>{
    document.querySelectorAll('.cell').forEach(cell=>{
        cell.innerHTML="";
        cell.style.pointerEvents = "";
    });
});

        
       
    



// const game=GameController;
// game.PlayRound(0); 
// game.PlayRound(4); 
// game.PlayRound(8); 
// game.PlayRound(1); 
// game.PlayRound(7); 
// game.PlayRound(6); 
// game.PlayRound(2); 
// game.PlayRound(5); 
// game.PlayRound(3); 

