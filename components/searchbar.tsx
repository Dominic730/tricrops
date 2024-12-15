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
      className="flex items-center border-2 border-gray-200 rounded-md p-2 shadow-sm bg-gray-100"
    >
      <Search className="text-gray-500 w-5 h-5" />
      <input
        type="text"
        placeholder="Search..."
        className="ml-2 outline-none flex-grow p-1 bg-inherit"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
