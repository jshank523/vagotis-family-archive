"use client";

import { useState } from "react";
const categories = [
  "All",
  "Appetizers",
  "Salads",
  "Entrees",
  "Desserts",
  "Greek Recipes",
  "Family Favorites",
];

const appetizerRecipes = [
  {
    id: 1,
    title: "Keftedes",
    category: "Appetizers",
    person: "Esther Vagotis",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Traditional Greek meatballs served as a family favorite appetizer for holidays and gatherings.",
    ingredients: [
      "2 lbs ground beef",
      "2 slices bread, soaked and squeezed dry",
      "2 eggs",
      "1 onion, finely chopped",
      "2 cloves garlic, minced",
      "1/4 cup parsley, chopped",
      "Salt and pepper",
      "Olive oil for frying",
    ],
    instructions: [
      "Combine beef, bread, eggs, onion, garlic, parsley, salt, and pepper.",
      "Mix thoroughly until evenly combined.",
      "Shape into small meatballs.",
      "Heat olive oil in a skillet.",
      "Fry until browned and cooked through.",
      "Serve warm.",
    ],
  },

  {
    id: 2,
    title: "Tzatziki",
    category: "Appetizers",
    person: "Esther Vagotis",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Classic Greek cucumber and garlic dip served with bread, meats, and vegetables.",
    ingredients: [
      "2 cucumbers",
      "2 cloves garlic, crushed",
      "1 tsp salt",
      "2 tbsp lemon juice",
      "2 cups Greek yogurt or sour cream",
      "1 tbsp olive oil",
    ],
    instructions: [
      "Peel, seed, and finely chop cucumbers.",
      "Drain excess moisture.",
      "Mix cucumbers with garlic, salt, lemon juice, and olive oil.",
      "Fold into yogurt or sour cream.",
      "Chill before serving.",
    ],
  },

  {
    id: 3,
    title: "Spanakopita Triangles",
    category: "Appetizers",
    person: "Family Recipe",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Flaky phyllo triangles filled with spinach and feta cheese.",
    ingredients: [
      "1 package phyllo dough",
      "2 boxes frozen spinach, thawed",
      "1 onion, chopped",
      "8 oz feta cheese",
      "2 eggs",
      "1/4 cup parsley",
      "Butter for brushing",
    ],
    instructions: [
      "Cook onion and spinach until softened.",
      "Mix with feta, eggs, and parsley.",
      "Layer phyllo sheets with butter.",
      "Cut into strips and add filling.",
      "Fold into triangles.",
      "Bake at 350°F until golden brown.",
    ],
  },

  {
    id: 4,
    title: "Stuffed Grape Leaves",
    category: "Appetizers",
    person: "Esther Vagotis",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Traditional dolmades filled with seasoned rice and herbs.",
    ingredients: [
      "1 jar grape leaves",
      "1 cup rice",
      "1 onion, finely chopped",
      "Parsley",
      "Dill",
      "Mint",
      "Olive oil",
      "Lemon juice",
      "Salt and pepper",
    ],
    instructions: [
      "Prepare rice mixture with herbs and onion.",
      "Rinse grape leaves.",
      "Place filling in each leaf and roll tightly.",
      "Layer in pot.",
      "Cover with olive oil, lemon juice, and water.",
      "Simmer until tender.",
    ],
  },

  {
    id: 5,
    title: "Tiropita",
    category: "Appetizers",
    person: "Family Recipe",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Greek cheese pie made with flaky phyllo and rich feta filling.",
    ingredients: [
      "1 package phyllo dough",
      "1 lb feta cheese",
      "2 eggs",
      "1/2 cup ricotta cheese",
      "Butter for brushing",
    ],
    instructions: [
      "Mix feta, ricotta, and eggs.",
      "Layer phyllo sheets with butter.",
      "Add cheese filling.",
      "Top with remaining phyllo.",
      "Bake at 350°F until golden.",
      "Cool slightly before serving.",
    ],
  },
];
const saladRecipes = [
  {
    id: 6,
    title: "Greek Village Salad",
    category: "Salads",
    person: "Esther Vagotis",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Traditional horiatiki salad with tomatoes, cucumbers, feta, olives, and olive oil.",
    ingredients: [
      "4 tomatoes, chopped",
      "1 cucumber, sliced",
      "1 green pepper, sliced",
      "1 red onion, thinly sliced",
      "1 cup Kalamata olives",
      "8 oz feta cheese",
      "1/4 cup olive oil",
      "2 tbsp red wine vinegar",
      "Oregano",
      "Salt and pepper",
    ],
    instructions: [
      "Combine tomatoes, cucumber, pepper, onion, and olives in a large bowl.",
      "Top with feta cheese.",
      "Drizzle with olive oil and vinegar.",
      "Season with oregano, salt, and pepper.",
      "Serve fresh.",
    ],
  },

  {
    id: 7,
    title: "Potato Salad",
    category: "Salads",
    person: "Family Favorite",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Classic creamy potato salad served at family gatherings and holidays.",
    ingredients: [
      "6 potatoes, boiled and cubed",
      "4 hard-boiled eggs, chopped",
      "1/2 cup celery, chopped",
      "1/2 cup onion, chopped",
      "1 cup mayonnaise",
      "2 tbsp mustard",
      "Salt and pepper",
      "Paprika",
    ],
    instructions: [
      "Boil potatoes until tender and cool completely.",
      "Combine potatoes, eggs, celery, and onion.",
      "Mix mayonnaise, mustard, salt, and pepper separately.",
      "Fold dressing into potato mixture.",
      "Top with paprika and chill before serving.",
    ],
  },

  {
    id: 8,
    title: "Macaroni Salad",
    category: "Salads",
    person: "Family Favorite",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Creamy macaroni salad often served at summer cookouts and family reunions.",
    ingredients: [
      "2 cups elbow macaroni",
      "1/2 cup celery, chopped",
      "1/2 cup onion, chopped",
      "1/2 cup carrots, shredded",
      "1 cup mayonnaise",
      "2 tbsp vinegar",
      "1 tbsp sugar",
      "Salt and pepper",
    ],
    instructions: [
      "Cook macaroni and cool completely.",
      "Combine macaroni with celery, onion, and carrots.",
      "Mix mayonnaise, vinegar, sugar, salt, and pepper.",
      "Stir dressing into salad.",
      "Refrigerate before serving.",
    ],
  },

  {
    id: 9,
    title: "Cucumber Salad",
    category: "Salads",
    person: "Esther Vagotis",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Simple refreshing cucumber salad with vinegar dressing.",
    ingredients: [
      "3 cucumbers, thinly sliced",
      "1 onion, thinly sliced",
      "1/4 cup vinegar",
      "2 tbsp olive oil",
      "1 tbsp sugar",
      "Salt and pepper",
      "Fresh dill",
    ],
    instructions: [
      "Slice cucumbers and onions thinly.",
      "Mix vinegar, olive oil, sugar, salt, and pepper.",
      "Pour over vegetables.",
      "Add fresh dill.",
      "Chill before serving.",
    ],
  },

  {
    id: 10,
    title: "Three Bean Salad",
    category: "Salads",
    person: "Family Recipe",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Sweet and tangy bean salad perfect for large family gatherings.",
    ingredients: [
      "1 can green beans",
      "1 can wax beans",
      "1 can kidney beans",
      "1 onion, thinly sliced",
      "1/2 cup vinegar",
      "1/3 cup sugar",
      "1/4 cup olive oil",
      "Salt and pepper",
    ],
    instructions: [
      "Drain all beans well.",
      "Combine beans and sliced onion.",
      "Mix vinegar, sugar, olive oil, salt, and pepper.",
      "Pour dressing over beans.",
      "Refrigerate overnight for best flavor.",
    ],
  },
];
const entreeRecipes = [
  {
    id: 11,
    title: "Pastitsio",
    category: "Entrees",
    person: "Esther Vagotis",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Traditional Greek baked pasta layered with seasoned meat sauce and creamy béchamel.",
    ingredients: [
      "1 lb pasta (ziti or bucatini)",
      "2 lbs ground beef",
      "1 onion, chopped",
      "2 cloves garlic",
      "1 can tomato sauce",
      "1/2 cup red wine",
      "Cinnamon",
      "Salt and pepper",
      "Butter",
      "Flour",
      "Milk",
      "Eggs",
      "Parmesan cheese",
    ],
    instructions: [
      "Cook pasta and set aside.",
      "Brown beef with onion and garlic.",
      "Add tomato sauce, wine, cinnamon, salt, and pepper.",
      "Simmer meat sauce until thickened.",
      "Prepare béchamel with butter, flour, milk, eggs, and cheese.",
      "Layer pasta, meat sauce, and béchamel in baking dish.",
      "Bake at 350°F until golden brown.",
    ],
  },

  {
    id: 12,
    title: "Moussaka",
    category: "Entrees",
    person: "Esther Vagotis",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Classic layered eggplant casserole with meat sauce and creamy topping.",
    ingredients: [
      "2 eggplants, sliced",
      "2 lbs ground beef or lamb",
      "1 onion, chopped",
      "Tomato sauce",
      "Cinnamon",
      "Salt and pepper",
      "Butter",
      "Flour",
      "Milk",
      "Eggs",
      "Parmesan cheese",
    ],
    instructions: [
      "Slice and lightly fry eggplant.",
      "Cook beef with onion and seasonings.",
      "Add tomato sauce and simmer.",
      "Prepare béchamel sauce.",
      "Layer eggplant, meat sauce, and béchamel.",
      "Bake at 350°F until golden and bubbling.",
    ],
  },

  {
    id: 13,
    title: "Stuffed Peppers",
    category: "Entrees",
    person: "Family Favorite",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Bell peppers filled with seasoned meat and rice, baked until tender.",
    ingredients: [
      "6 bell peppers",
      "1 lb ground beef",
      "1 cup cooked rice",
      "1 onion, chopped",
      "Tomato sauce",
      "Salt and pepper",
      "Garlic",
      "Parsley",
    ],
    instructions: [
      "Cut tops off peppers and remove seeds.",
      "Cook beef, onion, garlic, and seasonings.",
      "Mix with rice and tomato sauce.",
      "Stuff peppers with filling.",
      "Place in baking dish with extra sauce.",
      "Bake at 350°F until peppers are tender.",
    ],
  },

  {
    id: 14,
    title: "Roast Lamb with Potatoes",
    category: "Entrees",
    person: "Holiday Favorite",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Traditional Greek holiday lamb roasted with lemon potatoes.",
    ingredients: [
      "Leg of lamb",
      "6 potatoes, quartered",
      "Olive oil",
      "Lemon juice",
      "Garlic",
      "Oregano",
      "Salt and pepper",
      "Chicken broth",
    ],
    instructions: [
      "Season lamb with olive oil, garlic, oregano, salt, and pepper.",
      "Arrange potatoes around lamb.",
      "Add lemon juice and broth.",
      "Roast at 375°F until lamb is tender and potatoes are golden.",
      "Baste occasionally while roasting.",
    ],
  },

  {
    id: 15,
    title: "Chicken Lemon Rice Soup (Avgolemono)",
    category: "Entrees",
    person: "Esther Vagotis",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Classic Greek comfort soup with chicken, rice, lemon, and egg.",
    ingredients: [
      "1 whole chicken or chicken breasts",
      "8 cups chicken broth",
      "1 cup rice",
      "3 eggs",
      "2 lemons, juiced",
      "Salt and pepper",
    ],
    instructions: [
      "Cook chicken and reserve broth.",
      "Shred cooked chicken.",
      "Cook rice in broth until tender.",
      "Whisk eggs and lemon juice together.",
      "Slowly temper egg mixture with hot broth.",
      "Return mixture to soup without boiling.",
      "Add chicken and serve warm.",
    ],
  },
];
const dessertRecipes = [
  {
    id: 16,
    title: "Baklava",
    category: "Desserts",
    person: "Esther Vagotis",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Classic Greek pastry made with layers of phyllo, walnuts, cinnamon, and sweet honey syrup.",
    ingredients: [
      "1 package phyllo dough",
      "4 cups chopped walnuts",
      "1 cup sugar",
      "2 tsp cinnamon",
      "1 lb butter, melted",
      "1 cup honey",
      "1 cup water",
      "1 cup sugar",
      "1 lemon slice",
      "1 cinnamon stick",
    ],
    instructions: [
      "Mix walnuts, sugar, and cinnamon.",
      "Layer phyllo sheets in buttered pan, brushing each with butter.",
      "Add walnut mixture between layers.",
      "Top with remaining phyllo layers.",
      "Cut before baking.",
      "Bake at 350°F until golden brown.",
      "Boil honey syrup ingredients and pour over hot baklava.",
      "Cool completely before serving.",
    ],
  },

  {
    id: 17,
    title: "Koulourakia",
    category: "Desserts",
    person: "Esther Vagotis",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Traditional Greek butter cookies often made for Easter and family celebrations.",
    ingredients: [
      "1 lb butter",
      "2 cups sugar",
      "4 eggs",
      "1/2 cup milk",
      "1 tsp vanilla",
      "Baking powder",
      "Flour",
      "Egg wash for brushing",
    ],
    instructions: [
      "Cream butter and sugar together.",
      "Add eggs, milk, and vanilla.",
      "Mix in baking powder and enough flour to form soft dough.",
      "Shape into twisted cookies.",
      "Brush with egg wash.",
      "Bake at 350°F until lightly golden.",
    ],
  },

  {
    id: 18,
    title: "Galaktoboureko",
    category: "Desserts",
    person: "Family Favorite",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Custard-filled phyllo dessert topped with sweet citrus syrup.",
    ingredients: [
      "1 package phyllo dough",
      "1 cup semolina",
      "4 cups milk",
      "1 cup sugar",
      "4 eggs",
      "1 tsp vanilla",
      "Butter, melted",
      "Sugar syrup ingredients",
    ],
    instructions: [
      "Prepare custard with milk, semolina, sugar, eggs, and vanilla.",
      "Layer buttered phyllo sheets in baking pan.",
      "Pour in custard filling.",
      "Top with remaining phyllo layers.",
      "Bake until golden brown.",
      "Pour cooled syrup over hot pastry.",
      "Let set before serving.",
    ],
  },

  {
    id: 19,
    title: "Rice Pudding",
    category: "Desserts",
    person: "Family Recipe",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Creamy homemade rice pudding served warm or chilled with cinnamon.",
    ingredients: [
      "1 cup rice",
      "4 cups milk",
      "1/2 cup sugar",
      "2 eggs",
      "1 tsp vanilla",
      "Cinnamon",
    ],
    instructions: [
      "Cook rice until tender.",
      "Add milk and sugar and simmer gently.",
      "Whisk eggs separately.",
      "Temper eggs with warm milk mixture.",
      "Return to pot and stir until thickened.",
      "Add vanilla and top with cinnamon.",
    ],
  },

  {
    id: 20,
    title: "Sweet Bread (Tsoureki)",
    category: "Desserts",
    person: "Esther Vagotis",
    source: "Original Family Cookbook",
    scan: "/recipes/vagotis-family-recipes.pdf",
    description:
      "Traditional braided Greek sweet bread made for Easter and special holidays.",
    ingredients: [
      "1 cup warm milk",
      "1/2 cup butter",
      "4 eggs",
      "1 cup sugar",
      "2 packets yeast",
      "Flour",
      "Orange zest",
      "Mahleb or anise",
      "Egg wash",
    ],
    instructions: [
      "Dissolve yeast in warm milk.",
      "Mix with butter, eggs, sugar, and flavorings.",
      "Add enough flour to form soft dough.",
      "Let rise until doubled.",
      "Braid dough into loaves.",
      "Brush with egg wash.",
      "Bake at 350°F until golden brown.",
    ],
  },
  {
  id: 21,
  title: "Loukoumades",
  category: "Desserts",
  person: "Esther Vagotis",
  source: "Original Family Cookbook",
  scan: "/recipes/recipebook.pdf",
  description:
    "Traditional Greek honey puffs—crispy fried dough balls drizzled with honey and cinnamon. A favorite holiday and celebration dessert.",
  ingredients: [
    "2 cups flour",
    "1 package yeast",
    "1 1/2 cups warm water",
    "1 tbsp sugar",
    "1/2 tsp salt",
    "Oil for frying",
    "Honey",
    "Cinnamon",
    "Chopped walnuts (optional)",
  ],
  instructions: [
    "Dissolve yeast and sugar in warm water.",
    "Add flour and salt, mixing into a soft batter.",
    "Cover and let rise until doubled in size.",
    "Heat oil in deep pan.",
    "Drop small spoonfuls of batter into hot oil.",
    "Fry until golden brown on all sides.",
    "Drain on paper towels.",
    "Drizzle generously with warm honey.",
    "Top with cinnamon and chopped walnuts if desired.",
  ],
},

{
  id: 22,
  title: "Galopeta",
  category: "Desserts",
  person: "Family Recipe",
  source: "Original Family Cookbook",
  scan: "/recipes/recipebook.pdf",
  description:
    "A traditional baked Greek custard-style dessert with rich milk, eggs, and warm spice flavors passed down through generations.",
  ingredients: [
    "4 cups milk",
    "1 cup sugar",
    "4 eggs",
    "1/2 cup flour",
    "1 tsp vanilla",
    "1/2 cup butter, melted",
    "Cinnamon",
  ],
  instructions: [
    "Warm milk gently in a saucepan.",
    "Whisk eggs and sugar together.",
    "Add flour and vanilla.",
    "Slowly mix warm milk into egg mixture.",
    "Stir in melted butter.",
    "Pour into greased baking dish.",
    "Bake at 350°F until set and lightly golden.",
    "Cool slightly and sprinkle with cinnamon before serving.",
  ],
},

{
  id: 23,
  title: "Yogurt Cake",
  category: "Desserts",
  person: "Family Favorite",
  source: "Original Family Cookbook",
  scan: "/recipes/recipebook.pdf",
  description:
    "A soft, moist family yogurt cake with light citrus flavor—simple, classic, and often served with coffee.",
  ingredients: [
    "2 cups flour",
    "1 cup sugar",
    "1 cup plain yogurt",
    "3 eggs",
    "1/2 cup vegetable oil",
    "1 tsp vanilla",
    "1 tsp baking powder",
    "1 lemon zest",
  ],
  instructions: [
    "Beat eggs and sugar until fluffy.",
    "Add yogurt, oil, vanilla, and lemon zest.",
    "Mix in flour and baking powder.",
    "Pour into greased cake pan.",
    "Bake at 350°F until golden and set.",
    "Cool before slicing and serving.",
  ],
},
];
const recipes = [
  ...appetizerRecipes,
  ...saladRecipes,
  ...entreeRecipes,
  ...dessertRecipes,
];

