'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { PortfolioForm } from '@/components/features/portfolios/PortfolioForm'
import { Portfolio } from '@/types/portfolios'

export default function CreatePortfolioPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  
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

  return (
    <AdminLayout>
      <PortfolioForm
        mode="create"
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </AdminLayout>
  )
}