import { useEffect, useState } from "react";
import { GameBoard } from "./GameBoard";
import { GameLogic } from "./gameLogic";
import { currentGame } from "./gameState";
import "./App.css";
import Menu from "./Menu";

function App() {
    // const [count, setCount] = useState(0);

    const count = useState(0);
    function rerender() {
        count[1](c => c + 1);
    }
    //const [game, setGame] = useState(0);
    //const [game, setGame] = useState<GameState>();
    //const state = useRef<GameState>();

    useEffect(() => {
        document.addEventListener("keydown", (e: any) => {
            console.log("keydown", e.key);
            let command = -1;
            switch (e.key) {
                case "ArrowUp":
                    command = 0;
                    break;
                case "ArrowRight":
                    command = 1;
                    break;
                case "ArrowDown":
                    command = 2;
                    break;
                case "ArrowLeft":
                    command = 3;
                    break;
            }
            if (command >= 0 && currentGame && !currentGame.isSolved()) {
                if (GameLogic.command(command, currentGame)) {
                    rerender();
                }
            }
        });
    }, []);

    // useEffect(() => {
    //     //setGame(game);
    //     state.current = gameList[game].makeCopy();
    // }, [game]);

    return (
        <>
            <Menu rerender={rerender} />
            <GameBoard game={currentGame} />
            {currentGame.isSolved() && <p>JOBBET GJORT!</p>}
        </>
    );
}

export default App;
