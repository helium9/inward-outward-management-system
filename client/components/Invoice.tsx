import React from 'react';

interface InvoiceDataProps {
  id: string;
  meta_id: string;
  action: string;
  remarks: string;
  employee_id: string;
  time_stamp: string;
  meta_data: {
    id: string;
    inward_number: number;
    issue_date: string;
    inward_date: string;
    ind_name: string;
    dept_name: string;
    party_name: string;
    claimant_name: string;
    subject: string;
    amount: number;
    advanced_req: boolean;
    alloted_to_id: null | string;
    status: string;
  };
  employee: {
    id: string;
    name: string;
    email: string;
  };
}

interface EmployeeData {
  id: string;
  name: string;
  email: string;
}

interface InvoiceProps {
  data: InvoiceDataProps[];
  employees: EmployeeData[]; // Additional prop for employees data
}

const Invoice: React.FC<InvoiceProps> = ({ data, employees }) => {
  
  const metaData = data?.length > 0 ? data[0].meta_data : null;
  const paymentTo = metaData?.party_name !== 'none' ? metaData?.party_name : metaData?.claimant_name;

  // Function to find employee by ID
  const findEmployeeById = (employeeId: string) => {
    return employees.find(employee => employee.id === employeeId);
  }

  // Find the employee data for the given employee ID
  const employeeData = metaData?.alloted_to_id ? findEmployeeById(metaData.alloted_to_id) : null;

  return (
    <div className="invoice-container p-3 border rounded-md shadow-md mx-auto w-full md:w-3/4 lg:w-1/2  bg-gray-100 mt-10">
      <div className="invoice-details grid grid-cols-1 gap-2 mb-2">
        <div className="claimant-info bg-gray-100 p-2 rounded-md flex justify-between">
          <p className="text-base font-medium font-dmSans">Invoice No</p>
          <p>{metaData?.inward_number}</p>
        </div>
        <div className="claimant-info bg-gray-100 p-2 rounded-md flex justify-between">
          <p className="text-base font-medium font-dmSans">Claimant Name</p>
          <p>{metaData?.claimant_name}</p>
        </div>
        <div className="department-info bg-gray-100 p-2 rounded-md flex justify-between">
          <p className="text-base font-medium font-dmSans">Department</p>
          <p>{metaData?.dept_name}</p>
        </div>
        <div className="payment-info bg-gray-100 p-2 rounded-md flex justify-between">
          <p className="text-base font-medium font-dmSans">Payment to be made to</p>
          <p>{paymentTo}</p>
        </div>
        <div className="payment-info bg-gray-100 p-2 rounded-md flex justify-between">
          <p className="text-base font-medium font-dmSans">Amount</p>
          <p>Rs. {metaData?.amount}/-</p>
        </div>
        <div className="payment-info bg-gray-100 p-2 rounded-md flex justify-between">
          <p className="text-base font-medium font-dmSans">Advance Request</p>
          <p>{metaData?.advanced_req ? 'YES' : 'NO'}</p>
        </div>
        <div className="payment-info bg-gray-100 p-2 rounded-md flex justify-between">
          <p className="text-base font-medium font-dmSans">Currently Alloted to</p>
          <p>{employeeData ? employeeData.name : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
