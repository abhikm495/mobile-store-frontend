import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu/UserMenu";
const Orders = () => {
  return (
    <Layout>
      <div className="flex">
        <UserMenu />
        <h1>Orders</h1>
      </div>
    </Layout>
  );
};
export default Orders;
