import { HStack, Tag } from "@chakra-ui/react";
import { Company } from "../../types/Company";
import { FC, useEffect, useState } from "react";

type FilterBarProps = {
  companyList: Company[];
  handleOnFilter: (companyList: Company[], filterKey: FilterTag) => void;
};

export enum FilterTag {
  ALL = "すべて",
  SELECTING = "選考中",
  SOON = "もうすぐ",
  THIS_WEEK = "今週中",
}

const FilterBar: FC<FilterBarProps> = ({ companyList, handleOnFilter }) => {
  const [allCompanyList, setAllCompanyList] = useState<Company[]>(companyList);
  const [selectingCompanyList, setSelectingCompanyList] = useState<Company[]>([]);
  const [soonCompanyList, setSoonCompanyList] = useState<Company[]>([]);
  const [thisWeekCompanyList, setThisWeekCompanyList] = useState<Company[]>([]);

  const filterTags = [
    {
      label: FilterTag.ALL,
      colorScheme: "red",
      hoverColor: "red.300",
      count: allCompanyList.length,
    },
    {
      label: FilterTag.SELECTING,
      colorScheme: "blue",
      hoverColor: "blue.300",
      count: selectingCompanyList.length,
    },
    {
      label: FilterTag.SOON,
      colorScheme: "yellow",
      hoverColor: "yellow.300",
      count: soonCompanyList.length,
    },
    {
      label: FilterTag.THIS_WEEK,
      colorScheme: "green",
      hoverColor: "green.300",
      count: thisWeekCompanyList.length,
    },
  ];

  const [activeTag, setActiveTag] = useState<FilterTag>(FilterTag.ALL);

  const now = new Date();
  const threeDaysLater = new Date(now);
  threeDaysLater.setDate(now.getDate() + 3);
  const oneWeekLater = new Date(now);
  oneWeekLater.setDate(now.getDate() + 7);

  const isWithinThreeDays = (selectionDate: string): boolean => {
    const date = new Date(selectionDate);
    return date >= now && date <= threeDaysLater;
  };

  const isWithinOneWeek = (selectionDate: string): boolean => {
    const date = new Date(selectionDate);
    return date >= now && date <= oneWeekLater;
  };

  const isSelectableCompany = (result: string): boolean => {
    return result !== "内定" && result !== "不合格" && result !== "辞退";
  };

  const handleTagClick = (label: FilterTag) => {
    if (activeTag === label) {
      setActiveTag(FilterTag.ALL);
      handleOnFilter(allCompanyList, FilterTag.ALL);
    } else {
      setActiveTag(label);

      let filteredList: Company[] = [];
      switch (label) {
        case FilterTag.SELECTING:
          filteredList = selectingCompanyList;
          break;
        case FilterTag.SOON:
          filteredList = soonCompanyList;
          break;
        case FilterTag.THIS_WEEK:
          filteredList = thisWeekCompanyList;
          break;
        default:
          break;
      }

      handleOnFilter(filteredList, label);
    }
  };

  useEffect(() => {
    const selecting = companyList.filter((c) => isSelectableCompany(c.selection_result));
    const soon = companyList.filter((c) => isWithinThreeDays(c.selection_date));
    const thisWeek = companyList.filter((c) => isWithinOneWeek(c.selection_date));

    setAllCompanyList(companyList);
    setSelectingCompanyList(selecting);
    setSoonCompanyList(soon);
    setThisWeekCompanyList(thisWeek);
  }, []);

  return (
    <HStack spacing={4}>
      {filterTags.map((tag) => (
        <Tag
          key={tag.label}
          size="md"
          variant="subtle"
          colorScheme={tag.colorScheme}
          borderRadius="full"
          px="12px"
          py="6px"
          fontWeight="medium"
          cursor="pointer"
          _hover={{ bg: tag.hoverColor }}
          bg={activeTag === tag.label ? `${tag.colorScheme}.400` : undefined}
          {...tag.count > 0 ? { onClick: () => handleTagClick(tag.label) } : {}}
        >
          {tag.label} ({tag.count})
        </Tag>
      ))
      }
    </HStack >
  );
};

export default FilterBar;
