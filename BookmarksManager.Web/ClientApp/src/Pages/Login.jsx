import { useState } from "react"
import axios from "axios";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);

    const {setUser} = useUser();
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        const {data} = await axios.post('/api/account/login', {email, password});
        if (!data) {
            setInvalidLogin(true);
        } else {      
            await setUser(data);
            navigate('/my-bookmarks');
        }
    }

    return <>
        <div className="row" style={{ alignItems: 'center' }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                {invalidLogin && <h4 style={{color : 'red'}}>invalid login!!</h4>}
                <h3>Log in to your account</h3>
                <form onSubmit={onSubmit}>
                    <input type="text" name="email" placeholder="Email" className="form-control" 
                    value={email} onChange={e => setEmail(e.target.value)}/>
                    <br />
                    <input type="password" name="password" placeholder="Password" className="form-control"
                    value={password} onChange={e => setPassword(e.target.value)} />
                    <br />
                    <button className="btn btn-primary">Login</button>
                </form>
                <a href="/signup">Sign up for a new account</a>
            </div>
        </div >
    </>

}