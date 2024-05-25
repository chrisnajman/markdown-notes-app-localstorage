# Markdown Notes App (Local Storage)

This is the result of the Scrimba Tutorial [Notes App (registration required)](https://v2.scrimba.com/learn-react-c0e), specifically, the first half (excluding the setting up of _Firebase / Firestore_).

Much of the code was pre-written. The task was to add functionality to an existing codebase.

## Functionality to Add

1. Sync notes with `localStorage`.
2. Create note titles from a summary of the note.
3. Move modified notes to the top of the list.
4. Delete notes.

---

### Alternative Version using `firestore` to Save Notes

- [Markdown Notes App (Firestore): Git Repository](https://github.com/chrisnajman/markdown-notes-app-firestore)

> [!NOTE] 
> There isn't a GitHub Page for this version.
> This is due to database security concerns.

---

## React Version

> [!IMPORTANT] 
> `react-mde` (the markdown editor) has not been updated for _React V.18_.
> Therefore, I have used _React V.17_ for this project.

---

## Accessibility

In the markdown editor, you can't tab through the toolbar buttons (apart from 'Write' and 'Preview').
This is because `tabindex="-1"` is placed on these buttons, removing them from the tab order.

_ChatGPT_ supplied a solution, which was to give ALL the buttons (including 'Write' and 'Preview') a `tabindex` of zero:

```jsx

function Editor({ currentNote, updateNote }) {

    ...

    useEffect(() => {
    // Function to update tabindex of toolbar buttons
    const updateTabindex = () => {
        const toolbarButtons = document.querySelectorAll(".mde-header button")
        toolbarButtons.forEach((button) => {
        button.setAttribute("tabindex", "0")
        })
    }

    // Call the function initially after the component mounts
    updateTabindex()

    // Optional: observe changes to ensure tabindex stays updated
    const observer = new MutationObserver(updateTabindex)
    const toolbar = document.querySelector(".mde-header")

    if (toolbar) {
        observer.observe(toolbar, { childList: true, subtree: true })
    }

    // Cleanup the observer on component unmount
    return () => {
        observer.disconnect()
    }
    }, []) // Empty dependency array to run only once on mount

    ...
}
```

On reflection, however, I have decided **not** to include the code. This is because:

- In order to format the text, you first have to manually select it.
- Then you have to click a formatting button.
- But, if you reverse tab from the selected text to a toolbar button, the text selection disappears, so there is nothing for the button to format.

**Conclusion**: the toolbar formatting buttons are inherently inaccessible to keyboard navigation. (But you can still write and preview markdown code.)

---

## Testing

Tested on Windows 10 with:

- Chrome
- Firefox
- Microsoft Edge

Page tested in both browser and device views.
