// api/api.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFacultiesHomePage = createAsyncThunk(
  "api/getFacultiesMainPage",
  async function () {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/faculties?_limit=7`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getDepartmentsHomePage = createAsyncThunk(
  "api/getDepartmentsMainPage",
  async function () {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/departments?_limit=7`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getTeachersHomePage = createAsyncThunk(
  "api/getTeachersHomePage",
  async function () {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/teachers?_limit=7`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getPublicationsHomePage = createAsyncThunk(
  "api/getPublicationsHomePage",
  async function () {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/publications?_limit=7`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAndSearchFaculties = createAsyncThunk(
  "api/getAndSearchFaculties",
  async function (obj: any) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/faculties?_page=${obj.page}&_per_page=${obj.rowsPerPage}`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAndSearchDepartments = createAsyncThunk(
  "api/getAndSearchDepartments",
  async function (obj: any) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/departments?_page=${obj.page}&_per_page=${obj.rowsPerPage}`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAndSearchTeachers = createAsyncThunk(
  "api/getAndSearchTeachers",
  async function (obj: any) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/teachers?_page=${obj.page}&_per_page=${obj.rowsPerPage}`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAndSearchPublications = createAsyncThunk(
  "api/getAndSearchPublications",
  async function (obj: any) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/publications?_page=${obj.page}&_per_page=${obj.rowsPerPage}`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getUser = createAsyncThunk("api/getUser", async function () {
  try {
    const { data } = await axios.get(`http://localhost:3000/user`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getAndPaginateFacultiesAdmin = createAsyncThunk(
  "api/getAndPaginateFacultiesAdmin",
  async function (obj: any) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/faculties?_page=${obj.page}&_per_page=${obj.rowsPerPage}`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// FIXED: This was the main issue - now returns the created faculty
export const addFacultyAdmin = createAsyncThunk(
  "api/addFacultyAdmin",
  async function (obj: any) {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/faculties`,
        obj.newFaculty
      );

      // Return the created faculty data
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// PUT - Edit a faculty
export const editFacultyAdmin = createAsyncThunk(
  "api/editFacultyAdmin",
  async function (obj: any) {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/faculties/${obj.id}`,
        obj.updatedFaculty
      );
      // Return the updated faculty data
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// DELETE - Delete a faculty
export const deleteFacultyAdmin = createAsyncThunk(
  "api/deleteFacultyAdmin",
  async function (id: string) {
    try {
      await axios.delete(`http://localhost:3000/faculties/${id}`);
      // Return the ID of the deleted faculty
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAndPaginateDepartmentsAdmin = createAsyncThunk(
  "api/getAndPaginateDepartmentsAdmin",
  async function (obj: any) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/departments?_page=${obj.page}&_per_page=${obj.rowsPerPage}`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAndPaginateTeachersAdmin = createAsyncThunk(
  "api/getAndPaginateTeachersAdmin",
  async function (obj: any) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/teachers?_page=${obj.page}&_per_page=${obj.rowsPerPage}`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAndPaginatePublicationsAdmin = createAsyncThunk(
  "api/getAndPaginatePublicationsAdmin",
  async function (obj: any) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/publications?_page=${obj.page}&_per_page=${obj.rowsPerPage}`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
