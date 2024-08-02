import { createSignal } from "solid-js"
import "../base.css"

export const Counter = () => {

  const [counter, setCounter] = createSignal(10);

  return (
    <>
      <h1 class="text-5xl my-2">Counter</h1>
      <h3 class="text-xl mb-4 font-bold">Value: { counter() }</h3>

      
      <button 
        class="btn" 
        onClick={() => setCounter(prev => --prev)}
      >
        -1
      </button>
      <button
        class="btn mr-2"
        onClick={() => setCounter(prev => ++prev)}
      >
        +1
      </button>
    </>
  )
}
