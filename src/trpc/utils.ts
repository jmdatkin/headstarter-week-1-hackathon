import { TRPCClientError } from "@trpc/client";

export function isTRPCClientError(cause: unknown): cause is TRPCClientError<any> {
    return (
        cause instanceof TRPCClientError ||
        /**
         * @deprecated
         * Delete in next major
         */
        (cause instanceof Error && cause.name === 'TRPCClientError')
    );
}