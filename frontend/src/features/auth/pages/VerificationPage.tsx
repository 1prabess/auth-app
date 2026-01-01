import { useParams } from "react-router";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

const VerificationPage = () => {
  const { code } = useParams<{ code: string }>();
  const { isPending, isError, isSuccess } = useVerifyEmail(code);

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white mt-30 border  p-8 text-center">
        {!code && (
          <>
            <h1 className="text-xl font-semibold mb-2 text-red-600">
              Invalid Link
            </h1>
            <p className="text-sm text-gray-600">
              The verification link is invalid or malformed.
            </p>
          </>
        )}

        {isPending && (
          <>
            <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-gray-300 border-t-black animate-spin" />
            <h1 className="text-lg font-medium">Verifying your email</h1>
            <p className="text-sm text-gray-500 mt-1">Please wait a moment…</p>
          </>
        )}

        {isError && (
          <>
            <h1 className="text-xl font-semibold text-red-600 mb-2">
              Verification Failed
            </h1>
            <p className="text-sm text-gray-600">
              This verification link has expired or is invalid.
            </p>
          </>
        )}

        {isSuccess && (
          <>
            <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">Email Verified</h1>
            <p className="text-sm text-gray-600">
              Your email has been successfully verified. You can now log in.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
