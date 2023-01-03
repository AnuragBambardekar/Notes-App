import NotesList from "./components/NotesList";
import { useEffect, useState } from "react";
import {nanoid} from 'nanoid';
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([
  {
    id: nanoid(),
    text: "Test Text 1",
    date: "1/2/2023"
  },
  {
    id: nanoid(),
    text: "Test Text 2",
    date: "2/2/2023"
  },
  {
    id: nanoid(),
    text: "Test Text 3",
    date: "1/2/2023"
  },
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  //Get data from LocalStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    
    console.log("Hi",savedNotes)

    if(savedNotes){
      setNotes(savedNotes);
    }
  },[]); //run only on first load

  //Store data in LocalStorage
  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data', 
      JSON.stringify(notes))
  }, [notes]);

  //Add Note
  const addNote = (text) => {
    //console.log(text);
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  //Delete Note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return(
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode}/>
        <Search handleSearchNote={setSearchText}/>
        <NotesList 
          notes={notes.filter((note) => 
            note.text.toLowerCase().includes(searchText))} 
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          />
      </div>
    </div>
  );
}

export default App;