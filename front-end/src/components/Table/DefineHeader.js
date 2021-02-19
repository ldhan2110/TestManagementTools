export const TEST_PLAN_HEADERS = {
  hasActions: true,
  hasCheckbox: true,
  headerCells: [  
  { id: 'id', alignment: 'left', label: 'ID', type: "text" },
  { id: 'name', alignment: 'left', label: 'Name', type: "text" },
  { id: 'description', alignment: 'left', label: 'Description', type: "text" },
  { id: 'status', alignment: 'left', label: 'Status' , type: "label"},
  { id: 'date', alignment: 'left', label: 'Create Date', type: 'text' },
]}

export const BUILDS_HEADERS = {
  hasActions: true,
  hasCheckbox: true,
  headerCells: [  
  { id: 'id', alignment: 'left', label: 'ID', type: 'text' },
  { id: 'name', alignment: 'left', label: 'Name',type: 'text' },
  { id: 'description', alignment: 'left', label: 'Description',type: 'text' },
  { id: 'status', alignment: 'left', label: 'Status',type: 'label' },
  {id: 'open', alignment: 'left', label: 'Open',type: 'text'},
  { id: 'date', alignment: 'left', label: 'Create Date',type: 'text' },
]}

export const MEMBERS_HEADERS = {
  hasActions: true,
  hasCheckbox: false,
  headerCells: [
    { id: 'id', alignment: 'left', label: 'ID', type: 'text', hidden: true },
    { id: 'name', alignment: 'left', label: 'Name',type: 'text' },
    { id: 'role', alignment: 'left', label: 'Roles',type: 'text' },
  ]
}