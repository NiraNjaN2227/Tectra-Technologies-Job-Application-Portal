'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface ChartData {
  timeSeriesData: { date: string; applications: number }[];
  categoryData: { name: string; value: number }[];
}

const COLORS = ['#F72400', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

export function DashboardCharts({ data }: { data: ChartData }) {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      {/* Time Series Chart */}
      <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-6 font-sans">
        <h2 className="mb-6 text-xl font-medium text-neutral-900 font-heading">Application Volume (Last 30 Days)</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.timeSeriesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#737373" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#737373" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                allowDecimals={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e5e5',
                  borderRadius: '0.5rem',
                  color: '#171717',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="#F72400" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#ffffff', stroke: '#F72400', strokeWidth: 2 }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-6 font-sans">
        <h2 className="mb-6 text-xl font-medium text-neutral-900 font-heading">Applications by Category</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e5e5',
                  borderRadius: '0.5rem',
                  color: '#171717',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }} 
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '14px', color: '#525252' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
