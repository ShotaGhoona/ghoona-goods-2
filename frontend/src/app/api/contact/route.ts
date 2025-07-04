import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    // 環境変数チェック
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_test_key_please_replace_with_real_key') {
      console.error('RESEND_API_KEY is not set or is using test value')
      return NextResponse.json(
        { 
          error: 'メール送信機能の設定が完了していません。管理者にお問い合わせください。',
          debug: 'RESEND_API_KEY is not configured'
        },
        { status: 500 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await request.json()
    const { name, company, email, phone, category, message } = body

    // 必須フィールドのバリデーション
    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { error: '必須フィールドが入力されていません' },
        { status: 400 }
      )
    }

    // メールアドレスの簡単なバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      )
    }

    // カテゴリの表示名を取得
    const categoryNames: { [key: string]: string } = {
      'can-badge': '缶バッジ',
      'acrylic': 'アクリルグッズ',
      'peripheral': '周辺グッズ',
      'other': 'その他'
    }

    const categoryDisplay = category ? categoryNames[category] || category : '未選択'

    // Resendでメール送信（開発環境用の認証済みドメインを使用）
    const { data, error } = await resend.emails.send({
      from: 'ZIGZAGLab お問い合わせ <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'shota.yamashita@ghoona.com'],
      subject: `【ZIGZAGLab】新しいお問い合わせ - ${name}様`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>お問い合わせ</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              新しいお問い合わせが届きました
            </h2>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">お客様情報</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">お名前:</td>
                  <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">会社名:</td>
                  <td style="padding: 8px 0;">${company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">メールアドレス:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">電話番号:</td>
                  <td style="padding: 8px 0;">${phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">商品カテゴリ:</td>
                  <td style="padding: 8px 0;">${categoryDisplay}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #374151;">お問い合わせ内容</h3>
              <div style="white-space: pre-wrap; line-height: 1.6;">
${message}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #dbeafe; border-radius: 8px; font-size: 14px;">
              <p style="margin: 0;">
                <strong>送信日時:</strong> ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
              </p>
              <p style="margin: 5px 0 0 0;">
                このメールはZIGZAGLabのお問い合わせフォームから自動送信されています。
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'メール送信に失敗しました' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'お問い合わせを受け付けました。ご返信まで今しばらくお待ちください。',
      id: data?.id 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}