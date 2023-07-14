import React, { useContext } from 'react';
import noteContex from "../context/notes/noteContext"
import edit_img from '../edit.svg';
import delete_img from '../delete.svg';

export default function NoteItem(props) {
    const context = useContext(noteContex);
    const { deleteNote } = context;

    const { note, updateNote } = props;
    return (
        <>
            <div className='col-sm-3'>
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <button className="btn btn-info" onClick={() => { updateNote(note) }}><img src={edit_img} alt="edit" /></button>
                        <button className="btn btn-info mx-1" onClick={() => { deleteNote(note._id); props.showAlert("Note has been Deleted", "warning"); }}><img src={delete_img} alt="delete" /></button>
                    </div>
                </div>
            </div>
        </>
    )
}
