import { useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        function increase() {
            setCount(count + 1)
        }
        function reset() {
            setCount(0);

        return (
            <div>
                <p>Count: {count}</p>
                <button onClick={increase}>Increase
                </button>
            </div>
        );
    }

    export default Counter;