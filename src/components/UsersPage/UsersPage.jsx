import React, { useEffect, useState } from "react";
import { Layout, Button, Row, Col, Spin, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, createUser, updateUser, deleteUser } from "../../store/users/actions";
import { setViewMode, setSearchQuery, setPage } from "../../store/users/reducer";
import UsersTable from "./UsersTable";
import UserCardGrid from "./UsersCardGrid";
import UserModal from "./UsersModal";
import SearchAndControls from "./SearchAndControls";
import { logout } from "../../store/auth/reducer";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

export default function UsersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, viewMode, searchQuery, page, pageSize } = useSelector((s) => s.users);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers()).unwrap().catch(() => {
      notification.error({ message: "Failed to load users" });
    });
  }, [dispatch]);

  const filtered = list.filter((u) => {
    const name = `${u.first_name || ""} ${u.last_name || ""}`.toLowerCase();
    return name.includes((searchQuery || "").toLowerCase());
  });

  // client-side pagination:
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const openCreate = () => {
    setEditingUser(null);
    setModalVisible(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      notification.success({ message: "Deleted" });
    } catch (err) {
      notification.error({ message: "Delete failed", description: err });
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        await dispatch(updateUser({ id: editingUser.id, userData: values })).unwrap();
        notification.success({ message: "Updated" });
      } else {
        await dispatch(createUser(values)).unwrap();
        notification.success({ message: "Created" });
      }
      setModalVisible(false);
    } catch (err) {
      notification.error({ message: "Save failed", description: err });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#fff", fontWeight: 700 }}>Users</div>
        <div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </Header>

      <Content style={{ padding: "24px" }}>
        <Row justify="space-between" style={{ marginBottom: 16 }}>
          <Col>
            <SearchAndControls />
          </Col>
          <Col>
            <Button type="primary" onClick={openCreate}>
              Create User
            </Button>
          </Col>
        </Row>

        <Spin spinning={loading}>
          {viewMode === "table" ? (
            <UsersTable
              users={pageItems}
              onEdit={handleEdit}
              onDelete={handleDelete}
              page={page}
              total={total}
              pageSize={pageSize}
              setPage={(p) => dispatch(setPage(p))}
            />
          ) : (
            <UserCardGrid users={pageItems} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </Spin>

        <UserModal visible={modalVisible} onCancel={() => setModalVisible(false)} onSubmit={handleSubmit} user={editingUser} />
      </Content>
    </Layout>
  );
}
