/* eslint-disable react/prop-types */
import { useState } from 'react';

// Komponen Square yang mewakili kotak dalam papan permainan
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Komponen utama Board yang menampilkan papan permainan dan mengatur logika permainan
function Board({ xIsNext, squares, onPlay }) {
  // Fungsi handleClick mengatur perubahan state saat kotak di klik
  function handleClick(i) {
    // Jika kotak sudah terisi atau sudah ada pemenang, hentikan fungsi
    if (squares[i] || calculateWinner(squares)) return;

    // Salin array squares ke array baru untuk dimodifikasi
    const nextSquares = squares.slice();

    // Isi kotak sesuai giliran pemain
    nextSquares[i] = xIsNext ? 'X' : 'O';

    onPlay(nextSquares);
  }

  // Tentukan pemenang berdasarkan status kotak
  const winner = calculateWinner(squares);
  let status = '';
  // Jika ada pemenang, atur status sebagai pemenang, jika tidak, atur status sebagai giliran pemain berikutnya
  status = winner
    ? 'Winner: ' + winner
    : 'Next Player: ' + (xIsNext ? 'X' : 'O');

  return (
    <>
      {/* Tampilkan status permainan */}
      <div className="status">{status}</div>
      {/* Tampilkan papan permainan */}
      <div className="board">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  const moves = history.map((squares, move) => {
    let description = '';
    description = move > 0 ? 'Go to move #' + move : 'Go to move game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

// Fungsi untuk menghitung pemenang berdasarkan status kotak
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
    // Jika ada tiga kotak dengan isi yang sama dalam satu garis, kembalikan isi kotak tersebut sebagai pemenang
    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Jika tidak ada pemenang, kembalikan false
  return false;
}
