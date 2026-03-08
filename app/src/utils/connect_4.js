// Checks if someone won the game
export function calculateWinner(board) {
    const ROWS = 6;
    const COLS = 7;

    const directions = [
        [0, 1],   // horizontal
        [1, 0],   // vertical
        [1, 1],   // diagonal down-right
        [1, -1]   // diagonal down-left
    ];

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const player = board[row * COLS + col];
            if (!player) continue; // skip empty cells

            for (const [dr, dc] of directions) {
                let count = 1;

                for (let step = 1; step < 4; step++) {
                    const r = row + dr * step;
                    const c = col + dc * step;

                    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) break;

                    if (board[r * COLS + c] === player) {
                        count++;
                    } else {
                        break;
                    }
                }

                if (count === 4) {
                    return player; // winner
                }
            }
        }
    }

    return null; // no winner
}