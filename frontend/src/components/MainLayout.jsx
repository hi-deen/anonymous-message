import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
}