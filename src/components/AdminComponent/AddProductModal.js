// AddProductModal.js
import React, { useState } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { addProductApi } from '../../service/product';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddProductModal = ({ visible, onCancel, fetchProducts }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('file', file.originFileObj);
      });
      formData.append('title', values.title);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('categoryId', values.categoryId);
      formData.append('sizeIds', values.sizeIds);

      await addProductApi(formData);

      form.resetFields();
      setFileList([]);
      fetchProducts();
      onCancel();
      message.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
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
    <Modal title="Add Product" visible={visible} onOk={handleAdd} onCancel={handleCancel}>
      <Form form={form} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter the price' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Please select the category' }]}>
          <Select placeholder="Select Category">
            <Option value="1">Man</Option>
            <Option value="2">Women</Option>
            <Option value="3">Kid</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Sizes" name="sizeIds" rules={[{ required: true, message: 'Please select the sizes' }]}>
          <Select mode="multiple" placeholder="Select Sizes">
            <Option value="1">S</Option>
            <Option value="2">M</Option>
            <Option value="3">L</Option>
          </Select>
        </Form.Item>
        <Form.Item label="File" name="file" rules={[{ required: true, message: 'Please upload an image' }]}>
          <Upload
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

export default AddProductModal;
