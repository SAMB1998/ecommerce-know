import { fetchUsers } from "@/actions/admin.actions";
const page = async () => {
  const users = await fetchUsers();
  return (
    <section className="p-4 min-h-screen">
      <h1 className="text-3xl text-center">Users Page</h1>
      <table className="w-full border-collapse border border-gray-200 my-8 rounded-lg">
        <thead className="bg-gray-100 rounded-t-lg">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Orders
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {user.orders.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default page;
