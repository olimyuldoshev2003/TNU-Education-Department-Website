import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  getAndSearchDepartments,
  getAndSearchFaculties,
  getAndSearchPublications,
  getAndSearchTeachers,
  getDepartmentsHomePage,
  getFacultiesHomePage,
  getPublicationsHomePage,
  getTeachersHomePage,
} from "../api/api";

const initialState = {
  // Home Page
  loadingFacultiesHome: false,
  facultiesHome: [],
  loadingDepartmentsHome: false,
  departmentsHome: [],
  loadingTeachersHome: false,
  teachersHome: [],
  loadingPublicationsHome: false,
  publicationsHome: [],
  // Out of Home Page
  loadingFaculties: false,
  faculties: [],
  loadingDepartments: false,
  departments: [],
  loadingTeachers: false,
  teachers: [],
  loadingPublications: false,
  publications: [],
};

export const statesSlice = createSlice({
  name: "states",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Faculties Home
    builder.addCase(getFacultiesHomePage.pending, (state) => {
      state.loadingFacultiesHome = true;
    });
    builder.addCase(getFacultiesHomePage.fulfilled, (state, action) => {
      state.loadingFacultiesHome = false;
      state.facultiesHome = action.payload;
    });
    builder.addCase(getFacultiesHomePage.rejected, (state) => {
      state.loadingFacultiesHome = false;
    });

    // Departments Home
    builder.addCase(getDepartmentsHomePage.pending, (state) => {
      state.loadingDepartmentsHome = true;
    });
    builder.addCase(getDepartmentsHomePage.fulfilled, (state, action) => {
      state.loadingDepartmentsHome = false;
      state.departmentsHome = action.payload;
    });
    builder.addCase(getDepartmentsHomePage.rejected, (state) => {
      state.loadingDepartmentsHome = false;
    });

    // Teachers Home
    builder.addCase(getTeachersHomePage.pending, (state) => {
      state.loadingTeachersHome = true;
    });
    builder.addCase(getTeachersHomePage.fulfilled, (state, action) => {
      state.loadingTeachersHome = false;
      state.teachersHome = action.payload;
    });
    builder.addCase(getTeachersHomePage.rejected, (state) => {
      state.loadingTeachersHome = false;
    });

    // Publications Home
    builder.addCase(getPublicationsHomePage.pending, (state) => {
      state.loadingPublicationsHome = true;
    });
    builder.addCase(getPublicationsHomePage.fulfilled, (state, action) => {
      state.loadingPublicationsHome = false;
      state.publicationsHome = action.payload;
    });
    builder.addCase(getPublicationsHomePage.rejected, (state) => {
      state.loadingPublicationsHome = false;
    });

    // Faculties
    builder.addCase(getAndSearchFaculties.pending, (state) => {
      state.loadingFaculties = true;
    });
    builder.addCase(getAndSearchFaculties.fulfilled, (state, action) => {
      state.loadingFaculties = false;
      state.faculties = action.payload;
    });
    builder.addCase(getAndSearchFaculties.rejected, (state) => {
      state.loadingFaculties = false;
    });

    // Departments
    builder.addCase(getAndSearchDepartments.pending, (state) => {
      state.loadingDepartments = true;
    });
    builder.addCase(getAndSearchDepartments.fulfilled, (state, action) => {
      state.loadingDepartments = false;
      state.departments = action.payload;
    });
    builder.addCase(getAndSearchDepartments.rejected, (state) => {
      state.loadingDepartments = false;
    });

    // Teachers
    builder.addCase(getAndSearchTeachers.pending, (state) => {
      state.loadingTeachers = true;
    });
    builder.addCase(getAndSearchTeachers.fulfilled, (state, action) => {
      state.loadingTeachers = false;
      state.teachers = action.payload;
    });
    builder.addCase(getAndSearchTeachers.rejected, (state) => {
      state.loadingTeachers = false;
    });

    // Publications
    builder.addCase(getAndSearchPublications.pending, (state) => {
      state.loadingPublications = true;
    });
    builder.addCase(getAndSearchPublications.fulfilled, (state, action) => {
      state.loadingPublications = false;
      state.publications = action.payload;
    });
    builder.addCase(getAndSearchPublications.rejected, (state) => {
      state.loadingPublications = false;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.states;

export default statesSlice.reducer;
