import projectData from "@/sanity/schemaTypes/projectData";

interface ClientInfo {
  photo: string;
  name: string;
  email: string;
}

interface Project {
  id: string;
  title: string;
  client: ClientInfo;
  status: "ongoing" | "completed";
  date: {
    start: string; // ISO date string
    end: string; // ISO date string
  };
  budget: number; // in USD for example
  description: string;
}

interface CreateProject {
  client: { id: string; name: string; email: string }[];
  project: string;
  description: string;
  status: "Ongoing" | "Completed" | "Pending";
  startDate: Date;
  endDate: Date;
  budget: number;
  currency: string;
}

interface InvitesApi {
  id: string;
  clientEmail: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired";
}
interface Invite {
  _id: string;
  email: string;
  expiredAt: string; // ISO date string
  used: "used" | "not-used";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  sendDate: string; // ISO date string
  isRegister: "yes" | "no";
  status: "expire" | "active" | "pending"; // keep pending if backend might use it
}
interface InviteResponse {
  data: Invite[];
}


interface InvoiceType {
  invoiceId: string;
  client: {
    picture: string;
    name: string;
    email: string;
  };
  project: string;
  amount: string;
  status: "paid" | "unpaid";
}
export interface Project {
  _id: string;
  title: string;
  description: string;
  clientId: string | null;
}

export interface Invoice {
  _id: string;
  projectId: Project;
  amount: number;
  status: "unpaid" | "paid"; // you can expand as needed
  issueDate: string; // ISO date string
  dueDate: string; // ISO date string
  isDeleted: string;
  description: string;
  currency: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface InvoiceResponse {
  data: Invoice[];
}
interface EditInvoiceBody {
  amount: number;
  status: "unpaid" | "paid" | "pending";
  dueDate: string; // ISO date string
  description: string;
  currency: string;
}

// types/api.types.ts
// CLient API response types
interface ClientProject {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number; // in USD for example
  status: "ongoing" | "completed";
}
interface ClientProfile {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  companyName: string;
  companyLogo: string;
  address: string;
  phoneNo: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



// Meta type
export interface Meta {

  totalitems: number;
  itemsperpage: number;
  currentpage: number;
  totalpage: number;
  hasMore?: boolean;
  nextCursor?: string;
}

// Generic API response type
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  meta?: Meta | null;
}

// Options for wrapper
export interface ApiWrapperOptions {
  showToast?: boolean; // default = false
}

// Wrapper return type
export interface ApiWrapperResult<T> {
  data: T | null;
  error: string | null;
  success: boolean;
  meta?: Meta | null;
}

interface CreateClientBody {
  name: string;
  email: string;
  password: string;
  companyName: string;
  address: string;
  phoneNo: string;
  role: "admin";
}

interface UserApiResponse {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  companyName: string;
  address: string;
  phoneNo: string;
  role: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  companyLogo: string;
  __v: number;
}

type GetAllClientsApiResponse = UserApiResponse[];

interface RegisterClientBody {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  companyName: string;
  companyLogo: string;
  address: string;
  phoneNo: string;
  role: string;
  token: string;
}
interface CreateInvoiceBody {
  projectId: string;
  amount: number;
  status: "unpaid" | "paid" | "pending"; // restrict to valid values
  issueDate: string; // e.g. "2025-08-20"
  dueDate: string; // e.g. "2025-09-05"
  description: string;
  currency: string; // could be restricted to "USD" | "EUR" | ...
}

interface CreateProjectBody {
  clientId: string;
  title: string;
  description: string;
  status: string;
  budget: number;
  currency: string;
  startDate: string;
  endDate: string;
}

type client = {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
}
interface PaymentRequestData {
  amount: number;
  projectName: string;
  id: string;
}
interface PaymentResponse {
  id: string;
  url: string;
}
interface InvoiceRequest {
  _id: string;
}
interface ProjectApiResponse {
  clientId: client | null;
  title: string;
  description: string;
  status: string;
  budget: number;
  isDeleted: boolean;
  currency: string;
  startDate: string;
  endDate: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface InsightsApiResponse {
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  pendingProjects: number;
}

interface UpdateAdminBody {
  companyName: string;
  address: string;
  phoneNo: string;
  name: string;
}

interface AdminInsightsApiResponse {
  clients: number;
  projects: {
    total: number;
    completed: number;
    ongoing: number;
  };
  invoices: {
    total: number;
    completed: number;
    pending: number;
  };
  payments: {
    total: number;
    completed: number;
    pending: number;
  };
  invites: {
    total: number;
    accepted: number;
    pending: number;
    expired: number;
  };
}


// Chat Api Types goes here
interface ConversationApiResponse {
  clientLastSeen: string | null;
  adminLastSeen: string | null;
  _id: string;
  clientId: {
    _id: string;
    name: string;
    profilePic: string;
  };
  lastMessage: {
    _id: string;
    type: "text" | "file";
    content: string;
    status: "sent" | "received" | "read";
    createdAt: string;
  };
  adminUnread: number;
  clientUnread: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AllConversationApiResponse {
  _id: string;
  clientId: {
    _id: string;
    name: string;
    email: string;
    profilePic: string;
  };
  lastMessage: {
    _id: string;
    conversationId: string;
    senderId: {
      _id: string;
      name: string;
      role: string;
    };

    type: "text" | "file" | "video" | "image" | "project" | "invoice";
    content: string;
    metaData: {
      text: string;
    };
    status: "sent" | "received" | "read";
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  clientLastSeen: string | null;
  adminLastSeen: string | null;
  adminUnread: number;
  clientUnread: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



interface MessageType {
  _id: string;
  conversationId: string;
  senderId: {
    _id: string;
    name: string;
    profilePic: string;
    role: string;
  };
  type: "text" | "file" | "video";
  content: string;
  fileUrl: string;
  metadata: {
    text: string;
  };
  status: "sent" | "received" | "read";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Client {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
}

export interface GetAllMessageOfConversation {
  messages: Message[];
  client: Client;
}


interface ProjectContentMessage {
  _id: string;
  name: string;
}

interface InvoiceContentMessage {
  _id: string;
}

interface InvoiceContentRenderMessage {
  _id: string;
  status: string;
  description: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  adminLink: string;
  clientLink: string;
  projectName: string;
  projectDescription: string;
}
