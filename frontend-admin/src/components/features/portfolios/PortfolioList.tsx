'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Edit, 
  Eye, 
  Trash2, 
  Copy, 
  MoreHorizontal,
  Package,
  Calendar,
  Hash,
  TrendingUp
} from 'lucide-react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { usePortfolios, usePortfolioMutations } from '@/hooks/usePortfolios'
import { Portfolio } from '@/types/portfolios'

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

interface PortfolioListProps {
  onEdit?: (portfolio: Portfolio) => void
  onView?: (portfolio: Portfolio) => void
  onDelete?: (portfolio: Portfolio) => void
}

export function PortfolioList({ onEdit, onView, onDelete }: PortfolioListProps) {
  const { portfolios, loading, error, refresh } = usePortfolios()
  const { deletePortfolio, updatePortfolioStatus, duplicatePortfolio } = usePortfolioMutations()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(portfolios.map(p => p.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id))
    }
  }

  const handleDelete = async (portfolio: Portfolio) => {
    if (!confirm(`「${portfolio.title}」を削除しますか？`)) return
    
    setActionLoading(portfolio.id)
    const success = await deletePortfolio(portfolio.id)
    setActionLoading(null)
    
    if (success) {
      refresh()
      onDelete?.(portfolio)
    }
  }

  const handleStatusChange = async (portfolio: Portfolio, status: Portfolio['status']) => {
    setActionLoading(portfolio.id)
    const success = await updatePortfolioStatus(portfolio.id, status)
    setActionLoading(null)
    
    if (success) {
      refresh()
    }
  }

  const handleDuplicate = async (portfolio: Portfolio) => {
    setActionLoading(portfolio.id)
    const success = await duplicatePortfolio(portfolio.id)
    setActionLoading(null)
    
    if (success) {
      refresh()
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          データの読み込みに失敗しました
        </h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <Button onClick={refresh} variant="outline">
          再試行
        </Button>
      </div>
    )
  }

  if (portfolios.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Portfolio がありません
        </h3>
        <p className="text-gray-500 mb-6">
          新しい製造実績を作成して始めましょう
        </p>
        <Link href="/portfolios/create">
          <Button>
            Portfolio を作成
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Bulk actions */}
      {selectedItems.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
          <span className="text-blue-800">
            {selectedItems.length} 件選択中
          </span>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              一括編集
            </Button>
            <Button variant="outline" size="sm">
              一括削除
            </Button>
          </div>
        </div>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedItems.length === portfolios.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>タイトル</TableHead>
              <TableHead>カテゴリ</TableHead>
              <TableHead>業界</TableHead>
              <TableHead>製造数</TableHead>
              <TableHead>年度</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>作成日</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolios.map((portfolio) => (
              <TableRow key={portfolio.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(portfolio.id)}
                    onCheckedChange={(checked) => 
                      handleSelectItem(portfolio.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{portfolio.title}</div>
                    {portfolio.description && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {portfolio.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {categoryLabels[portfolio.category]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {industryLabels[portfolio.industry]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Hash className="h-3 w-3 text-gray-400" />
                    {portfolio.quantity.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    {portfolio.year}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[portfolio.status]}>
                    {statusLabels[portfolio.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(portfolio.created_at).toLocaleDateString('ja-JP')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        disabled={actionLoading === portfolio.id}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView?.(portfolio)}>
                        <Eye className="mr-2 h-4 w-4" />
                        詳細表示
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(portfolio)}>
                        <Edit className="mr-2 h-4 w-4" />
                        編集
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(portfolio)}>
                        <Copy className="mr-2 h-4 w-4" />
                        複製
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {portfolio.status !== 'active' && (
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(portfolio, 'active')}
                        >
                          <TrendingUp className="mr-2 h-4 w-4" />
                          公開
                        </DropdownMenuItem>
                      )}
                      {portfolio.status !== 'draft' && (
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(portfolio, 'draft')}
                        >
                          下書きに変更
                        </DropdownMenuItem>
                      )}
                      {portfolio.status !== 'archived' && (
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(portfolio, 'archived')}
                        >
                          アーカイブ
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(portfolio)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        削除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}