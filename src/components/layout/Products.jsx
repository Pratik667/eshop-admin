import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { TextField, Button } from '@mui/material';
import axios from "axios";  // Import Axios
import DeleteIcon from '@mui/icons-material/Delete'; // Import Trash Icon
import EditNoteIcon from '@mui/icons-material/EditNote';
import { DialogContent, DialogActions, DialogTitle, Dialog } from '@mui/material';

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");  // Error state
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);  // Modal open state
  const [selectedProduct, setSelectedProduct] = useState(null);  // Data of the user selected for edit or delete

  const fetchData = async () => {
    try {
      // Fetch the data from the protected endpoint
      const response = await axios.get('https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/products');
      setTableData(response.data);  // Store the response data in state
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Invalid or expired token. Please log in again.');
      } else {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;  // Show loading while fetching
  }
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      id: 'product-name',
      sortable: true,
      width: "300px",
    },
    {
      name: 'Description',
      selector: row => row.description,
      id: 'product-description',
      sortable: false,
      width: "300px",
    },
    {
      name: 'Price',
      selector: row => row.price,
      id: 'product-price',
      sortable: true,      
    },
    {
      name: 'Product Image',
      selector: row => (<img src={row.image} />),
      id: 'product-image',
      sortable: false,
      width: "120px",
    },
    {
      name: 'Date',
      selector: row => row.createdAt,
      id: 'product-createdAt',
      sortable: true,
      width: "150px",
    },
    {
      name: 'Edit',
      cell: row => (
        <EditNoteIcon className='icon-delete text-yellow-600' onClick={() => handleEdit(row)} />
      ),
      id: 'edit-button',
      sortable: false,
      width: "80px",
    },
    {
      name: 'Delete',
      cell: row => (
        <DeleteIcon className='icon-delete text-red-600' onClick={() => handleDelete(row)} />
      ),
      id: 'delete-button',
      sortable: false,
      width: "80px",
    },
  ];
  const filteredData = tableData.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (user) => {
    setSelectedProduct(user);
    setIsDelete(false);  // Set to false since we're editing
    setOpenModal(true);
    setError("");
  };

  const handleDelete = (user) => {
    setSelectedProduct(user);
    setIsDelete(true);  // Set to true since we're deleting
    setOpenModal(true);
    setError("");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem('jwt');
    if (isDelete) {

      try {
          const response = await axios.delete(`https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/products/${selectedProduct._id}`, {
              headers: {
                  Authorization: `Bearer ${token}`,  // Attach the token in the Authorization header
              },
          });
          if(response.status === 200){
              fetchData();
              handleCloseModal();
          }                
      } catch (err) {
          setError(`Something went wrong. Please try again.`);
      // } finally {
      //     setLoading(false);  // Stop loading                
      }
  }else {
    // Call edit API here (you can collect updated data from modal fields)
    try {
        const response = await axios.put(`https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/products/${selectedProduct._id}`,
            { name: selectedProduct.name, description: selectedProduct.description, price: selectedProduct.price, image: selectedProduct.image }, {
            headers: {
                Authorization: `Bearer ${token}`,  // Attach the token in the Authorization header
            },
        });
        if(response.status === 200){
            fetchData();
            handleCloseModal();
        }
    } catch (err) {
        setError("Something went wrong. Please try again.");
    // } finally {
    //     setLoading(false);  // Stop loading
    //     handleCloseModal();
    }
}
    //handleCloseModal();
  };

  return (
    <section className="all-products">
    <h2 className="title-heading">Add Product</h2>
      <TextField
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <DataTable
        // title="All Products"
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        pointerOnHover
        subHeader
        subHeaderComponent={<div>Search Results</div>}
      />

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{isDelete ? 'Delete Product' : 'Edit Product'}</DialogTitle>
        <DialogContent>
          {isDelete ? (
            <div>
              <p>Are you sure you want to delete this Product?</p>
              <p><strong>{selectedProduct?.name}</strong> </p>
            </div>
          ) : (
            <div>
              <TextField
                label="Product Name"
                value={selectedProduct?.name || ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Description"
                value={selectedProduct?.description || ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Price"
                value={selectedProduct?.price || ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Image"
                value={selectedProduct?.image || ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })}
                fullWidth
                margin="dense"
              />
            </div>
          )}

          {/* Display error message */}
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            {isDelete ? 'Delete' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default Products;
