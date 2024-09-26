import { Box, Chip, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { Filter } from '../../types';
import FilterPills from './FilterPills';
import ReqursiveFilterFields from './RecursiveFilterFileds';

const Filtering = ({
  columns,
  filter,
  onSubmit,
}: {
  columns: string[];
  filter: Filter;
  onSubmit: (value?: Filter) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFilter, setCurentFilter] = useState<Filter>();
  return (
    <Box>
      {!filter ? (
        <Chip
          label="Add magic filter"
          variant="outlined"
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <FilterPills
          filter={filter}
          deleteFilter={(data?: Filter) => onSubmit(data)}
          editFilter={() => {
            setCurentFilter(filter);
            setIsOpen(true);
          }}
        />
      )}
      <Dialog
        open={isOpen}
        onClose={() => {
          setCurentFilter(undefined);
          setIsOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add flexible filter</DialogTitle>
        <DialogContent>
          <ReqursiveFilterFields
            filter={currentFilter}
            columns={columns}
            onSubmit={(value, applyFiler) => {
              if (applyFiler) {
                setCurentFilter(undefined);
                setIsOpen(false);
                onSubmit(value);
              } else {
                setCurentFilter(value);
              }
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Filtering;
