import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        AI Spend Audit
      </h1>

      <p className="mt-4 text-gray-600">
        Find how much you're overspending on AI tools
      </p>

      <Link href="/audit">
        <button className="mt-6 bg-black text-white px-6 py-3 rounded">
          Start Audit
        </button>
      </Link>
    </main>
  );
}