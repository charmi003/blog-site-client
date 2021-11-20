import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteUser, fetchUsers } from '../redux';
import { useAlert } from 'react-alert'

const AllUsers = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const alert=useAlert();

    useEffect(()=>{
        dispatch(fetchUsers());
    },[])
    
    const isLoggedIn=useSelector( state => state.auth.isLoggedIn );
    const user=useSelector( state => state.auth.user );
    if(!isLoggedIn || (user && user.role!=="admin"))
        navigate('/');

    const users=useSelector( state => state.admin.users );
    let usersList=null;
    if(users){
        usersList=users.map((user)=><tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td><i className="fas fa-trash-alt cursor-pointer" onClick={()=>dispatch(deleteUser(user._id,alert))}></i></td>
        </tr>)
    }

    return (
        <table className="mx-6 my-4 responsive-table">
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                usersList
            }
            </tbody>
        </table>
    )
}

export default AllUsers
