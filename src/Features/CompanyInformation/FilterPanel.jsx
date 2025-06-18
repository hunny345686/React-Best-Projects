import { useCallback, useMemo } from "react";

const FilterPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  availableCompanies,
}) => {
  // Dynamically get unique values for filter checkboxes from available companies
  const getUniqueTagValues = useCallback(
    (tagKey) => {
      const values = new Set();
      availableCompanies.forEach((company) => {
        if (company.groupTags[tagKey] && company.groupTags[tagKey].length > 0) {
          values.add(company.groupTags[tagKey][0]);
        }
      });
      return Array.from(values).sort();
    },
    [availableCompanies]
  );

  const filterCategories = useMemo(
    () => [
      { key: "companyType", label: "Company Type" }, // New filter category
      { key: "businessSize", label: "Business Size" },
      { key: "primaryIndustry", label: "Industry" },
      { key: "employeesCount", label: "Employees" },
      { key: "ownershipType", label: "Ownership Type" },
      { key: "foundingYear", label: "Founding Year" },
    ],
    []
  );

  const handleCheckboxChange = (categoryKey, value) => {
    const currentSelections = filters[categoryKey] || [];
    if (currentSelections.includes(value)) {
      // Remove value if already selected
      onFilterChange(
        categoryKey,
        currentSelections.filter((item) => item !== value)
      );
    } else {
      // Add value if not selected
      onFilterChange(categoryKey, [...currentSelections, value]);
    }
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200 mb-6 lg:mb-0 lg:w-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Filters</h3>
      <div className="space-y-6">
        {" "}
        {/* Use space-y for vertical gap between filter groups */}
        {filterCategories.map((category) => (
          <div
            key={category.key}
            className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {category.label}
            </label>
            <div className="space-y-1">
              {" "}
              {/* Space between checkboxes */}
              {getUniqueTagValues(category.key).map((value) => (
                <div key={value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${category.key}-${value}`}
                    value={value}
                    checked={(filters[category.key] || []).includes(value)}
                    onChange={() => handleCheckboxChange(category.key, value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`${category.key}-${value}`}
                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                  >
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onClearFilters}
        className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 transition duration-300"
      >
        Clear Filters
      </button>
    </div>
  );
};
export default FilterPanel;
