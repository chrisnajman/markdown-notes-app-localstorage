import React from "react"
import PropTypes from "prop-types"
import SkipLink from "../components/SkipLink"
import BtnTheme from "../components/BtnTheme"
import Header from "../components/Header"
import Footer from "../components/Footer"

function Layout({ children }) {
  return (
    <>
      <SkipLink />
      <BtnTheme />
      <div className="page-container">
        <Header title="Markdown Notes App (Local Storage)" />
        <main
          id="main-content"
          className="main-content"
        >
          {children}
        </main>
        <Footer gitRepo="markdown-notes-app-localstorage" />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
