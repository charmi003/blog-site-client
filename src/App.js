import './App.css';
import { useEffect } from 'react' 
import axios from 'axios'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom' //in v6, replace Switch with Routes and replace component with element
import Login from './components/Login';
import { useDispatch } from 'react-redux'
import { fetchBlogs, fetchLoginStatus } from './redux';
import BlogForm from './components/BlogForm';
import Home from './components/Home';
import BlogDetails from './components/BlogDetails';
import MyBlogs from './components/MyBlogs'
import AllUsers from './components/AllUsers';
import AdminDashboard from './components/AdminDashboard';
import AllBlogs from './components/AllBlogs';

// optional configuration for react-alert
const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}


function App() {
  const dispatch=useDispatch();
 
  //checking the login status
  useEffect(()=>{
    dispatch(fetchLoginStatus());
  },[])

  //fetching the blogs
  useEffect(()=>{
    dispatch(fetchBlogs());
  },[])


  return (
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login-form" element={<Login />} />
            <Route exact path="/blog-form" element={<BlogForm />} />
            <Route exact path='/blog/:id' element={<BlogDetails />} />
            <Route exact path="/my-blogs" element={<MyBlogs />} />
            <Route exact path="/all-users" element={<AllUsers />} />
            <Route exact path='/admin-dashboard' element={<AdminDashboard />} />
            <Route exact path='/all-blogs' element={<AllBlogs />} />
          </Routes>
        </div>
      </AlertProvider>
    </Router>
  );
}

export default App;
