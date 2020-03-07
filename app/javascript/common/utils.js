import { trim } from 'lodash'
import moment from 'moment'

const stringPresent = string => (string && trim(string) !== "")

const shortDate = date => moment(date).format("M/D/YYYY")
const longDate = date => moment(date).format("MMMM D, YYYY")

export {
  stringPresent,
  shortDate,
  longDate
}
