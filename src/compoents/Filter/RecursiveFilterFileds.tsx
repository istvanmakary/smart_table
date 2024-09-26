import { Box, Chip } from '@mui/material';
import { ReactElement } from 'react';
import { Filter, FilterValue } from '../../types';
import FilterBase from './FilterBase';

const updateConditions = (
  conditionsList: Filter[],
  changedCondition: Filter,
  changedIndex: number
) => {
  return conditionsList.map((condition, index) => {
    if (index === changedIndex) {
      return changedCondition;
    }
    return condition;
  });
};

const ReqursiveFilterFields = ({
  filter,
  columns,
  onSubmit,
}: {
  filter?: Filter;
  columns: string[];
  onSubmit: (value: Filter, applyFiler?: boolean) => void;
}) => {
  if (filter && 'conditions' in filter) {
    return (
      <>
        {filter.conditions.reduce((acc: ReactElement[], item, index) => {
          if (index === 1) {
            acc.push(
              <Box key="operator" sx={{ mt: 1, mb: 1, textAlign: 'center' }}>
                <Chip
                  key="operator"
                  label={filter.operator}
                  sx={{ mr: 1 }}
                  color="success"
                />
              </Box>
            );
          }

          return [
            ...acc,
            'operator' in item ? (
              <ReqursiveFilterFields
                key={JSON.stringify(item)}
                filter={item}
                columns={columns}
                onSubmit={(condtition, applyFilter) =>
                  onSubmit(
                    {
                      ...filter,
                      conditions: updateConditions(
                        filter.conditions,
                        condtition,
                        index
                      ),
                    },
                    applyFilter
                  )
                }
              />
            ) : (
              <FilterBase
                key={JSON.stringify(item)}
                onSubmit={(condtition, applyFilter) =>
                  onSubmit(
                    {
                      ...filter,
                      conditions: updateConditions(
                        filter.conditions,
                        condtition,
                        index
                      ),
                    },
                    applyFilter
                  )
                }
                value={item as FilterValue}
                columns={columns}
                hideButtons={index !== filter.conditions.length - 1}
              />
            ),
          ];
        }, [])}
      </>
    );
  }
  return (
    <FilterBase
      value={filter as FilterValue}
      columns={columns}
      onSubmit={onSubmit}
    />
  );
};

export default ReqursiveFilterFields;
