export default function RightStatus({ heading,prevEmpl}) {
  const dateTime = new Date(heading.time_stamp);
  const date = dateTime.toLocaleDateString(); 
  const time = dateTime.toLocaleTimeString();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-[500px]">
      <div className="flex justify-between">
        <p className="text-xl font-medium font-dmSans">{heading.action}</p>
        <p>{date}<br/>{time}</p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col">
        <div className="flex justify-between">
            <p className="text-base font-medium font-dmSans">Forwarded By</p>
            <p>{prevEmpl.employee.name}</p>
        </div>
        <div className="flex justify-between">
            <p className="text-base font-medium font-dmSans">Forwarded to</p>
            <p>{heading.employee.name}</p>
        </div>  
        <div className="flex justify-between">
            <p className="text-base font-medium font-dmSans">Remarks</p>
            <p>{heading.remarks}</p>
        </div> 
      </div>
    </div>
  );
}
