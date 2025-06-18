import { useMemo } from "react";
import CompanyList from "./CompanyList";
import companyData from "../../Data/IndiaMNC.json";

function CompanyInfo() {
  const companiesToDisplay = useMemo(() => companyData, []);

  return <CompanyList companies={companiesToDisplay} />;
}

export default CompanyInfo;
