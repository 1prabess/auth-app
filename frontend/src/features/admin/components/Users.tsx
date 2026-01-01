import { useUsers } from "../hooks/useUsers";

const Users = () => {
  const { data: users, isPending } = useUsers();

  if (isPending) {
    return <div className=" text-gray-500 text-sm">Loading users...</div>;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-6">Users</h1>

      <div className="overflow-x-auto  border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50  border text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Verified</th>
              <th className="px-4 py-3">Created At</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {user.email}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.verified
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.verified ? "Verified" : "Unverified"}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
