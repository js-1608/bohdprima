import AdminDashboard from "../../../../views/admin/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard | Bodh Prima",
  description: "Bodh Prima admin dashboard for managing blogs, leads, and digital business cards.",
  keywords: "dashboard, manage content, leads panel",
};

export default function Page() {
  return <AdminDashboard />;
}
