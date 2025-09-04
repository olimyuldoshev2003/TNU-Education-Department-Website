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
    }
  }
);

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
    }
  }
);
