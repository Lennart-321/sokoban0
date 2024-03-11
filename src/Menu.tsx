//import { Dispatch, SetStateAction } from "react";
import { setCurrentGame } from "./gameState";

export default function Menu({ rerender }: { rerender: () => void }) {
    return (
        <nav>
            <button
                onClick={() => {
                    setCurrentGame(0);
                    rerender();
                }}
            >
                Spel 1
            </button>
            <button
                onClick={() => {
                    setCurrentGame(1);
                    rerender();
                }}
            >
                Spel 2
            </button>
        </nav>
    );
}
