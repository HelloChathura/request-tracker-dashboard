'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

interface MonthlyRequest {
  RequestMonth: string; // e.g., "2025-01"
  RequestCount: number;
}

export default function MonthlyRequestsChart() {
  const [data, setData] = useState<MonthlyRequest[]>([]);
  const [filteredData, setFilteredData] = useState<MonthlyRequest[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/requests/monthly');
      const json: MonthlyRequest[] = await res.json();
      setData(json);

      const uniqueYears = [
        ...new Set(json.map(item => item.RequestMonth.split('-')[0]))
      ];
      setYears(uniqueYears);
      setSelectedYear(uniqueYears.at(-1) ?? ''); // default: latest year
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const filtered = data.filter(item =>
        item.RequestMonth.startsWith(selectedYear)
      );
      setFilteredData(filtered);
    }
  }, [selectedYear, data]);

  const formatMonth = (monthString: string) => {
    const [year, month] = monthString.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="w-full max-w-4xl h-[450px] p-4 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Monthly Request Chart</h2>

      <div className="mb-4 text-center">
        <label htmlFor="year" className="mr-2 font-medium">Select Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          className="border px-3 py-1 rounded-md"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="RequestMonth" tickFormatter={formatMonth} />
          <YAxis allowDecimals={false} />
          <Tooltip labelFormatter={formatMonth} />
          <Bar dataKey="RequestCount" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
