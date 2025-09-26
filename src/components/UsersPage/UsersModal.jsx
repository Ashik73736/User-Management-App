import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

export default function UserModal({ visible, onCancel, onSubmit, user }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar || "",
      });
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (err) {
      // validation failed
    }
  };

  return (
    <Modal title={user ? "Edit User" : "Create New User"} visible={visible} onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: "Please enter first name" }]}>
          <Input placeholder="Please enter first name" />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: "Please enter last name" }]}>
          <Input placeholder="Please enter last name" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter email" }, { type: "email" }]}>
          <Input placeholder="Please enter email" />
        </Form.Item>
        <Form.Item name="avatar" label="Profile Image Link" rules={[]}>
          <Input placeholder="Please enter profile image link" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
