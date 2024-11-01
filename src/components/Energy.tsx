import React from 'react';

const Energy = ({ current, max }) => {
  return (
    <div className="flex items-center">
     <img   
     className="w-12 h-12" 
     src="../../public/img/rayo.png" alt="Rayo" />
      
      <span className="text-white">
        {current}/{max}
      </span>
    </div>
  );
};

export default Energy;