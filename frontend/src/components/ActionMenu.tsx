import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FC } from 'react';
type ActionMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const ActionMenu: FC<ActionMenuProps> = ({ onEdit, onDelete }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreHorizontal />}
        variant="ghost"
        size="sm"
      />
      <MenuList>
        <MenuItem icon={<FiEdit2 />} onClick={onEdit}>編集</MenuItem>
        <MenuItem icon={<FiTrash2 />} onClick={onDelete} color="red.600">
          削除
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ActionMenu;
