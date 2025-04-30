import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';
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
        <MenuItem onClick={onEdit}>編集</MenuItem>
        <MenuItem onClick={onDelete} color="red.600">
          削除
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ActionMenu;
