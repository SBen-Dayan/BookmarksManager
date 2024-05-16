//incomplete
import { useState, useEffect } from "react";
import { useUser } from "../components/UserContext"
import axios from "axios";

export default function Home() {
    const amount = 5;
    const { user } = useUser();
    const [topBookmarks, setTopBookmarks] = useState([]);

    useEffect(() => {
        (async function () {
            const { data } = await axios.get(`/api/bookmarks/getTopBookmarks?amount=${amount}`);
            setTopBookmarks(data);
        })();
    }, [])

    return topBookmarks ? <>
        <div>
            {user ? <h1>Welcome {user.firstName} {user.lastName}</h1> :
                <h1>Welcome to the React Bookmark Application.</h1>}
            <h3>Top 5 most bookmarked links</h3>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Url</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log(topBookmarks)}
                    {topBookmarks.map(({ url, count }) =>
                        <tr key={url}>
                            <td>{url}</td>
                            <td>{count}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    </> : <h1>Loading..</h1>
}