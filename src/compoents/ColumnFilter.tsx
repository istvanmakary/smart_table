import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

function getStyles(name: string, activeColumns: string[]) {
  return {
    fontWeight: activeColumns.includes(name) ? '600' : '400',
  };
}

const ColumnFilter = ({
  columns,
  activeColumns,
  onActiveColumnsChange,
}: {
  columns: string[];
  activeColumns: string[];
  onActiveColumnsChange: (activeColumns: string[]) => void;
}) => {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="active-columns">Active columns</InputLabel>
      <Select
        labelId="active-columns"
        multiple
        value={activeColumns}
        onChange={(e) => onActiveColumnsChange(e.target.value as string[])}
        input={<OutlinedInput label="Active columns" />}
      >
        {columns.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, activeColumns)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColumnFilter;
