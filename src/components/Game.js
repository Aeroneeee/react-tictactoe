import React, { useState } from "react";
import Square from "./Square";

function Game() {
	const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
	const [isNext, setIsNext] = useState(true);
	const [tie, setTie] = useState(false);
	const [Player1, setPlayer1] = useState("Player 1");
	const [Player2, setPlayer2] = useState("Player 2");
	// const [points, setPoints] = useState({ x: 0, o: 0 });
	const [xpoints, setXpoints] = useState(0);
	const [opoints, setOpoints] = useState(0);
	// const [gameEnd, setGameEnd] = useState(false);

	const handleClick = (index) => {
		if (Player1 === "") setPlayer1("Player 1");
		if (Player2 === "") setPlayer2("Player 2");

		const squares = boardSquares;

		if (winner || squares[index]) return;

		squares[index] = isNext ? "X" : "O";

		setBoardSquares(squares);

		setIsNext(!isNext);

		console.log(boardSquares);

		let isTie = true;
		boardSquares.forEach((square) => {
			if (square === null) isTie = false; //To check if there is still null value
		});

		if (!winner) setTie(isTie);
	};

	const [hasWinner, setHasWinner] = useState(false);

	const calcWinner = (squares) => {
		const winningLines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < winningLines.length; i++) {
			const [a, b, c] = winningLines[i];

			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[b] === squares[c] &&
				squares[c]
			) {
				if (!hasWinner) {
					if (squares[a] === "X") {
						// console.log("gameEnd", gameEnd);

						// setGameEnd(false);
						setXpoints(xpoints + 1);
					}
					if (squares[a] === "O") {
						setOpoints(opoints + 1);
						// setGameEnd(false);
					}

					setHasWinner(true);
				}
				return squares[a];
			}
		}
		if (hasWinner !== false) setHasWinner(false);
		return null;
	};

	const renderSquare = (index) => {
		return (
			<Square
				value={boardSquares[index]}
				onClick={() => handleClick(index)}
			/>
		);
	};

	const winner = calcWinner(boardSquares);

	const newGame = () => {
		setBoardSquares(Array(9).fill(null));
		setIsNext(true);
		setTie(false);
	};

	return (
		<div className="game">
			<div>
				<input
					placeholder="Player 1 name "
					value={Player1}
					onChange={(event) => setPlayer1(event.target.value)}
				/>
				<input
					placeholder="Player 2 name"
					value={Player2}
					onChange={(event) => setPlayer2(event.target.value)}
				/>
			</div>

			<div>
				{winner ? (
					<>
						<h1>Winner is {winner === "X" ? Player1 : Player2}</h1>
						<button onClick={() => newGame()}>New Game</button>
					</>
				) : (
					<>
						{tie ? (
							<>
								<h1>Tie</h1>
								<button onClick={() => newGame()}>
									New Game
								</button>
							</>
						) : (
							<>
								<h3>
									Next player is{" "}
									{isNext ? (
										<>{Player1} (X)</>
									) : (
										<>{Player2} (O)</>
									)}
								</h3>
							</>
						)}
					</>
				)}
			</div>
			<hr />
			<div className="border-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className="border-row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="border-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>

			<div>
				<h2>Points</h2>
				<h3>
					{Player1}: {xpoints}
				</h3>
				<h3>
					{Player2}: {opoints}
				</h3>
			</div>
			<hr />
			<a href="https://github.com/Aeroneeee/react-tictactoe">github</a>
		</div>
	);
}

export default Game;
