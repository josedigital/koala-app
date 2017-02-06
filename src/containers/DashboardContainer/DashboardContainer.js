import { connect } from 'react-redux'
import { checkLogin } from '../../actions'

import { Dashboard } from '../../components'

const mapStateToProps = (state) => {
  const { isAuthenticated, profile, savedJobs, error } = state.auth
  return {
    isAuthenticated,
    profile,
    savedJobs,
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

const DashboardContainer = connect(
  // null, // no mapStateToProps
  mapStateToProps,
  mapDispatchToProps
)(App)

export default DashboardContainer
