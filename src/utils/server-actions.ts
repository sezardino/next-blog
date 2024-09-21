import { ServerActionResponse } from "@/types/base";

type Args<Response, Arguments = undefined> = {
  action: (args: Arguments) => Promise<ServerActionResponse<Response>>;
  onSuccess?: (result: Response) => void;
  onError?: (error: string) => void;
};

export const createActionHandler = <T = void, A = undefined>(
  args: Args<T, A>
) => {
  const { action, onError, onSuccess } = args;

  return async (actionArgs: A): Promise<void> => {
    try {
      const result = await action(actionArgs);

      if (
        typeof result === "object" &&
        result !== null &&
        "message" in result
      ) {
        onError?.((result as { message: string }).message);
      } else {
        onSuccess?.(result as T);
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Unexpected error");
    }
  };
};
