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
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      {/* Results Counter */}
      <div style={{padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', background: '#f9fafb'}}>
        <p style={{fontSize: '0.875rem', color: '#374151', margin: 0}}>
          <span style={{fontWeight: '700', color: '#000000'}}>{resultCount}</span> similar products found
        </p>
      </div>

      {/* Similarity Score Filter */}
      <div style={{padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', background: '#f9fafb'}}>
        <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '1rem'}}>
          Minimum Similarity Score
        </label>
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          <input
            type="range"
            min="0"
            max="100"
            value={similarityThreshold}
            onChange={(e) => onThresholdChange(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: '0.5rem',
              borderRadius: '0.25rem',
              background: '#e5e7eb',
              outline: 'none',
              cursor: 'pointer',
              accentColor: '#000000'
            }}
          />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontSize: '0.75rem', color: '#9ca3af'}}>Low similarity</span>
            <span style={{fontSize: '0.875rem', fontWeight: '700', color: '#000000'}}>
              {similarityThreshold}%
            </span>
            <span style={{fontSize: '0.75rem', color: '#9ca3af'}}>High similarity</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', background: '#f9fafb'}}>
        <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '700', color: '#374151', marginBottom: '1rem'}}>
          Filter by Category
        </label>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
          <button
            onClick={() => onCategoryChange("")}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: selectedCategory === "" ? '#000000' : '#e5e7eb',
              color: selectedCategory === "" ? '#ffffff' : '#374151'
            }}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: selectedCategory === category ? '#000000' : '#e5e7eb',
                color: selectedCategory === category ? '#ffffff' : '#374151'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
