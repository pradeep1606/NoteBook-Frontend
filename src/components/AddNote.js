import React, { useContext, useState } from 'react'
import noteContex from "../context/notes/noteContext"

export default function AddNote(props) {
    const context = useContext(noteContex);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [showForm, setShowForm] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        document.getElementById('title').value = ""
        document.getElementById('description').value = ""
        document.getElementById('tag').value = ""
        setNote({ title: "", description: "", tag: "" });
        setShowForm(false);
        props.showAlert("Note Added Successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <button type="button" className="btn btn-info mb-2" id="addBtn" onClick={() => setShowForm(!showForm)}>Add Note</button>
            {showForm && (
                <div className="form-control addNote" id="addNote">
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange} placeholder="Title" />
                    <div className="mb-3">
                        <textarea className="form-control" id="description" name='description' rows="4" onChange={onChange} placeholder="Take a note..."></textarea>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} placeholder="Tag :" />
                    </div>
                    <button disabled={note.description.length < 3} type="button" id="addNoteBtn" className="btn btn-info" onClick={handleClick}>Add Note</button>
                </div>
            )}
        </>
    )
}
