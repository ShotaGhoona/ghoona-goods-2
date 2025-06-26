'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { PortfolioForm } from '@/components/features/portfolios/PortfolioForm'
import { usePortfolio } from '@/hooks/usePortfolios'
import { Portfolio } from '@/types/portfolios'

interface EditPortfolioPageProps {
  params: {
    id: string
  }
}

export default function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const { portfolio, loading, error } = usePortfolio(params.id)
  
  if (!isLoaded) {
    return <div>Loading...</div>
  }
  
  if (!user) {
    redirect('/sign-in')
    return null
  }

  const handleSuccess = () => {
    router.push('/portfolios')
  }

  const handleCancel = () => {
    router.push('/portfolios')
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Portfolio を読み込んでいます...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Portfolio の読み込みに失敗しました
          </h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => router.push('/portfolios')}
            className="text-blue-600 hover:underline"
          >
            Portfolio 一覧に戻る
          </button>
        </div>
      </AdminLayout>
    )
  }

  if (!portfolio) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Portfolio が見つかりません
          </h3>
          <p className="text-gray-500 mb-4">
            指定された Portfolio は存在しないか、削除されています
          </p>
          <button
            onClick={() => router.push('/portfolios')}
            className="text-blue-600 hover:underline"
          >
            Portfolio 一覧に戻る
          </button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <PortfolioForm
        portfolio={portfolio}
        mode="edit"
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </AdminLayout>
  )
}