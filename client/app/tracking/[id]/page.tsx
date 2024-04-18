"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Invoice from "@/components/Invoice";

import RightCard from "@/components/RightCard";
import LeftCard from "@/components/LeftCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tracking/history/?meta_id=${id}`
        );
        const responseData = await response.json();
        // console.log(responseData);
        setData(responseData.history);
        setEmployees(responseData.employees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="pb-10">
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
          const prevEle = index !== 0 ? data[index - 1] : null;
          console.log(prevEle)
          return (
            <div key={index}>
              {index === 0 ? (
                <RightCard data={ele} prevData={ele}/>
              ) : index % 2 == 0 ? (
                <RightCard data={ele} prevData={prevEle} />
              ) : (
                <LeftCard data={ele} prevData={prevEle} />
              )}
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
