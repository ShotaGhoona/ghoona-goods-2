import NewsDetail from "@/feature/company/news-detail";

interface NewsDetailPageProps {
  params: {
    id: string;
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  return <NewsDetail newsId={params.id} />;
}