import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getPatients, type Patient } from "@/mockData/analytics";
import type { RootState } from "../index";

export type PatientViewMode = "grid" | "list";

export type PatientState = {
  items: Patient[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  viewMode: PatientViewMode;
  search: string;
};

const initialState: PatientState = {
  items: [],
  status: "idle",
  error: null,
  viewMode: "grid",
  search: "",
};

export const fetchPatients = createAsyncThunk("patients/fetchPatients", async () => {
  const data = await getPatients();
  return data;
});

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<PatientViewMode>) {
      state.viewMode = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load patients";
      });
  },
});

export const { setViewMode, setSearch } = patientSlice.actions;
export default patientSlice.reducer;

export const selectPatientsState = (state: RootState) => state.patients;
export const selectPatientViewMode = (state: RootState) => state.patients.viewMode;

export const selectFilteredPatients = (state: RootState) => {
  const query = state.patients.search.trim().toLowerCase();

  if (!query) return state.patients.items;

  return state.patients.items.filter((patient) =>
    [patient.name, patient.id, patient.condition, patient.doctor]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );
};
