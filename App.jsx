import React, { useState, useEffect } from "react"
import Layout from "./layout/Layout"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"

function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  )
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  )

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0]

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    }
    setNotes((prevNotes) => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    // Put the most recently-modified note at the top
    setNotes((oldNotes) => {
      const newArray = []
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i]
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text })
        } else {
          newArray.push(oldNote)
        }
      }
      return newArray
    })
  }

  function deleteNote(e, noteId) {
    e.stopPropagation()
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId))
  }

  return (
    <Layout>
      {notes.length > 0 ? (
        <Split
          sizes={[30, 70]}
          direction="horizontal"
          className="split"
        >
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor
              currentNote={currentNote}
              updateNote={updateNote}
            />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h2>You have no notes</h2>
          <button
            className="first-note"
            onClick={createNewNote}
          >
            Create one now
          </button>
        </div>
      )}
    </Layout>
  )
}

export default App
