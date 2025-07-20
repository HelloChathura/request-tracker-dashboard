'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

interface MonthlyRequest {
  RequestMonth: string;
  RequestCount: number;
}

export default function MonthlyRequestsChart() {
  const [data, setData] = useState<MonthlyRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/requests/monthly');
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-[400px] p-4">
      <h2 className="text-xl font-bold mb-4">Monthly Request Chart</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="RequestMonth" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="RequestCount" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
