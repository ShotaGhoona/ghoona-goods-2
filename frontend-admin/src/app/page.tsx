import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminLayout } from '@/components/layouts/AdminLayout'

export default async function HomePage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600">
            製造実績管理システムへようこそ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Portfolio管理
              </CardTitle>
              <CardDescription>
                製造実績の作成・編集・削除
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/portfolios">
                <Button className="w-full" variant="outline">
                  Portfolio一覧へ
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏷️ Category管理
              </CardTitle>
              <CardDescription>
                製品カテゴリの管理
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/categories">
                <Button className="w-full" variant="outline">
                  Category一覧へ
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏷️ Tag管理
              </CardTitle>
              <CardDescription>
                タグの管理
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tags">
                <Button className="w-full" variant="outline">
                  Tag一覧へ
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                👥 User管理
              </CardTitle>
              <CardDescription>
                管理者ユーザーの管理
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/users">
                <Button className="w-full" variant="outline">
                  User一覧へ
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📈 Analytics
              </CardTitle>
              <CardDescription>
                統計・分析データ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" disabled>
                準備中
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚙️ Settings
              </CardTitle>
              <CardDescription>
                システム設定
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/settings">
                <Button className="w-full" variant="outline">
                  設定へ
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>クイック統計</CardTitle>
            <CardDescription>
              システムの概要統計
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">--</div>
                <div className="text-sm text-gray-600">Total Portfolios</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">--</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">--</div>
                <div className="text-sm text-gray-600">Tags</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">--</div>
                <div className="text-sm text-gray-600">Admin Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
