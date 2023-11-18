import Link from "next/link";

export default function NotAuthenticated() {
  return (
    <div className="flex flex-col gap-y-2 justify-center items-center h-screen text-center">
      <span className="text-xl font-bold">
        This page is only accessible to users
      </span>
      <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
        <Link
          href="/login"
          className="py-2 px-3 no-underline rounded-md w-[7rem] bg-btn-background bg-slate-900 hover:bg-btn-background-hover"
        >
          Login
        </Link>
        <span className="font-thin">or</span>
        <Link
          href="/login"
          className="py-2 px-3 no-underline rounded-md bg-btn-background bg-slate-900 hover:bg-btn-background-hover"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
