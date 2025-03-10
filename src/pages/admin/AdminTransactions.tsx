
import { useParams } from "react-router-dom";
import Transactions from "@/pages/Transactions";

// This is a wrapper around the existing Transactions component
// In a real app, you might want to create a different version with admin-specific features
const AdminTransactions = () => {
  return <Transactions />;
};

export default AdminTransactions;
