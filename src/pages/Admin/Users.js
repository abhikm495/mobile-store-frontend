import AdminMenu from "../../components/Layout/AdminMenu/AdminMenu";
import Layout from "../../components/Layout/Layout";

const Users = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminMenu />
        <h1>Users</h1>
      </div>
    </Layout>
  );
};
export default Users;
