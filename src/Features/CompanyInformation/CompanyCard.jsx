// const getPlaceholderImage = (width, height, bgColor, textColor, text) =>
//   `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(
//     text
//   )}`;
const CompanyCard = ({ company }) => {
  console.log(company);

  return (
    <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
        <img
          src={company.groupLogo.desktop}
          alt={`${company.groupName} Logo`}
          className="w-24 h-12 object-contain rounded-md mr-4 mb-4 sm:mb-0"
        />
        <div className="flex-grow text-center sm:text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {company.groupName}
          </h3>
          <p className="text-sm text-gray-600">
            {company.reviewsCount} reviews <span className="mx-1">•</span>{" "}
            {company.hasLiveJob ? "Live Jobs" : "No Live Jobs"}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        {company.tagsOrder.map((tagKey) => {
          const tagValues = company.groupTags[tagKey];
          if (tagValues && tagValues.length > 0) {
            return (
              <span
                key={tagKey}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                {tagValues[0]}
              </span>
            );
          }
          return null;
        })}
      </div>
      <a
        href={company.groupJobsURL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium"
      >
        View Jobs &rarr;
      </a>
    </div>
  );
};

export default CompanyCard;
