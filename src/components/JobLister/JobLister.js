import React, {Component} from 'react'

class JobLister extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    // console.log(this.props)
    return (
      <li><h4>{this.props.job.title}</h4>
        <p>{this.props.job.location}</p>
        <p>{this.props.job.summary}</p>
        <p>{this.props.job.url}</p>
        <p>{this.props.job.isHot}</p>
        <p>{this.props.job.status}</p>
        <p>{this.props.job._id}</p>
        <hr />
    </li>
    
    )
  }
}

JobLister.propTypes = {
  job: React.PropTypes.object.isRequired
}




export default JobLister
