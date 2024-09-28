import { Box } from '@mui/material';
import ColumnFilter from './ColumnFilter';
import FilterInput from './FilterInput';
import { Filter } from '../../types';

const FilterBar = ({
  columns,
  activeColumns,
  filter,
  onFilterSubmit,
  onActiveColumnsChange,
}: {
  columns: string[];
  activeColumns: string[];
  filter?: Filter;
  onFilterSubmit: (filter?: Filter) => void;
  onActiveColumnsChange: (prop: string[]) => void;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
      }}
    >
      <FilterInput
        columns={activeColumns}
        filter={filter}
        onSubmit={onFilterSubmit}
      />
      <ColumnFilter
        columns={columns}
        activeColumns={activeColumns}
        onActiveColumnsChange={onActiveColumnsChange}
      />
    </Box>
  );
};

export default FilterBar;
