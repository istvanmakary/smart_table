import { Box, Button, IconButton, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import { CONDITIONS, Filter, FilterValue, OPERATORS } from '../../types';
import CloseIcon from '@mui/icons-material/Close';

enum ErrorCodes {
  PARSING = 1000,
}
const matchFilterValue = (
  str: string,
  columns: string[]
): FilterValue | null => {
  const [, base, condition, value] =
    str.match(/"([^"]+)" (=|=~) "([^"]+)"/) ?? [];

  if (!base || !condition || !value || !columns.includes(base)) {
    return null;
  }

  return {
    base,
    condition: condition === '=' ? CONDITIONS.equals : CONDITIONS.includes,
    value,
  };
};

const constructFilter = (
  value: string,
  columns: string[]
): Filter | { errorCode: ErrorCodes } => {
  // i'm reusing the exsisting filtering so I need the same output
  if (/ AND /.test(value)) {
    const conditions = value
      .split(' AND ')
      .map((item: string) => matchFilterValue(item, columns));

    if (conditions.includes(null)) {
      return { errorCode: ErrorCodes.PARSING };
    }

    return {
      operator: OPERATORS.AND,
      conditions: conditions as FilterValue[],
    };
  }
  const filter = matchFilterValue(value, columns);
  return !filter ? { errorCode: ErrorCodes.PARSING } : filter;
};

const ERROR_MESSAGES = {
  [ErrorCodes.PARSING]: 'Could not parse the input string',
  DEFAULT: 'Something went wrong',
};

const getCondition = (condition: CONDITIONS) => {
  switch (condition) {
    case CONDITIONS.equals:
      return '=';
    case CONDITIONS.includes:
      return '=~';
  }
};

const createFilterString = (filter: FilterValue) => {
  const condition = getCondition(filter.condition);
  return `"${filter.base}" ${condition} "${filter.value}"`;
};

const mapFilterToString = (filter?: Filter) => {
  if (!filter) {
    return '';
  }

  if ('conditions' in filter) {
    return filter.conditions.reduce(
      (acc: string, filterValue, index) =>
        !index
          ? createFilterString(filterValue)
          : `${acc} ${filter.operator} ${createFilterString(filterValue)}`,
      ''
    );
  }

  return createFilterString(filter);
};

const FilterInput = ({
  onSubmit,
  columns,
  filter,
}: {
  onSubmit: (value?: Filter) => void;
  columns: string[];
  filter?: Filter;
}) => {
  const [value, setValue] = useState(mapFilterToString(filter));
  const [error, setError] = useState('');

  const handleFilter = useCallback(() => {
    const filters = constructFilter(value, columns);

    if ('errorCode' in filters) {
      setError(ERROR_MESSAGES[filters.errorCode] ?? ERROR_MESSAGES.DEFAULT);
    } else {
      setError('');
      onSubmit(filters);
    }
  }, [columns, value]);
  return (
    <Box sx={{ width: '60%', display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Value"
        sx={{ flex: 1 }}
        error={!!error}
        value={value}
        helperText={error}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button disabled={!value} onClick={handleFilter}>
        Seach
      </Button>
      {!!filter && (
        <IconButton
          onClick={() => {
            onSubmit();
            setValue('');
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default FilterInput;
