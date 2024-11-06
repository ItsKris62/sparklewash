// src/components/ui/Table.js

import React from "react";

const Table = ({ children, className }) => (
  <div className={`overflow-x-auto ${className}`}>
    <table className="min-w-full border-collapse bg-white">
      {children}
    </table>
  </div>
);

const TableHeader = ({ children }) => (
  <thead>
    <tr className="bg-gray-100">
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <th className="border px-4 py-2 text-left font-semibold">{child.props.children}</th>
        ) : null
      )}
    </tr>
  </thead>
);

const TableBody = ({ children }) => <tbody>{children}</tbody>;

const TableRow = ({ children }) => (
  <tr className="border-b hover:bg-gray-50">{children}</tr>
);

const TableCell = ({ children, className = "" }) => (
  <td className={`border px-4 py-2 ${className}`}>{children}</td>
);

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
