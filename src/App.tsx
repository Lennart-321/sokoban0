import { useEffect, useState } from "react";
import { GameBoard } from "./GameBoard";
import gameLogic from "./gameLogic";
import "./App.css";

function App() {
    // const [count, setCount] = useState(0);

    const [count, setCount] = useState(0);

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
            if (command >= 0) {
                if (gameLogic.command(command)) {
                    setCount((c: number) => c + 1);
                }
            }
        });
    }, []);

    return <GameBoard />;
}

export default App;
