
export const TEST_PLAN_HEADERS = {
  hasActions: true,
  hasCheckbox: false,
  headerCells: [  
  { id: 'testplanname', alignment: 'left', label: 'Name', type: "text" },
  { id: 'description', alignment: 'left', label: 'Descriptions', type: "text" },
  { id: 'is_active', alignment: 'left', label: 'Status' , type: "label"},
  { id: 'created_date', alignment: 'left', label: 'Create Date', type: 'text'},
]}

export const ISSUE_HEADERS = {
  hasActions: true,
  hasCheckbox: false,
  headerCells: [  
  { id: 'summary', alignment: 'left', label: 'Defect Summary', type: "text" },
  { id: 'description', alignment: 'left', label: 'Descriptions', type: "text" },
  { id: 'category', alignment: 'left', label: 'Category', type: 'text'},
  { id: 'reporter', alignment: 'left', label: 'Reporter', type: 'text'},
]}

export const TEST_EXECUTION_HEADERS = {
  hasActions: true,
  hasCheckbox: false,
  headerCells: [  
  // { id: '_id', alignment: 'left', label: 'ID', type: "text" },
  { id: 'testexecutionname', alignment: 'left', label: 'Name', type: "text" },
  { id: 'description', alignment: 'left', label: 'Descriptions', type: "text" },
  { id: 'testplanname', alignment: 'left', label: 'Test Plan', type: "text" },
  { id: 'buildname', alignment: 'left', label: 'Build', type: "text" },
  { id: 'status', alignment: 'left', label: 'Status' , type: "label"},
  { id: 'tester', alignment: 'left', label: 'Assign Tester', type: "text" },
  // { id: 'testdate', alignment: 'left', label: 'Test Date', type: "text" },
]}

export const BUILDS_HEADERS = {
  hasActions: true,
  hasCheckbox: false,
  headerCells: [  
  { id: 'buildname', alignment: 'left', label: 'Name',type: 'text' },
  { id: 'descriptions', alignment: 'left', label: 'Descriptions',type: 'text' },
  { id: 'testplanname', alignment: 'left', label: 'Test Plan', type: "text" },
  { id: 'is_active', alignment: 'left', label: 'Status',type: 'label' },
  //{ id: 'is_open', alignment: 'left', label: 'Open',type: 'label'},
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
  hasCheckbox: false,
  headerCells: [
    { id: 'id', alignment: 'left', label: 'ID', type: 'text', hidden: true },
    { id: 'name', alignment: 'left', label: 'Name',type: 'text'},
  ]
}

export const ISSUE_LIST_HEADERS = {
  hasActions: true,
  hasCheckbox: false,
  headerCells: [
    { id: 'id', alignment: 'left', label: 'ID', type: 'text', hidden: true },
    { id: 'name', alignment: 'left', label: 'Name',type: 'text'},
    { id: 'description', alignment: 'left', label: 'Descriptions',type: 'text'},
    { id: 'testexec', alignment: 'left', label: 'Test Execution',type: 'text'},
    { id: 'status', alignment: 'left', label: 'Status',type: 'text'},
    { id: 'reportBy', alignment: 'left', label: 'Report By',type: 'text'},
    { id: 'reportDate', alignment: 'left', label: 'Report Date',type: 'text'},
  ]
}

export const REQUIREMENTS_HEADER = {
  hasActions: true,
  hasCheckbox: false,
  headerCells: [
    { id: '_id', alignment: 'left', label: 'ID', type: 'text', hidden: true },
    { id: 'projectrequirementname', alignment: 'left', label: 'Name',type: 'text'},
    { id: 'description', alignment: 'left', label: 'Descriptions',type: 'text'},
    { id: 'status', alignment: 'left', label: 'Status',type: 'label'},
    { id: 'is_active', alignment: 'left', label: 'Active',type: 'label'},
    { id: 'created_date', alignment: 'left', label: 'Create Date', type: 'text'},
  ]
}


export const MANTIS_HEADER = {
  hasActions: true,
  hasCheckbox: false,
  headerCells: [
    { id: '_id', alignment: 'left', label: 'ID', type: 'text', hidden: true },
    { id: 'username_mantis', alignment: 'left', label: "Mantis username",type: 'text' },
    { id: 'email', alignment: 'left', label: 'Email',type: 'text' },
    { id: 'role_mantis', alignment: 'left', label: "Mantis role",type: 'text' },
    { id: 'is_active_backend', alignment: 'left', label: 'User joined mantis?', type: 'text' },
  ]
}