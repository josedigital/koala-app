const axios = require('axios')


// ----------------- USERS --------------------------------

export const userHelpers = {

  saveUser: (/*not sure what/if we need to pass in here*/) => {
    return axios.post('/api/user/save')
  },

  deleteUser: (/*this will need the id*/) => {
    return axios.delete('/api/user/delete')
  },
 
}


// ----------------- JOBS --------------------------------

export const jobHelpers = {

  saveApiJob: (/*will require the same data as saveJob*/) => {},//this function and createjob might be able to be the same

  saveJob: (newTitle, newUrl, newSummary, newLocation)=>{ 
    return axios.post('/api/job/save', { 
      title: newTitle,
      url: newUrl,
      summary: newSummary,
      location: newLocation 
    })
  },

  getJobs: () => {
    return axios.get('/api/jobs',)
  },
    
  //this will require a job _id - built on a guess for now
  editJob: (job_id,newTitle, newUrl, newSummary, newLocation) => {
    return axios.put('/api/jobs/edit',{
      job_id: job_id,
      title: newTitle,
      url: newUrl,
      summary: newSummary,
      location: newLocation 
    })
  },

    //this will require a job _id
  deleteJob: (job_id) => {
    console.log('helper', job_id)
    return axios.put('/api/job/delete',{
      job_id: job_id
    })
  },
}


// ----------------- NOTES --------------------------------

export const noteHelpers = {

  saveNote: (jobId, noteCategory, jobNote) => {
    return axios.post('/api/job/note/save', {
      Jobs_id: jobId,
      Jobs_Notes_Category: noteCategory,
      Jobs_Notes_NoteText: jobNote
    })
  },

    //This job id might not even be necessary because we get back the enire object
  getNotes: (jobId) => {
    return axios.get('/api/job/notes',{
      job_id: jobId
    })
  },

  editNote: (jobId, noteCategory, noteId) => {
    return axios.put('/api/job/note/edit', {
      Jobs_id: jobId,
      // Jobs_Notes_Category: noteCategory,
      Jobs_Notes_id: noteId
    })
  },

  deleteNote: (jobId, noteId) => {
    return axios.put('/api/job/note/delete', {
      Jobs_id: jobId,
      Jobs_Notes_id: noteId
    })
  },

}

// ----------------- TESTING --------------------------------

export function jobsApi () {
  return axios.get('/api/jobs/all')
}

export function checkUser (username) {
  return axios.get(`/api/user/check/${username}`)
}

export function createUser (profile) {
  console.log(profile)
  return axios.post('/api/user/create', profile)
}