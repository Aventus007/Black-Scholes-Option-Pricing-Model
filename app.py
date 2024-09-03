import numpy as np
from scipy.stats import norm
import matplotlib.pyplot as plt
import seaborn as sns
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import base64
import io

plt.switch_backend('Agg')

app = Flask(__name__)
cors = CORS(app, origins='*',support_credentials=True)

def blackScholes(r, S, K, T, sigma):
    d1 = (np.log(S/K) + (r + 0.5 * sigma**2)*T)/(sigma*np.sqrt(T))

    d2 = d1 - sigma * np.sqrt(T)

    Call = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)

    Put = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)

    return [round(Call,3),round(Put,3)]


def plot_heatmap(spot_range, vol_range, strike, r ,T):
    call_prices = np.zeros((len(vol_range), len(spot_range)))
    put_prices = np.zeros((len(vol_range), len(spot_range)))
    
    for i, vol in enumerate(vol_range):
        for j, spot in enumerate(spot_range):
            temp = blackScholes(r, spot, strike, T, vol)  # Corrected parameter order
            call_prices[i, j] = temp[0]
            put_prices[i, j] = temp[1]
    
    # Plotting Call Price Heatmap
    fig_call, ax_call = plt.subplots(figsize=(10, 8))
    sns.heatmap(call_prices, xticklabels=np.round(spot_range, 2), yticklabels=np.round(vol_range, 2), annot=True, fmt=".2f", cmap="viridis", ax=ax_call)
    ax_call.set_title('CALL')
    ax_call.set_xlabel('Spot Price')
    ax_call.set_ylabel('Volatility')
    fig_call.tight_layout(pad=1)
    
    # Plotting Put Price Heatmap
    fig_put, ax_put = plt.subplots(figsize=(10, 8))
    sns.heatmap(put_prices, xticklabels=np.round(spot_range, 2), yticklabels=np.round(vol_range, 2), annot=True, fmt=".2f", cmap="viridis", ax=ax_put)
    ax_put.set_title('PUT')
    ax_put.set_xlabel('Spot Price')
    ax_put.set_ylabel('Volatility')
    fig_put.tight_layout(pad=1)
    
    return fig_call, fig_put

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    S = data['S']
    K = data['K']
    r = data['r']
    sigma = data['sigma']
    T = data['T']
    call, put = blackScholes(r, S, K, T, sigma)
    return jsonify({"Call Option": call, "Put Option": put})

@app.route('/heatmap', methods=['POST'])
def heatmap():
    data = request.json
    minSpotPrice = data['minSpotPrice']
    maxSpotPrice = data['maxSpotPrice']
    minVol = data['minVol']
    maxVol = data['maxVol']
    strike = data['S']
    r = data['r']
    T = data['T']

    s_range = np.linspace(minSpotPrice,maxSpotPrice,10)
    v_range = np.linspace(minVol,maxVol,10)

    fig_call, fig_put = plot_heatmap(s_range, v_range, strike,r,T)

    # Save heatmaps to in-memory files
    img_call = io.BytesIO()
    img_put = io.BytesIO()
    fig_call.savefig(img_call, format='png')
    fig_put.savefig(img_put, format='png')
    plt.close(fig_call)
    plt.close(fig_put)
    img_call.seek(0)
    img_put.seek(0)

    # Encode images as Base64
    img_call_base64 = base64.b64encode(img_call.getvalue()).decode('utf-8')
    img_put_base64 = base64.b64encode(img_put.getvalue()).decode('utf-8')

    return jsonify({
        "call_heatmap": img_call_base64,
        "put_heatmap": img_put_base64
    })

if __name__ == '__main__':
    app.run()