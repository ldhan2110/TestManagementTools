export const BUILDS_SEARCH = [
  { id: 'buildName',  label: 'Build Name', type: "text" },
  { id: 'testplanName',  label: 'Test Plan', type: "select", listValues: []},
  { id: 'active',  label: 'Active', type: "select", default: -1, listValues: [{value: true, label: "Active"}, {value: false, label: "Inactive"}]},
]


export const TEST_PLANS_SEARCH = [
  { id: 'testplanName',  label: 'Test Plan Name', type: "text" },
  { id: 'active',  label: 'Active', type: "select", default: -1, listValues: [{value: true, label: "Active"}, {value: false, label: "Inactive"}]},
]


export const MEMBER_SEARCH = [
  { id: 'username',  label: 'Username', type: "text" },
  { id: 'role',  label: 'Role', type: "select", default: -1, listValues: [{value: "projectmanager", label: "Project Manager"}, {value: "testlead", label: "Tester Lead"}, {value: "tester", label: "Tester"}]},
]


export let TEST_EXEC_SEARCH = [
  { id: 'testexecName',  label: 'Name', type: "text" },
  { id: 'testplanName',  label: 'Test Plan', type: "select", listValues: []},
  { id: 'buildName',  label: 'Build', type: "select", listValues: [] },
  { id: 'status',  label: 'Status', type: "select", default: -1, listValues: [{value: "Untest", label: "Untest"},{value: "Pass", label: "Pass"}, {value: "Blocked", label: "Blocked"}, {value: "Fail", label: "Fail"}]},
]


export const INVITE_MEMBERS_SEARCH = [
  { id: 'email',  label: 'Email', type: "text" },
]