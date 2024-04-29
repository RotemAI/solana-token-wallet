import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import Select from 'react-select';
import '../App.css';

const SolanaComponent = () => {
  const [address, setAddress] = useState(
    '7cVfgArCheMR6Cs4t6vz5rfnqd56vZq4ndaBrY5xkxXy'
  );
  const [balance, setBalance] = useState(null);
  const [selectedToken, setSelectedToken] = useState('');
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    listAvailableTokens();
  }, []);

  const listAvailableTokens = async () => {
    try {
      const response = await fetch(
        'https://tokens.coingecko.com/solana/all.json'
      );
      const tokenListJSON = await response.json();
      const formattedTokens = tokenListJSON.tokens.map((token) => ({
        value: token.address,
        label: token.address,
      }));
      setTokens(formattedTokens);
    } catch (error) {
      console.error('Error listing available tokens:', error);
    }
  };

  const fetchBalance = async (selectedToken) => {
    try {
      const publicKey = new PublicKey(selectedToken);
      const connection = new Connection(
        'https://docs-demo.solana-mainnet.quiknode.pro/'
      );
      const balance = await connection.getBalance(publicKey);
      setBalance(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null); 
    }
  };

  const handleChangeToken = (selectedOption) => {
    if (selectedOption) {
      setSelectedToken(selectedOption.value);
      fetchBalance(selectedOption.value);
    } else {
      setSelectedToken('');
      setBalance(null);
    }
  };

  return (
    <div className="solana-container">
      {' '}
      <div className="input-section">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Solana address"
          className="input-field"
        />
        <button
          onClick={() => fetchBalance(address)}
          className="check-balance-button"
        >
          Check Balance
        </button>
      </div>
      <div className="select-section">
        <Select
          value={tokens.find((token) => token.value === selectedToken)}
          onChange={handleChangeToken}
          options={tokens}
          placeholder="Select a token"
          className="select-dropdown"
          styles={{
            option: (base) => ({
              ...base,
              borderBottom: `1px solid #ccc`,
              height: '100%',
            }),
          }}
        />
      </div>
      <div className="balance-section">
        {balance !== null ? (
          <p className="balance-text">Balance: {balance}</p>
        ) : (
          <p className="balance-text">
            Click 'Check Balance' to fetch the balance
          </p>
        )}
      </div>
    </div>
  );
};

export default SolanaComponent;
