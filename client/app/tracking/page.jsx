import Invoice from "@/components/Invoice";
import RightStatus from "@/components/RightStatus";
import LeftStatus from "@/components/LeftStatus";

const page = () => {
  return (
    <div className="pb-20">
      
      <div
        style={{
          gridColumn: "1 / 4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <Invoice />
      </div>

      <div className="!grid !grid-cols-[auto_100px_auto]">
        <div
          className="border-0 border-red-500 flex justify-center"
          style={{ visibility: "hidden" }}
        >
          <LeftStatus heading="Heading" />
        </div>
        <div id="center" className="border-0 border-red-500 z-[-1] flex justify-center relative !bg-transparent">
          <div
            id="round"
            className="border-2 border-black  !w-[40px] h-[40px] top-[40%] absolute bg-gray-300 rounded-full "
          >
            <div className="  bg-gray-300 w-[200px] h-[5px] absolute top-[40%]"></div>
          </div>
          <div className="border-0 border-black w-[5px] bg-gray-300 flex items-center z-[1]"></div>
        </div>
        <div className="border-0 border-red-500 flex justify-center ">
          <RightStatus heading="Inwarded" />
        </div>
      </div>

      <div className="!grid !grid-cols-[auto_100px_auto]">
        <div className="border-0 border-red-500 flex justify-center">
          <LeftStatus heading="Fowarded" />
        </div>
        <div id="center" className="border-0 border-red-500 z-[-1] flex justify-center relative !bg-transparent">
          <div
            id="round"
            className="border-2 border-black  !w-[40px] h-[40px] top-[40%] absolute bg-gray-300 rounded-full "
          >
            <div className="  bg-gray-300 w-[200px] h-[5px] absolute top-[40%] left-[-500%]"></div>
          </div>
          <div className="border-0 border-black w-[5px] bg-gray-300 flex items-center z-[1]"></div>
        </div>
        <div
          className="border-0 border-red-500 flex justify-center"
          style={{ visibility: "hidden" }}
        >
          <RightStatus heading="Right Status" />
        </div>
      </div>

      <div className="!grid !grid-cols-[auto_100px_auto]">
        <div
          className="border-0 border-red-500 flex justify-center"
          style={{ visibility: "hidden" }}
        >
          <LeftStatus heading="Heading" />
        </div>
        <div id="center" className="border-0 border-red-500 z-[-1] flex justify-center relative !bg-transparent">
          <div
            id="round"
            className="border-2 border-black  !w-[40px] h-[40px] top-[40%] absolute bg-gray-300 rounded-full "
          >
            <div className="  bg-gray-300 w-[200px] h-[5px] absolute top-[40%]"></div>
          </div>
          <div className="border-0 border-black w-[5px] bg-gray-300 flex items-center z-[1]"></div>
        </div>
        <div className="border-0 border-red-500 flex justify-center">
          <RightStatus heading="Forwarded" />
        </div>
      </div>

      <div className="!grid !grid-cols-[auto_100px_auto]">
        <div className="border-0 border-red-500 flex justify-center">
          <LeftStatus heading="Outwarded" />
        </div>
        <div id="center" className="border-0 border-red-500 z-[-1] flex justify-center relative !bg-transparent">
          <div
            id="round"
            className="border-2 border-black !w-[40px] h-[40px] top-[40%] absolute bg-gray-300 rounded-full "
          >
            <div className="  bg-gray-300 w-[200px] h-[5px] absolute top-[40%] left-[-500%]"></div>
          </div>
          <div className="border-0 border-black w-[5px] bg-gray-300 flex items-center z-[1]"></div>
        </div>  
        <div
          className="border-0 border-red-500 flex justify-center"
          style={{ visibility: "hidden" }}
        >
          <RightStatus heading="Right Status" />
        </div>
      </div>
      <footer className='text-center text-sm mt-10'>Copyright ©2024 IIT Indore. All right reserved.</footer> 
    </div>
  );
};

export default page;
