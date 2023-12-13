// User.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal,message} from 'antd';
import './User.css';
import { getAllUserApi, deleteUserApi } from '../../service/user';
import AddUserModal from './AddUserModal';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const User = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const avatarUrl = "https://storage.googleapis.com/shop-5320d.appspot.com/img_users/avatar.jpg"
 
  const fetchUsers = async () => {
    try {
      const data = await getAllUserApi();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const showDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setDeleteModalVisible(true);
  };

  const showViewDetailModal = (userId) => {
    setSelectedUserId(userId);

    const selectedUser = users.find((user) => user.id === userId);

    Modal.info({
      title: 'User Details',
      content: (
        <div>
          <p><strong>Username:</strong> {selectedUser.username}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Phone Number:</strong> {selectedUser.phoneNumber}</p>
          <p><strong>Image:</strong> <img src={selectedUser.image || avatarUrl} alt="User Avatar" style={{ width: '50%'}} /></p>
        </div>
      ),
      onOk() {
      
      },
    });
  };

  const handleDelete = async () => {
    try {
      await deleteUserApi(selectedUserId);

      fetchUsers();
      setDeleteModalVisible(false);
      message.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image || avatarUrl} alt="User Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', marginLeft: '10px' }} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
        <Button
          icon={<EyeOutlined />}
          className="view-button"
          onClick={() => showViewDetailModal(record.id)}
        />
        <Button
          icon={<DeleteOutlined />}
          className="delete-button"
          onClick={() => showDeleteModal(record.id)}
        />
      </span>
      ),
    },
  ];

  return (
    <div>

      <Button className = "btn-add" type="primary" onClick={() => setAddModalVisible(true)}>
        Add User
      </Button>
      <Table columns={columns} dataSource={users} pagination={pagination} onChange={handleTableChange} />

      <Modal title="Confirm Delete" visible={deleteModalVisible} onOk={handleDelete} onCancel={handleCancelDelete}>
        <p>Are you sure you want to delete this user?</p>
      </Modal>

      <AddUserModal visible={addModalVisible} onCancel={() => setAddModalVisible(false)} fetchUsers={fetchUsers} />
    </div>
  );
};

export default User;
