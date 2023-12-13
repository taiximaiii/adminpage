// Category.js
import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { getAllCategoryApi, addCategoryApi } from '../../service/category'; // Replace 'category' with the actual path
import AddCategoryModal from './AddCategoryModal';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
  });
  const [addModalVisible, setAddModalVisible] = useState(false);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategoryApi();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleAddCategory = async (categoryData) => {
    try {
      await addCategoryApi(categoryData);
      fetchCategories();
      setAddModalVisible(false);
      message.success('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  return (
    <div>
      <Button className="btn-add" type="primary" onClick={() => setAddModalVisible(true)}>
        Add Category
      </Button>
      <Table columns={columns} dataSource={categories} pagination={pagination} onChange={handleTableChange} />

      <AddCategoryModal visible={addModalVisible} onCancel={() => setAddModalVisible(false)} onAddCategory={handleAddCategory} />
    </div>
  );
};

export default Category;
