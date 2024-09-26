import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

import { useState } from 'react';
import { CONDITIONS, Filter, FilterValue, OPERATORS } from '../../types';

const FilterBase = ({
  columns,
  value: externalValue,
  onSubmit,
  hideButtons,
}: {
  columns: string[];
  hideButtons?: boolean;
  value?: FilterValue;
  onSubmit: (value: Filter, applyFilter?: boolean) => void;
}) => {
  const [base, setBase] = useState(externalValue?.base);
  const [condition, setCondition] = useState<CONDITIONS>(
    externalValue?.condition as CONDITIONS
  );
  const [value, setValue] = useState(externalValue?.value);

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="filter-column">Filter column</InputLabel>
        <Select
          labelId="filter-column"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          input={<OutlinedInput label="Filter column" />}
        >
          {columns.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!!base && (
        <FormControl sx={{ m: 1, width: 100 }}>
          <InputLabel id="condition">Condition</InputLabel>
          <Select
            labelId="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value as CONDITIONS)}
            input={<OutlinedInput label="Filter column" />}
          >
            {Object.keys(CONDITIONS).map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {!!condition && (
        <FormControl sx={{ m: 1, width: 100 }}>
          <InputLabel>Value</InputLabel>
          <OutlinedInput
            label="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormControl>
      )}
      {!!value && !!condition && !!base && !hideButtons && (
        <Box>
          <Button
            onClick={() =>
              onSubmit(
                {
                  value,
                  condition,
                  base,
                },
                true
              )
            }
          >
            Done
          </Button>
          <Button
            onClick={() => {
              onSubmit({
                operator: OPERATORS.OR,
                conditions: [
                  { value, condition, base },
                  { value: '', condition: '' as CONDITIONS, base: '' },
                ],
              });
            }}
          >
            OR
          </Button>
          <Button
            onClick={() =>
              onSubmit({
                operator: OPERATORS.AND,
                conditions: [
                  { value, condition, base },
                  { value: '', condition: '' as CONDITIONS, base: '' },
                ],
              })
            }
          >
            AND
          </Button>
        </Box>
      )}
    </>
  );
};

export default FilterBase;
