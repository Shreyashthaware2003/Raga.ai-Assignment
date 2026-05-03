import { Building2, Hospital, Users } from "lucide-react";
import { CalendarDays, Activity, Stethoscope } from "lucide-react";

export const analyticsOptions = [
    {
        title: 'Patient Analytics',
        description:
            'Individual patient health insights, vitals tracking, and treatment monitoring',
        icon: Users,
        href: `patient-details`,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        features: [
            'Vital Signs Tracking',
            'Medical History',
            'Treatment Plans',
            'Risk Alerts',
        ],
    },
    {
        title: 'Department Analytics',
        description:
            'Department-level performance, patient flow, and operational efficiency',
        icon: Building2,
        href: `department-details`,
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        features: [
            'Bed Occupancy Rate',
            'Admission & Discharge Trends',
            'Staff Utilization',
            'Department KPIs',
        ],
    },
    {
        title: 'Hospital Analytics',
        description:
            'Hospital-wide insights, resource utilization, and strategic decision-making',
        icon: Hospital,
        href: `hospital-details`,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        features: [
            'Patient Flow Overview',
            'Revenue & Billing Insights',
            'Resource Allocation',
            'Quality Metrics',
        ],
    },
];



export const healthcareUpcoming = {
    highlight: {
        title: "AI Patient Monitoring",
        description:
            "Track patient vitals in real-time and receive intelligent alerts for critical conditions.",
        cta: "Enable Monitoring",
        icon: Activity,
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