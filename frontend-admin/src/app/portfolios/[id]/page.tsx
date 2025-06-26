'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { usePortfolio } from '@/hooks/usePortfolios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Edit, 
  Package, 
  Calendar, 
  Hash, 
  User, 
  Clock,
  Tag,
  Building,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  MessageSquare
} from 'lucide-react'

interface ViewPortfolioPageProps {
  params: {
    id: string
  }
}

const categoryLabels = {
  'original-badge': 'オリジナル缶バッジ',
  'standard-badge': 'スタンダード缶バッジ',
  'acrylic-stand': 'アクリルスタンド',
  'acrylic-keychain': 'アクリルキーホルダー',
}

const industryLabels = {
  'anime': 'アニメ・ゲーム',
  'corporate': '企業・団体',
  'event': 'イベント',
  'personal': '個人・同人',
}

const statusLabels = {
  'active': '公開中',
  'draft': '下書き',
  'archived': 'アーカイブ',
}

const statusColors = {
  'active': 'bg-green-100 text-green-800',
  'draft': 'bg-yellow-100 text-yellow-800',
  'archived': 'bg-gray-100 text-gray-800',
}

export default function ViewPortfolioPage({ params }: ViewPortfolioPageProps) {
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
          <Button onClick={() => router.push('/portfolios')} variant="outline">
            Portfolio 一覧に戻る
          </Button>
        </div>
      </AdminLayout>
    )
  }

  if (!portfolio) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Portfolio が見つかりません
          </h3>
          <p className="text-gray-500 mb-6">
            指定された Portfolio は存在しないか、削除されています
          </p>
          <Button onClick={() => router.push('/portfolios')} variant="outline">
            Portfolio 一覧に戻る
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/portfolios">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                戻る
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {portfolio.title}
              </h1>
              <p className="text-gray-500">
                Portfolio 詳細 • {new Date(portfolio.created_at).toLocaleDateString('ja-JP')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColors[portfolio.status]}>
              {statusLabels[portfolio.status]}
            </Badge>
            <Link href={`/portfolios/${portfolio.id}/edit`}>
              <Button size="sm">
                <Edit className="mr-2 h-4 w-4" />
                編集
              </Button>
            </Link>
          </div>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              基本情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {portfolio.description && (
              <div>
                <p className="text-gray-700">{portfolio.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">カテゴリ</p>
                  <p className="font-medium">{categoryLabels[portfolio.category]}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">業界</p>
                  <p className="font-medium">{industryLabels[portfolio.industry]}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">製造数</p>
                  <p className="font-medium">{portfolio.quantity.toLocaleString()} 個</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">製造年</p>
                  <p className="font-medium">{portfolio.year} 年</p>
                </div>
              </div>
            </div>

            {(portfolio.client_name || portfolio.project_duration_days) && (
              <>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolio.client_name && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">クライアント</p>
                        <p className="font-medium">{portfolio.client_name}</p>
                      </div>
                    </div>
                  )}
                  
                  {portfolio.project_duration_days && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">プロジェクト期間</p>
                        <p className="font-medium">{portfolio.project_duration_days} 日</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Images */}
        {portfolio.main_image && (
          <Card>
            <CardHeader>
              <CardTitle>画像</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative">
                  <img
                    src={portfolio.main_image}
                    alt={portfolio.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-blue-500">
                    メイン画像
                  </Badge>
                </div>
                {portfolio.additional_images?.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`${portfolio.title} - ${index + 2}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Technical Details */}
        {(portfolio.materials || portfolio.special_features) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                技術詳細
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolio.materials && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">使用素材</h4>
                  <p className="text-gray-700">{portfolio.materials}</p>
                </div>
              )}
              
              {portfolio.special_features && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">特徴・セールスポイント</h4>
                  <p className="text-gray-700">{portfolio.special_features}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Project Story */}
        {(portfolio.challenges || portfolio.solutions) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                プロジェクトストーリー
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolio.challenges && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    課題・困難
                  </h4>
                  <p className="text-gray-700">{portfolio.challenges}</p>
                </div>
              )}
              
              {portfolio.solutions && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    解決策・工夫
                  </h4>
                  <p className="text-gray-700">{portfolio.solutions}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Client Feedback */}
        {portfolio.client_feedback && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                クライアントフィードバック
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 italic">&quot;{portfolio.client_feedback}&quot;</p>
            </CardContent>
          </Card>
        )}

        {/* Tags */}
        {portfolio.tags && portfolio.tags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>タグ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {portfolio.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}