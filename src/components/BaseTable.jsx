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
import { useTranslation } from 'react-i18next';

const BaseTable = ({
  
  data,
  columns,
  onSort,
  sortDirection,
  orderBy,
  actions,
}) => {
  const { t } = useTranslation(); // Importar la función de traducción
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
            {actions && <TableCell>{t('columns.actions')}</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow
                key={item.id}
                hover
                onClick={() => actions.view(item.id)}
                style={{ cursor: "pointer" }}
              >
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.render ? column.render(item) : item[column.id]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      {actions.view && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            actions.view(item.id);
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      )}
                      {actions.edit && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            actions.edit(item.id);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}
                      {actions.delete && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            actions.delete(item.id);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                      {actions.jobs && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            actions.jobs(item.id);
                          }}
                        >
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
