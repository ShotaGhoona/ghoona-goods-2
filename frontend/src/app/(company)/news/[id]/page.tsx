import NewsDetail from "@/feature/company/news-detail";

interface NewsDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  return <NewsDetail newsId={id} />;
}