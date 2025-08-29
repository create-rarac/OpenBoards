import React from 'react';
export default function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="ff-categorybar">
      Category:
      <select className="ff-select" value={selected} onChange={e => onSelect(e.target.value)}>
        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
      </select>
    </div>
  );
}