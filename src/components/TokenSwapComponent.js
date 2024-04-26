import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import { Connection } from '@solana/web3.js';
import { Connection, PublicKey } from '@solana/web3.js';
import { FaAngleDown } from 'react-icons/fa6';
import { IoClose, IoSearch } from 'react-icons/io5';
import img1 from '../../src/Assets/Images/img1.png';
import img2 from '../../src/Assets/Images/img2.png';
import img3 from '../../src/Assets/Images/img3.svg';

const details = {
  address: 'GWgwUUrgai3BFeEJZp7bdsBSYiuDqNmHf9uRusWsf3Yi',
  chainId: 1,
  decimals: 18,
  logoURI:
    'https://assets.coingecko.com/coins/images/13628/thumb/wluna.png?1696513376',
  name: 'Wrapped Terra Classic',
  symbol: 'LUNC',
};
const Seconddetails = {
  address: 'GWgwUUrgai3BFeEJZp7bdsBSYiuDqNmHf9uRusWsf3Yi',
  chainId: 1,
  decimals: 18,
  logoURI:
    'https://assets.coingecko.com/coins/images/13628/thumb/wluna.png?1696513376',
  name: 'Wrapped Terra Classic',
  symbol: 'LUNC',
};

const TokenSwapComponent = () => {
  // const rpcNodes = ['https://rpc.node1.solana.com', 'https://rpc.node2.solana.com'];

  // const [currentRpcNodeIndex, setCurrentRpcNodeIndex] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [Filtertokens, setFilterTokens] = useState([]);

  const [open, setOpen] = useState(false);
  const [secondOpen, setOpenSecond] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [SecondshowDetails, SecondsetShowDetails] = useState(false);

  const [selectedToken, setSelectedToken] = useState(details);
  const [SecondselectedToken, SecondsetSelectedToken] = useState(Seconddetails);
  const [Showbalance, setBalanceToken] = useState();
  const [SecondShowbalance, SetSecondsetBalanceToken] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  const swapTokens = async () => {
    setSelectedToken(SecondselectedToken);
    SecondsetSelectedToken(selectedToken);

    SetFirstNodeBalance(selectedToken.address);
    SetsecondNodeBalance(SecondselectedToken.address);
  };

  useEffect(() => {
    listAvailableTokens();
    setSelectedToken(details);
    SecondsetSelectedToken(Seconddetails);
  }, []);

  const listAvailableTokens = async () => {
    try {
      const response = await fetch(
        'https://tokens.coingecko.com/solana/all.json'
      );
      const tokenListJSON = await response.json();
      setTokens(tokenListJSON.tokens);
      setFilterTokens(tokenListJSON.tokens);
    } catch (error) {
      console.error('Error listing available tokens:', error);
    }
  };
  function handleClick1(token) {
    setSelectedToken(token);
    setShowDetails(true);
    SetFirstNodeBalance(token.address);
    setOpen(false);
  }
  async function SetFirstNodeBalance(address) {
    try {
      const publicKey = new PublicKey(address);
      const solana = new Connection(
        'https://docs-demo.solana-mainnet.quiknode.pro/'
      );
      const balance = await solana.getBalance(publicKey);
      setBalanceToken(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }


  function handleClick2(token) {
    SecondsetSelectedToken(token);
    SecondsetShowDetails(true);
    SetsecondNodeBalance(token.address);
    setOpenSecond(false);
  }
  async function SetsecondNodeBalance(address) {
    try {
      const publicKey = new PublicKey(address);
      const solana = new Connection(
        'https://docs-demo.solana-mainnet.quiknode.pro/'
      );
      const balance = await solana.getBalance(publicKey);
      SetSecondsetBalanceToken(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }
  const handleButtonClick = () => {
    setShowDetails(!showDetails);
  };

  const handleButtonClick1 = () => {
    setShowDetails(!SecondshowDetails);
  };
  const handleInputChange = (e) => {
    if (e.target.value === '') {
      setFilterTokens(tokens);
    } else {
      setSearchQuery(e.target.value);
      const results = tokens.filter((item) =>
        item.address.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilterTokens(results);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <div
          onClick={() => setOpen(!open)}
          className="w-full border-[#42b983] border-[1px] p-[8px_8px_8px_12px] shadow-[0_8px_14px_0_rgba(0,0,0,.05)] rounded-[16px] cursor-pointer"
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              {showDetails ? (
                <div
                  key={selectedToken.symbol}
                  className="token-row flex gap-[12px] p-[10px_0] hover:bg-[#42b9831a] cursor-pointer"
                  onClick={() => handleClick1()}
                >
                  <img
                    className="token-img w-[22px] h-[22px] rounded-full"
                    src={selectedToken.logoURI}
                    alt={selectedToken.symbol}
                  />
                  <span className="token-text text-[#43464e] text-[14px]">
                    {selectedToken.symbol}
                  </span>
                </div>
              ) : (
                <div>
                  {/* <button onClick={handleButtonClick}><FaAngleDown /></button> */}
                </div>
              )}
              <button className="text-[#686868]" onClick={handleButtonClick}>
                <FaAngleDown />
              </button>
            </div>
            <div className="flex items-center text-[#000000] text-[14px] mr-2">
              {Showbalance}
            </div>
          </div>
        </div>
        <div
          onClick={swapTokens}
          className="bg-[#ccedd2] text-[#42b983] border-[#42b983] border-[1px] rounded-[8px] flex items-center justify-center mx-[50px] p-[6px_10px] text-[14px]"
        >
          Start
        </div>
        <div
          onClick={() => setOpenSecond(!secondOpen)}
          className="w-full border-[#42b983] border-[1px] p-[8px_8px_8px_12px] shadow-[0_8px_14px_0_rgba(0,0,0,.05)] rounded-[16px] cursor-pointer"
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              {showDetails ? (
                <div
                  key={SecondselectedToken.symbol}
                  className="token-row flex gap-[12px] p-[10px_0] hover:bg-[#42b9831a] cursor-pointer"
                >
                  <img
                    className="token-img w-[22px] h-[22px] rounded-full"
                    src={SecondselectedToken.logoURI}
                    alt={SecondselectedToken.symbol}
                  />
                  <span className="token-text text-[#43464e] text-[14px]">
                    {SecondselectedToken.symbol}
                  </span>
                </div>
              ) : (
                <div>
                  {/* <button onClick={handleButtonClick1}><FaAngleDown /></button> */}
                </div>
              )}
              <button className="text-[#686868]" onClick={handleButtonClick1}>
                <FaAngleDown />
              </button>
            </div>
            <div className="flex items-center text-[#000000] text-[14px] mr-2">
              {SecondShowbalance}
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#000] bg-opacity-50 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relativ￼
                    e transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[700px] sm:p-6"
                >
                  <div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-[#303133] text-[18px] leading-6">
                        Search by token or paste address
                      </h2>
                      <button
                        onClick={() => setOpen(false)}
                        className="text-[#909399] text-[20px]"
                      >
                        <IoClose />
                      </button>
                    </div>
                    <div className="relative mt-[34px]">
                      <input
                        type="text"
                        placeholder="Search token name or contract address"
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="border-[#c0c4cc] border-[1px] rounded-[4px] outline-none h-[36px] p-[0_30px] text-[14px] w-full"
                      />
                      <IoSearch className="absolute left-[10px] top-[50%] translate-y-[-50%] text-[#c0c4cc]" />
                    </div>
                    <div className="grid grid-cols-6 gap-3 mt-[20px]">
                      <div className="flex gap-1 border-[#0000004d] border-[1px] p-[6px_4px] rounded-[10px] justify-center">
                        <img
                          src={img1}
                          alt="img1"
                          className="w-[24px] h-[24px] rounded-full"
                        />
                        <p className="text-[#00000080] text-[14px]">SOL</p>
                      </div>
                      <div className="flex gap-1 border-[#0000004d] border-[1px] p-[6px_4px] rounded-[10px] justify-center">
                        <img
                          src={img2}
                          alt="img1"
                          className="w-[24px] h-[24px] rounded-full"
                        />
                        <p className="text-[#00000080] text-[14px]">USDC</p>
                      </div>
                      <div className="flex gap-1 border-[#0000004d] border-[1px] p-[6px_4px] rounded-[10px] justify-center">
                        <img
                          src={img3}
                          alt="img1"
                          className="w-[24px] h-[24px] rounded-full"
                        />
                        <p className="text-[#00000080] text-[14px]">USDT</p>
                      </div>
                    </div>
                    <div className="border-b-[#dfe4ed] border-b-[2px] pb-[6px] text-[#42b983] mt-4 text-[14px]">
                      <span className='block w-fit relative after:absolute after:content-[""] after:bg-[#42b983] after:w-[100%] after:h-[2px] after:bottom-[-8px] after:left-0'>
                        All
                      </span>
                    </div>
                    ￼
                    <div className="token-list mt-[15px] h-[300px] overflow-auto">
                      {Filtertokens.map((token) => (
                        <div
                          key={token.id}
                          className="token-row flex gap-[12px] p-[10px_0] hover:bg-[#2b9831a] cursor-pointer"
                          onClick={() => handleClick1(token)}
                        >
                          <img
                            className="token-img w-[22px] h-[22px] rounded-full"
                            src={token.logoURI}
                            alt={token.symbol}
                          />
                          <span className="token-text text-[#43464e] text-[14px]">
                            {token.symbol}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          ￼
        </Dialog>
      </Transition.Root>
      <Transition.Root show={secondOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenSecond}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#000] bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[700px] sm:p-6">
                  <div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-[#303133] text-[18px] leading-6">
                        Search by token or paste address
                      </h2>
                      <button
                        onClick={() => setOpen(false)}
                        className="text-[#909399] text-[20px]"
                      >
                        <IoClose />￼
                      </button>
                    </div>
                    <div className="relative mt-[34px]">
                      <input
                        type="text"
                        placeholder="Search token name or contract address"
                        className="border-[#c0c4cc] border-[1px] rounded-[4px] outline-none h-[36px] p-[0_30px] text-[14px] w-full"
                      />
                      <IoSearch className="absolute left-[10px] top-[50%] translate-y-[-50%] text-[#c0c4cc]" />
                    </div>
                    <div className="grid grid-cols-6 gap-3 mt-[20px]">
                      <div className="flex gap-1 border-[#0000004d] border-[1px] p-[6px_4px] rounded-[10px] justify-center">
                        <img
                          src={img1}
                          alt="img1"
                          className="w-[24px] h-[24px] rounded-full"
                        />
                        <p className="text-[#0000004c] text-[14px]">SOL</p>
                      </div>
                      <div className="flex gap-1 border-[#0000004d] border-[1px] p-[6px_4px] rounded-[10px] justify-center">
                        <img
                          src={img2}
                          alt="img1"
                          className="w-[24px] h-[24px] rounded-full"
                        />
                        <p className="text-[#00000080] text-[14px]">USDC</p>
                      </div>
                      <div className="flex gap-1 border-[#0000004d] border-[1px] p-[6px_4px] rounded-[10px] justify-center">
                        <img
                          src={img3}
                          alt="img1"
                          className="w-[24px] h-[24px] rounded-full"
                        />
                        <p className="text-[#00000080] text-[14px]">USDT</p>
                      </div>
                    </div>
                    <div className="border-b-[#dfe4ed] border-b-[2px] pb-[6px] text-[#42b983] mt-4 text-[14px]">
                      <span className='block w-fit relative after:absolute after:content-[""] after:bg-[#42b983] after:w-[100%] after:h-[2px] after:bottom-[-8px] after:left-0'>
                        All
                      </span>
                    </div>
                    <div className="token-list mt-[15px] h-[300px] overflow-auto">
                      {tokens.map((token, index) => (
                        <div
                          key={`${token.symbol}-${token.logoURI}-${index}`}
                          className="token-row flex gap-[12px] p-[10px_0] hover:bg-[#2b9831a] cursor-pointer"
                          onClick={() => handleClick2(token)}
                        >
                          <img
                            className="token-img w-[22px] h-[22px] rounded-full"
                            src={token.logoURI}
                            alt={token.symbol}
                          />
                          <span className="token-text text-[#43464e] text-[14px]">
                            {token.symbol}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
export default TokenSwapComponent;
