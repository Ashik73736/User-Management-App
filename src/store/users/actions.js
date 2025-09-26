// src/store/users/actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/**
 * fetchAllUsers:
 * reqres provides paginated users. We'll fetch all pages and return consolidated list.
 */
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const first = await api.get("/users", { params: { page: 1 } });
      const totalPages = first.data.total_pages || 1;
      let users = [...first.data.data];

      // fetch remaining pages if any
      for (let p = 2; p <= totalPages; p++) {
        const res = await api.get("/users", { params: { page: p } });
        users = users.concat(res.data.data);
      }

      return users;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to fetch users");
    }
  }
);

export const createUser = createAsyncThunk(
  "users/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/users", payload);
      // reqres returns created object (id, createdAt). It doesn't return typical user fields,
      // so we'll merge payload + id to reflect on client.
      return { id: res.data.id || `tmp-${Date.now()}`, ...payload };
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to create user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      await api.put(`/users/${id}`, userData);
      // reqres returns updatedAt, but again we'll return merged object for client state update
      return { id, ...userData };
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to update user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to delete user");
    }
  }
);
