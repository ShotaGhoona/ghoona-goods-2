import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ghoona Admin
          </h1>
          <p className="text-gray-600">
            管理者専用ダッシュボードにサインイン
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <SignIn />
        </div>
      </div>
    </div>
  )
}