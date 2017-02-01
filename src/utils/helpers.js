const axios = require('axios')


// ----------------- USERS --------------------------------

export const userHelpers = {

    saveUser: ( /*not sure what/if we need to pass in here*/ ) => {
        return axios.post('/api/user/save')
    },

    deleteUser: ( /*this will need the id*/ ) => {
        return axios.delete('/api/user/delete')
    },

}


// ----------------- JOBS --------------------------------

export const jobHelpers = {

    saveApiJob: ( /*will require the same data as saveJob*/ ) => {}, //this function and createjob might be able to be the same

    saveJob: (user, newTitle, newCompany, newUrl, newLocation, newSummary) => {
        // console.log(newCompany+"save job in helper")
        return axios.post('/api/job/save', {
            title: newTitle,
            url: newUrl,
            summary: newSummary,
            location: newLocation,
            isHot: false,
            status: 'new',
            company: newCompany,
            user: user
        })
    },


    getJobs: (userEmail) => {
        //console.log('#38 helpers userEmail='+userEmail)//good
        return axios.get('/api/all/jobs/' + userEmail)
    },

    //this will require a job _id - built on a guess for now
    editJob: (job_id, newTitle, newUrl, newSummary, newLocation) => {
        return axios.put('/api/jobs/edit', {
            job_id: job_id,
            title: newTitle,
            url: newUrl,
            summary: newSummary,
            location: newLocation
        })
    },


    deleteJob: (user, job_id) => {
        // console.log('helper', user, job_id)//good
        return axios.put('/api/job/delete/' + user + '/' + job_id

        )
    }
}


// ----------------- NOTES --------------------------------

export const noteHelpers = {

  // --- SAVE
  saveNote: (userEmail, jobId, noteCategory, jobNote) => {
     console.log(userEmail, jobId, noteCategory, jobNote)// good
    return axios.post('/api/job/note/save', {
      user: userEmail,
      jobId: jobId,
      category: noteCategory,
      noteText: jobNote
    })
  },

  // --- GET
  getNotes: (jobId) => {
    return axios.get('/api/job/notes/'+jobId,
    )
  },

  // --- EDIT
  editNote: (noteId, currentNoteValue, editedCategory) => {
    return axios.put('/api/job/note/edit', {
      'category': editedCategory,
      'noteText': currentNoteValue,
      'noteId': noteId
    })
  },

  // --- DELETE
  deleteNote: (currentUser, jobId, noteId) => {
    return axios.post('/api/job/note/delete', {
      user: currentUser,
      Jobs_id: jobId,
      Jobs_Notes_id: noteId
    })
  },

}

// ----------------- TESTING --------------------------------

export function jobsApi() {
    return axios.get('/api/jobs/all')
}
export function jobsApiSearch(searchTerm, searchLocation) {
  
    return axios.get('/api/jobs/' + searchTerm + '/' + searchLocation)
}

export function checkUser(username) {
    return axios.get(`/api/user/check/${username}`)
}

export function createUser(profile) {
    console.log(profile)
    return axios.post('/api/user/create', profile)
}



// check for empty objects
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}