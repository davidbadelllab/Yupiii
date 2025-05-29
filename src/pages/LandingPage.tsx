import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import ContractAddress from "../components/ContractAddress";
import LightningEffect from "../components/LightningEffect";
import AudioController from '../components/AudioController';
import ThunderStorm from "../components/ThunderStorm";
import IntroVoice from '../components/IntroVoice';


interface Exchange {
  name: string;
  logo: string;
  link: string;
  pair?: string;
}

// Modal Component
const TradeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const exchanges: Exchange[] = [
    {
      name: "Binance",
      logo: "/img/binance.svg",
      link: "https://www.binance.com",
    },
    {
      name: "OKX",
      logo: "/img/okx.png",
      link: "https://www.okx.com",
    },
    {
      name: "Bybit",
      logo: "/img/bybit.png",
      link: "https://www.bybit.com",
    },
    {
      name: "Bitget",
      logo: "/img/bitget.png",
      link: "https://www.bitget.com",
    },
    {
      name: "Gate.io",
      logo: "/img/gate.png",
      link: "https://www.gate.io",
    },
    {
      name: "MEXC",
      logo: "/img/mexc.png",
      link: "https://www.mexc.com",
    },
    {
      name: "Bitfinex",
      logo: "/img/Bitfinex.png",
      link: "https://www.bitfinex.com",
    },
    {
      name: "KuCoin",
      logo: "/img/kucoin.svg",
      link: "https://www.kucoin.com",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Trade $CryptoElements
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exchanges.map((exchange) => (
            <a
              key={exchange.name}
              href={exchange.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-600 transition-all duration-300"
            >
              <img
                src={exchange.logo}
                alt={exchange.name}
                className="w-8 h-8 object-contain"
              />
              <div className="flex-1">
                <p className="text-white font-medium">{exchange.name}</p>
                {exchange.pair && (
                  <p className="text-gray-400 text-sm">{exchange.pair}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 z-0">
        <LightningEffect />
        <ThunderStorm />
        <IntroVoice />
       
      </div>
      <AudioController />

      {/* Header */}
      <header className="p-4 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo y título */}
        <div className="flex items-center gap-2">
          <img
            src="img/personaje.png"
            alt="Battle Elements"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Battle Elements
          </h1>
        </div>

        {/* Botones sociales y whitepaper */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300 p-2 rounded-full hover:bg-gray-800/50"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
                Follow us
              </span>
            </a>
          </div>

          <div className="relative group">
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors duration-300 p-2 rounded-full hover:bg-gray-800/50"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
                Join community
              </span>
            </a>
          </div>

          <div className="relative group">
            <a
              href="/documents/BT_WP_0.01.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-800 transition-all duration-300 text-white font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Whitepaper
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
                View documentation
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Contract Address Section */}
      <ContractAddress />

      {/* Hero Section */}
      <main className="mt-20 max-w-7xl mx-auto px-4 py-16 text-center relative">
        {/* Personajes medios con brillo */}
        <div className="absolute top-1/3 -left-8">
          <div className="relative group">
            <img
              src="/img/1h.png"
              alt="Character"
              className="w-32 h-32 relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-all duration-300"></div>
          </div>
        </div>
        <div className="absolute top-1/3 -right-8">
          <div className="relative group">
            <img
              src="/img/2h.png"
              alt="Character"
              className="w-32 h-32 relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/30 transition-all duration-300"></div>
          </div>
        </div>

        {/* Personajes inferiores con brillo */}
        <div className="absolute bottom-1/4 -left-8">
          <div className="relative group">
            <img
              src="/img/3h.png"
              alt="Character"
              className="w-32 h-32 relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full group-hover:bg-green-500/30 transition-all duration-300"></div>
          </div>
        </div>
        <div className="absolute bottom-1/4 -right-8">
          <div className="relative group">
            <img
              src="/img/4h.png"
              alt="Character"
              className="w-32 h-32 relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full group-hover:bg-pink-500/30 transition-all duration-300"></div>
          </div>
        </div>

        {/* Elementos centrales con brillo */}
        <div className="flex justify-around mb-8">
          <div className="relative group">
            <img
              src="/img/6fire.png"
              alt="Fire Element"
              className="w-64 relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-xl rounded-3xl group-hover:from-red-500/30 group-hover:to-orange-500/30 transition-all duration-300"></div>
          </div>
          <div className="relative group">
            <img
              src="/img/5water.png"
              alt="Water Element"
              className="w-64 relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl rounded-3xl group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300"></div>
          </div>
        </div>

        <h2 className="text-8xl font-bold mb-8">Unleash your inner Master</h2>

        <div className="flex justify-center gap-4 mb-8">
          <img src="/img/okx.png" className="w-8 h-8" alt="OKX" />
          <img src="/img/gate.png" className="w-8 h-8" alt="Gate.io" />
          <img src="/img/kucoin.svg" className="w-8 h-8" alt="KuCoin" />
        </div>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Make your way from novice elemental master to legendary commander.
          Control the elements, complete quests, and earn real rewards.
        </p>

        <div className="flex justify-center gap-6 mb-16 relative">
          <button
            onClick={() => setIsTradeModalOpen(true)}
            class="cursor-pointer text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
          >
            Trade $ELEM
          </button>

          <Link
            to="https://web.telegram.org/k/#@Turtlefarmer"
            className="group inline-block"
          >
            <button className="invert hover:rotate-2 brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-yellow-700/60 transition ease-in-out hover:scale-105 p-1 rounded-2xl bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600">
              <div className="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-xl font-semibold w-full h-full">
                <div className="group-hover:scale-100 flex items-center justify-center group-hover:text-yellow-500 text-yellow-600 gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    className="w-6 h-6 stroke-yellow-600 group-hover:stroke-yellow-500 group-hover:stroke-[1.99]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    ></path>
                  </svg>
                  <span className="text-lg font-bold">Play Now</span>
                </div>
              </div>
            </button>
          </Link>
        </div>
      </main>

      {/* Roadmap Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-16 text-white/90">
          Roadmap
        </h2>

        <div className="grid gap-8">
          {[
            {
              date: "Q4 2024",
              items: [
                "Launch of Battle Elements Season 1",
                "Implementation of reward system",
                "Token launch and AirDrop distribution",
                "$ELEM Token Listing",
              ],
            },
            {
              date: "Q1 2025",
              items: [
                "New game modes and elements",
                "Clan system implementation",
                "Marketplace launch",
                "Cross-chain integration",
              ],
            },
            {
              date: "Q2 2025",
              items: [
                "Mobile app release",
                "Tournament system",
                "NFT integration",
                "Community governance implementation",
              ],
            },
          ].map((phase, index) => (
            <div
              key={index}
              className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-lg p-6 relative border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-l-lg"></div>
              <h3 className="text-2xl font-bold mb-4 text-white/90">
                {phase.date}
              </h3>
              <ul className="space-y-2">
                {phase.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-white/80 flex items-center gap-2 hover:text-white/100 transition-colors"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <div className="flex justify-center gap-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.326 18.266l-4.326-2.314-4.326 2.314.863-4.829-3.537-3.399 4.86-.671 2.14-4.415 2.14 4.415 4.86.671-3.537 3.399.863 4.829z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </footer>

      {/* Modal de Trading */}
      <TradeModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
