"use client";

import dynamic from 'next/dynamic';
import { Card } from "antd";

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const visitorChartData = {
    series: [{ name: "Visitors", data: [100, 200, 150, 300, 250, 400, 380] }],
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  };

  export const UniqueVisitorsChart = () =>(
        <Card title="Unique Visitors">
                <ApexChart
                  type="line"
                  height={400}
                  series={visitorChartData.series}
                  options={{
                    xaxis: { categories: visitorChartData.categories },
                    stroke: { curve: 'smooth' },
                    chart: { id: 'visitors' },
                  }}
                />
              </Card>
    )
