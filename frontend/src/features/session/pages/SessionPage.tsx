import { useSessions } from "../hooks/useSessions";
import SessionItem from "../components/SessionItem";
import { useDeleteSession } from "../hooks/useDeleteSession";

const SessionPage = () => {
  const { data: sessions, isPending } = useSessions();

  const { mutate: deleteSession } = useDeleteSession();

  const handleDelete = (id: string) => {
    deleteSession(id);
  };

  if (isPending) {
    return <div>Loading sessions...</div>;
  }

  return (
    <div className="max-w-4xl py-6">
      <h1 className="text-2xl font-semibold mb-4">My Sessions</h1>

      {sessions?.length === 0 ? (
        <p>No active sessions found.</p>
      ) : (
        <ul className="space-y-4">
          {sessions?.map((session) => (
            <SessionItem
              key={session._id}
              session={session}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionPage;
