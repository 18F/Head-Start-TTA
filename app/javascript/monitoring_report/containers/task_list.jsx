import { connect } from 'react-redux'
import {
  addTask,
  removeTask,
  updateTask
} from '../actions'
import TaskList from '../components/task_list'

const mapStateToProps = state => ({
  tasks: state.tasks
})

const mapDispatchToProps = {
  addTask,
  removeTask,
  updateTask
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
