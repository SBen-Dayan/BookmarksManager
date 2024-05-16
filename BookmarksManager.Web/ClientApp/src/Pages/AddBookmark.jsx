import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function AddBookmark() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmarks/add', { title, url });
        navigate('/my-bookmarks');
    }

    return <>
        <div className="row" style={{ alignItems: "center" }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Add Bookmark</h3>
                <form onSubmit={onSubmit}>
                    <input type="text" name="title" placeholder="Title" className="form-control"
                        value={title} onChange={({ target: { value } }) => setTitle(value)} />
                    <br />
                    <input type="text" name="url" placeholder="Url" className="form-control"
                        value={url} onChange={({ target: { value } }) => setUrl(value)} />
                    <br />
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    </>
}