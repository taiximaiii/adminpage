
import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const AddCategoryModal = ({ visible, onCancel, onAddCategory }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      onAddCategory(values);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <Modal
      title="Add Category"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" loading={loading} onClick={handleOk}>
          Add
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="addCategoryForm">
        <Form.Item
          name="type"
          label="Category Type"
          rules={[
            {
              required: true,
              message: 'Please enter the category type!',
            },
          ]}
        >
          <Input placeholder="Enter category type" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
