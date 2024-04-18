export default function LeftStatus({ heading,prevEmpl}) {
  const dateTime = new Date(heading.time_stamp);
  const date = dateTime.toLocaleDateString(); 
  const time = dateTime.toLocaleTimeString();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-[500px]">
      <div className="flex justify-between">
        <p>{date}<br/>{time}</p>
        <p className="text-xl font-bold">{heading.action}</p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p>{prevEmpl.employee.name}</p>
          <p className="text-base font-medium font-dmSans">Forwarded from</p>
        </div>
        <div className="flex justify-between">
          {/* <p>{employee.name}</p> */}
          <p>{heading.employee.name}</p>
          <p className="text-base font-medium font-dmSans">Forwarded to</p>
        </div>
        <div className="flex justify-between">
          <p>{heading.remarks}</p>
          <p className="text-base font-medium font-dmSans">Remarks</p>
        </div>
      </div>
    </div>
  );
}
