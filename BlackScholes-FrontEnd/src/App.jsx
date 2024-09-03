import { useState , useEffect} from 'react'
import axios from "axios";
import './App.css'

function App() {
  const [S, setS] = useState(100.00)
  const [K, setK] = useState(100.00)
  const [r, setr] = useState(0.05)
  const [v, setv] = useState(0.20)
  const [T, setT] = useState(1.00)
  const [callOption, setCallOption] = useState(10.451);
  const [putOption, setPutOption] = useState(5.574);

  const [minSpotPrice, setminSpotPrice] = useState(80.00)
  const [maxSpotPrice, setmaxSpotPrice] = useState(120.00)
  const [minVol, setminVol] = useState(0.01)
  const [maxVol, setmaxVol] = useState(0.5)

  const [callHeatmap, setCallHeatmap] = useState(null);
  const [putHeatmap, setPutHeatmap] = useState(null);

  const calculateOptions = async () => {
    try {
      // Call the API to get the option prices
      const response = await axios.post("http://localhost:5000/calculate", {
        S: parseFloat(S),
        K: parseFloat(K),
        r: parseFloat(r),
        sigma: parseFloat(v),
        T: parseFloat(T),
      });
      setCallOption(response.data["Call Option"]);
      setPutOption(response.data["Put Option"]);
    } 
    catch (error) {
      console.error("Error calculating options:", error);
    }
  };

  const generateHeatmap = async() => {
    try {
      // Call the API to get the heatmap
      const response = await axios.post("http://localhost:5000/heatmap", {
        minSpotPrice: parseFloat(minSpotPrice),
        maxSpotPrice: parseFloat(maxSpotPrice),
        minVol: parseFloat(minVol),
        maxVol: parseFloat(maxVol),
        S: parseFloat(S),
        r: parseFloat(r),
        T: parseFloat(T),
      });
      
      console.log(response);
      setCallHeatmap(`data:image/png;base64,${response.data.call_heatmap}`);
      setPutHeatmap(`data:image/png;base64,${response.data.put_heatmap}`);
    } 
    catch (error) {
      console.error("Error fetching heatmaps:", error);
    }
  };

  useEffect(() => {
    calculateOptions();
  }, [S, K, r, v, T]);

  useEffect(() => {
    generateHeatmap();
  }, [minSpotPrice,maxSpotPrice,minVol,maxVol,S,r,T]);

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

  const handleInputChangeMinSpotPrice = (event) => {
    setminSpotPrice(event.target.value);
  };

  const handleInputChangeMaxSpotPrice = (event) => {
    setmaxSpotPrice(event.target.value);
  };

  const handleInputChangeMinVol = (event) => {
    setminVol(event.target.value);
  };

  const handleInputChangeMaxVol = (event) => {
    setmaxVol(event.target.value);
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
        <br /><br /><br />

        <hr />

        <div className='heatmap-heading'>HeatMap Parameters</div>

        <label htmlFor="min-spot-price" className='label'>Min Spot Price</label>
        <input id="min-spot-price" type="number" defaultValue={minSpotPrice} onChange={handleInputChangeMinSpotPrice} className='inpt' min={0}/>

        <label htmlFor="max-spot-price" className='label'>Max Spot Price</label>
        <input id="max-spot-price" type="number" defaultValue={maxSpotPrice} onChange={handleInputChangeMaxSpotPrice} className='inpt' min={0}/>

        <label htmlFor="min-volatility" className='label'>Min Volatility (0.01 - 1)</label>
        <input id="min-volatility" type="number" defaultValue={minVol} onChange={handleInputChangeMinVol}
        className='inpt' step={0.01} min={0.01} max={1}/>

        <label htmlFor="max-volatility" className='label'>Max Volatility (0.01 - 1)</label>
        <input id="max-volatility" type="number" defaultValue={maxVol} onChange={handleInputChangeMaxVol} className='inpt' step={0.01} min={0.01} max={1}/>

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
          <div className='call-value'>${callOption}</div>
        </div>

        <div className='put'>
          <div className='put-label'>Put Value</div>
          <div className='put-value'>${putOption}</div>
        </div>
        </div>

        <h1 className='heading'>Options Price - Interactive Heatmap</h1>
        <div className='info'>Explore how option prices fluctuate with varying 'Spot Prices and Volatility' levels using interactive heatmap parameters, all while maintaining a constant 'Strike Price'.</div>

        <div className='heat-map-container'>
          <div className='call-heat-map'>Call Price HeatMap
          {callHeatmap && <img src={callHeatmap} alt="Call Heatmap" className='heat-img' />}
          </div>
          <div className='put-heat-map'>Put Price HeatMap
          {putHeatmap && <img src={putHeatmap} alt="Put Heatmap" className='heat-img' />}</div> 
          </div>       
      </div>
      </div>
    </>
  )
}

export default App
