import React from 'react';

interface InvoiceDataProps {
  invoice_number: string;
  claimant_name: string;
  department: string;
  payment_to_be_made_to: string;
  amount: string;
  advance_request: string;
}

const InvoiceData: InvoiceDataProps = {
  invoice_number: "1F3685",
  claimant_name: "Group M",
  department: "Computer Science Department",
  payment_to_be_made_to: "Self",
  amount: "Rs.2,00,000/-",
  advance_request: "YES",
}

const Invoice: React.FC = () => {
  return (
    <div className="invoice-container p-3 border rounded-md shadow-md mx-auto w-full md:w-3/4 lg:w-1/2">
      <div className="invoice-details grid grid-cols-1 gap-2 mb-2">
        <div className="claimant-info bg-gray-100 p-2 rounded-md flex justify-between ">
          <p className="text-base font-medium font-dmSans ">Invoice No</p>
          <p>{InvoiceData.invoice_number}</p>
        </div>
        <div className="claimant-info bg-gray-100 p-2 rounded-md flex justify-between ">
          <p className="text-base font-medium font-dmSans">Claimant Name</p>
          <p>{InvoiceData.claimant_name}</p>
        </div>
        <div className="department-info bg-gray-100 p-2 rounded-md flex justify-between ">
          <p className="text-base font-medium font-dmSans">Department</p>
          <p>{InvoiceData.department}</p>
        </div>
        <div className="payment-info bg-gray-100 p-2 rounded-md flex justify-between ">
          <p className="text-base font-medium font-dmSans">Payment to be made to</p>
          <p>{InvoiceData.payment_to_be_made_to}</p>
        </div>
        <div className="payment-info bg-gray-100 p-2 rounded-md flex justify-between ">
          <p className="text-base font-medium font-dmSans">Amount</p>
          <p>{InvoiceData.amount}</p>
        </div>
        <div className="payment-info bg-gray-100 p-2 rounded-md flex justify-between ">
          <p className="text-base font-medium font-dmSans">Advance Request</p>
          <p>{InvoiceData.advance_request}</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
