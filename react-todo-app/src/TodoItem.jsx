import { useState } from "react";

function TodoItem({ text }) {
    const [done, setDone] =useState(false);

    return (
        <li>
            <span
            onClick={() => setDone(!done)}
                style={{cursor: "pointer"}}
                >
                    {done ? "✅" : "⬜"}
                </span>
                {" "}
                {text}
        </li>
    );
}

export default TodoItem;