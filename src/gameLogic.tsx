import { GameState } from "./gameState";

export class GameLogic {
    static command(cmd: number, state: GameState): boolean {
        let mp = this.manPos(state);
        let [nxp1, nxp2] = this.affectedPos(cmd, mp, state);
        if (nxp1 < 0) return false;

        let nxs1 = state.board[nxp1];
        if (nxs1 === 8) return false;

        if ((nxs1 & 4) === 4) {
            //Box
            if (nxp2 < 0) return false;
            let nxs2 = state.board[nxp2];
            if ((nxs2 & 4) === 4 || nxs2 === 8) return false;

            //Move box:
            state.board[nxp2] |= 4;
            state.board[nxp1] &= ~4;
        }

        //Move man
        state.board[nxp1] |= 1;
        state.board[mp] &= ~1;

        return true;
    }

    private static pos(row: number, col: number, state: GameState): number {
        if (row < 0 || state.height <= row || col < 0 || state.width <= col) return -1;
        return row * state.width + col;
    }
    private static rowCol(pos: number, state: GameState): [number, number] {
        return [Math.floor(pos / state.width), pos % state.width];
    }
    private static affectedPos(cmd: number, mp: number, state: GameState): [number, number] {
        let [row, col] = this.rowCol(mp, state);

        let result: [number, number] = [-1, -1];

        switch (cmd) {
            case 0:
                result = [this.pos(row - 1, col, state), this.pos(row - 2, col, state)];
                break;
            case 1:
                result = [this.pos(row, col + 1, state), this.pos(row, col + 2, state)];
                break;
            case 2:
                result = [this.pos(row + 1, col, state), this.pos(row + 2, col, state)];
                break;
            case 3:
                result = [this.pos(row, col - 1, state), this.pos(row, col - 2, state)];
                break;
        }
        return result;
    }
    private static manPos(state: GameState): number {
        return state.board.findIndex(s => s % 2 === 1);
    }
}
