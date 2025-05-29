import React, { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";

interface ContractAddressProps {
  address?: string;
}

const Toast: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-white px-4 py-2 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
      <Check className="w-5 h-5 text-green-400" />
      <span>{message}</span>
    </div>
  );
};

const ContractAddress: React.FC<ContractAddressProps> = ({ address }) => {
  const [contractAddress, setContractAddress] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (address) {
      setContractAddress(address);
    } else {
      const savedAddress = localStorage.getItem("battleElements_contract");
      if (savedAddress) {
        setContractAddress(savedAddress);
      } else {
        const newAddress = generateUniqueContract();
        setContractAddress(newAddress);
        localStorage.setItem("battleElements_contract", newAddress);
      }
    }
  }, [address]);

  const generateUniqueContract = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    const segments = [
      "BE",
      timestamp.slice(0, 8),
      randomStr.toUpperCase(),
      Math.random().toString(36).substring(2, 10).toUpperCase(),
      Date.now().toString(36).slice(-8).toUpperCase(),
    ];
    return segments.join("_");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setShowToast(true);
    } catch (err) {
      console.error("Error copying:", err);
    }
  };

  return (
    <>
      {showToast && (
        <Toast message="Text copied!" onClose={() => setShowToast(false)} />
      )}

      <div className="max-w-xl mx-auto bg-[rgba(255,255,255,0.01)] backdrop-blur-md rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="/img/personaje.png"
            alt="Battle Elements"
            className="w-12 h-12 rounded-full ring-2 ring-[rgba(255,255,255,0.2)]"
          />
          <h2 className="text-2xl font-bold text-white/90">
            Battle Elements
          </h2>
        </div>

        <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-md rounded-xl p-4 border border-[rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <p className="text-white/70 text-sm">Contract Address</p>
          </div>
          <div className="flex items-center gap-2 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm rounded-lg p-2 mt-2 border border-[rgba(255,255,255,0.05)]">
            <p className="text-white/90 font-mono text-sm flex-1 overflow-hidden overflow-ellipsis">
              {contractAddress}
            </p>
            <button
              onClick={handleCopy}
              className="relative overflow-hidden w-[45px] h-[45px] bg-[rgba(255,255,255,0.1)] rounded-lg backdrop-blur-sm transition-all duration-300 border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] group"
            >
              <Copy className="w-5 h-5 text-white/90 group-hover:text-white transition-colors relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractAddress;