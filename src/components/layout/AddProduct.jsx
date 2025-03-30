import React, { useState } from "react";
import { TextField, Button, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from "axios";
import './productsform.css';  // Import the CSS file

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [status, setStatus] = useState(null);
    const [openDialog, setOpenDialog] = useState(false); // To manage dialog visibility
    const [isSubmitDialog, setIsSubmitDialog] = useState(false); // To differentiate between reset and submit dialogs

    const validateForm = () => {
        let formErrors = { name: '', description: '', price: '', image: '' };
        let valid = true;

        if (!formData.name) {
            formErrors.name = "Name is required";
            valid = false;
        }
        if (!formData.description) {
            formErrors.description = "Description is required";
            valid = false;
        }
        if (!formData.price || isNaN(formData.price)) {
            formErrors.price = "Price must be a valid number";
            valid = false;
        }
        if (!formData.image) {
            formErrors.image = "Image URL is required";
            valid = false;
        }

        setErrors(formErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitDialog(true); // Open the confirmation dialog before submitting
    };

    const confirmSubmit = async (confirmed) => {
        if (confirmed) {
            const token = localStorage.getItem('jwt');
            if (validateForm()) {
                try {
                    // Send formData to API
                    const response = await axios.post('https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/products', formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setStatus({
                        severity: 'success',
                        message: 'Product has been added successfully!'
                    });
                    if (response.status === 201) {
                        setFormData({
                            name: '',
                            description: '',
                            price: '',
                            image: ''
                        });
                        setErrors({
                            name: '',
                            description: '',
                            price: '',
                            image: ''
                        });
                        setTimeout(() => {                        
                            setStatus(null);
                        }, 10000);
                    }
                } catch (error) {
                    setStatus({
                        severity: 'error',
                        message: `Product could not be added. ${error.message}`
                    });
                }
            }
        }
        setIsSubmitDialog(false); // Close the dialog regardless of user's choice
    };

    const handleReset = () => {
        setOpenDialog(true); // Open the confirmation dialog for reset
    };

    const handleDialogClose = (confirmed) => {
        if (confirmed) {
            setFormData({
                name: '',
                description: '',
                price: '',
                image: ''
            });
            setErrors({
                name: '',
                description: '',
                price: '',
                image: ''
            });
            setStatus(null);
        }
        setOpenDialog(false); // Close the dialog regardless of the user's choice
    };

    return (
        <section className="add-products">
            <h2 className="title-heading">Add Product</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-fields">
                    <TextField
                        label="Product Name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        fullWidth
                        margin="dense"
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        fullWidth
                        margin="dense"
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        fullWidth
                        margin="dense"
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                    <TextField
                        label="Image"
                        name="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        fullWidth
                        margin="dense"
                        error={!!errors.image}
                        helperText={errors.image}
                    />
                </div>
                <div className="buttons">
                    <Button type="submit" variant="contained" color="success" className="submit-btn">
                        Submit
                    </Button>
                    <Button type="button" onClick={handleReset} variant="outlined" color="error" className="reset-btn">
                        Refresh
                    </Button>
                </div>
                {status && (
                    <Alert variant="outlined" severity={status.severity}>
                        {status.message}
                    </Alert>
                )}
            </form>

            {/* Confirmation Dialog for Submit */}
            <Dialog open={isSubmitDialog} onClose={() => setIsSubmitDialog(false)}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to add this product? All data will be submitted.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => confirmSubmit(false)} color="success" className="submit-btn">
                        Cancel
                    </Button>
                    <Button onClick={() => confirmSubmit(true)} color="error" className="reset-btn">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog for Reset */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to reset the form? All unsaved data will be lost.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose(false)} color="success" className="submit-btn">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDialogClose(true)} color="error" className="reset-btn">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};

export default AddProduct;
