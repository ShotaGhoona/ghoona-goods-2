'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  const { user, isLoaded } = useUser()
  
  if (!isLoaded) {
    return <div>Loading...</div>
  }
  
  if (!user) {
    redirect('/sign-in')
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-gray-600">
            システム設定
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>システム設定</CardTitle>
            <CardDescription>
              Phase 5で実装予定
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚙️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Settings機能は準備中です
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}