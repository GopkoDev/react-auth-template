import { JSX } from 'react';
import './Table.scss';

export interface HeaderTypes<T> {
  title: string;
  cellSize?: string;
  cell: (data: T, index: number) => JSX.Element;
}

export interface TableProps<T> {
  headers: HeaderTypes<T>[];
  data: T[];
  emptyState?: string;
}

export const Table = <T,>({
  headers = [],
  data = [],
  emptyState = 'No Data',
}: TableProps<T>): JSX.Element => {
  const gridTemplateColumns = headers
    .map((el) => el.cellSize || '1fr')
    .join(' ');

  const coumsCount = headers.length;

  return (
    <div
      className="table"
      style={{ gridTemplateColumns }}
      data-colums-count={coumsCount}
    >
      <div className="table--header">
        {headers.map((header) => (
          <div key={header.title} className="table--header--cell ">
            {header.title}
          </div>
        ))}
      </div>

      <div className="table--body">
        {data.map((rowObj, index) => (
          <div
            key={index}
            className="table--body--row"
            data-row-number={index + 1}
          >
            {headers.map((column, colIndex) => (
              <div key={colIndex} className="table--body--row--cell">
                {column.cell(rowObj, index)}
              </div>
            ))}
          </div>
        ))}

        {!data.length && (
          <div className="table--body--empty_state">{emptyState}</div>
        )}
      </div>
    </div>
  );
};
