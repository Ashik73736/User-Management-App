// src/components/UsersPage/UserCardGrid.js
import React from "react";
import { Card, Avatar, Button, Popconfirm, Row, Col } from "antd";

export default function UserCardGrid({ users, onEdit, onDelete }) {
  return (
    <Row gutter={[16, 16]}>
      {users.map((u) => (
        <Col key={u.id} xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Card.Meta avatar={<Avatar src={u.avatar} size={64} />} title={`${u.first_name} ${u.last_name}`} description={u.email} />
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <Button onClick={() => onEdit(u)}>Edit</Button>
              <Popconfirm title="Delete user?" onConfirm={() => onDelete(u.id)}>
                <Button danger>Delete</Button>
              </Popconfirm>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
