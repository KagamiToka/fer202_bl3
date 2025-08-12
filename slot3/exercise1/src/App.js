import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

function App() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [category, setCategory] = useState("");
  const [filtered, setFiltered] = useState(companies);

  const categories = ["", ...Array.from(new Set(companies.map(c => c.category)))];

  const handleSearch = () => {
    let result = companies.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    if (category) {
      result = result.filter(c => c.category === category);
    }
    if (sort === "asc") {
      result = result.sort((a, b) => a.start - b.start);
    } else if (sort === "desc") {
      result = result.sort((a, b) => b.start - a.start);
    } else if (sort === "range") {
      result = result.sort((a, b) => (a.end - a.start) - (b.end - b.start));
    }
    setFiltered(result);
  };

  React.useEffect(() => {
    handleSearch();
  }, [search, sort, category]);

  return (
    <div className="App" style={{ padding: 24 }}>
      <h2>Company List</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={handleSearch} style={{ marginRight: 16 }}>Search</button>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ marginRight: 16 }}>
          <option value="asc">Năm tăng dần</option>
          <option value="desc">Năm giảm dần</option>
          <option value="range">Chọn từ start-End</option>
        </select>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Tất cả Category</option>
          {categories.filter(c => c).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      {filtered.length === 0 ? (
        <div>No result</div>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, idx) => (
              <tr key={idx}>
                <td>{c.name}</td>
                <td>{c.category}</td>
                <td>{c.start}</td>
                <td>{c.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
