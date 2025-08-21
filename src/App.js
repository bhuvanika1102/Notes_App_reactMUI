import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import "./App.css";
import {
  saveNoteIndexedDB,
  getAllNotesIndexedDB,
  deleteNoteIndexedDB,
  clearNotesIndexedDB,
  saveNoteFirebase,
  deleteNoteFirebase,
  clearNotesFirebase,
} from "./dbService";
import useNetworkStatus from "./Network/useNetworkStatus";
import { Alert } from "@mui/material";
async function syncToFirebase() {
  if (!navigator.onLine) return;

  console.log("Online: Syncing notes to Firebase...");

  const localNotes = await getAllNotesIndexedDB();

  for (const note of localNotes) {
    await saveNoteFirebase(note);
  }

  console.log("Sync complete!");
}

function App() {
  const [notes, setNotes] = useState([]);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    (async () => {
      const storedNotes = await getAllNotesIndexedDB();
      setNotes(storedNotes);
    })();
  }, []);

  useEffect(() => {
    const handleOnline = async () => {
      await syncToFirebase();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  const addNote = async (note) => {
    const newNote = { ...note, id: Date.now() };
    setNotes([...notes, newNote]);
    await saveNoteIndexedDB(newNote);
    if (navigator.onLine) {
      await saveNoteFirebase(newNote);
    }
  };

  const updateNote = async (id, updatedNote) => {
    const newNotes = notes.map((note) =>
      note.id === id ? { ...note, ...updatedNote } : note
    );
    setNotes(newNotes);
    const finalNote = { ...updatedNote, id };
    await saveNoteIndexedDB(finalNote);

    if (navigator.onLine) {
      await saveNoteFirebase(finalNote);
    }
  };

  const deleteNote = async (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    await deleteNoteIndexedDB(id);
    if (navigator.onLine) {
      await deleteNoteFirebase(id);
    }
  };

  const deleteAllNotes = async () => {
    setNotes([]);
    await clearNotesIndexedDB();

    if (navigator.onLine) {
      await clearNotesFirebase();
    }
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mt: 2 }}
      >
        NotesApp
      </Typography>

      {!isOnline && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          You are offline. Notes will be saved locally and synced when online.
        </Alert>
      )}
      {isOnline && (
        <Alert severity="success" sx={{ mb: 2 }}>
          You are online. Notes are syncing with Firebase.
        </Alert>
      )}

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

      <NotesList
        notes={notes}
        deleteNote={deleteNote}
        updateNote={updateNote}
      />
    </Container>
  );
}

export default App;
