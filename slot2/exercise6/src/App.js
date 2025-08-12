import logo from './logo.svg';
import './App.css';

function App() {
  var people = [
  {name: 'Jack', age: 50},
  {name: 'Michael', age: 9}, 
  {name: 'John', age: 40}, 
  {name: 'Ann', age: 19}, 
  {name: 'Elisabeth', age: 16}
];
  return (
    <div className="App">
      <table>
      {people.map((person, index) => (
        <tr key={index}>
          <td>{person.name}</td>
          <td>{person.age}</td>
        </tr>
      ))}
      </table>
    </div>
  );
}

export default App;
