import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepNumber: 0,
            history: [new Array(9).fill(null)],
            nxtPlayer: 'X',
            isFinish: false,
        };
    }

    handleClick(i) {
        const curSquare = this.state.history[this.state.stepNumber].slice();
        if (curSquare[i] !== null || this.state.isFinish === true) return;

        curSquare[i] = this.state.nxtPlayer;

        let isFinish = false;
        if (calculateWinner(curSquare)) isFinish = true;
        this.setState({
            history: [...this.state.history.slice(0,this.state.stepNumber+1), curSquare],
            nxtPlayer: this.state.nxtPlayer === 'X' ? 'O' : 'X',
            isFinish: isFinish,
            stepNumber: this.state.stepNumber + 1,
        });
    }

    jumpTo(idx) {
        console.log(idx);
        this.setState({
            stepNumber: idx,
            nxtPlayer: (idx%2) === 0 ? 'X' : 'O'
        })
    }

    render() {
        const curSquare = this.state.history[this.state.stepNumber];
        console.log({curSquare});
        const moves = this.state.history.map((value, idx) => {
            const desc = idx === 0 ? `Go to game start` : `Go to move #${idx}`;

            return (
                <li key= {idx}>
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
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
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
