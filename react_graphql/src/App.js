import './App.css';
import CharactersLists from './views/CharactersLists';

import { Route, Routes } from "react-router"
import CharacterDetails from './views/CharacterDetails';
import Search from './views/Search';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<CharactersLists />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path="/:id" element={<CharacterDetails />} />
      </Routes>
    </div>
  );
}

export default App;
