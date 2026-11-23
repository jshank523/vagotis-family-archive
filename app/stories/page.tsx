import CategoryContributions from "../CategoryContributions";
import CategoryContent from "./CategoryContent";

export default function StoriesPage() {
  return <CategoryContent contributions={<CategoryContributions category="stories" />} />;
}
