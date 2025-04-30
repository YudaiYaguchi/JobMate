import { FC } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Company } from "@/types/Company";
import { FaRegBuilding } from "react-icons/fa";
import CompanyKanban from "./CompanyKanban";
import CompanyCard from "./CompanyCard";
import EmptyState from "@/components/EmptyState";

type CompanyListProps = {
  companyList: Company[];
  view: "grid" | "kanban";
  handleCompanyUpdate: (updatedCompany: Company) => void;
  handleCompanyDelete: (deletedCompany: Company) => void;
};

const CompanyList: FC<CompanyListProps> = ({ companyList, view, handleCompanyUpdate, handleCompanyDelete }) => {
  return (
    <Box pb={6} bg='white'>
      {
        companyList.length === 0 && (
          <EmptyState icon={FaRegBuilding} message="登録された企業はありません" />
        )
      }
      {view === "grid" ? (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
          {companyList.map((company) => (
            <CompanyCard key={company.id} company={company} handleCompanyUpdate={handleCompanyUpdate} handleCompanyDelete={handleCompanyDelete} />
          ))}
        </SimpleGrid>
      ) : (
        <CompanyKanban companyList={companyList} handleCompanyUpdate={handleCompanyUpdate} handleCompanyDelete={handleCompanyDelete} />
      )}
    </Box>
  );
};

export default CompanyList;
