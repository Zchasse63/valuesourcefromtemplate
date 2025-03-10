
import { useParams } from "react-router-dom";
import CustomerDetail from "@/pages/CustomerDetail";

// This is a wrapper around the existing CustomerDetail component
// In a real app, you might want to create a different version with admin-specific features
const AdminCustomerDetail = () => {
  const params = useParams();
  return <CustomerDetail />;
};

export default AdminCustomerDetail;
