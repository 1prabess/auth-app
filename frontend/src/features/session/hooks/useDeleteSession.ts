import type { ApiErrorResponse } from "@/features/auth/api/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { deleteSession } from "../api/session.api";
import { toast } from "sonner";

export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiErrorResponse>, string>({
    mutationFn: (sessionId: string) => deleteSession(sessionId),
    onSuccess: () => {
      toast.success("Session deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
