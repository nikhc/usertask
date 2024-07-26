import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import M from 'materialize-css';


Modal.setAppElement('#root');

const CreateUserModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const [image, setImage] = useState(null);
    const [nik, setNik] = useState({
        name: '',
        email: '',
        phoneno: '',
        companysite: '',
        pic: undefined,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNik((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (image) {
            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', 'insta-clone');
            data.append('cloud_name', 'djobbmy33');

            try {
                const res = await axios.post(
                    'https://api.cloudinary.com/v1_1/djobbmy33/image/upload',
                    data
                );

                const imageUrl = res.data.secure_url;
                setNik((prev) => ({ ...prev, pic: imageUrl }));
                console.log(nik.pic)
                if(nik.pic!=undefined){
                    const response = await axios.post('/create', nik);
                    console.log(response)
                    if (response.data.data) {
                        M.toast({
                            html: "Successfully created",
                            classes: '#4a148c purple darken-4',
                        });
                        onSubmit(nik);
                        onRequestClose(); // Automatically close the modal
                    } else {
                        M.toast({
                            html: response.data.error,
                            classes: '#4a148c purple darken-4',
                        });
                    }

                }
                
               
            } catch (err) {
                M.toast({
                    html: err.message,
                    classes: '#4a148c purple darken-4',
                });
            }
        } else {
            M.toast({
                html: 'Please upload an image.',
                classes: '#4a148c purple darken-4',
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Create User"
            className="customModal"
            overlayClassName="modalOverlay"
        >
            <form onSubmit={handleSubmit} noValidate>
                <h2>Create User</h2>
                <div>
                    <label htmlFor="name">
                        <span className="required">*</span> Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={nik.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">
                        <span className="required">*</span> Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={nik.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phoneno">
                        <span className="required">*</span> Phone No:
                    </label>
                    <input
                        type="text"
                        name="phoneno"
                        id="phoneno"
                        value={nik.phoneno}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="companysite">
                        <span className="required">*</span> Company Site:
                    </label>
                    <input
                        type="text"
                        name="companysite"
                        id="companysite"
                        value={nik.companysite}
                        onChange={handleChange}
                    />
                </div>
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload Image</span>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input
                            className="file-path validate"
                            type="text"
                            placeholder="Upload an image"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn waves-effect waves-light #4a148c purple darken-4"
                >
                    Create
                </button>
                <button
                    type="button"
                    className="btn waves-effect waves-light #4a148c purple darken-4"
                    onClick={onRequestClose}
                >
                    Close
                </button>
            </form>
        </Modal>
    );
};

export default CreateUserModal;
