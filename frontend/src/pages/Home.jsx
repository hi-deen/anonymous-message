import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <section className="text-center mt-20 px-6">
        <h1 className="text-4xl font-bold mb-4 animate-fadeIn">
          Send & Receive Anonymous Messages
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Share your anonymous link and get honest thoughts from your friends.
        </p>

        <a
          href="/register"
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}
