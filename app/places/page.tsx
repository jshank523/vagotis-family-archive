import CategoryContributions from "../CategoryContributions";
import CategoryContent from "./CategoryContent";

export default function PlacesPage() {
  return <CategoryContent contributions={<CategoryContributions category="places" />} />;
}
