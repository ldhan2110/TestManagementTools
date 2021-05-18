export const BUILDS_SEARCH = [
  { id: 'buildName',  label: 'Build Name', type: "text" },
  { id: 'active',  label: 'Active', type: "select", listValues: [{value: -1, label: "ALL"}, {value: true, label: "Active"}, {value: false, label: "Inactive"}]},
]


export const TEST_PLANS_SEARCH = [
  { id: 'testplanName',  label: 'Test Plan Name', type: "text" },
  { id: 'active',  label: 'Active', type: "select", listValues: [{value: -1, label: "ALL"}, {value: true, label: "Active"}, {value: false, label: "Inactive"}]},
]