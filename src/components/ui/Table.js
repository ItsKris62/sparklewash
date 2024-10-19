// src/components/ui/Table.js

import React from "react";

const Table = ({ children, className }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-100">
            {React.Children.map(children, (child) =>
              React.isValidElement(child) && child.type === TableHeader ? (
                <th className="border px-4 py-2 text-left font-semibold">{child.props.children}</th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          {React.Children.map(children, (child) =>
            React.isValidElement(child) && child.type === TableRow ? (
              <tr>{child.props.children}</tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableHeader = ({ children }) => {
  return <>{children}</>;
};

const TableRow = ({ children }) => {
  return <tr className="border-b">{children}</tr>;
};

const TableCell = ({ children, className = "" }) => {
  return <td className={`border px-4 py-2 ${className}`}>{children}</td>;
};

Table.Header = TableHeader;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;