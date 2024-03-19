import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../Styles/Profile.css';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfileData, setUpdatedProfileData] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/api/userdetails/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setUpdatedProfileData(profileData);
  };

  const handleUpdateProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`http://localhost:8080/api/userdetails/${userId}`, updatedProfileData);
      console.log('Profile updated successfully:', response.data);
      setProfileData(updatedProfileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="prof" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="profile-container" style={{ flex: 1, padding: '20px' }}>
        {profileData && (
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="profile-image"
            />
            <h5>{profileData.fullName}</h5>
            <div className="profile-fields">
              {Object.entries(profileData).map(([key, value]) => (
                <div className="profile-field" key={key}>
                  <label>{key.toUpperCase()}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name={key}
                      value={updatedProfileData[key] || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div>{value}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="profile-actions">
              {isEditing ? (
                <button className="update-btn" onClick={handleUpdateProfile}>
                  Update
                </button>
              ) : (
                <button className="edit-btn" onClick={handleEditProfile}>
                  Edit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
