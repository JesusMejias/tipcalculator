import { useState } from 'react'

function App() {
  const [selected, setSelected] = useState(3);
  const [showSlider, setShowSlider] = useState(false);
  const [customPerc, setCustomPerc] = useState(21);
  const [originalAmount, setOriginalAmount] = useState(0);
  const [showNumpad, setShowNumpad] = useState(false);
  const [decimalUsed, setDecimalUsed] = useState(false);
  const [decimals, setDecimals] = useState(0);
  const numpadArr = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'C', '0', '.'];
  const percentages = ['17', '18', '19', '20'];
  const options = [...percentages, 'Other'];
  const MAX_NUMBER = 99999999999;

  function handleNumpad(value) {
    if (value === 'C') {
      setOriginalAmount(0);
      setDecimalUsed(false);
      setDecimals(0);
    } else if (value === '.') {
      if (decimalUsed) return;
      setDecimalUsed(true);
    } else {
      if (originalAmount < MAX_NUMBER) {
        if (!decimalUsed) {
          setOriginalAmount(originalAmount * 10 + parseInt(value));
          return;
        }
      }
      if (decimalUsed && decimals == 0) {
        setDecimals(1);
        setOriginalAmount((originalAmount * 10 + parseInt(value)) / 10);
        return;
      }
      if (decimalUsed && decimals == 1) {
        setDecimals(2);
        setOriginalAmount((originalAmount * 100 + parseInt(value)) / 100);
        return;
      }
    }
  }

  return (
    <>
      <div className="main-container">
        <header>Tip<span>Calculator</span></header>
        <section>
          <h2>Percentage</h2>
          <div className="box percentage">
            <div className={`current-pos pos-${selected}`}></div>
            {options.map((option, index) => {
              if (index !== options.length - 1) {
                return (
                  <button key={index} onClick={() => {
                    setSelected(index);
                    setShowSlider(false);
                    setShowNumpad(false);
                  }} className={selected === index ? 'active' : undefined}>{option}%</button>
                );
              } else {
                return <button key={index} onClick={() => {
                  setSelected(index);
                  setShowSlider(true);
                  setShowNumpad(false);
                }} className={selected === index ? 'active' : undefined}>{option}</button>
              }
            })}
          </div>
        </section>
        <div className={!showSlider ? 'amounts' : 'amounts hidden'}>
          <section>
            <h2>Enter Original Amount</h2>
            <div className="box value enteramt" onClick={() => setShowNumpad(!showNumpad)}>{originalAmount.toFixed(2)}</div>
          </section>
          <section>
            <h2>Calculated Tip</h2>
            <div className="box value">{selected !== options.length - 1 ? ((originalAmount * options[selected]) / 100).toFixed(2) : ((originalAmount * customPerc) / 100).toFixed(2)}</div>
          </section>
          <section>
            <h2>Calculated Total</h2>
            <div className="box value">{selected !== options.length - 1 ? (originalAmount + ((originalAmount * options[selected]) / 100)).toFixed(2) : (originalAmount + ((originalAmount * customPerc) / 100)).toFixed(2)}</div>
          </section>
        </div>
        <div className={showSlider ? 'custom-perc active' : 'custom-perc'}>
          <section>
            <h2>Select Custom Percentage</h2>
            <div className="box range">
              <div className="slider">
                <input type="range" value={customPerc} step="1" from="0" to="100" onChange={(e => setCustomPerc(e.target.value))} />
              </div>
              <div className="value">{customPerc}%</div>
            </div>
            <button onClick={() => setShowSlider(false)}>OK</button>
          </section>
        </div>
        <div className={showNumpad ? 'numpad' : 'numpad hidden'}>
          <button className='close' onClick={() => setShowNumpad(false)}>Close</button>
          <div className='grid'>
            {numpadArr.map((value, index) => <button key={index} onClick={() => handleNumpad(value)} className={`num key-${index}`}>{value}</button>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
