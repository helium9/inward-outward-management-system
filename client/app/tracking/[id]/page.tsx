"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Invoice from "@/components/Invoice";

import RightCard from "@/components/RightCard";
import LeftCard from "@/components/LeftCard";
import Navbar from "@/components/ui/Navbar";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [employees, setEmployees] = useState(null); // State to hold employees data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tracking/history/?meta_id=${id}`
        );
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData.history); // Set history data
        setEmployees(responseData.employees); // Set employees data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="pb-20">
        <div
          style={{
            gridColumn: "1 / 4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // marginBottom: "50px",
          }}
        >
          <Invoice data={data} employees={employees} /> 
        </div>
        {data?.map((ele, index) => {
          return (
            <div key={index}>
              {index % 2 == 0 ? (
                <RightCard data={ele} employees={employees} />
              ) : (
                <LeftCard data={ele} employees={employees} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
