import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Required for accessibility

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%', // Responsive width
        maxWidth: '600px', // Max width
        height: 'auto', // Auto height
        maxHeight: '90vh', // Max height
        overflow: 'auto', // Scroll if content overflows
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
};

const EditModal = ({ isOpen, onRequestClose, item, onSubmit }) => {
    const [formData, setFormData] = useState({ ...item });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        setFormData({ ...item });
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validate = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.phoneno) errors.phoneno = 'Phone number is required';
        if (!formData.companysite) errors.companysite = 'Company site is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            try {
                console.log(formData._id);
                
                let m = formData._id;
    
                // Ensure id is included in formData
                const response = await axios.patch(`/update/${m}`, formData);
                console.log(response.data.data);
                setLoading(false);
                setSuccess('Update successful!');
                onSubmit(response.data.data);
                onRequestClose(); // Close the modal on successful submission
            } catch (error) {
                setLoading(false);
                setErrors({ form: 'An error occurred while updating. Please try again.' });
            }
        } else {
            setErrors(validationErrors);
        }
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Item"
            style={customStyles}
        >
            {formData && (
                <form onSubmit={handleSubmit} noValidate>
                    <h2>Edit Item</h2>
                    <div>
                        <label htmlFor="name">
                            <span className="required">*</span> Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            aria-invalid={errors.name ? "true" : "false"}
                            aria-describedby={errors.name ? "name-error" : null}
                        />
                        {errors.name && <span id="name-error" className="error">{errors.name}</span>}
                    </div>
                    <div>
                        <label htmlFor="email">
                            <span className="required">*</span> Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : null}
                        />
                        {errors.email && <span id="email-error" className="error">{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="phoneno">
                            <span className="required">*</span> Phone No:
                        </label>
                        <input
                            type="text"
                            name="phoneno"
                            id="phoneno"
                            value={formData.phoneno}
                            onChange={handleChange}
                            aria-invalid={errors.phoneno ? "true" : "false"}
                            aria-describedby={errors.phoneno ? "phoneno-error" : null}
                        />
                        {errors.phoneno && <span id="phoneno-error" className="error">{errors.phoneno}</span>}
                    </div>
                    <div>
                        <label htmlFor="companysite">
                            <span className="required">*</span> Company Site:
                        </label>
                        <input
                            type="text"
                            name="companysite"
                            id="companysite"
                            value={formData.companysite}
                            onChange={handleChange}
                            aria-invalid={errors.companysite ? "true" : "false"}
                            aria-describedby={errors.companysite ? "companysite-error" : null}
                        />
                        {errors.companysite && <span id="companysite-error" className="error">{errors.companysite}</span>}
                    </div>
                    {errors.form && <div className="error">{errors.form}</div>}
                    {success && <div className="success">{success}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Submit'}
                    </button>
                    <button type="button" onClick={onRequestClose} disabled={loading}>
                        Close
                    </button>
                </form>
            )}
        </Modal>
    );
};

export default EditModal;
