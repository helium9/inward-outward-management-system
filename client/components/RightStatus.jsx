
export default function RightStatus({heading}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-[500px]">
      <div className="flex justify-between">
        <p className="text-xl font-medium font-dmSans">{heading}</p>
        <p>10-01-24<br/>15:03</p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col">
        <div className="flex justify-between">
            <p className="text-base font-medium font-dmSans">Assigned by</p>
            <p>Admin</p>
        </div>
        <div className="flex justify-between">
            <p className="text-base font-medium font-dmSans">Assigned to</p>
            <p>F/A employee_11</p>
        </div>  
        <div className="flex justify-between">
            <p className="text-base font-medium font-dmSans">Remarks</p>
            <p>The claim has been inwarded</p>
        </div> 
      </div>
    </div>
  )
}
