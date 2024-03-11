import { GameState } from "./gameState";
import "./GameBoard.css";
export function GameBoard({ game }: { game: GameState | undefined }) {
    return (
        <div
            id="board"
            style={{
                display: "grid",
                gridTemplateColumns: new Array(game?.width).fill("1fr").join(" "),
                gridTemplateRows: new Array(game?.height).fill("1fr").join(" "),
                width: (game?.width ?? 0) * 20 + "px",
                height: (game?.height ?? 0) * 20 + "px",
            }}
        >
            {game?.board.map((s, ix) => (
                <div key={ix} className={"state-" + s}></div>
            ))}
        </div>
    );
}
