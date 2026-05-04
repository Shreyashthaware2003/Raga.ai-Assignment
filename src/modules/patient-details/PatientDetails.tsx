import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPatients,
  selectFilteredPatients,
  selectPatientsState,
  setSearch,
  setViewMode,
} from "@/store/slices/patientSlice";
import type { Patient, PatientStatus } from "@/mockData/analytics";
import { LayoutGrid, List } from "lucide-react";

import { BellRing } from "lucide-react";
import { toast } from "sonner";
import { sendLocalNotification } from "@/services/notifications";

const statusStyles: Record<PatientStatus, string> = {
  Active: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-300",
  Inactive:
    "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300",
  Critical: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-300",
};

export default function PatientDetails() {
  const dispatch = useAppDispatch();
  const { status, error, viewMode, search } = useAppSelector(selectPatientsState);
  const patients = useAppSelector(selectFilteredPatients);
  const isGridView = viewMode === "grid";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [dispatch, status]);

  const handleNotificationDemo = async () => {
    const ok = await sendLocalNotification(
      "Critical Patient Alert",
      "Patient P-1024 requires immediate attention."
    );

    if (ok) {
      toast.success("Notification triggered");
    } else {
      toast.error("Notification blocked or unsupported by this browser");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Patient Details</h1>
          <p className="text-muted-foreground">
            Search and view patient records in grid or list mode.
          </p>
        </div>
        <Button type="button" variant="destructive" className="border-none bg-red-600 text-white" onClick={handleNotificationDemo}>
          <BellRing />
          Trigger Alert
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search by name, ID, condition, or doctor"
          className="sm:max-w-md border-gray-300 dark:border-[#302f2f]"
        />

        <div className="inline-flex items-center gap-2">
          <span className="mr-1 hidden text-xs text-muted-foreground sm:inline">
            View:
          </span>
          <Button
            className={`border-none ${isGridView ? 'bg-gray-200 dark:bg-[#302f2f]' : ''} `}
            type="button"
            variant={isGridView ? "outline" : "default"}
            onClick={() => dispatch(setViewMode("grid"))}
            aria-label="Grid view"
            aria-pressed={isGridView}
          >
            <LayoutGrid />
            Grid
          </Button>
          <Button
            className={`border-none ${!isGridView ? 'bg-gray-200 dark:bg-[#302f2f]' : ''} `}
            type="button"
            variant={!isGridView ? "outline" : "default"}
            onClick={() => dispatch(setViewMode("list"))}
            aria-label="List view"
            aria-pressed={!isGridView}
          >
            <List />
            List
          </Button>
        </div>
      </div>

      {status === "loading" && (
        <div
          className={
            isGridView
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-3"
          }
        >
          {Array.from({ length: 6 }, (_, idx) => (
            <Card key={idx} className="animate-pulse ring-0  bg-gray-200 dark:bg-[#302f2f]">
              <CardContent className="h-40" />
            </Card>
          ))}
        </div>
      )}

      {status === "failed" && (
        <Card>
          <CardContent className="flex flex-col items-start gap-3 p-6">
            <p className="text-sm text-red-600 dark:text-red-400">
              {error ?? "Unable to load patient records."}
            </p>
            <Button onClick={() => dispatch(fetchPatients())}>Retry</Button>
          </CardContent>
        </Card>
      )}

      {status === "succeeded" && patients.length === 0 && (
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              No patient records matched your search.
            </p>
          </CardContent>
        </Card>
      )}

      {status === "succeeded" && patients.length > 0 && isGridView && (
        <div key="grid-view" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <PatientGridCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}

      {status === "succeeded" && patients.length > 0 && !isGridView && (
        <div key="list-view" className="overflow-hidden rounded-lg border border-gray-200 dark:border-[#302f2f]">
          <div className="hidden grid-cols-8 gap-4 border-b border-gray-200 bg-muted/40 px-4 py-3 text-xs font-semibold text-muted-foreground md:grid dark:border-[#302f2f]">
            <span>ID</span>
            <span className="col-span-2">Name</span>
            <span>Age</span>
            <span>Gender</span>
            <span>Status</span>
            <span>Condition</span>
            <span>Doctor</span>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-[#302f2f]">
            {patients.map((patient) => (
              <PatientListRow key={patient.id} patient={patient} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PatientGridCard({ patient }: { patient: Patient }) {
  return (
    <Card className="card-surface ring-0">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm text-muted-foreground">{patient.id}</p>
            <h3 className="text-base font-semibold">{patient.name}</h3>
          </div>
          <Badge className={statusStyles[patient.status]}>{patient.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <Field label="Age" value={String(patient.age)} />
          <Field label="Gender" value={patient.gender} />
          <Field label="Condition" value={patient.condition} />
          <Field label="Doctor" value={patient.doctor} />
        </div>

        <p className="text-xs text-muted-foreground">
          Last Visit: {formatDate(patient.lastVisit)}
        </p>
      </CardContent>
    </Card>
  );
}

function PatientListRow({ patient }: { patient: Patient }) {
  return (
    <div className="p-4">
      <div className="hidden grid-cols-8 items-center gap-4 text-sm md:grid">
        <span className="text-muted-foreground">{patient.id}</span>
        <span className="col-span-2 font-medium">{patient.name}</span>
        <span>{patient.age}</span>
        <span>{patient.gender}</span>
        <span>
          <Badge className={statusStyles[patient.status]}>{patient.status}</Badge>
        </span>
        <span>{patient.condition}</span>
        <span>{patient.doctor}</span>
      </div>
      <div className="space-y-2 text-sm md:hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{patient.id}</p>
            <p className="font-medium">{patient.name}</p>
          </div>
          <Badge className={statusStyles[patient.status]}>{patient.status}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Age" value={String(patient.age)} />
          <Field label="Gender" value={patient.gender} />
          <Field label="Condition" value={patient.condition} />
          <Field label="Doctor" value={patient.doctor} />
        </div>
        <p className="text-xs text-muted-foreground">
          Last Visit: {formatDate(patient.lastVisit)}
        </p>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
