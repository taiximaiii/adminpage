// Product.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import './Product.css';
import { getAllProductApi, deleteProductApi, editProductApi } from '../../service/product';
import AddProductModal from './AddProductModal';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [updateData, setUpdateData] = useState({
    price: '',
    description: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProducts = async () => {
    try {
      const data = await getAllProductApi(); 
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleSearch = async () => {
    try {
      const data = await getAllProductApi({
        search: searchTerm,
        minPrice: minPrice, 
        maxPrice: maxPrice, 
      });
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };
  const handleClear = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    fetchProducts(); 
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const showDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setDeleteModalVisible(true);
  };

  const showEditModal = (productId) => {
    setSelectedProductId(productId);
    setEditModalVisible(true);

    const selectedProduct = products.find((product) => product.id === productId);

    form.setFieldsValue({
      price: selectedProduct.price,
      description: selectedProduct.description,
    });
  };

  const showViewModal = (productId) => {
    setSelectedProductId(productId);
    setViewModalVisible(true);
  };

  const handleEdit = async () => {
    try {
      await editProductApi(selectedProductId, updateData);

      setEditModalVisible(false);
      fetchProducts();

      message.success('Product updated successfully!');
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      await deleteProductApi(selectedProductId);

      fetchProducts();
      setDeleteModalVisible(false);
      message.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setUpdateData(allValues);
  };

  const handleCancelAdd = () => {
    form.resetFields();
    setAddModalVisible(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="" style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span>${price}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category Type',
      dataIndex: 'categoryType',
      key: 'categoryType',
    },
    {
      title: 'Sizes',
      dataIndex: 'sizes',
      key: 'sizes',
      render: (sizes) => sizes.map((size) => size.type).join(', '),
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            className="edit-button"
            onClick={() => showEditModal(record.id)}
          />
          <Button
            icon={<DeleteOutlined />}
            className="delete-button"
            onClick={() => showDeleteModal(record.id)}
          />
          <Button
            icon={<EyeOutlined />}
            className="view-button"
            onClick={() => showViewModal(record.id)}
          />
        </span>
      ),
    },
  ];

  const selectedProduct = products.find((product) => product.id === selectedProductId);

  return (
    <div>
      <Button className="btn-add" type="primary" onClick={() => setAddModalVisible(true)}>
        Add Product
      </Button>
      <Input
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginLeft: '10px', width: '200px' }}
      />
       <Input
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        style={{ marginLeft: '10px', width: '100px' }}
      />
      <Input
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={{ marginLeft: '10px', width: '100px' }}
      />
       <Button onClick={handleSearch} style={{ marginLeft: '10px', marginRight: '10px' }}>
        Search
      </Button>
      <Button onClick={handleClear} style={{ marginRight: '10px' }}>
        Clear
      </Button>
      <Table columns={columns} dataSource={products} pagination={pagination} onChange={handleTableChange} />

      <Modal title="Confirm Delete" visible={deleteModalVisible} onOk={handleDelete} onCancel={handleCancelDelete}>
        <p>Are you sure you want to delete this product?</p>
      </Modal>

      <Modal title="Edit Product" visible={editModalVisible} onOk={handleEdit} onCancel={handleCancelEdit}>
        <Form form={form} layout="vertical" onValuesChange={handleFormValuesChange}>
          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="View Product Details"
        visible={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedProduct && (
         <div>
         <img
        src={selectedProduct.image}
        alt={`Product ${selectedProduct.title}`}
        style={{ width: '70%', margin: '0 auto', display: 'block' }}
      />
         <p><strong>Title:</strong> {selectedProduct.title}</p>
         <p><strong>Price:</strong> ${selectedProduct.price}</p>
         <p><strong>Description:</strong> {selectedProduct.description}</p>
         <p><strong>Category Type:</strong> {selectedProduct.categoryType}</p>
   
         <div>
           <p><strong>Sizes:</strong></p>
           <ul>
             {selectedProduct.sizes.map((size) => (
               <li key={size.id}>{size.type}</li>
             ))}
           </ul>
         </div>
       </div>
        )}
      </Modal>

      <AddProductModal visible={addModalVisible} onCancel={handleCancelAdd} fetchProducts={fetchProducts} />
    </div>
  );
};

export default Product;
