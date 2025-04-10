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

export interface IStates {
  loadingFacultiesHome: boolean;
  facultiesHome: any;
  loadingDepartmentsHome: boolean;
  departmentsHome: any;
  loadingTeachersHome: boolean;
  teachersHome: any;
  loadingPublicationsHome: boolean;
  publicationsHome: any;

  loadingFaculties: boolean;
  faculties: any;
  loadingDepartments: boolean;
  departments: any;
  loadingTeachers: boolean;
  teachers: any;
  loadingPublications: boolean;
  publications: any;
}

const initialState: IStates = {
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
  extraReducers(builder: any) {
    // Faculties Home
    builder.addCase(getFacultiesHomePage.pending, (state: any) => {
      state.loadingFacultiesHome = true;
    });
    builder.addCase(
      getFacultiesHomePage.fulfilled,
      (state: any, action: any) => {
        state.loadingFacultiesHome = false;
        state.facultiesHome = action.payload;
      }
    );
    builder.addCase(getFacultiesHomePage.rejected, (state: any) => {
      state.loadingFacultiesHome = false;
    });

    // Departments Home
    builder.addCase(getDepartmentsHomePage.pending, (state: any) => {
      state.loadingDepartmentsHome = true;
    });
    builder.addCase(
      getDepartmentsHomePage.fulfilled,
      (state: any, action: any) => {
        state.loadingDepartmentsHome = false;
        state.departmentsHome = action.payload;
      }
    );
    builder.addCase(getDepartmentsHomePage.rejected, (state: any) => {
      state.loadingDepartmentsHome = false;
    });

    // Teachers Home
    builder.addCase(getTeachersHomePage.pending, (state: any) => {
      state.loadingTeachersHome = true;
    });
    builder.addCase(
      getTeachersHomePage.fulfilled,
      (state: any, action: any) => {
        state.loadingTeachersHome = false;
        state.teachersHome = action.payload;
      }
    );
    builder.addCase(getTeachersHomePage.rejected, (state: any) => {
      state.loadingTeachersHome = false;
    });

    // Publications Home
    builder.addCase(getPublicationsHomePage.pending, (state: any) => {
      state.loadingPublicationsHome = true;
    });
    builder.addCase(
      getPublicationsHomePage.fulfilled,
      (state: any, action: any) => {
        state.loadingPublicationsHome = false;
        state.publicationsHome = action.payload;
      }
    );
    builder.addCase(getPublicationsHomePage.rejected, (state: any) => {
      state.loadingPublicationsHome = false;
    });

    // Faculties
    builder.addCase(getAndSearchFaculties.pending, (state: any) => {
      state.loadingFaculties = true;
    });
    builder.addCase(
      getAndSearchFaculties.fulfilled,
      (state: any, action: any) => {
        state.loadingFaculties = false;
        state.faculties = action.payload;
      }
    );
    builder.addCase(getAndSearchFaculties.rejected, (state: any) => {
      state.loadingFaculties = false;
    });

    // Departments
    builder.addCase(getAndSearchDepartments.pending, (state: any) => {
      state.loadingDepartments = true;
    });
    builder.addCase(
      getAndSearchDepartments.fulfilled,
      (state: any, action: any) => {
        state.loadingDepartments = false;
        state.departments = action.payload;
      }
    );
    builder.addCase(getAndSearchDepartments.rejected, (state: any) => {
      state.loadingDepartments = false;
    });

    // Teachers
    builder.addCase(getAndSearchTeachers.pending, (state: any) => {
      state.loadingTeachers = true;
    });
    builder.addCase(
      getAndSearchTeachers.fulfilled,
      (state: any, action: any) => {
        state.loadingTeachers = false;
        state.teachers = action.payload;
      }
    );
    builder.addCase(getAndSearchTeachers.rejected, (state: any) => {
      state.loadingTeachers = false;
    });

    // Publications
    builder.addCase(getAndSearchPublications.pending, (state: any) => {
      state.loadingPublications = true;
    });
    builder.addCase(
      getAndSearchPublications.fulfilled,
      (state: any, action: any) => {
        state.loadingPublications = false;
        state.publications = action.payload;
      }
    );
    builder.addCase(getAndSearchPublications.rejected, (state: any) => {
      state.loadingPublications = false;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.states;

export default statesSlice.reducer;
