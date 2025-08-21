// import { openDB } from "idb";

// const DB_NAME = "notes-db";
// const STORE_NAME = "notes";

// export async function initDB() {
//   return openDB(DB_NAME, 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         db.createObjectStore(STORE_NAME, { keyPath: "id" });
//       }
//     },
//   });
// }

// export async function getAllNotes() {
//   const db = await initDB();
//   return db.getAll(STORE_NAME);
// }

// export async function addNoteToDB(note) {
//   const db = await initDB();
//   return db.put(STORE_NAME, note);
// }

// export async function deleteNoteFromDB(id) {
//   const db = await initDB();
//   return db.delete(STORE_NAME, id);
// }

// export async function clearAllNotes() {
//   const db = await initDB();
//   return db.clear(STORE_NAME);
// }
