import React from 'react';

export default function Hello() {
    const msg = "This is a component"
    const arr = ['Ottavia', 'Lucas FR', 'Lucas BR']
  return (
    <div className="App">
    <h1>Hello React</h1>
    <p>{msg}</p>

    {arr.map(e => {
        return (
            <p>{e}</p>
        )
    })}
    </div>
  );
}
