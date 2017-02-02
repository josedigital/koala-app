import React, {Component} from 'react'
import Delete from '../ListActions/Delete'

class JobLister extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    // console.log(this.props)
    return (
      <div>
        <h4>{this.props.job.title}</h4>

        <p>Hiring Company: {this.props.job.company}</p>

        <p>{this.props.job.location}</p>

        <a href={this.props.job.url} target="_blank" value={this.props.job.url}>Job Description</a>

        {/*<p>{this.props.job.summary}</p>*/}
        <p>--</p>
        <p>Is this job hot = this defaults to false</p>
        <p>Status = defaults to {this.props.job.status}</p>
        <p>Job._id = {this.props.job._id}</p>
        <p>need a "make hot"" button</p>
        <p>need a "delete button"</p>
        <Delete deleteThis="job" jobId={this.props.job._id} email={this.props.email}/>
        <p>need a "edit button"</p>
        <p>need a "status drop down"</p>
        <hr />
      </div>
    
    )
  }
}

JobLister.propTypes = {
  job: React.PropTypes.object.isRequired
}




export default JobLister
