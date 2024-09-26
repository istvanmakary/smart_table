import { Data } from '../../types';
import styles from './Table.module.css';
import { Box } from '@mui/material';

const Table = ({ data, columns }: { data: Data; columns: string[] }) => {
  return (
    <Box className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            {columns.map((column) => (
              <th className={styles.cell} key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={`row-${index}`} className={styles.row}>
              {columns.map((columnKey) => (
                <td className={styles.cell} key={`row-${index}-${columnKey}`}>
                  {row[columnKey] ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default Table;
