import React from "react";
import RightStatus from "@/components/RightStatus";
import LeftStatus from "@/components/LeftStatus";

export default function LeftCard({ data ,prevData }) {

  return (
    <div>
      <div className="!grid !grid-cols-[auto_100px_auto]">
        <div className="border-0 border-red-500 flex justify-center">
          <LeftStatus heading={data} prevEmpl={prevData}/>
        </div>
        <div
          id="center"
          className="border-0 border-red-500 z-[-1] flex justify-center relative !bg-transparent"
        >
          <div
            id="round"
            className="border-2 border-black  !w-[40px] h-[40px] top-[40%] absolute bg-gray-300 rounded-full z-[5]"
          >
            <div className="  bg-gray-300 w-[200px] h-[5px] absolute top-[40%] left-[-500%]"></div>
          </div>
          <div className="border-0 border-black w-[5px] bg-gray-300 flex items-center z-[1]"></div>
        </div>
        <div
          className="border-0 border-red-500 flex justify-center"
          style={{ visibility: "hidden" }}
        >
          <RightStatus heading={data} prevEmpl={prevData}/>
        </div>
      </div>
    </div>
  );
}
