import React, { useState } from "react"
import PropTypes from "prop-types"
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"
import Showdown from "showdown"

function Editor({ currentNote, updateNote }) {
  const [selectedTab, setSelectedTab] = useState("write")

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

  return (
    <section className="pane editor">
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={100}
        heightUnits="vh"
      />
    </section>
  )
}

Editor.propTypes = {
  currentNote: PropTypes.object,
  updateNote: PropTypes.func,
}

export default Editor
