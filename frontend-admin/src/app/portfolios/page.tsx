'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { PortfolioList } from '@/components/features/portfolios/PortfolioList'

export default function PortfoliosPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Portfolio管理
            </h1>
            <p className="text-gray-600">
              製造実績の作成・編集・削除
            </p>
          </div>
          <Link href="/portfolios/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新規作成
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio一覧</CardTitle>
            <CardDescription>
              システムに登録されている製造実績の一覧
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioList 
              onEdit={(portfolio) => {
                router.push(`/portfolios/${portfolio.id}/edit`)
              }}
              onView={(portfolio) => {
                router.push(`/portfolios/${portfolio.id}`)
              }}
              onDelete={(portfolio) => {
                console.log('Deleted portfolio:', portfolio.id)
              }}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}