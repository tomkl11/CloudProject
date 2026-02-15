import React, { useState } from "react";
const EditProfileUser = ({ user, onUpdateSuccess }) => {
    const [editProfile, setEditProfile] = useState({
        name: user.name, 
        email: user.email,
        bio: user.bio
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile({
            ...editProfile,
            [name]: value
        });
    };
    const handleEditProfile = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/users/${user.id}/edit`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(editProfile),
        })
        .then((res) => res.json())
        .then((data) => {
            alert("Profile Updated!"); 
            if (onUpdateSuccess) {
                onUpdateSuccess(data);
            }
        })
        .catch((err) => console.error("Error updating profile", err));
    };
    return ( 
    <div> <h1>Edit Profile User</h1> 
        {/* Form to edit user profile */} 
        <form onSubmit={handleEditProfile}>
            <input 
            type="text" 
            name="name" 
            value={editProfile.name} 
            onChange={handleChange}
            placeholder="Name" 
            required 
            />
            <input 
            type="email" 
            name="email" 
            value={editProfile.email}
            onChange={handleChange} 
            placeholder="Email" 
            required 
            />
            <input 
            type="text" 
            name="bio" 
            value={editProfile.bio}
            onChange={handleChange} 
            placeholder="Biography" 
            required 
            />
            <button type="submit">Save Changes</button>
            
        </form>
    </div> ); 
}
export default EditProfileUser;