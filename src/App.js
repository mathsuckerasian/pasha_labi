import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #b3e5fc;
    font-family: sans-serif;
    color: #003366;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
`;

const SquareButton = styled.button`
  width: 60px;
  height: 60px;
  font-size: 24px;
  font-weight: bold;
  margin: 4px;
  cursor: pointer;
  background: #fff;
  border: 2px solid #000;
  color: ${(props) =>
    props.value === "X" ? "red" :
    props.value === "O" ? "green" : "#000"};

  &:hover {
    background: #e0f7fa;
  }
`;

const Status = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #003366;
`;

function Square({ value, onClick }) {
  return <SquareButton onClick={onClick} value={value}>{value}</SquareButton>;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || isDraw(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  const draw = isDraw(squares);
  const status = winner
    ? `Победитель: ${winner}`
    : draw
    ? "Ничья!"
    : `Следующий ход: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <GlobalStyle />
      <BoardWrapper>
        <Status>{status}</Status>
        {[0, 3, 6].map((row) => (
          <Row key={row}>
            {[0, 1, 2].map((col) => (
              <Square
                key={row + col}
                value={squares[row + col]}
                onClick={() => handleClick(row + col)}
              />
            ))}
          </Row>
        ))}
      </BoardWrapper>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isDraw(squares) {
  return squares.every(square => square !== null) && !calculateWinner(squares);
}

function TicTacToe() {
  return <Board />;
}

export default TicTacToe;
