import React, { useState } from "react";
import { Box, TextField, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

const colors = ["#FFD54F", "#F48FB1", "#A5D6A7", "#81D4FA", "#E0E0E0"];

function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState(colors[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;
    addNote({ title, text, color });
    setTitle("");
    setText("");
    setColor(colors[0]);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
    >
      <TextField
        label="Enter your title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Enter your note text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={3}
        fullWidth
      />

      <ToggleButtonGroup
        value={color}
        exclusive
        onChange={(e, newColor) => setColor(newColor || color)}
        sx={{ mb: 1 }}
      >
        {colors.map((c) => (
          <ToggleButton
            key={c}
            value={c}
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: c,
              border: "1px solid #ccc",
              "&.Mui-selected": { border: "2px solid black" },
            }}
          />
        ))}
      </ToggleButtonGroup>

      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
}

export default NoteForm;
