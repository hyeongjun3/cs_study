import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component {
    render() {
        const myClassName =
            this.props.isBold === true ? 'square cur-square' : 'square';
        return (
            <button className={myClassName} onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key = {i}
                value={this.props.squares[i]}
                isBold={this.props.curSquareIdx === i}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderSquareLoop() {
        const ret = new Array(3).fill(null).map((_, y) => {
            return (
                <div key={y} className="board-row">
                    {new Array(3).fill(null).map((_, x) => {
                        return this.renderSquare(y*3 + x);
                    })}
                </div>
            );
        });

        return ret;
    }

    render() {
        return <div>{this.renderSquareLoop()}</div>;
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepNumber: 0,
            history: [
                {
                    squares: new Array(9).fill(null),
                    moves: null,
                },
            ],
            nxtPlayer: 'X',
            isFinish: false,
            isDescending: true,
        };
    }

    handleClick(i) {
        const curSquare =
            this.state.history[this.state.stepNumber].squares.slice();
        if (curSquare[i] !== null || this.state.isFinish === true) return;

        curSquare[i] = this.state.nxtPlayer;
        const newHistory = { squares: curSquare, moves: i };
        let isFinish = false;
        if (calculateWinner(curSquare)) isFinish = true;
        this.setState({
            history: [
                ...this.state.history.slice(0, this.state.stepNumber + 1),
                newHistory,
            ],
            nxtPlayer: this.state.nxtPlayer === 'X' ? 'O' : 'X',
            isFinish: isFinish,
            stepNumber: this.state.stepNumber + 1,
        });
    }

    jumpTo(idx) {
        this.setState({
            stepNumber: idx,
            nxtPlayer: idx % 2 === 0 ? 'X' : 'O',
        });
    }

    toggleOrder() {
        this.setState({
            isDescending : !this.state.isDescending,
        })
    }

    render() {
        const history = this.state.history;
        if(this.state.isDescending === false) history.reverse();
        const curSquare = history[this.state.stepNumber].squares;
        const moves = history.map((value, idx) => {
            const { row, col } = num2RowCol(value.moves);
            const desc =
                idx === 0
                    ? `Go to game start`
                    : `Go to move row:${row} col:${col}`;

            return (
                <li key={idx}>
                    <button onClick={() => this.jumpTo(idx)}>{desc}</button>
                </li>
            );
        });

        let status = null;
        if (this.state.isFinish === true) {
            status = `Winner is ${this.state.nxtPlayer}`;
        } else {
            status = `Next player: ${this.state.nxtPlayer}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={curSquare}
                        curSquareIdx={
                            history[this.state.stepNumber].moves
                        }
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div>
                    <button onClick={() => this.toggleOrder()}>toggle order</button>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

function num2RowCol(i) {
    i = i === null ? 0 : i;

    let ret = { row: Math.floor(i / 3), col: i % 3 };

    return ret;
}
