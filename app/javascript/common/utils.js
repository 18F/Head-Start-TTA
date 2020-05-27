import { trim } from 'lodash'
import moment from 'moment'
import showdown from 'showdown'
import xss from 'xss'

const stringPresent = string => (string && trim(string) !== "")
const renderMarkdown = (markdown) => {
  const converter = new showdown.Converter()
  return {__html: xss(converter.makeHtml(markdown))}
}

const shortDate = date => moment(date).format("M/D/YYYY")
const longDate = date => moment(date).format("MMMM D, YYYY")

export {
  stringPresent,
  renderMarkdown,
  shortDate,
  longDate
}
