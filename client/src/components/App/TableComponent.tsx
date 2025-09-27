import { FC } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

export interface TableComponentProps {
  headers?: string[];
  rows?: any[];
  className?: string;
}

export const TableComponent: FC<TableComponentProps> = ({
  headers,
  rows,
  className = "",
}) => {
  return (
    <Table className={className}>
      <TableHeader className="bg-foreground/10">
        <TableRow>
          {headers &&
            headers.map((header, index) => {
              return (
                <TableHead key={`header-${index}`} className="font-bold">
                  {header}
                </TableHead>
              );
            })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows &&
          rows.map((row, rowIndex) => {
            return (
              <TableRow
                key={`row-${rowIndex}`}
                className="text-foreground text-left"
              >
                {Object.keys(row).map((columnKey, columnIndex) => {
                  return (
                    <TableCell key={`column-${rowIndex}-${columnIndex}`}>
                      {row[columnKey]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
