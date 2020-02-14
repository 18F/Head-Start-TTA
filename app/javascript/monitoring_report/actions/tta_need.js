export const TOGGLE_REQUEST_FORM = "TOGGLE_REQUEST_FORM"
export const UPDATE_NEED_FIELDS = "UPDATE_NEED_FIELDS"

export const openForm = () => ({
  type: TOGGLE_REQUEST_FORM,
  value: true
})

export const closeForm = () => ({
  type: TOGGLE_REQUEST_FORM,
  value: false
})

export const submitRequest = () => ({
  type: TOGGLE_REQUEST_FORM,
  value: false
})

export const updateNeed = fields => ({
  type: UPDATE_NEED_FIELDS,
  fields
})
