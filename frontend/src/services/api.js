// src/services/api.js
import axios from "axios";

// Base URL — change to your backend
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8800/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Network error. Please try again.";
    console.error("[API Error]", message, error);
    return Promise.reject(new Error(message));
  }
);

/* ========================================
   1. QUESTIONNAIRE API
   ======================================== */
export const getQuestionnaire = async (category) => {
  if (!category) throw new Error("Category is required");
  return await api.get(`/questionnaire/${category}`);
};

/* ========================================
   2. SEARCH / MATCH API
   ======================================== */
export const searchLostItems = async ({ category, answers, page = 1, limit = 10 }) => {
  if (!category || !answers) throw new Error("Category and answers required");
  return await api.post("/match/lost", {
    category,
    claimantAnswers: answers,
    page,
    limit,
  });
};

/* ========================================
   3. SUBMIT FOUND ITEM
   ======================================== */
export const submitFoundItem = async (formData) => {
  // formData should be FormData object (includes image)
  return await api.post("/item/found", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/* ========================================
   4. GET ITEM BY ID (for results)
   ======================================== */
export const getItemById = async (id) => {
  if (!id) throw new Error("Item ID required");
  return await api.get(`/item/${id}`);
};

/* ========================================
   5. CLAIM ITEM (optional)
   ======================================== */
export const claimItem = async (itemId, claimantData) => {
  return await api.post(`/item/${itemId}/claim`, claimantData);
};

/* ========================================
   6. AUTH (Login / Register) — optional
   ======================================== */
export const loginUser = async (credentials) => {
  return await api.post("/auth/login", credentials);
};

export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

/* ========================================
   7. UPLOAD IMAGE (direct to Cloudinary if needed)
   ======================================== */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Upload failed");
  return data.secure_url;
};

export default api;