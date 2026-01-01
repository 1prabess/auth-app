import type { Session } from "../api/session.types";

type SessionItemProps = {
  session: Session;
  onDelete?: (sessionId: string) => void;
};

const SessionItem = ({ session, onDelete }: SessionItemProps) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(session._id);
    }
  };

  return (
    <li
      className={`p-4 border  ${
        session.isCurrent ? "border-green-500 bg-green-50" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{session.userAgent}</p>
          <p className="text-sm text-gray-500">
            Created at: {new Date(session.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Expires at: {new Date(session.expiresAt).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {session.isCurrent && (
            <span className="text-green-600 font-semibold">Current</span>
          )}
          {!session.isCurrent && (
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm text-white bg-red-500  hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default SessionItem;
