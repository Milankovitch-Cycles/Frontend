import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";

const BaseTable = ({
  data,
  columns,
  onSort,
  sortDirection,
  orderBy,
  actions,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? sortDirection : "asc"}
                  onClick={() => onSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            {actions && <TableCell>Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id} hover>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.render ? column.render(item) : item[column.id]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      {actions.view && (
                        <IconButton onClick={() => actions.view(item.id)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      )}
                      {actions.edit && (
                        <IconButton onClick={() => actions.edit(item.id)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}
                      {actions.delete && (
                        <IconButton onClick={() => actions.delete(item.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                      {actions.jobs && (
                        <IconButton onClick={() => actions.jobs(item.id)}>
                          <WorkIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BaseTable;