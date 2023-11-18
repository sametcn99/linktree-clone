import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center flex flex-col">
      <h1 className="text-2xl font-bold">
        Linktree Clone <span className="font-thin">(backend)</span>
      </h1>
      <a
        href="https://github.com/sametcn99/linktree-clone"
        className="font-mono"
      >
        Check out the source code from github
      </a>
      <Link
        href="/sametc0"
        className="font-mono bg-slate-700 p-1 m-4 hover:bg-slate-800 transition-all duration-1000"
      >
        Go to Sample Page
      </Link>
      <Link
        href="/admin"
        className="font-mono bg-slate-700 p-1 m-4 hover:bg-slate-800 transition-all duration-1000"
      >
        Go to Admin Page
      </Link>
    </section>
  );
}
