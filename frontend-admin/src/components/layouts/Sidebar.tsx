'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Tag, 
  Users, 
  ShoppingCart,
  BarChart3,
  Settings,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Portfolios', href: '/portfolios', icon: Package },
  { name: 'Categories', href: '/categories', icon: Tags },
  { name: 'Tags', href: '/tags', icon: Tag },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Orders', href: '/orders', icon: ShoppingCart, disabled: true },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, disabled: true },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Ghoona</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        {item.disabled ? (
                          <div className={cn(
                            'text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-not-allowed',
                            'opacity-50'
                          )}>
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                            <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              準備中
                            </span>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className={cn(
                              isActive
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors'
                            )}
                          >
                            <item.icon 
                              className={cn(
                                isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700',
                                'h-6 w-6 shrink-0'
                              )} 
                              aria-hidden="true" 
                            />
                            {item.name}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={cn(
        'relative z-50 lg:hidden',
        isOpen ? 'fixed inset-0' : 'hidden'
      )}>
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 px-6 pb-4">
          {/* Close button */}
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Ghoona</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-md text-gray-300 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        {item.disabled ? (
                          <div className={cn(
                            'text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-not-allowed',
                            'opacity-50'
                          )}>
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                            <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              準備中
                            </span>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                              isActive
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors'
                            )}
                          >
                            <item.icon 
                              className={cn(
                                isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700',
                                'h-6 w-6 shrink-0'
                              )} 
                              aria-hidden="true" 
                            />
                            {item.name}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}