

export default function ThemeToggle() {
    
    function toggleDark() {
    const html = document.documentElement;
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }
  }

  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      🌓
    </button>
  );
}
