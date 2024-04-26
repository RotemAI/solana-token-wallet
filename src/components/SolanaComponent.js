import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const SolanaComponent = () => {
  const [address, setAddress] = useState(
    '7cVfgArCheMR6Cs4t6vz5rfnqd56vZq4ndaBrY5xkxXy'
  );
  const [balance, setBalance] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [tokens, setTokens] = useState([]);

  const checkBalance = async () => {
    try {
      const publicKey = new PublicKey(address);
      const solana = new Connection(
        'https://docs-demo.solana-mainnet.quiknode.pro/'
      );
      const balance = await solana.getBalance(publicKey);
      setBalance(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };
  useEffect(() => {
    listAvailableTokens();
  }, []);
  const getOptionLabel = (option) => {
    return ` ${option.address} `;
  };
  const listAvailableTokens = async () => {
    try {
      const response = await fetch(
        'https://tokens.coingecko.com/solana/all.json'
      );
      const tokenListJSON = await response.json();
      setTokens(tokenListJSON.tokens);
    } catch (error) {
      console.error('Error listing available tokens:', error);
    }
  };

  const fetchBalance = async (tokenValue) => {
    try {
      const publicKey = new PublicKey(tokenValue);
      const connection = new Connection(
        'https://docs-demo.solana-mainnet.quiknode.pro/'
      );
      const balance = await connection.getBalance(publicKey);
      return balance;
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  };

  const handleChange = (e) => {
    setSelectedToken(e.target.value);
    fetchBalance(e.target.value)
      .then((balance) => setBalance(balance))
      .catch((error) => console.error('Error fetching balance:', error));
  };

  return (
    <div className="mt-[30px]">
      <div className="flex justify-center mb-4 gap-2 ">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Solana address"
          className="border-[#dcdfe6] border-[1px] p-[4px_10px] rounded-[4px] text-[#212121] text-[14px] outline-none max-w-[300px] w-full"
        />
        <button
          onClick={checkBalance}
          className="bg-[#42b983] text-white p-[4px_10px] rounded-[4px] text-[14px]"
        >
          Check Balance
        </button>
      </div>
      <div className="flex gap-2 justify-center">
        <div className="select-main">
          <div className="container">
            <div className="dropdown-container">
              <select
                className="dropdown border-[#ccc] border-[1px] bg-white p-2 rounded-md outline-none !text-[14px]"
                value={selectedToken}
                onChange={handleChange}
              >
                <option value="">Select a token</option>
                {tokens.map((token) => (
                  <option key={token.address} value={token.address}>
                    {token.address}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2 mb-5">
        {balance !== null ? (
          <p className="text-[16px] font-semibold">Balance: {balance}</p>
        ) : (
          <p className="text-[#212121] text-[14px]">
            Click 'Check Balance' to fetch the balance
          </p>
        )}
      </div>
    </div>
  );
};

export default SolanaComponent;
