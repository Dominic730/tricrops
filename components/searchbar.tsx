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
      className="flex items-center border-2 border-blue-400 rounded-md p-2 shadow-sm"
    >
      <Search className="text-gray-500 w-5 h-5" />
      <input
        type="text"
        placeholder="Search..."
        className="ml-2 outline-none flex-grow p-1 bg-blue-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
