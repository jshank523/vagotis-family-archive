import CategoryContributions from "../CategoryContributions";
import CategoryContent from "./CategoryContent";

export default function RecipesPage() {
  return <CategoryContent contributions={<CategoryContributions category="recipes" />} />;
}