export default function RecipesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((recipe) => {
    const search = searchTerm.toLowerCase();

    return (
      recipe.title.toLowerCase().includes(search) ||
      recipe.category.toLowerCase().includes(search) ||
      recipe.person.toLowerCase().includes(search) ||
      recipe.description.toLowerCase().includes(search) ||
      recipe.ingredients.join(" ").toLowerCase().includes(search)
    );
  });

  return (
    <main className="min-h-screen bg-[#f7f2ea] px-6 py-12 text-stone-950">
      <section className="mx-auto max-w-7xl">
        <nav className="mb-12 flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-6 py-4 shadow-sm backdrop-blur">
          <a href="/" className="text-lg font-bold">
            Vagotis Family Archive
          </a>

          <div className="hidden gap-6 text-sm font-medium text-stone-700 md:flex">
              <a href="/family-tree" className="hover:text-stone-950">Tree</a>
              <a href="/stories" className="hover:text-stone-950">Stories</a>
              <a href="/recipes" className="hover:text-stone-950">Recipes</a>
              <a href="/photos" className="hover:text-stone-950">Photos</a>
              <a href="/places" className="hover:text-stone-950">Places</a>
              <a href="/documents" className="hover:text-stone-950">Documents</a>
            </div>

        </nav>

        <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-amber-700">
          Family Recipes
        </p>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              Recipes & Traditions
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-9 text-stone-700">
              Food carries memories too. Preserve favorite meals, holiday
              dishes, desserts, and recipes passed down through generations.
            </p>
          </div>

          <div className="rounded-[2rem] bg-stone-950 p-7 text-white shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              Kitchen memories
            </p>
            <p className="mt-3 leading-7 text-stone-300">
              Add family dinners, holiday recipes, handwritten recipe cards,
              desserts, and the meals everyone remembers.
            </p>
            
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur">
          <input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search recipes by name, person, ingredient, or tradition..."
  className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none focus:border-amber-500 md:flex-1"
/>
<a
  href="/recipes/recipebook.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-2xl bg-stone-950 px-7 py-4 font-semibold text-white shadow hover:bg-stone-700"
>
  View Original Scanned Cookbook
</a>
          <a
          
            href="/submit"
            className="rounded-2xl bg-stone-950 px-7 py-4 font-semibold text-white shadow hover:bg-stone-700"
          >
            Add a Recipe
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-40 items-center justify-center bg-stone-900 text-5xl">
                🍽️
              </div>

              <div className="p-7">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                  {recipe.category}
                </p>

                <h2 className="mt-4 text-2xl font-black">{recipe.title}</h2>

                <p className="mt-3 text-sm font-medium text-stone-500">
                  From: {recipe.person}
                </p>

                

                <p className="mt-5 leading-7 text-stone-700">
                  {recipe.description}
                </p>

                <button
  onClick={() => setSelectedRecipe(recipe)}
  className="mt-7 rounded-2xl border border-stone-300 px-5 py-3 text-sm font-semibold transition group-hover:border-stone-950 group-hover:bg-stone-950 group-hover:text-white"
>
  View Recipe →
</button>
              </div>
            </article>
          ))}
        </div>
      </section>
      {selectedRecipe && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
            {selectedRecipe.category}
          </p>

          <h2 className="mt-2 text-4xl font-black">
            {selectedRecipe.title}
          </h2>

          <p className="mt-2 text-stone-500">
            From: {selectedRecipe.person}
          </p>
        </div>

        <button
          onClick={() => setSelectedRecipe(null)}
          className="rounded-xl border px-4 py-2 font-semibold"
        >
          Close
        </button>
      </div>

      <p className="mt-6 leading-8 text-stone-700">
        {selectedRecipe.description}
      </p>

      <div className="mt-8">
        <h3 className="text-2xl font-bold">Ingredients</h3>

        <ul className="mt-4 space-y-2 text-stone-700">
          {selectedRecipe.ingredients.map((item: string, i: number) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold">Instructions</h3>

        <ol className="mt-4 space-y-4 text-stone-700">
          {selectedRecipe.instructions.map((step: string, i: number) => (
            <li key={i}>
              <span className="font-bold">{i + 1}.</span> {step}
            </li>
          ))}
        </ol>
      </div>

      <a
        href="/recipes/recipebook.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block rounded-2xl bg-stone-950 px-7 py-4 font-semibold text-white shadow hover:bg-stone-700"
      >
        View Original Cookbook Scan
      </a>
    </div>
  </div>
)}
    </main>
  );
}