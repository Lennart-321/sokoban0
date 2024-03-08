export class GameLogic {
    width;
    height;
    state: number[]; //0-free, 1-man, 2-target, 4-box, 3-man+target, 6-box+target, 8-wall

    constructor(width: number, height: number, initState: number[]) {
        this.width = width;
        this.height = height;
        this.state = initState;
    }

    command(cmd: number): boolean {
        let mp = this.manPos();
        let [nxp1, nxp2] = this.affectedPos(cmd, mp);
        if (nxp1 < 0) return false;

        let nxs1 = this.state[nxp1];
        if (nxs1 === 8) return false;

        if ((nxs1 & 4) === 4) {
            //Box
            if (nxp2 < 0) return false;
            let nxs2 = this.state[nxp2];
            if ((nxs2 & 4) === 4 || nxs2 === 8) return false;

            //Move box:
            this.state[nxp2] |= 4;
            this.state[nxp1] &= ~4;
        }

        //Move man
        this.state[nxp1] |= 1;
        this.state[mp] &= ~1;

        return false;
    }

    pos(row: number, col: number): number {
        if (row < 0 || this.height <= row || col < 0 || this.width <= col) return -1;
        return row * this.width + col;
    }
    rowCol(pos: number): [number, number] {
        return [Math.floor(pos / this.width), pos % this.width];
    }
    affectedPos(cmd: number, mp: number): [number, number] {
        let [row, col] = this.rowCol(mp);

        let result: [number, number] = [-1, -1];

        switch (cmd) {
            case 0:
                result = [this.pos(row - 1, col), this.pos(row - 2, col)];
                break;
            case 1:
                result = [this.pos(row, col + 1), this.pos(row, col + 2)];
                break;
            case 2:
                result = [this.pos(row + 1, col), this.pos(row + 2, col)];
                break;
            case 3:
                result = [this.pos(row, col - 1), this.pos(row, col - 2)];
                break;
        }
        return result;
    }
    manPos(): number {
        return this.state.findIndex(s => s % 2 === 1);
    }
}

// prettier-ignore
const gameLogic = new GameLogic(
    16,
    14,
    [
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 0, 0, 0, 0, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 8,
        8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
        8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
        8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8,
        8, 0, 0, 0, 0, 0, 8, 1, 0, 0, 0, 0, 0, 4, 0, 8,
        8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
        8, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
        8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
        8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
        8, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 2, 0, 0, 0, 8,
        8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
        8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    ]
);

export default gameLogic;
