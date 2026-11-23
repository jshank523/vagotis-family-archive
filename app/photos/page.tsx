import CategoryContributions from "../CategoryContributions";
import CategoryContent from "./CategoryContent";

export default function PhotosPage() {
  return <CategoryContent contributions={<CategoryContributions category="photos" />} />;
}
