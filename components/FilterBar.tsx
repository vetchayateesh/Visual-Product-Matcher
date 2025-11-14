"use client";

interface FilterBarProps {
  similarityThreshold: number;
  onThresholdChange: (threshold: number) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  resultCount: number;
}

export default function FilterBar({
  similarityThreshold,
  onThresholdChange,
  selectedCategory,
  onCategoryChange,
  categories,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Results Counter */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">{resultCount}</span> similar products found
        </p>
      </div>

      {/* Similarity Score Filter */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Minimum Similarity Score
        </label>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="100"
            value={similarityThreshold}
            onChange={(e) => onThresholdChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Low similarity</span>
            <span className="text-sm font-semibold text-blue-600">
              {similarityThreshold}%
            </span>
            <span className="text-xs text-gray-500">High similarity</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Filter by Category
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange("")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              selectedCategory === ""
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
