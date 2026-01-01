import type { ApiSuccessResponse } from "@/features/auth/api/auth.types";
import API from "@/lib/apiClient";
import type { Session } from "./session.types";

export const getSessions = async (): Promise<Session[]> => {
  const response = await API.get<ApiSuccessResponse<{ sessions: Session[] }>>(
    "/sessions"
  );

  if (!response.data.data) {
    throw new Error("User data missing from response");
  }

  return response.data.data.sessions;
};

export const deleteSession = async (sessionId: string): Promise<void> => {
  await API.delete(`/sessions/${sessionId}`);

  return;
};
