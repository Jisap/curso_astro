import { createSignal, type Component, type JSX } from "solid-js"
import "../base.css"

interface Props {
  initValue: number;
  children: JSX.Element;
}


export const Counter: Component<Props> = (props) => {

  const [counter, setCounter] = createSignal(props.initValue);

  return (
    <>
      {/* <h1 class="text-5xl my-2">Counter</h1> */}
      {props.children}
      <h3 class="text-xl mb-4 font-bold">Value: { counter() }</h3>

      
      <button 
        class="btn mr-2" 
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
