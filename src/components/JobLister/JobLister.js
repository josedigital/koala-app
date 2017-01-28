import React, {Component} from 'react'

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
        
        <p>Is this job hot?{this.props.job.isHot}</p>
        <p>Status{this.props.job.status}</p>
        <p>Job._id{this.props.job._id}</p>
        <p>hot button</p>
        <p>delete button</p>
        <p>edit button</p>
        <p>status button??</p>
        <hr />
      </div>
    
    )
  }
}

JobLister.propTypes = {
  job: React.PropTypes.object.isRequired
}




export default JobLister
