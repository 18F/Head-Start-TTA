import { trim } from 'lodash'

const stringPresent = string => (string && trim(string) !== "")

export {
  stringPresent
}
