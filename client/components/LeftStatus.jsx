
export default function LeftStatus({heading}) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-[500px]">
        <div className="flex justify-between">
          <p>13-01-24<br />12:03</p>
          <p className="text-xl font-bold">{heading}</p>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col">
        <div className="flex justify-between">
            <p>F/A Employee 10</p>
            <p className="text-base font-medium font-dmSans">Forwarded from</p>
        </div>
        <div className="flex justify-between">
            <p>F/A Employee 12</p>
            <p className="text-base font-medium font-dmSans">Forwarded to</p>
        </div>
        <div className="flex justify-between">
            <p>None</p>
            <p className="text-base font-medium font-dmSans">Remarks</p>
        </div>
        </div>
      </div>      
    )
  }
  