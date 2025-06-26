/**
 * 特定商取引法表記ページのデータ定義
 */

export interface LawSection {
  id: string
  title: string
  content: string[]
  tableData?: LawTableData[]
  contactInfo?: ContactInfo
}

export interface LawTableData {
  label: string
  value: string
  note?: string
}

export interface ContactInfo {
  phone: string
  email: string
  hours: string
  address: string
}

export const specialCommercialLawData: LawSection[] = [
  {
    id: "business-operator",
    title: "販売事業者",
    content: [
      "特定商取引法に基づく表記として、以下の事業者情報を公開いたします。"
    ],
    tableData: [
      {
        label: "事業者名",
        value: "株式会社グーナグッズ",
        note: "法人番号: 1234567890123"
      },
      {
        label: "代表者",
        value: "代表取締役 山田 太郎",
        note: ""
      },
      {
        label: "所在地",
        value: "〒123-4567 東京都○○区○○町1丁目2番3号",
        note: "本社・製造拠点"
      },
      {
        label: "設立年月日",
        value: "2020年4月1日",
        note: ""
      },
      {
        label: "資本金",
        value: "1,000万円",
        note: ""
      },
      {
        label: "従業員数",
        value: "15名（2024年6月現在）",
        note: "正社員・契約社員含む"
      },
      {
        label: "主要事業",
        value: "機構部品製造、グッズ製造・販売",
        note: "製造業許可取得済み"
      }
    ]
  },
  {
    id: "contact-information",
    title: "連絡先",
    content: [
      "お客様からのお問い合わせ、ご注文、苦情・相談については以下の連絡先までお願いいたします。"
    ],
    contactInfo: {
      phone: "03-1234-5678",
      email: "info@ghoona-goods.jp",
      hours: "平日 9:00-18:00（土日祝日除く）",
      address: "〒123-4567 東京都○○区○○町1丁目2番3号"
    },
    tableData: [
      {
        label: "電話番号",
        value: "03-1234-5678",
        note: "平日9:00-18:00受付"
      },
      {
        label: "FAX番号", 
        value: "03-1234-5679",
        note: "24時間受付"
      },
      {
        label: "メールアドレス",
        value: "info@ghoona-goods.jp",
        note: "24時間受付（回答は営業時間内）"
      },
      {
        label: "受付時間",
        value: "平日 9:00-18:00",
        note: "土日祝日、年末年始を除く"
      },
      {
        label: "担当部署",
        value: "カスタマーサポート部",
        note: "専門スタッフが対応"
      }
    ]
  },
  {
    id: "product-service",
    title: "販売商品・サービス",
    content: [
      "当社では以下の商品・サービスを提供しております。すべて自社工場での製造により、高品質を保証いたします。"
    ],
    tableData: [
      {
        label: "缶バッジ",
        value: "オリジナル・標準タイプ",
        note: "サイズ：25mm〜100mm"
      },
      {
        label: "アクリルスタンド",
        value: "フルカラー印刷対応",
        note: "厚さ：3mm〜10mm"
      },
      {
        label: "アクリルキーホルダー",
        value: "両面・片面印刷対応",
        note: "各種金具オプション有"
      },
      {
        label: "デザインサービス",
        value: "デザイン制作・修正",
        note: "専門デザイナーが対応"
      },
      {
        label: "データ入稿サポート",
        value: "技術サポート・相談",
        note: "製造に適したデータ作成支援"
      },
      {
        label: "品質保証",
        value: "製造品質保証・アフターサービス",
        note: "初期不良は無償交換"
      }
    ]
  },
  {
    id: "pricing",
    title: "販売価格",
    content: [
      "商品価格については、仕様・数量・オプション等により個別に設定されます。価格には以下が含まれます。"
    ],
    tableData: [
      {
        label: "基本価格",
        value: "製造費・材料費・基本加工費",
        note: "数量により単価変動"
      },
      {
        label: "デザイン費",
        value: "新規デザイン制作費",
        note: "修正3回まで無料"
      },
      {
        label: "版代・型代",
        value: "初回製造時の型・版作成費",
        note: "リピート時は不要"
      },
      {
        label: "オプション加工費",
        value: "特殊加工・表面処理等",
        note: "内容により個別見積"
      },
      {
        label: "送料",
        value: "配送地域・重量により算出",
        note: "一定額以上で送料無料"
      },
      {
        label: "消費税",
        value: "10%（軽減税率対象外）",
        note: "価格は税込表示"
      }
    ]
  },
  {
    id: "payment",
    title: "支払方法・時期",
    content: [
      "お支払いについては、お客様の利便性を考慮し、複数の方法をご用意しております。"
    ],
    tableData: [
      {
        label: "クレジットカード",
        value: "VISA、MasterCard、JCB、AMEX",
        note: "決済完了後製造開始"
      },
      {
        label: "銀行振込",
        value: "前払い（法人・個人）",
        note: "振込手数料お客様負担"
      },
      {
        label: "代金引換",
        value: "商品受取時現金支払い",
        note: "代引手数料別途"
      },
      {
        label: "掛売り",
        value: "月末締め翌月末払い",
        note: "法人のみ・与信審査有"
      },
      {
        label: "支払期限",
        value: "請求書発行から30日以内",
        note: "延滞時は年14.6%の遅延損害金"
      }
    ]
  },
  {
    id: "delivery",
    title: "商品引渡し時期・方法",
    content: [
      "商品の製造・お届けについて、以下のスケジュールで実施いたします。"
    ],
    tableData: [
      {
        label: "製造期間",
        value: "入金確認後7-14営業日",
        note: "商品・数量により変動"
      },
      {
        label: "特急対応",
        value: "最短3営業日",
        note: "特急料金30%加算"
      },
      {
        label: "配送方法",
        value: "ヤマト運輸・佐川急便",
        note: "追跡番号付き"
      },
      {
        label: "配送地域",
        value: "全国対応",
        note: "離島等は要相談"
      },
      {
        label: "梱包",
        value: "緩衝材使用・丁寧梱包",
        note: "破損防止を徹底"
      },
      {
        label: "納期保証",
        value: "指定納期の遵守",
        note: "遅延時は事前連絡"
      }
    ]
  },
  {
    id: "returns",
    title: "返品・交換",
    content: [
      "お客様に安心してご利用いただくため、返品・交換について以下の条件を設定しております。"
    ],
    tableData: [
      {
        label: "返品期間",
        value: "商品受領後7日以内",
        note: "お客様都合の場合"
      },
      {
        label: "返品条件",
        value: "未使用・未開封・元梱包",
        note: "オーダーメイド品は対象外"
      },
      {
        label: "返品送料",
        value: "お客様負担",
        note: "当社都合の場合は当社負担"
      },
      {
        label: "初期不良",
        value: "無償交換・返金対応",
        note: "検品後速やかに対応"
      },
      {
        label: "製造ミス",
        value: "無償再製造",
        note: "当社責任による場合"
      },
      {
        label: "キャンセル",
        value: "製造開始前まで可能",
        note: "データ制作後は制作費請求"
      }
    ]
  },
  {
    id: "additional-costs",
    title: "代金以外の必要料金",
    content: [
      "商品代金以外に発生する可能性がある費用について、事前にご案内いたします。"
    ],
    tableData: [
      {
        label: "送料",
        value: "全国一律800円〜",
        note: "重量・サイズにより変動"
      },
      {
        label: "代引手数料",
        value: "330円〜",
        note: "代金引換選択時"
      },
      {
        label: "振込手数料",
        value: "各銀行の定める金額",
        note: "お客様負担"
      },
      {
        label: "特急料金",
        value: "商品代金の30%",
        note: "特急製造希望時"
      },
      {
        label: "再製造費",
        value: "初回価格の50%〜",
        note: "お客様都合による再製造"
      },
      {
        label: "データ修正費",
        value: "1回につき3,000円〜",
        note: "4回目以降の修正"
      }
    ]
  },
  {
    id: "complaints",
    title: "苦情・相談窓口",
    content: [
      "商品・サービスに関するご不明点、苦情、相談については以下の窓口で承ります。お客様のお声を真摯に受け止め、サービス向上に努めます。"
    ],
    tableData: [
      {
        label: "苦情受付",
        value: "カスタマーサポート部",
        note: "専任担当者が対応"
      },
      {
        label: "受付方法",
        value: "電話・メール・FAX",
        note: "お客様のご都合に合わせて"
      },
      {
        label: "受付時間",
        value: "平日9:00-18:00",
        note: "緊急時は24時間対応"
      },
      {
        label: "回答期限",
        value: "3営業日以内",
        note: "複雑な案件は別途協議"
      },
      {
        label: "解決方針",
        value: "お客様満足最優先",
        note: "誠実・迅速な対応"
      },
      {
        label: "記録保管",
        value: "3年間保管",
        note: "改善活動に活用"
      }
    ]
  }
]

export const companyDetails = {
  name: "株式会社グーナグッズ",
  representative: "代表取締役 山田 太郎",
  address: "〒123-4567 東京都○○区○○町1丁目2番3号",
  phone: "03-1234-5678",
  fax: "03-1234-5679",
  email: "info@ghoona-goods.jp",
  established: "2020年4月1日",
  capital: "1,000万円",
  employees: "15名",
  businessHours: "平日 9:00-18:00（土日祝日除く）",
  businessLicense: "製造業許可 第○○号",
  corporateNumber: "1234567890123"
}

export const lastUpdated = "2024年6月26日"