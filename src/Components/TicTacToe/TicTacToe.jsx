import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const toggle = (index) => {
        if (lock || board[index] !== "") return;

        const newBoard = [...board];
        newBoard[index] = count % 2 === 0 ? "x" : "o";
        setBoard(newBoard);
        setCount(count + 1);
        checkWin(newBoard);
    };

    const checkWin = (currentBoard) => {
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8], 
            [0,3,6], [1,4,7], [2,5,8], 
            [0,4,8], [2,4,6]          
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                currentBoard[a] &&
                currentBoard[a] === currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
            ) {
                won(currentBoard[a]);
                return;
            }
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Parabéns: <img src=${winner === "x" ? cross_icon : circle_icon} alt="winner" />`;
    };

    const reset = () => {
        setBoard(Array(9).fill(""));
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = 'Jogo da Velha com <span>React</span>';
    };

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>
                Jogo da Velha com <span>React</span>
            </h1>
            <div className="board">
                {[...Array(3)].map((_, row) => (
                    <div className={`row${row + 1}`} key={row}>
                        {[...Array(3)].map((_, col) => {
                            const idx = row * 3 + col;
                            return (
                                <div
                                    key={idx}
                                    className="boxes"
                                    onClick={() => toggle(idx)}
                                >
                                    {board[idx] === "x" && <img src={cross_icon} alt="x" />}
                                    {board[idx] === "o" && <img src={circle_icon} alt="o" />}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={reset}>Reiniciar</button>
        </div>
    );
};

export default TicTacToe;
