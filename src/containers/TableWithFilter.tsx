import { Data, Filter } from '../types';
import { useStorage } from '../hooks/useStorage';
import { useCallback, useEffect, useMemo } from 'react';
import Table from '../compoents/Table/Table';
import { TablePagination } from '@mui/material';
import { filterByCondition } from '../utils';
import FilterBar from '../compoents/Filter/FilterBar';

const TableWithFilter = ({ data: initialData }: { data: Data }) => {
  const [page, setPage] = useStorage('page', 0);
  const [perPage, setPerPage] = useStorage('perPage', 10);
  const [jsonFilter, setFilter] = useStorage('filter', '');
  const [blacklistedColumns, setBlacklistedColumns] = useStorage(
    'blacklistedColumns',
    [] as string[]
  );

  const filter = useMemo(() => {
    return jsonFilter ? JSON.parse(jsonFilter) : '';
  }, [jsonFilter]);

  const data = useMemo(() => {
    if (filter) {
      return filterByCondition(initialData, filter);
    }
    return initialData;
  }, [initialData, filter]);

  const allColumns = useMemo(
    // the columns are not the same in every row
    () =>
      Object.keys(
        data.reduce(
          (acc: Record<string, string>, iterator) => ({
            ...acc,
            ...iterator,
          }),
          {}
        )
      ),
    [data]
  );

  const activeColumns = useMemo(
    () => allColumns.filter((column) => !blacklistedColumns.includes(column)),
    [allColumns, blacklistedColumns]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const renderData = useMemo(() => {
    return [...data].splice(page * perPage, perPage);
  }, [page, perPage, data]);

  useEffect(() => {
    if (!renderData.length && page > 0) {
      setPage(0);
    }
  }, [renderData, page, setPage]);

  const handleActiveColumnsChange = useCallback(
    (currentActiveColumns: string[]) => {
      setBlacklistedColumns(
        allColumns.filter((column) => !currentActiveColumns.includes(column))
      );
    },
    [allColumns, setBlacklistedColumns]
  );

  const handleFilterChange = useCallback(
    (value?: Filter) => {
      setFilter(value ? JSON.stringify(value) : '');
    },
    [setFilter, setPage]
  );

  return (
    <>
      <FilterBar
        columns={allColumns}
        activeColumns={activeColumns}
        onFilterSubmit={handleFilterChange}
        filter={filter}
        onActiveColumnsChange={handleActiveColumnsChange}
      />
      <Table columns={activeColumns} data={renderData} />
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={(_, index) => setPage(index)}
        rowsPerPage={perPage}
        onRowsPerPageChange={(e) => setPerPage(Number(e.target.value))}
      />
    </>
  );
};

export default TableWithFilter;
