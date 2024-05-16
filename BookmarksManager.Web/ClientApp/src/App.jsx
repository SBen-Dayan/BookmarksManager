import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import UserContextComponent from './components/UserContext';
import Authorized from './components/Authorized';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import MyBookmarks from './Pages/MyBookmarks';
import AddBookmark from './Pages/AddBookmark';

const App = () => {
    return (
        <UserContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/my-bookmarks' element={
                        <Authorized>
                            <MyBookmarks />
                        </Authorized>} />
                    <Route path='/add-bookmark' element={
                        <Authorized>
                            <AddBookmark />
                        </Authorized>
                    } />
                </Routes>
            </Layout>
        </UserContextComponent>
    );
}

export default App;