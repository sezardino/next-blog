import { ServerActionResponse } from "@/types/base";
import { ZodFormattedError } from "./zod";

type Args<Response, Arguments = undefined> = {
  action: (args: Arguments) => Promise<ServerActionResponse<Response>>;
  onSuccess?: (result: Response) => void;
  onError?: (errorMessage: string, zodErrors?: ZodFormattedError[]) => void;
  onFinally?: () => void;
};

export const createActionHandler = <T = void, A = undefined>(
  args: Args<T, A>
) => {
  const { action, onError, onSuccess, onFinally } = args;

  return async (actionArgs: A): Promise<void> => {
    try {
      const result = await action(actionArgs);

      if (
        typeof result === "object" &&
        result !== null &&
        "message" in result
      ) {
        console.log({ result });
        onError?.(result.message, result.errors);
      } else {
        onSuccess?.(result as T);
      }
    } catch (error) {
      console.log({ error });
      onError?.(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      onFinally?.();
    }
  };
};
