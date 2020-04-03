const initialState = {
  ttaNeed: {
    granteeId: "",
    startDate: "",
    narrative: "",
    indicator: "Grantee Request",
    purpose: "",
    specialistTypesNeeded: [{value: "Early Childhood Specialist", label: "Early Childhood Specialist"}],
    topics: {},
    contextLinkId: "",
    contextLinkType: ""
  },
  tasks: [{title: "", key: 1}]
}

export default initialState
