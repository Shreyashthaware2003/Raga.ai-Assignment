import { BellRing, ChartSpline, ShieldCheck, Users } from "lucide-react";
import { CalendarDays, Activity, Stethoscope } from "lucide-react";

export const analyticsOptions = [
    {
        title: 'Analytics Overview',
        description:
            'Track growth, visits, and treatment-time insights from a single analytics module',
        icon: ChartSpline,
        href: `analytics`,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        cta: 'Open Analytics',
        features: [
            'Patient Growth Trends',
            'Visits Per Day',
            'Department Distribution',
            'Average Treatment Time',
        ],
    },
    {
        title: 'Patient Registry',
        description:
            'Browse patient records with search and switch between grid and list views',
        icon: Users,
        href: `patient-details`,
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        cta: 'Open Patient Details',
        features: [
            'Grid/List Toggle',
            'Responsive Patient Cards',
            'Search by Name/ID/Doctor',
            'Status Badges & Last Visit',
        ],
    },
    {
        title: 'Auth & Alerts Demo',
        description:
            'Firebase login/session flow with local notification trigger for critical patient alerts',
        icon: BellRing,
        href: `patient-details`,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20',
        cta: 'Trigger Alerts',
        features: [
            'Firebase Authentication',
            'Protected Routes',
            'Service Worker Registered',
            'Local Notification Use Case',
        ],
    },
];



export const healthcareUpcoming = {
    highlight: {
        title: "Role-Based Access Control",
        description:
            "Add role-specific access for Admin, Doctor, and Operations users across dashboard modules.",
        cta: "Configure Roles",
        icon: ShieldCheck,
    },

    items: [
        {
            label: "Today",
            date: "May 3",
            title: "Cardiology Consultation",
            subtitle: "Dr. Sharma • 10:00 AM",
            action: "View Details",
            icon: Stethoscope,
        },
        {
            label: "Tomorrow",
            date: "May 4",
            title: "MRI Scan Scheduled",
            subtitle: "Radiology Dept • 2:30 PM",
            action: null,
            icon: CalendarDays,
        },
        {
            label: "Wed",
            date: "May 5",
            title: "Post-Surgery Follow-up",
            subtitle: "Orthopedics • 11:00 AM",
            action: "Prepare Report",
            icon: Activity,
        },
    ],
};
