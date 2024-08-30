import numpy as np
from scipy.stats import norm

r = 0.01
S = 30
K = 40
T = 240/365
sigma = 0.30

def blackScholes(r, S, K, T, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T)/(sigma*np.sqrt(T))

    d2 = d1 - sigma*np.sqrt(T)

    Call = S*norm.cdf(d1,0,1) - K*np.exp(-r*T)*norm.cdf(d2,0,1)

    Put = K*np.exp(-r*T)*norm.cdf(-d2,0,1) - S*norm.cdf(-d1,0,1)

    print(f'Call option {Call} Put option {Put}')


blackScholes(r,S,K,T,sigma)