import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [gotoPage, setGotoPage] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //  Filter
  const filteredData = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const totalPages = Math.ceil(filteredData.length / productsPerPage);
  const currentUsers = filteredData.slice(indexOfFirst, indexOfLast);

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const next = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleGoto = () => {
    let page = Number(gotoPage);
    if (!page) return;

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    setCurrentPage(page);
    setGotoPage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-4xl">

        <h1 className="text-2xl font-bold text-center mb-6">
          User Management
        </h1>

        {/* Search */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">First Name</th>
                <th className="p-3 text-left">Last Name</th>
                <th className="p-3 text-left">Age</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">

          <button
            onClick={prev}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-200"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md border transition ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={next}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-200"
          >
            Next
          </button>

          <input
            type="number"
            value={gotoPage}
            onChange={(e) => setGotoPage(e.target.value)}
            placeholder="Page"
            className="border px-2 py-1 rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleGoto}
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
          >
            Go
          </button>

        </div>
      </div>
    </div>
  );
}