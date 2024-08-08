import React, { useState, useEffect, useRef } from 'react'
import './App.css';

function App() {
  const copyText = () => {
    navigator.clipboard.writeText(text);
  }

  const handleOnChange = (event) => {
    setText(event.target.value)
  }

  const [text, setText] = useState('');
  const [length, setLength] = useState(8);
  const [useNum, setUseNum] = useState(true)
  const [useSpecialC, setUseSpecialC] = useState(true)
  const passwordRef = useRef(null);

  useEffect(() => { generatePass(); }, [length, useNum, useSpecialC])

  const generatePass = () => {
    const upperC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerC = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialC = '!@#$%^&*()_+{}|:<>?-=[]\\;\',./';

    let Password = upperC + lowerC;
    if (useNum) Password += numbers;
    if (useSpecialC) Password += specialC;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += Password.charAt(Math.floor(Math.random() * Password.length));
    }
    setText(generatedPassword);
  }

  return (
    <div className="container my-5">
      <h2 className="text-center">Password Generator</h2>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <input type="text" value={text} ref={passwordRef} className="form-control mb-2" onChange={handleOnChange} />
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6">
          <button type="button" className="btn btn-success w-100 mb-2" onClick={copyText}>Copy</button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="input-group">
            <span className="input-group-text">Length</span>
            <input type="number" value={length} className="form-control" onChange={(e) => setLength(parseInt(e.target.value))}
              min={8} max={32} />
          </div>
        </div>
      </div><></>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10 btn-group" role="group" aria-label="Basic checkbox toggle button group">
          <div>
            <input className="btn-check" type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" checked={useNum} onChange={(e) => setUseNum(e.target.checked)} />
            <label className="btn btn-outline-primary" htmlFor="btncheck1">Include Numbers</label>
          </div>
          <div className="form-check form-switch">
            <input className="btn-check" autocomplete="off" type="checkbox" id="btncheck2" checked={useSpecialC} onChange={(e) => setUseSpecialC(e.target.checked)} />
            <label className="btn btn-outline-primary" htmlFor="btncheck2">Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
