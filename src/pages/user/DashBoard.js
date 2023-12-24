import React from "react";
import Layout from "../../components/Layout/Layout";

import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu/UserMenu";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="flex">
        <UserMenu />
        <div className="flex items-center mx-auto">
          <div className="text-center bg-gradient-to-r text-black p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">User Information</h3>
            <h3 className="text-lg font-semibold mb-2">
              Name: {auth?.user?.name}
            </h3>
            <h3 className="text-lg font-semibold mb-2">
              Email: {auth?.user?.email}
            </h3>
            <h3 className="text-lg font-semibold mb-2">
              Address: {auth?.user?.address}
            </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
