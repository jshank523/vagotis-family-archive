import CategoryContributions from "../CategoryContributions";
import CategoryContent from "./CategoryContent";

export default function DocumentsPage() {
  return <CategoryContent contributions={<CategoryContributions category="documents" />} />;
}
