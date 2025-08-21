import React from "react";
import { Box } from "@mui/material";
import NoteCard from "./NoteCard";

function NotesList({ notes, deleteNote, updateNote }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 2,
      }}
    >
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          updateNote={updateNote}
        />
      ))}
    </Box>
  );
}

export default NotesList;
