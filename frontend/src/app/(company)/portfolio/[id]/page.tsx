import GalleryDetail from "@/feature/company/portfolio-detail";

interface GalleryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const { id } = await params;
  return <GalleryDetail id={id} />;
}