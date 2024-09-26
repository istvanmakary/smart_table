import { Box, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fragment, ReactElement } from 'react';
import { Filter } from '../../types';
import CreateIcon from '@mui/icons-material/Create';
import styles from './FilterPills.module.css';

const FilterPills = ({
  filter,
  deleteFilter,
  editFilter,
}: {
  filter: Filter;
  deleteFilter: (data?: Filter) => void;
  editFilter: () => void;
}) => {
  if ('operator' in filter) {
    return (
      <Box className={styles.box}>
        {filter.conditions.reduce((acc: ReactElement[], item, index) => {
          if (index === 1) {
            acc.push(
              <Chip
                key="operator"
                label={filter.operator}
                sx={{ mr: 1 }}
                color="success"
              />
            );
          }

          return [
            ...acc,
            'operator' in item ? (
              <FilterPills
                key={JSON.stringify(item)}
                filter={item}
                editFilter={editFilter}
                deleteFilter={() =>
                  deleteFilter(
                    'conditions' in filter.conditions[1]
                      ? {
                          ...filter,
                          conditions: [
                            filter.conditions[0],
                            filter.conditions[1].conditions[0],
                          ],
                        }
                      : undefined
                  )
                }
              />
            ) : (
              <Fragment key={JSON.stringify(item)}>
                <Chip label={item.base} sx={{ mr: 1 }} />
                <Chip
                  label={item.condition}
                  variant="outlined"
                  sx={{ mr: 1 }}
                />
                <Chip label={item.value} sx={{ mr: 1 }} color="primary" />
              </Fragment>
            ),
          ];
        }, [])}
        <IconButton onClick={() => deleteFilter()}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={editFilter}>
          <CreateIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box className={styles.box}>
      <Chip label={filter.base} sx={{ mr: 1 }} />
      <Chip label={filter.condition} variant="outlined" sx={{ mr: 1 }} />
      <Chip label={filter.value} color="primary" />
      <IconButton onClick={() => deleteFilter()}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={editFilter}>
        <CreateIcon />
      </IconButton>
    </Box>
  );
};

export default FilterPills;
