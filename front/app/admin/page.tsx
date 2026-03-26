'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/admin/layout'
import { DashboardOverview } from '@/components/admin/dashboard-overview'
import { ServicesManager } from '@/components/admin/services-manager'
import { ContactMessages } from '@/components/admin/contact-messages'
import { TeamManager } from '@/components/admin/team-manager'

type TabType = 'overview' | 'services' | 'messages' | 'team'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'overview' && <DashboardOverview />}
      {activeTab === 'services' && <ServicesManager />}
      {activeTab === 'messages' && <ContactMessages />}
      {activeTab === 'team' && <TeamManager />}
    </AdminLayout>
  )
}
