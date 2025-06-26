import GalleryDetail from "@/feature/company/portfolio-detail";

export default function GalleryDetailPage({ params }: { params: { id: string } }) {
  return <GalleryDetail id={params.id} />;
}