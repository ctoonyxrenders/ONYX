import { InvitesApi, InvoiceType, Project } from "@/types/api";



export const invites: InvitesApi[] = [
    {
        id: "inv-001",
        clientEmail: "john.doe@example.com",
        startDate: ("2025-08-01"),
        endDate: ("2025-08-15"),
        status: "expired",
    },
    {
        id: "inv-002",
        clientEmail: "sarah.khan@example.com",
        startDate: ("2025-08-10"),
        endDate: ("2025-08-25"),
        status: "active",
    },
    {
        id: "inv-003",
        clientEmail: "michael.smith@example.com",
        startDate: ("2025-07-20"),
        endDate: ("2025-08-05"),
        status: "expired",
    },
    {
        id: "inv-004",
        clientEmail: "ayesha.ahmed@example.com",
        startDate: ("2025-08-12"),
        endDate: ("2025-08-30"),
        status: "active",
    },
    {
        id: "inv-005",
        clientEmail: "alex.jones@example.com",
        startDate: ("2025-07-15"),
        endDate: ("2025-07-31"),
        status: "expired",
    },
];

export const invoices: InvoiceType[] = [
    {
        invoiceId: "INV-1001",
        client: {
            picture: "https://avatars.githubusercontent.com/u/126343041?v=4",
            name: "John Doe",
            email: "john.doe@example.com",
        },
        project: "Website Redesign",
        amount: "$2,500",
        status: "paid",
    },
    {
        invoiceId: "INV-1002",
        client: {
            picture: "https://randomuser.me/api/portraits/women/12.jpg",
            name: "Emily Carter",
            email: "emily.carter@example.com",
        },
        project: "Mobile App Development",
        amount: "$4,800",
        status: "unpaid",
    },
    {
        invoiceId: "INV-1003",
        client: {
            picture: "https://randomuser.me/api/portraits/men/13.jpg",
            name: "Michael Brown",
            email: "michael.brown@example.com",
        },
        project: "E-commerce Platform",
        amount: "$6,200",
        status: "paid",
    },
    {
        invoiceId: "INV-1004",
        client: {
            picture: "https://randomuser.me/api/portraits/women/14.jpg",
            name: "Sophia Wilson",
            email: "sophia.wilson@example.com",
        },
        project: "SEO Optimization",
        amount: "$900",
        status: "unpaid",
    },
    {
        invoiceId: "INV-1005",
        client: {
            picture: "https://randomuser.me/api/portraits/men/15.jpg",
            name: "David Lee",
            email: "david.lee@example.com",
        },
        project: "Social Media Marketing",
        amount: "$1,500",
        status: "paid",
    }
];
