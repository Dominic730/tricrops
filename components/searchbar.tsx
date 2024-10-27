import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md p-2 shadow-sm"
    >
      <Search className="text-gray-500 w-5 h-5" />
      <input
        type="text"
        placeholder="Search..."
        className="ml-2 outline-none flex-grow p-1 dark:bg-black dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-1 bg-green-500 text-white rounded-md ml-2 hover:bg-green-600 transition"
      >
        Search
      </button>
    </form>
  );
}
