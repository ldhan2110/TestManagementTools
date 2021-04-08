
export const TEST_PLAN_HEADERS = {
  hasActions: true,
  hasCheckbox: true,
  headerCells: [  
  { id: '_id', alignment: 'left', label: 'ID', type: "text" },
  { id: 'testplanname', alignment: 'left', label: 'Name', type: "text" },
  { id: 'description', alignment: 'left', label: 'Description', type: "text" },
  { id: 'is_active', alignment: 'left', label: 'Status' , type: "label"},
  { id: 'created_date', alignment: 'left', label: 'Create Date', type: 'text'},
]}

export const TEST_EXECUTION_HEADERS = {
  hasActions: true,
  hasCheckbox: true,
  headerCells: [  
  { id: 'id', alignment: 'left', label: 'ID', type: "text" },
  { id: 'name', alignment: 'left', label: 'Name', type: "text" },
  { id: 'description', alignment: 'left', label: 'Description', type: "text" },
  { id: 'status', alignment: 'left', label: 'Status' , type: "label"},
  { id: 'testexecutiontime', alignment: 'left', label: 'Test Execution Time', type: "text" },
  { id: 'testdate', alignment: 'left', label: 'Test Date', type: "text" },
]}

export const BUILDS_HEADERS = {
  hasActions: true,
  hasCheckbox: true,
  headerCells: [  
  { id: '_id', alignment: 'left', label: 'ID', type: 'text' },
  { id: 'buildname', alignment: 'left', label: 'Name',type: 'text' },
  { id: 'descriptions', alignment: 'left', label: 'Description',type: 'text' },
  { id: 'is_active', alignment: 'left', label: 'Status',type: 'label' },
  { id: 'is_open', alignment: 'left', label: 'Open',type: 'text'},
  { id: 'releasedate', alignment: 'left', label: 'Release Date',type: 'text' },
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

export const TEST_SUITE_DETAIL_HEADERS = {
  hasActions: true,
  hasCheckbox: true,
  headerCells: [
    { id: 'id', alignment: 'left', label: 'ID', type: 'text', hidden: true },
    { id: 'name', alignment: 'left', label: 'Name',type: 'text'},
  ]
}