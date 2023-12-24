import AdminMenu from "../../components/Layout/AdminMenu/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="flex ">
        <AdminMenu />
        <div className="flex items-center mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Name:{auth?.user?.name}</h3>
            <h3 className="text-lg font-semibold">Email:{auth?.user?.email}</h3>
            <h3 className="text-lg font-semibold">
              Address:{auth?.user?.address}
            </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default AdminDashboard;
