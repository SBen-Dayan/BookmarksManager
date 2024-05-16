import axios from "axios"
import { useState, useEffect } from "react"
import { produce } from "immer";
import { useUser } from "../components/UserContext";

export default function MyBookmarks() {
    const [bookmarks, setBookmarks] = useState({});
    const {newUser, user : {firstName, lastName}} = useUser();

    useEffect(() => {
        refresh();
    }, [])

    const refresh = async () => {
        const { data } = await axios.get('/api/bookmarks/getForUser');
            const state = {};
            data.forEach(({ id, title, url }) => state[id] = { title, url, editTitle: '' });
            setBookmarks(state);
    }

    const onUpdateClick = async id => {
        await axios.post('/api/bookmarks/updateTitle', { id, title: bookmarks[id].editTitle });
        setBookmarks(produce(bookmarks, draft => {
            draft[id].title = draft[id].editTitle;
            draft[id].editTitle = ''
        }))
    }

    const onDeleteClick = async id => {
        await axios.post('/api/bookmarks/delete', { id });
        refresh();
    }

    const setBookmarkEditTitle = (id, editTitle) => {
        const newState = produce(bookmarks, draft => {
            draft[id].editTitle = editTitle;
        })
        setBookmarks(newState);
    }

    return (bookmarks && <>
        <div className="mt-5">
            <div className="row">
                <div className="col-md-12">
                    {newUser ? <h1>Welcome new user: {firstName} {lastName}!</h1> :
                     <h1>Welcome back {firstName} {lastName}</h1> }
                    <a className="btn btn-primary btn-block" href="/add-bookmark">Add Bookmark</a>
                </div>
            </div>
            <div className="row mt-5">
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Url</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(bookmarks)}
                        {Object.entries(bookmarks).map(([id, { title, url, editTitle }]) =>
                            <tr key={id}>
                                <td>
                                    {!editTitle ? title :
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={e => setBookmarkEditTitle(id, e.target.value)} />}
                                </td>
                                <td>
                                    {url}
                                </td>
                                <td>
                                    {editTitle ? <>
                                        <button className="btn btn-info" onClick={() => onUpdateClick(id)}>Update</button>
                                        <button className="btn btn-dark" onClick={() => setBookmarkEditTitle(id, '')}>Cancel</button>
                                    </> :
                                        <button className="btn btn-primary" onClick={() => setBookmarkEditTitle(id, title)}>Edit</button>}
                                    <button className="btn btn-danger" onClick={() => onDeleteClick(id)}>Delete</button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </>) || <h1>Loading...</h1>
}