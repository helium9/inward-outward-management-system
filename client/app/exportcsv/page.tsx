// app/exportcsv/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { CSVLink } from "react-csv";
import axios from 'axios';

export default function ExportCSVPage() {
  const [csvData, setCSVData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/exportmeta');
        setCSVData(response.data);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    fetchData();
  }, []);
console.log(csvData);
  return (
    <p>
      <CSVLink data={csvData} filename={`database.csv`} >Download Now</CSVLink>
    </p>
  );
}
