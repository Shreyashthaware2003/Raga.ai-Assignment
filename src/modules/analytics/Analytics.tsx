import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  getDashboardStats, getPatientGrowth, getPatients, getVisitsPerDay, type Patient, type Stat, getDepartmentStats,
  getTreatmentTime,
} from '@/mockData/analytics'
import { Activity, AlertTriangle, UserPlus, Users } from 'lucide-react';
import type { ComponentType } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics() {

  type StatId = "total" | "active" | "critical" | "new";

  const iconMap: Record<StatId, ComponentType<any>> = {
    total: Users,
    active: Activity,
    critical: AlertTriangle,
    new: UserPlus,
  };

  const [stats, setStats] = useState<Stat[]>([]);
  const [growth, setGrowth] = useState<any[]>([]);
  const [visits, setVisits] = useState<any[]>([]);
  const [_patients, setPatients] = useState<Patient[]>([]);
  const [department, setDepartment] = useState<any[]>([]);
  const [treatment, setTreatment] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [
        statsData,
        growthData,
        visitsData,
        patientsData,
        departmentData,
        treatmentData,
      ] = await Promise.all([
        getDashboardStats(),
        getPatientGrowth(),
        getVisitsPerDay(),
        getPatients(),
        getDepartmentStats(),
        getTreatmentTime(),
      ]);

      setStats(statsData);
      setGrowth(growthData);
      setVisits(visitsData);
      setPatients(patientsData);
      setDepartment(departmentData);
      setTreatment(treatmentData);
    };

    loadData();
  }, []);

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-4xl font-bold'>Analytics</h1>
          <span>Track patient growth, visit patterns, and treatment insights from a single analytics dashboard.</span>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4 w-full'>
          {
            stats.map((stat) => {
              const Icon = iconMap[stat.id];
              return (
                <Card key={stat.id} className='flex-1 card-surface ring-0 shadow-sm  p-6'>
                  <div className='bg-gray-200 dark:bg-[#302f2f] w-fit p-2 rounded-md'>
                    <Icon />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <span>{stat.label}</span>
                    <span className='text-xl tracking-widest font-semibold'>{Number(stat.value).toLocaleString("en-IN")}</span>
                  </div>
                </Card>
              )
            })
          }

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Patient Growth */}
          <Card className='card-surface ring-0'>
            <CardHeader>
              <CardTitle>Patient Growth</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="patients" stroke="#6366f1" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Visits per Day */}
          <Card className='card-surface ring-0'>
            <CardHeader>
              <CardTitle>Visits Per Day</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visits}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visits" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Department Distribution */}
          <Card className='card-surface ring-0'>
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={department}
                    dataKey="patients"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                  >
                    {department.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Treatment Time */}
          <Card className='card-surface ring-0'>
            <CardHeader>
              <CardTitle>Average Treatment Time</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={treatment}>
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgDays" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>


      </div>
    </>
  )
}
