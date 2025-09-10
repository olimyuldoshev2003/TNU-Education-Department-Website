// statesSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  getAndPaginateDepartmentsAdmin,
  getAndPaginateFacultiesAdmin,
  getAndPaginatePublicationsAdmin,
  getAndPaginateTeachersAdmin,
  getAndSearchDepartments,
  getAndSearchFaculties,
  getAndSearchPublications,
  getAndSearchTeachers,
  getDepartmentsHomePage,
  getFacultiesHomePage,
  getPublicationsHomePage,
  getTeachersHomePage,
  getUser,
  addFacultyAdmin,
  editFacultyAdmin,
  deleteFacultyAdmin, // Make sure this is imported
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

  loadingUser: boolean;
  user: any;

  loadingFacultiesAdmin: boolean;
  facultiesAdmin: any;
  loadingDepartmentsAdmin: boolean;
  departmentsAdmin: any;
  loadingTeachersAdmin: boolean;
  teachersAdmin: any;
  loadingPublicationsAdmin: boolean;
  publicationsAdmin: any;
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

  // User
  loadingUser: false,
  user: {},

  // Admin side
  loadingFacultiesAdmin: false,
  facultiesAdmin: { data: [], items: 0 },
  loadingDepartmentsAdmin: false,
  departmentsAdmin: {data: [], items: 0},
  loadingTeachersAdmin: false,
  teachersAdmin: [],
  loadingPublicationsAdmin: false,
  publicationsAdmin: [],
};

export const statesSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    // Add a reducer to manually add a faculty to the state
    addFacultyToState: (state, action) => {
      if (state.facultiesAdmin && state.facultiesAdmin.data) {
        state.facultiesAdmin.data.push(action.payload);
        state.facultiesAdmin.items += 1;
      }
    },
  },
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

    // User
    builder.addCase(getUser.pending, (state: any) => {
      state.loadingUser = true;
    });

    builder.addCase(getUser.fulfilled, (state: any, action: any) => {
      state.loadingUser = false;
      state.user = action.payload;
    });

    builder.addCase(getUser.rejected, (state: any) => {
      state.loadingUser = false;
    });

    // Faculties Admin
    builder.addCase(getAndPaginateFacultiesAdmin.pending, (state: any) => {
      state.loadingFacultiesAdmin = true;
    });

    builder.addCase(
      getAndPaginateFacultiesAdmin.fulfilled,
      (state: any, action: any) => {
        state.loadingFacultiesAdmin = false;
        state.facultiesAdmin = action.payload;
      }
    );

    builder.addCase(getAndPaginateFacultiesAdmin.rejected, (state: any) => {
      state.loadingFacultiesAdmin = false;
    });

    // Faculties Admin - Add
    builder.addCase(addFacultyAdmin.pending, (state: any) => {
      state.loadingFacultiesAdmin = true;
    });

    builder.addCase(addFacultyAdmin.fulfilled, (state: any, action: any) => {
      state.loadingFacultiesAdmin = false;
      // Add the new faculty to the current list
      if (state.facultiesAdmin && state.facultiesAdmin.data) {
        state.facultiesAdmin.data.push(action.payload);
        state.facultiesAdmin.items += 1;
      }
    });

    builder.addCase(addFacultyAdmin.rejected, (state: any) => {
      state.loadingFacultiesAdmin = false;
    });

    // Faculties Admin - Edit
    builder.addCase(editFacultyAdmin.pending, (state: any) => {
      state.loadingFacultiesAdmin = true;
    });
    builder.addCase(editFacultyAdmin.fulfilled, (state: any, action: any) => {
      state.loadingFacultiesAdmin = false;
      // Edit the faculty in the current list
      if (state.facultiesAdmin && state.facultiesAdmin.data) {
        const index = state.facultiesAdmin.data.findIndex(
          (faculty: any) => faculty.id === action.payload.id
        );
        if (index !== -1) {
          state.facultiesAdmin.data[index] = action.payload;
        }
      }
    });
    builder.addCase(editFacultyAdmin.rejected, (state: any) => {
      state.loadingFacultiesAdmin = false;
    });

    // Faculties Admin - Delete
    builder.addCase(deleteFacultyAdmin.pending, (state: any) => {
      state.loadingFacultiesAdmin = true;
    });
    builder.addCase(deleteFacultyAdmin.fulfilled, (state: any, action: any) => {
      state.loadingFacultiesAdmin = false;
      // Remove the faculty from the current list
      if (state.facultiesAdmin && state.facultiesAdmin.data) {
        state.facultiesAdmin.data = state.facultiesAdmin.data.filter(
          (faculty: any) => faculty.id !== action.payload
        );
        state.facultiesAdmin.items -= 1;
      }
    });
    builder.addCase(deleteFacultyAdmin.rejected, (state: any) => {
      state.loadingFacultiesAdmin = false;
    });

    // Departments Admin
    builder.addCase(getAndPaginateDepartmentsAdmin.pending, (state: any) => {
      state.loadingDepartmentsAdmin = true;
    });

    builder.addCase(
      getAndPaginateDepartmentsAdmin.fulfilled,
      (state: any, action: any) => {
        state.loadingDepartmentsAdmin = false;
        state.departmentsAdmin = action.payload;
      }
    );

    builder.addCase(getAndPaginateDepartmentsAdmin.rejected, (state: any) => {
      state.loadingDepartmentsAdmin = false;
    });

    // Teachers Admin
    builder.addCase(getAndPaginateTeachersAdmin.pending, (state: any) => {
      state.loadingTeachersAdmin = true;
    });

    builder.addCase(
      getAndPaginateTeachersAdmin.fulfilled,
      (state: any, action: any) => {
        state.loadingTeachersAdmin = false;
        state.teachersAdmin = action.payload;
      }
    );

    builder.addCase(getAndPaginateTeachersAdmin.rejected, (state: any) => {
      state.loadingTeachersAdmin = false;
    });

    // Publications Admin
    builder.addCase(getAndPaginatePublicationsAdmin.pending, (state: any) => {
      state.loadingPublicationsAdmin = true;
    });

    builder.addCase(
      getAndPaginatePublicationsAdmin.fulfilled,
      (state: any, action: any) => {
        state.loadingPublicationsAdmin = false;
        state.publicationsAdmin = action.payload;
      }
    );

    builder.addCase(getAndPaginatePublicationsAdmin.rejected, (state: any) => {
      state.loadingPublicationsAdmin = false;
    });
  },
});

// Export the new action
export const { addFacultyToState } = statesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.states;

export default statesSlice.reducer;
