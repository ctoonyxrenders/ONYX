"use client";
import dynamic from 'next/dynamic';
import { Card,Statistic } from "antd"
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const activeMembersSeries = [{ name: "Active", data: [120, 130, 150, 170, 180] }];

const newMembers = [
  { id: 1, name: "John Doe", title: "Frontend Developer", img: "" },
  { id: 2, name: "Jane Smith", title: "Backend Developer", img: "" },
];
const memberChartOptions: ApexOptions = {
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#1890ff'],
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    },
  };

export const ActiveMembersCard =()=>(
    <Card className="mt-4" title="Active Members">
            <ApexChart
              type="line"
              height={145}
              series={activeMembersSeries}
              options={memberChartOptions}
            />
            <Statistic className="mt-3" title="Total" value="17,329" suffix="Users" />
          </Card>
)