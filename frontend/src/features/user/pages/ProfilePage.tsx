import { useAuth } from "@/features/auth/hooks/useAuth";

const ProfilePage = () => {
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="py-10 text-gray-500">Loading profile...</div>;
  }

  if (!user) {
    return <div className="py-10 text-red-500">User not found</div>;
  }

  // build a JSON-like object for display
  const userJson = {
    id: user.id,
    email: user.email,
    role: user.role,
    verified: user.verified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return (
    <div className="mt-6 max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">My profile</h1>

      <div className="border border-gray-300  p-6 font-mono text-sm">
        <span className="text-gray-400">{"{"}</span>
        {Object.entries(userJson).map(([key, value], i, arr) => (
          <div key={key} className="pl-4">
            <span className="text-purple-600">"{key}"</span>:{" "}
            <span
              className={
                typeof value === "string" ? "text-green-600" : "text-blue-600"
              }
            >
              {typeof value === "string" ? `"${value}"` : value.toString()}
            </span>
            {i !== arr.length - 1 ? "," : ""}
          </div>
        ))}
        <span className="text-gray-400">{"}"}</span>
      </div>
    </div>
  );
};

export default ProfilePage;
