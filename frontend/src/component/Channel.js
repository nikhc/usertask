import React, { useState, useEffect } from 'react';
import { FaGlobe, FaHeart, FaRegHeart } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import EditModal from './EditModal';
import axios from 'axios';
import CreateUserModal from './CreateUserModal.js'; // Import the CreateUserModal component

export default function Channel() {
    const [users, setUsers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [createUserModalIsOpen, setCreateUserModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/alldata");
                setUsers(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const toggleLike = (index) => {
        const newState = users.map((item, idx) => {
            if (index === idx) {
                return { ...item, liked: !item.liked };
            }
            return item;
        });
        setUsers(newState);
    };

    const openEditModal = (item) => {
        setSelectedItem(item);
        setModalIsOpen(true);
    };

    const closeEditModal = () => {
        setModalIsOpen(false);
        setSelectedItem(null);
    };

    const openCreateUserModal = () => {
        setCreateUserModalIsOpen(true);
    };

    const closeCreateUserModal = () => {
        setCreateUserModalIsOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            console.log(id)
            console.log(id)
            console.log(id)
            console.log(id)
            console.log(id)
            
            const response = await axios.delete(`/delete/${id}`);
            const deletedUser = response.data.data;

            // Filter out the deleted user from the state
            const updatedUsers = users.filter(user => user._id !== deletedUser._id);
            setUsers(updatedUsers);

        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="card-container">
            {/* Add the Create User card at the beginning */}
            <div className="card create-card" onClick={openCreateUserModal}>
                <span className="create-icon">+</span>
                <div className="create-text">Create User</div>
            </div>

            {users.map((item, index) => (
                <div key={item._id} className="card">
                    <img src={item.pic} alt="Profile" className="card-img" />
                    <div className="card-content">
                        <div className="card-header">
                            {item.name}
                        </div>
                        <div className="card-info">
                            <i className="material-icons">mail</i>
                            <span>{item.email}</span>
                        </div>
                        <div className="card-info">
                            <i className="material-icons">phone</i>
                            <span>{item.phoneno}</span>
                        </div>
                        <div className="card-info">
                            <FaGlobe />
                            <span>{item.companysite}</span>
                        </div>
                        <div className="card-actions">
                            <div className="action-item">
                                {item.liked ? (
                                    <FaHeart
                                        style={{ color: 'red', cursor: 'pointer' }}
                                        onClick={() => toggleLike(index)}
                                    />
                                ) : (
                                    <FaRegHeart
                                        style={{ color: 'black', cursor: 'pointer' }}
                                        onClick={() => toggleLike(index)}
                                    />
                                )}
                            </div>
                            <div className="action-item">
                                <CiEdit
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => openEditModal(item)}
                                />
                            </div>
                            <div className="action-item">
                                <MdDelete
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDelete(item._id)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <EditModal
                isOpen={modalIsOpen}
                onRequestClose={closeEditModal}
                item={selectedItem}
                onSubmit={(updatedItem) => {
                    const updatedList = users.map((item) => item._id === updatedItem._id ? updatedItem : item);
                    setUsers(updatedList);
                }}
            />

            <CreateUserModal
                isOpen={createUserModalIsOpen}
                onRequestClose={closeCreateUserModal}
                onSubmit={(newUser) => {
                    setUsers([...users, newUser]); // Add the new user to the list
                }}
            />
        </div>
    );
}
