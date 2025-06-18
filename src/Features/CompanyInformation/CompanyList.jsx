import { useCallback, useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";
import PaginationControls from "./PaginationControls";

const CompanyList = ({ companies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of companies per page

  // Reset page to 1 whenever filters or search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filtered and searched companies
  const filteredCompanies = useMemo(() => {
    let currentCompanies = companies;

    // Apply Search Term
    if (searchTerm) {
      currentCompanies = currentCompanies.filter((company) =>
        company.groupName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Apply Filters (checkbox logic)
    return currentCompanies;
  }, [companies, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCompanies.slice(startIndex, endIndex);
  }, [filteredCompanies, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Scroll to top of the list when page changes for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    // Adjusted to md:flex-row to ensure sidebar behavior on medium and larger screens
    <div className="flex flex-col md:flex-row gap-2">
      {/* Filter Panel - now explicitly takes 1/4 width on medium and larger screens */}
      <div className="md:w-1/4"></div>

      {/* Company Display Area - takes the remaining width */}
      <div className="flex-1">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {filteredCompanies.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md relative text-center">
            <span className="font-semibold">
              No companies found matching your criteria.
            </span>
            <p className="text-sm mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {paginatedCompanies.map((company) => (
                <CompanyCard key={company.groupId} company={company} />
              ))}
            </div>
            <PaginationControls
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
