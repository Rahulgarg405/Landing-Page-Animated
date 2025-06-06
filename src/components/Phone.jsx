import React from "react";

const Phone = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[300px] h-[575px] rounded-[2rem] bg-white shadow-2xl border-[6px] border-black relative overflow-hidden">
        {/* Notch or status bar */}
        <div className="w-[120px] h-[30px] bg-black rounded-b-xl absolute top-0 left-1/2 transform -translate-x-1/2 z-10"></div>

        {/* Content inside phone */}
        <div className="p-4 pt-12 h-full overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Phone App UI</h2>
          <p>Contents</p>
          {/* Add your app components here */}
        </div>
      </div>
    </div>
  );
};

export default Phone;
