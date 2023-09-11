document.addEventListener("DOMContentLoaded", () => {
  const puzzleContainer = document.querySelector(".puzzle-container");
  const puzzlePieces = Array.from(document.querySelectorAll(".puzzle-piece"));
  const emptyPiece = document.querySelector(".puzzle-empty");

  // Define el estado inicial del puzzle
  const initialState = [1, 2, 3, 4, 5, 6, 7, 8, null];
  let currentState = [...initialState];

  // Función para mezclar las piezas al inicio del juego
  const shufflePuzzle = () => {
    let currentIndex = puzzlePieces.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Intercambia las piezas
      const temp = currentState[currentIndex];
      currentState[currentIndex] = currentState[randomIndex];
      currentState[randomIndex] = temp;
    }

    // Actualiza la vista del puzzle
    updatePuzzleView();
  };

  // Función para actualizar la vista del puzzle
  const updatePuzzleView = () => {
    puzzlePieces.forEach((piece, index) => {
      piece.textContent = currentState[index];
    });
  };

  // Función para verificar si el jugador ha ganado
  const isGameComplete = () => {
    for (let i = 0; i < currentState.length - 1; i++) {
      if (currentState[i] !== i + 1) {
        return false;
      }
    }
    return true;
  };

  // Función para manejar el clic en una pieza del puzzle
  const handlePieceClick = (piece, index) => {
    const emptyIndex = currentState.indexOf(null);
    const adjacentIndexes = getAdjacentIndexes(index);

    if (adjacentIndexes.includes(emptyIndex)) {
      // Intercambia la pieza con la pieza vacía
      currentState[emptyIndex] = currentState[index];
      currentState[index] = null;

      // Actualiza la vista del puzzle
      updatePuzzleView();

      // Verifica si el jugador ha ganado
      if (isGameComplete()) {
        alert("¡Has ganado!");
      }
    }
  };

  // Función para obtener los índices de las piezas adyacentes a una pieza dada
  const getAdjacentIndexes = (index) => {
    const adjacentIndexes = [];

    if (index % 3 !== 0) {
      adjacentIndexes.push(index - 1); // Izquierda
    }
    if (index % 3 !== 2) {
      adjacentIndexes.push(index + 1); // Derecha
    }
    if (index >= 3) {
      adjacentIndexes.push(index - 3); // Arriba
    }
    if (index < 6) {
      adjacentIndexes.push(index + 3); // Abajo
    }

    return adjacentIndexes;
  };

  // Agrega el evento de clic a cada pieza del puzzle
  puzzlePieces.forEach((piece, index) => {
    piece.addEventListener("click", () => {
      handlePieceClick(piece, index);
    });
  });

  // Mezcla el puzzle al inicio del juego
  shufflePuzzle();
});
