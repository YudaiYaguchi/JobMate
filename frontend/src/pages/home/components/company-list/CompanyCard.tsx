
import { FC, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Badge,
  Button,
  Flex,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { FiCheck, FiCalendar } from "react-icons/fi";
import { Company } from "@/types/Company";
import Toast from "@/components/Toast";
import CompanyModal from "./CompanyModal";
import { deleteCompany } from "@/services/companyApi";
import ActionMenu from "@/components/ActionMenu";


type CompanyCardProps = {
  company: Company;
  handleCompanyUpdate: (updatedCompany: Company) => void;
  handleCompanyDelete: (deletedCompany: Company) => void;
};

const CompanyCard: FC<CompanyCardProps> = ({ company, handleCompanyUpdate, handleCompanyDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setIsEdit(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setSuccessUpdate(false);
  }, [successUpdate]);


  const getStatusColor = (status: string) => {
    switch (status) {
      case "面談":
        return "blue";
      case "WEBテスト":
        return "purple";
      case "1次面接":
      case "2次面接":
      case "3次面接":
        return "orange";
      case "最終面接":
        return "red";
      default:
        return "gray";
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case "合格":
        return "green";
      case "内定":
        return "teal";
      case "不合格":
        return "red";
      default:
        return "gray";
    }
  };

  const getLogoColor = (name: string) => {
    const colors = ["blue.500", "green.500", "purple.500", "orange.500", "red.500", "teal.500"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleDeleteConfirm = async () => {
    const isConfirmed = window.confirm(
      "本当に企業情報を削除してもよろしいでしょうか？\n削除された情報は復元できませんので、ご確認の上、操作を行ってください。"
    );
    if (isConfirmed) {
      try {
        await deleteCompany(company.id);
        handleCompanyDelete(company);
        setIsDeleted(true);
      } catch (error) {
        setIsDeleted(false);
      }
    }
  };

  return (
    <>
      {isDeleted && <Toast status="success" message="正常に企業情報が削除されました。" />}
      {successUpdate && <Toast status="success" message="正常に企業情報を更新されました。" />}

      {isEdit &&
        <CompanyModal
          company={company}
          isOpen={isOpen}
          onClose={closeModal}
          setSuccessUpdate={setSuccessUpdate}
          handleCompanyUpdate={handleCompanyUpdate}
        />}
      <Card transition="box-shadow 0.2s" _hover={{ boxShadow: "md" }}>
        <CardHeader pb={0} display="flex" alignItems="flex-start" justifyContent="space-between">
          <Flex align="center" gap={3}>
            <Avatar
              name={company.name}
              bg={getLogoColor(company.name)}
              color="white"
              fontWeight="medium"
              size="md"
            />
            <Box>
              <Heading size="sm" fontWeight="semibold">
                {company.name}
              </Heading>
              {company.selection_type !== "-" && (
                <Badge variant="outline" mt={1}>
                  {company.selection_type}
                </Badge>
              )}
            </Box>
          </Flex>
          <ActionMenu onEdit={openModal} onDelete={handleDeleteConfirm} />
        </CardHeader>

        <CardBody>
          <Flex justify="space-between" align="center" mb={3}>
            <Badge colorScheme={getStatusColor(company.selection_status)}>
              {company.selection_status !== "-" ? company.selection_status : "未開始"}
            </Badge>
            {company.selection_result !== "-" && (
              <Badge colorScheme={getResultColor(company.selection_result)}>
                {company.selection_result === "合格" && (
                  <FiCheck style={{ display: "inline", marginRight: "4px" }} />
                )}
                {company.selection_result}
              </Badge>
            )}
          </Flex>

          <Flex align="center" gap={2} fontSize="sm" color="gray.500" mt={3}>
            <FiCalendar size={14} />
            <Text>次回選考: {company.selection_date}</Text>
          </Flex>
        </CardBody>

        <CardFooter pt={0}>
          <Box w="full">
            <Link to={`/company/${company.id}`} key={company.id} style={{ display: "block" }}>
              <Button variant="outline" size="sm" width="full">
                詳細を見る
              </Button>
            </Link>
          </Box>
        </CardFooter>
      </Card>
    </>
  );
};

export default CompanyCard;
