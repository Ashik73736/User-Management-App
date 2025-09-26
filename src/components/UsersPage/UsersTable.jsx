// src/components/UsersPage/UsersTable.js
import React from "react";
import { Table, Avatar, Button, Popconfirm } from "antd";

export default function UsersTable({ users, onEdit, onDelete, page, total, pageSize, setPage }) {
  const columns = [
    { title: "", dataIndex: "avatar", render: (a) => <Avatar src={a} />, width: 80 },
    { title: "Email", dataIndex: "email" },
    { title: "First Name", dataIndex: "first_name" },
    { title: "Last Name", dataIndex: "last_name" },
    {
      title: "Action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm title="Delete user?" onConfirm={() => onDelete(record.id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={users}
      pagination={{
        current: page,
        total,
        pageSize,
        onChange: setPage,
        showSizeChanger: false,
      }}
    />
  );
}
