import logo from './logo.svg';
import './App.css';


import React, { useState, useMemo } from 'react';

function App() {
  const persons = useMemo(() => [
    { id: 1, firstName: 'Linh', lastName: 'Nguyen', age: 28, city: 'Ha Noi',  skills: ['React', 'Node'],   isActive: true },
    { id: 2, firstName: 'Minh', lastName: 'Tran',  age: 22, city: 'Da Nang', skills: ['Vue', 'CSS'],      isActive: false },
    { id: 3, firstName: 'Anh',  lastName: 'Le',    age: 35, city: 'HCM',     skills: ['React', 'Go'],     isActive: true },
    { id: 4, firstName: 'Ha',   lastName: 'Pham',  age: 29, city: 'Ha Noi',  skills: ['Angular', 'RxJS'], isActive: true },
    { id: 5, firstName: 'Tuan', lastName: 'Do',    age: 41, city: 'HCM',     skills: ['Node', 'SQL'],     isActive: false },
  ], []);

  // 1. Sort First Name
  const [sortAZ, setSortAZ] = useState(true);
  const sortedPersons = useMemo(() => {
    return [...persons].sort((a, b) => {
      if (sortAZ) return a.firstName.localeCompare(b.firstName);
      return b.firstName.localeCompare(a.firstName);
    });
  }, [sortAZ, persons]);

  // 2. Filter by age and skill
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const allSkills = Array.from(new Set(persons.flatMap(p => p.skills)));
  const [selectedSkill, setSelectedSkill] = useState('');
  const filteredByAgeSkill = useMemo(() => {
    return persons.filter(({ age, skills }) => {
      const min = minAge ? parseInt(minAge) : -Infinity;
      const max = maxAge ? parseInt(maxAge) : Infinity;
      return age >= min && age <= max && (selectedSkill ? skills.includes(selectedSkill) : true);
    }).reduce((acc, { firstName, lastName, skills }) => {
      if (selectedSkill) {
        if (skills.includes(selectedSkill)) acc.push({ firstName, lastName, skill: selectedSkill });
      } else {
        skills.forEach(skill => acc.push({ firstName, lastName, skill }));
      }
      return acc;
    }, []);
  }, [minAge, maxAge, selectedSkill, persons]);

  // 3. Skill ranking
  const skillRanking = useMemo(() => {
    const freq = persons.reduce((acc, { skills }) => {
      skills.forEach(skill => acc[skill] = (acc[skill] || 0) + 1);
      return acc;
    }, {});
    const arr = Object.entries(freq).map(([skill, count]) => ({ skill, count }));
    arr.sort((a, b) => b.count - a.count);
    return arr;
  }, [persons]);

  // 4. Search and multi-sort
  const [search, setSearch] = useState('');
  const filteredSortedPersons = useMemo(() => {
    return persons.filter(({ firstName, lastName }) => {
      const q = search.trim().toLowerCase();
      return (firstName + ' ' + lastName).toLowerCase().includes(q);
    }).sort((a, b) => {
      // isActive true trước
      if (a.isActive !== b.isActive) return b.isActive - a.isActive;
      // age tăng dần
      if (a.age !== b.age) return a.age - b.age;
      // lastName A->Z
      return a.lastName.localeCompare(b.lastName);
    });
  }, [search, persons]);

  // 4. Statistics
  const statistics = useMemo(() => {
    const total = filteredSortedPersons.length;
    const avgAge = total ? (filteredSortedPersons.reduce((sum, p) => sum + p.age, 0) / total).toFixed(1) : 0;
    const activeCount = filteredSortedPersons.filter(p => p.isActive).length;
    return { total, avgAge, activeCount };
  }, [filteredSortedPersons]);

  return (
    <div className="App" style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>1. Danh sách (Sort First Name)</h2>
      <button onClick={() => setSortAZ(s => !s)}>
        Sort First Name: {sortAZ ? 'A→Z' : 'Z→A'}
      </button>
      <ul>
        {sortedPersons.map(({ id, firstName, lastName, age, city, skills }) => (
          <li key={id} style={{ margin: '8px 0' }}>
            <b>{firstName} {lastName}</b> | Age: {age} | City: {city} | Skills: {skills.join(', ')}
          </li>
        ))}
      </ul>

      <h2>2. Lọc theo độ tuổi & skill</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <input type="number" placeholder="Min age" value={minAge} onChange={e => setMinAge(e.target.value)} style={{ width: 80 }} />
        <input type="number" placeholder="Max age" value={maxAge} onChange={e => setMaxAge(e.target.value)} style={{ width: 80 }} />
        <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)}>
          <option value="">All skills</option>
          {allSkills.map(skill => <option key={skill} value={skill}>{skill}</option>)}
        </select>
      </div>
      <ul>
        {filteredByAgeSkill.length > 0 ? filteredByAgeSkill.map((item, idx) => (
          <li key={idx}>{item.firstName} – {item.lastName} – {item.skill}</li>
        )) : <li>No found.</li>}
      </ul>

      <h2>3. Bảng xếp hạng skill</h2>
      <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', minWidth: 300 }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Skill</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {skillRanking.map((item, idx) => (
            <tr key={item.skill} style={idx === 0 ? { fontWeight: 'bold', background: '#ffe' } : {}}>
              <td>{item.skill}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>4. Tìm kiếm & Sort đa tiêu chí</h2>
      <input type="text" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 200, marginBottom: 8 }} />
      <ul>
        {filteredSortedPersons.length > 0 ? filteredSortedPersons.map(({ id, firstName, lastName, isActive, age, lastName: ln }) => (
          <li key={id} style={{ color: isActive ? 'green' : 'gray' }}>
            {firstName} {lastName} | Age: {age} | Last Name: {ln} | Active: {isActive ? 'Yes' : 'No'}
          </li>
        )) : <li>No found.</li>}
      </ul>
      <div style={{ border: '1px solid #ccc', padding: 12, marginTop: 12, maxWidth: 300 }}>
        <b>Statistics</b>
        <div>Total persons: {statistics.total}</div>
        <div>Average age: {statistics.avgAge}</div>
        <div>Active persons: {statistics.activeCount}</div>
      </div>
    </div>
  );
}

export default App;
