import React from 'react'
import { Card } from '@/components/ui/card'
import { dashboardStats } from '@/mockData/home'
import { Activity, AlertTriangle, UserPlus, Users } from 'lucide-react';
import type { ComponentType } from "react";

export default function Home() {

  type StatId = "total" | "active" | "critical" | "new";

  const iconMap: Record<StatId, ComponentType<any>> = {
    total: Users,
    active: Activity,
    critical: AlertTriangle,
    new: UserPlus,
  };

  return (
    <>
      <div className='flex flex-col gap-6'>
        <h1 className='text-4xl font-bold'>Home</h1>
        <div className='flex flex-col sm:flex-row items-center gap-4 w-full'>
          {
            dashboardStats.map((stat) => {
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

      </div>
    </>
  )
}
