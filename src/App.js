import React, { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  
  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now() }]);
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const deleteAllNotes = () => {
    setNotes([]);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold", mt: 2 }}>
        NotesApp
      </Typography>

      <NoteForm addNote={addNote} />

      {notes.length > 0 && (
        <Button
          onClick={deleteAllNotes}
          variant="text"
          color="error"
          sx={{ display: "block", mx: "auto", mb: 2 }}
        >
          Delete all notes
        </Button>
      )}

      <NotesList notes={notes} deleteNote={deleteNote} updateNote={updateNote} />
    </Container>
  );
}

export default App;
