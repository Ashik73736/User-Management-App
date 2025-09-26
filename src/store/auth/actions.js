import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", {
        email: email,
        password: password,
      });
      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.error || err.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);
