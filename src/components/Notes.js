import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import noteContex from "../context/notes/noteContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';

export default function Notes(props) {
    let navigate = useNavigate();
    const { showAlert } = props;
    const context = useContext(noteContex);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <AddNote showAlert={showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-control addNote" id="addNote">
                                <input type="text" className="form-control" id="etitle" name='etitle' onChange={onChange} value={note.etitle} placeholder="Title" />
                                <div className="mb-3">
                                    <textarea className="form-control" id="edescription" name='edescription' rows="4" onChange={onChange} value={note.edescription}></textarea>
                                    <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} placeholder="Tag" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" disabled={note.edescription.length < 3} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-4">
                <h2>Your Notes :</h2>
                <div className='notes row'>
                    <div className="container mx-2">
                        {notes.length === 0 && "No Notes available"}
                    </div>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} showAlert={showAlert} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}
