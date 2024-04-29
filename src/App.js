import React, { useState } from 'react';
import SolanaComponent from './components/SolanaComponent';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import TokenSwapComponent from './components/TokenSwapComponent';
import { Connection, PublicKey } from '@solana/web3.js';
import './App.css'

const App = () => {
  const [tab, setTab] = useState('PrivateKey');
  const [privateKey, setPrivateKey] = useState('');
  const [balances, setBalances] = useState([]);

  const handleImport = async () => {
    const keys = privateKey
      .split('\n')
      .map((key) => key.trim())
      .filter(Boolean);
    const connection = new Connection('https://api.mainnet-beta.solana.com/');
    const balancesPromises = keys.map(async (key) => {
      try {
        const publicKey = new PublicKey(key);
        const balance = await connection.getBalance(publicKey);
        return { publicKey: key, balance };
      } catch (error) {
        console.error(`Error fetching balance${key}:`, error);
        return { publicKey: key, balance: 'Error' };
      }
    });

    const newBalances = await Promise.all(balancesPromises);
    setBalances(newBalances);
  };

  return (
    <div>
      <div className="max-w-[800px] mx-auto mt-[20px] shadow-[rgba(0,0,0,0.12)_0px_3px_8px] p-4 border-[1px] border-[#dcdcdc]">
        <h1 className="text-[28px] text-center font-semibold">
          Solana Wallet Manager
        </h1>
        <div></div>
        <SolanaComponent />
        
      </div>
      <div className="max-w-[800px] mx-auto mt-[20px] shadow-[rgba(0,0,0,0.12)_0px_3px_8px] p-4 border-[1px] border-[#dcdcdc]">
        <div>
          <button
            onClick={() => setTab('PrivateKey')}
            className={`${
              tab === 'PrivateKey'
                ? 'bg-[#42b983] text-white border-[#42b983]'
                : 'border-[#dcdfe6] bg-[#fff]'
            } border-[1px] rounded-[4px] p-[10px_20px]`}
          >
            PrivateKey
          </button>
        </div>
        <div>
          {tab === 'PrivateKey' && (
            <div>
              <div className="mt-[30px]">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-2">
                    <p className="text-[#606662] text-[16px]">
                      Privatekey List
                    </p>
                    <button className="bg-[#ecf8f3] border-[1px] border-[#d9f1e6] text-[#42b983] text-[12px] px-[8px] flex items-center gap-1 h-[24px] rounded">
                      <AiFillSafetyCertificate className="text-[14px]" />
                      Safety Tips
                    </button>
                  </div>
                </div>
                <textarea
                  className="border-[#0000001a] border-[1px] w-full rounded p-2 outline-none"
                  value={privateKey}
                  height="200px"
                  onChange={(e) => setPrivateKey(e.target.value)}
                  rows={5}
                />
                <div className="flex justify-between items-center mt-[10px]">
                  <p className="text-[#aec2e3] text-[15px] font-normal">
                    Enter an private key for each line
                  </p>
                  <div className="flex gap-[10px]"></div>
                </div>
                <div className="flex justify-center items-center gap-[10px] mt-[20px]">
                  <button className="border-[#dcdfe6] border-[1px] text-[#606266] p-[10px_20px] text-[14px] rounded-[4px] h-[35px] flex justify-center items-center">
                    Cancel
                  </button>
                  <button
                    onClick={handleImport}
                    className="bg-[#42b983] text-white border-[1px] border-[#42b983] p-[10px_20px] text-[14px] rounded-[4px] h-[35px] flex justify-center items-center"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-[800px] mx-auto mt-[20px] shadow-[rgba(0,0,0,0.12)_0px_3px_8px] p-4 border-[1px] border-[#dcdcdc]">
        <TokenSwapComponent />
      </div>
    </div>
  );
};

export default App;
