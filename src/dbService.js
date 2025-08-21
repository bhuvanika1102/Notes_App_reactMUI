import { openDB } from "idb";
import { db } from "./firebase";
import { collection, setDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
const DB_NAME = "notesDB";
const STORE_NAME = "notes";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

// ------------------ IndexedDB ------------------
export async function saveNoteIndexedDB(note) {
  const db = await initDB();
  await db.put(STORE_NAME, note);
}

export async function getAllNotesIndexedDB() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function deleteNoteIndexedDB(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}

export async function clearNotesIndexedDB() {
  const db = await initDB();
  await db.clear(STORE_NAME);
}

// ------------------ Firebase ------------------
const notesCollection = collection(db, "notes");

export async function saveNoteFirebase(note) {
  await setDoc(doc(db, "notes", String(note.id)), note); // id as doc id
}

export async function deleteNoteFirebase(id) {
  await deleteDoc(doc(db, "notes", String(id)));
}
export async function clearNotesFirebase() {
    const snapshot = await getDocs(notesCollection);
    const deletions = snapshot.docs.map((docSnap) =>
      deleteDoc(docSnap.ref)   // ✅ no need for id, use docSnap.ref
    );
    await Promise.all(deletions);
  }