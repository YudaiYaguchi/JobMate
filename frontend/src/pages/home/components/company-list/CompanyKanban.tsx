import { FC, useEffect, useState } from 'react';
import {
  SimpleGrid, Box, Flex, HStack, Heading, Badge, Text, Avatar, IconButton, Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Company } from '@/types/Company';
import ActionMenu from '@/components/ActionMenu';
import CompanyModal from './CompanyModal';
import Toast from '@/components/Toast';
import { deleteCompany } from '@/services/companyApi';
import { s } from 'framer-motion/dist/types.d-6pKw1mTI';

type CompanyKanbanProps = {
  companyList: Company[];
  handleCompanyUpdate: (updatedCompany: Company) => void;
  handleCompanyDelete: (deletedCompany: Company) => void;
};

const CompanyKanban: FC<CompanyKanbanProps> = ({ companyList, handleCompanyUpdate, handleCompanyDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>(companyList[0]);
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

  const handleDeleteConfirm = async () => {
    const isConfirmed = window.confirm(
      "本当に企業情報を削除してもよろしいでしょうか？\n削除された情報は復元できませんので、ご確認の上、操作を行ってください。"
    );
    if (isConfirmed) {
      try {
        await deleteCompany(selectedCompany.id);
        handleCompanyDelete(selectedCompany);
        setIsDeleted(true);
      } catch (error) {
        setIsDeleted(false);
      }
    }
  };

  const columns = [
    {
      title: "選考中",
      color: "blue",
      items: companyList.filter((c) => c.selection_status !== "-" && c.selection_result !== "内定"),
    },
    {
      title: "合格",
      color: "orange",
      items: companyList.filter((c) => c.selection_result === "合格"),
    },
    {
      title: "内定",
      color: "green",
      items: companyList.filter((c) => c.selection_result === "内定"),
    },
  ];

  return (
    <>
      {isDeleted && <Toast status="success" message="正常に企業情報が削除されました。" />}
      {successUpdate && <Toast status="success" message="正常に企業情報を更新されました。" />}

      {isEdit &&
        <CompanyModal
          company={selectedCompany}
          isOpen={isOpen}
          onClose={closeModal}
          setSuccessUpdate={setSuccessUpdate}
          handleCompanyUpdate={handleCompanyUpdate}
        />}
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
        {columns.map((column, idx) => (
          <Card key={idx}>
            <CardHeader pb={2} pt={4}>
              <Flex align="center" justify="space-between">
                <HStack>
                  <Box w={3} h={3} borderRadius="full" bg={`${column.color}.500`} />
                  <Heading size="sm" fontWeight="medium">
                    {column.title}
                  </Heading>
                </HStack>
                <Badge variant="outline">{column.items.length}</Badge>
              </Flex>
            </CardHeader>
            <CardBody p={3}>
              <Flex direction="column" gap={2}>
                {column.items.map((company) => (
                  <>
                    <Card key={company.id} borderLeftWidth="4px" borderLeftColor={`${column.color}.500`}>
                      <CardBody p={3}>
                        <Flex align="center" justify="space-between">
                          <HStack>
                            <Avatar
                              name={company.name}
                              bg={
                                company.name.charCodeAt(0) % 6 === 0
                                  ? "blue.500"
                                  : company.name.charCodeAt(0) % 6 === 1
                                    ? "green.500"
                                    : company.name.charCodeAt(0) % 6 === 2
                                      ? "purple.500"
                                      : company.name.charCodeAt(0) % 6 === 3
                                        ? "orange.500"
                                        : company.name.charCodeAt(0) % 6 === 4
                                          ? "red.500"
                                          : "teal.500"
                              }
                              color="white"
                              size="sm"
                            />
                            <Box>
                              <Text fontWeight="medium" fontSize="sm">
                                {company.name}
                              </Text>
                              <Badge
                                size="sm"
                                mt={1}
                                colorScheme={
                                  company.selection_status === "面談"
                                    ? "blue"
                                    : company.selection_status === "WEBテスト"
                                      ? "purple"
                                      : company.selection_status.includes("面接")
                                        ? "orange"
                                        : "gray"
                                }
                              >
                                {company.selection_status}
                              </Badge>
                            </Box>
                          </HStack>
                          <Box onClick={() => setSelectedCompany(company)}>
                            <ActionMenu onEdit={openModal} onDelete={handleDeleteConfirm} />
                          </Box>
                        </Flex>
                      </CardBody>
                    </Card>
                  </>
                ))}
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default CompanyKanban;
