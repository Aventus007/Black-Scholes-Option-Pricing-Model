import './App.css'

function App() {
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
        <input id="underlying-price" type="number" className='inpt' min={0}/>
        <br />

        <label htmlFor="strike-price" className='label'>Strike Price</label>
        <input id="strike-price" type="number" className='inpt' min={0}/>
        <br />

        <label htmlFor="risk-free-rate" className='label'>Risk-Free Rate</label>
        <input id="risk-free-rate" type="number" className='inpt' min={0}/>
        <br />

        <label htmlFor="volatility" className='label'>Volatility</label>
        <input id="volatility" type="number" className='inpt' min={0}/>
        <br />

        <label htmlFor="maturity" className='label'>Maturity</label>
        <input id="maturity" type="number" className='inpt' min={0}/>
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
            <td>$100.00</td>
            <td>$100.00</td>
            <td>0.1</td>
            <td>0.5</td>
            <td>1</td>
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
