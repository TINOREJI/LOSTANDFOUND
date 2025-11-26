// src/services/api.js
import axios from "axios";

// Base URL — set in .env or fallback
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor: return only data, clean errors
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
   1. CATEGORIES
   ======================================== */
export const getCategories = async () => {
  return await api.get("/category");
};

/* ========================================
   2. QUESTIONNAIRE BY CATEGORY ID
   ======================================== */
export const getQuestionnaire = async (categoryId) => {
  if (!categoryId) throw new Error("Category ID is required");
  return await api.get(`/questionnaire/${categoryId}`);
};

/* ========================================
   3. SUBMIT FOUND ITEM (with photo)
   ======================================== */
export const submitFoundItem = async (formData) => {
  if (!(formData instanceof FormData)) {
    throw new Error("submitFoundItem expects a FormData object");
  }
  return await api.post("/item/found", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 30000, // Allow large image
  });
};

/* ========================================
   4. MATCH LOST ITEM (search + similarity score)
   ======================================== */
export const matchLostItem = async ({ categoryId, claimantAnswers }) => {
  if (!categoryId || !claimantAnswers) {
    throw new Error("categoryId and claimantAnswers are required");
  }
  return await api.post("/item/match/lost", {
    categoryId,
    claimantAnswers,
  });
};

/* ========================================
   5. GET ALL FOUND ITEMS (optional: for admin)
   ======================================== */
export const getAllFoundItems = async () => {
  return await api.get("/item");
};

/* ========================================
   6. GET ITEM BY ID (for details page)
   ======================================== */
export const getItemById = async (id) => {
  if (!id) throw new Error("Item ID is required");
  return await api.get(`/item/${id}`);
};

/* ========================================
   7. CLAIM ITEM (future)
   ======================================== */
export const claimItem = async (itemId, claimantData) => {
  if (!itemId || !claimantData) throw new Error("itemId and claimantData required");
  return await api.post(`/item/${itemId}/claim`, claimantData);
};

/* ========================================
   8. AUTH (optional)
   ======================================== */
export const loginUser = async (credentials) => {
  return await api.post("/auth/login", credentials);
};

export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

/* ========================================
   9. CLOUDINARY IMAGE UPLOAD (optional fallback)
   ======================================== */
export const uploadToCloudinary = async (file) => {
  const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
  const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD;

  if (!preset || !cloud) {
    throw new Error("Cloudinary config missing in .env");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
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