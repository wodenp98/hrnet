import React, { useMemo, useCallback, useEffect } from "react";
import { useTable } from "react-table";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees } from "../features/thunk";

const Table = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = useCallback(
    (row) => {
      console.log(row);
      dispatch(deleteEmployee(row));
    },
    [dispatch]
  );

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Start Date",
        accessor: "startDate",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Date of Birth",
        accessor: "birthDate",
      },
      {
        Header: "Street",
        accessor: "street",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "State",
        accessor: "state",
      },
      {
        Header: "Zip Code",
        accessor: "zipcode",
      },
      {
        Header: "Delete",
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.original.id)}>
            <FaTrash />
          </button>
        ),
      },
    ],
    [handleDelete]
  );

  const data = useMemo(() => employees, [employees]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={headerGroups[0].headers.length}>No data available</td>
          </tr>
        ) : (
          rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default Table;
