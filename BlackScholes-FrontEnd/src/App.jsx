import { useState } from 'react'
import './App.css'

function App() {
  const [S, setS] = useState(100.00)
  const [K, setK] = useState(100.00)
  const [r, setr] = useState(0.10)
  const [v, setv] = useState(0.50)
  const [T, setT] = useState(1.00)

  const handleInputChangeS = (event) => {
    setS(event.target.value);
  };

  const handleInputChangeK = (event) => {
    setK(event.target.value);
  };

  const handleInputChanger = (event) => {
    setr(event.target.value);
  };

  const handleInputChangev = (event) => {
    setv(event.target.value);
  };

  const handleInputChangeT = (event) => {
    setT(event.target.value);
  };

  return (
    <>
    <style jsx global>{`
      body {
        margin: 0px;
        padding: 0px;
      }
    `}</style>
    <div className='main-container'>
      <div className='sliders'>
        <h2 className='slider-heading'>📊 Black-Scholes Model</h2>
        <label htmlFor="underlying-price" className='label'>Underlying Price</label>
        <input id="underlying-price" type="number" defaultValue={S} onChange={handleInputChangeS} className='inpt' min={0}/>
        <br />

        <label htmlFor="strike-price" className='label'>Strike Price</label>
        <input id="strike-price" type="number" defaultValue={K} onChange={handleInputChangeK} className='inpt' min={0}/>
        <br />

        <label htmlFor="risk-free-rate" className='label'>Risk-Free Rate</label>
        <input id="risk-free-rate" type="number" defaultValue={r} onChange={handleInputChanger} className='inpt' min={0} step={0.1}/>
        <br />

        <label htmlFor="volatility" className='label'>Volatility</label>
        <input id="volatility" type="number" defaultValue={v} onChange={handleInputChangev} className='inpt' min={0} step={0.1}/>
        <br />

        <label htmlFor="maturity" className='label'>Maturity</label>
        <input id="maturity" type="number" defaultValue={T} onChange={handleInputChangeT} className='inpt' min={0}/>
      </div>

      <div className='content'>
      <h1 className='heading'>Black Scholes Options Pricing</h1>

        <table className='table'>
          <tr>
          <th>Underlying Price</th>
          <th>Strike Price</th>
          <th>Risk-Free Rate</th>
          <th>Volatility</th>
          <th>Maturity</th>
          </tr>

          <tr>
            <td>{S}</td>
            <td>{K}</td>
            <td>{r}</td>
            <td>{v}</td>
            <td>{T}</td>
          </tr>
        </table>

        <div className='container'>
        <div className='call'>
          <div className='call-label'>Call Value</div>
          <div className='call-value'>$100.00</div>
        </div>

        <div className='put'>
          <div className='put-label'>Put Value</div>
          <div className='put-value'>$100.00</div>
        </div>
        </div>

        <h1 className='heading'>Options Price - Interactive Heatmap</h1>
        <div className='info'>Explore how option prices fluctuate with varying 'Spot Prices and Volatility' levels using interactive heatmap parameters, all while maintaining a constant 'Strike Price'.</div>        
      </div>
      </div>
    </>
  )
}

export default App
