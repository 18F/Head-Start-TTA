import api from 'tta_request_form/api'

// export const REQUEST_MONITORING_REPORT = "REQUEST_MONITORING_REPORT"
// export const RECEIVE_MONITORING_REPORT = "RECEIVE_MONITORING_REPORT"
//
// const requestReportDetails = () => ({
//   type: REQUEST_MONITORING_REPORT
// })
//
// const receiveReportDetails = body => ({
//   type: RECEIVE_MONITORING_REPORT,
//   details: body.data
// })
//
// export const fetchReportDetails = id => {
//   return dispatch => {
//     dispatch(requestReportDetails())
//     dispatch(api.getMonitoringReport({id, include: 'grant,grant.grantee'})).then(({body}) => {
//       dispatch(receiveReportDetails(body))
//     })
//   }
// }
