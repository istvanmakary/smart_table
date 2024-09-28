import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Menu,
  Switch,
} from '@mui/material';
import { useCallback, useState } from 'react';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import classNames from './FilterBar.module.css';

const ColumnFilterItem = ({
  value,
  isActive,
  onChange,
}: {
  value: string;
  isActive: boolean;
  onChange: (value: string) => void;
}) => {
  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={isActive}
            onChange={() => onChange(value)}
            name={value}
          />
        }
        label={value}
      />
    </Box>
  );
};

const ColumnFilter = ({
  columns,
  activeColumns,
  onActiveColumnsChange,
}: {
  columns: string[];
  activeColumns: string[];
  onActiveColumnsChange: (prop: string[]) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const onSelectionChange = useCallback(
    (column: string) => {
      if (activeColumns.includes(column)) {
        onActiveColumnsChange(
          activeColumns.filter((activeColumn) => activeColumn !== column)
        );
      } else {
        onActiveColumnsChange([...activeColumns, column]);
      }
    },
    [activeColumns]
  );

  return (
    <>
      <IconButton onClick={handleClick}>
        <ViewWeekIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <Box className={classNames.container}>
          <Box className={classNames.buttonsContainer}>
            <Button
              onClick={() => onActiveColumnsChange([])}
              disabled={!activeColumns.length}
              className={classNames.actionButton}
            >
              Hide all
            </Button>
            <Button
              onClick={() => onActiveColumnsChange(columns)}
              disabled={activeColumns.length === columns.length}
              className={classNames.actionButton}
            >
              Show all
            </Button>
          </Box>
          <Divider />
          {columns.map((column) => (
            <ColumnFilterItem
              key={column}
              value={column}
              isActive={activeColumns.includes(column)}
              onChange={onSelectionChange}
            />
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default ColumnFilter;
