import EntrySheet from "./EntrySheet";
import Reflection from "./Reflection";
import CompanyResearch from "./CompanyResearch";
import Question from "./Question";
import { Company } from "../../types/Company";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/react";
import { FC } from "react";

type AllTagProps = {
  company: Company;
}

const AllTag: FC<AllTagProps> = ({ company }) => {

  return (
    <Tabs variant="enclosed-colored" colorScheme="blue" >
      <TabList>
        <Tab>企業研究</Tab>
        <Tab>ES</Tab>
        <Tab>面接質問</Tab>
        <Tab>面接反省</Tab>
        <Tab>プレビュー</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p="0">
          <CompanyResearch />
        </TabPanel>
        <TabPanel p="0">
          <EntrySheet />
        </TabPanel>
        <TabPanel p="0">
          <Question />
        </TabPanel>
        <TabPanel p="0">
          <Reflection />
        </TabPanel>
        <TabPanel p="0">

        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AllTag;