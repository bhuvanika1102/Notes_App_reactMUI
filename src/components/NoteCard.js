import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";

function NoteCard({ note, deleteNote, updateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedText, setEditedText] = useState(note.text);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleSave = () => {
    updateNote(note.id, { title: editedTitle, text: editedText });
    setIsEditing(false);
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: note.color,
          width: 250,
          height: 250,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          boxShadow: 3,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
          margin: "auto",
        }}
      >
        <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
          {isEditing ? (
            <>
              <TextField
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mb: 1 }}
              />
              <TextField
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                sx={{ mb: 1 }}
              />
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                gutterBottom
                noWrap
                sx={{ fontWeight: "bold" }}
              >
                {note.title}
              </Typography>
              <Typography
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 6,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "0.9rem",
                }}
              >
                {note.text}
              </Typography>
            </>
          )}
        </CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            p: 1,
          }}
        >
          {isEditing ? (
            <IconButton onClick={handleSave} color="success">
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setIsEditing(true)} color="primary">
              <EditIcon />
            </IconButton>
          )}

          <IconButton onClick={() => setIsViewOpen(true)} color="secondary">
            <VisibilityIcon />
          </IconButton>

          <IconButton onClick={() => deleteNote(note.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>

      {/* ✅ View Dialog */}
      <Dialog
        open={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>{note.title}</DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ whiteSpace: "pre-line", fontSize: "1rem" }}>
            {note.text}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsViewOpen(false)}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NoteCard;
