import CategoryContributions from "../CategoryContributions";
import CategoryContent from "./CategoryContent";

export default function FamilyTreePage() {
  return <CategoryContent contributions={<CategoryContributions category="family-tree" />} />;
}
