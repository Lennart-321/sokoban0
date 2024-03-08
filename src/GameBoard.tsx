import gameLogic from "./gameLogic";
import "./GameBoard.css";
export function GameBoard() {
    return (
        <div
            id="board"
            style={{
                display: "grid",
                gridTemplateColumns: new Array(gameLogic.width).fill("1fr").join(" "),
                gridTemplateRows: new Array(gameLogic.height).fill("1fr").join(" "),
                width: gameLogic.width * 20 + "px",
                height: gameLogic.height * 20 + "px",
            }}
        >
            {gameLogic.state.map((s, ix) => (
                <div key={ix} className={"state-" + s}></div>
            ))}
        </div>
    );
}
