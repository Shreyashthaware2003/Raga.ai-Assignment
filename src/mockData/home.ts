// src/services/mockData.ts

export type PatientStatus = "Active" | "Inactive" | "Critical";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  status: PatientStatus;
  lastVisit: string;
  condition: string;
  doctor: string;
}

// ---------------- PATIENT DATA (UI DATASET - SMALL) ----------------

const conditions = ["Diabetes", "Hypertension", "Asthma", "Arthritis"];
const doctors = ["Dr. Mehta", "Dr. Iyer", "Dr. Shah", "Dr. Patel"];

// Keep this small for performance (UI rendering)
export const patients: Patient[] = Array.from({ length: 120 }, (_, i) => ({
  id: `P-${1000 + i}`,
  name: `Patient ${i + 1}`,
  age: 20 + (i % 50),
  gender: i % 2 === 0 ? "Male" : "Female",
  status:
    i % 12 === 0
      ? "Critical"
      : i % 4 === 0
        ? "Inactive"
        : "Active",
  lastVisit: `2026-04-${(i % 28) + 1}`,
  condition: conditions[i % conditions.length],
  doctor: doctors[i % doctors.length],
}));

// ---------------- DASHBOARD (LAKH SCALE) ----------------

export type StatId = "total" | "active" | "critical" | "new";

export interface Stat {
  id: StatId;
  label: string;
  value: number;
}

// Large-scale SaaS numbers (realistic distribution)
const TOTAL_PATIENTS = 125430; // 1.25 lakh
const ACTIVE_CASES = 84210;
const CRITICAL_CASES = 3120;
const NEW_PATIENTS = 1845;

export const dashboardStats: Stat[] = [
  {
    id: "total",
    label: "Total Patients",
    value: TOTAL_PATIENTS,
  },
  {
    id: "active",
    label: "Active Cases",
    value: ACTIVE_CASES,
  },
  {
    id: "critical",
    label: "Critical Cases",
    value: CRITICAL_CASES,
  },
  {
    id: "new",
    label: "New Patients",
    value: NEW_PATIENTS,
  },
];

// ---------------- ANALYTICS (MATCH SCALE) ----------------

export const patientGrowth = [
  { month: "Jan", patients: 85000 },
  { month: "Feb", patients: 95000 },
  { month: "Mar", patients: 110000 },
  { month: "Apr", patients: TOTAL_PATIENTS },
];

export const visitsPerDay = [
  { day: "Mon", visits: 3200 },
  { day: "Tue", visits: 4100 },
  { day: "Wed", visits: 3800 },
  { day: "Thu", visits: 4500 },
  { day: "Fri", visits: 3900 },
];

// ---------------- SERVICES (API SIMULATION) ----------------

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getPatients = async (): Promise<Patient[]> => {
  await delay(500);
  return patients;
};

export const getDashboardStats = async (): Promise<Stat[]> => {
  await delay(300);
  return dashboardStats;
};

export const getPatientGrowth = async () => {
  await delay(400);
  return patientGrowth;
};

export const getVisitsPerDay = async () => {
  await delay(400);
  return visitsPerDay;
};