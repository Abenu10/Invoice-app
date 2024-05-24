'use client';
import React, {useState, useEffect} from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowModesModel,
  GridRowModes,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {InvoiceType} from './types';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {updateInvoice} from '@lib/invoices';

interface InvoiceGridProps {
  invoices: InvoiceType[];
}

const InvoiceGrid: React.FC<InvoiceGridProps> = ({invoices}) => {
  const [rows, setRows] = useState(invoices);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleEditClick = (id: string) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
  };

  const handleSaveClick = (id: string) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
  };

  const handleCancelClick = (id: string) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: {mode: GridRowModes.View, ignoreModifications: true},
    });
  };

  const processRowUpdate = (newRow: InvoiceType) => {
    const updatedRow = {...newRow, isNew: false};
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
  useEffect(() => {
    if (rows.some((row) => row.isNew === false)) {
      rows.forEach((row) => {
        if (row.isNew === false) {
          updateInvoice(row.id, row);
        }
      });
    }
  }, [rows]);

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 150, editable: true},
    {field: 'number', headerName: 'Number', width: 150, editable: true},
    {field: 'total', headerName: 'Total', width: 150, editable: true},
    {field: 'dueDate', headerName: 'Due Date', width: 150, editable: true},
    {field: 'status', headerName: 'Status', width: 150, editable: true},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params: GridRowParams) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key='save'
              icon={<SaveIcon />}
              label='Save'
              onClick={handleSaveClick(params.id)}
            />,
            <GridActionsCellItem
              key='cancel'
              icon={<CancelIcon />}
              label='Cancel'
              onClick={handleCancelClick(params.id)}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            key='edit'
            icon={<EditIcon />}
            label='Edit'
            onClick={handleEditClick(params.id)}
          />,
        ];
      },
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      editMode='row'
      rowModesModel={rowModesModel}
      onRowModesModelChange={(newModel: GridRowModesModel) =>
        setRowModesModel(newModel)
      }
      processRowUpdate={processRowUpdate}
    />
  );
};

export default InvoiceGrid;

// function to add two numbers
