// AddUserModal.js
import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addUserApi } from '../../service/user';

const AddUserModal = ({ visible, onCancel, fetchUsers }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleAddUser = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const userData = new FormData();
      userData.append('username', values.username);
      userData.append('email', values.email);
      userData.append('phoneNumber', values.phoneNumber);
      userData.append('password', values.password);
      fileList.forEach((file) => {
        userData.append('file', file.originFileObj);
      });

      await addUserApi(userData);
      message.success('User added successfully!');
      form.resetFields();
      setFileList([]);
      fetchUsers(); 
      onCancel(); 
    } catch (error) {
      console.error('Error adding user:', error);
      message.error('Error adding user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Add User"
      visible={visible}
      onCancel={() => {
        form.resetFields();
        setFileList([]);
        onCancel();
      }}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleAddUser}>
          Add User
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="addUserForm">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter the username' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter the email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please enter the phone number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter the password' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: false, message: 'Please upload an image' }]}
        >
          <Upload
            name="image"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={onFileChange}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
