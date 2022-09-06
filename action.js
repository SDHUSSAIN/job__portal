
const inputBox = document.getElementById("input__box");
const searchButton = document.getElementById("search__button");

searchButton.addEventListener("click",()=>{
    let text = inputBox.value ;
    getJobsData().then( jobs =>{
        let filteredJobs = filterJobs(jobs,text);
        showJobs(filteredJobs);
    })

})

function getJobsData (){
    return fetch("data.json").then(response => response.json()).then(data => {
        return data
    })
}

function filterJobs(jobs, searchText){
    if(searchText){
        let filteredJobs = jobs.filter((job)=>{
            if(job.roleName.toLowerCase().includes(searchText)
            || job.type.toLowerCase().includes(searchText)
            || job.company.toLowerCase().includes(searchText)
            || job.requirements.content.toLowerCase().includes(searchText)){
                return true ;
            }else{
                return false ;
            }
            
        })
        return filteredJobs ;
    }else{
        return jobs;
    }

}

var myAllJobs = [];
function showJobs (jobs){
    myAllJobs = jobs;
    let jobsContainer = document.querySelector("#jobsContainer");
    var applyModal = document.getElementById("applyModal");
    var messageModal = document.getElementById("messageModal");
    
    let jobsHTML = "" ;

    jobs.map((job,index)=>{
        jobsHTML += `<div class="card" id=${index}>
        <div class="card__header">
            <img src=${job.logo} alt="">
            <i class="fa fa-ellipsis-h" ></i>
        </div>
        <div class="card__tags">
            <label class="tag">${job.type}</label>
            <label class="tag">${job.postedTime}</label>
            <label class="tag">${job.location}</label>
        </div>
        <div class="card__body">
            <h3>${job.roleName}</h3>
            <p>${job.requirements.content}</p>
        </div>
        
        <div class="card__footer">
            <button class="btn-apply" id=${index} onclick="showApplyModal(),getApplyJobDetails(this.id)">Apply Now</button>
            <button class="btn-message" id=${index} onclick="showMessageModal(),getMessageJobDetails(this.id)">Message</button>
        </div>
        </div>
        `
    })
     
    jobsContainer.innerHTML = jobsHTML ;
    
    // Get the <span> element that closes the modal
    var applyspan = document.getElementById("applyClose");
    var messagespan = document.getElementById("messageClose");

    // When the user clicks on <span> (x), close the modal
    applyspan.onclick = function() {
        applyModal.style.display = "none";
    }
    messagespan.onclick = function() {
        messageModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == applyModal) {
            applyModal.style.display = "none";
        }
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == messageModal) {
            messageModal.style.display = "none";
        }
    }
}

getJobsData().then(data =>{
    
    showJobs(data);
});

function showAlert(message){
    if(checkValidation()){
        alert(message + `<i class="fa fa-check"></i>`);
    };   
}

function showApplyModal(){
    applyModal.style.display = "block";
}

function showMessageModal(){
    messageModal.style.display = "block";
}

function getApplyJobDetails (id){
    let jobs__container__details = document.querySelector(".job__details");
    jobs__container__details.innerHTML = `<h3>${myAllJobs[id].roleName}</h3><p>${myAllJobs[id].requirements.content}</p>`
}

function getMessageJobDetails (id){
    let jobs__container__details = document.querySelector(".message__job__details");
    jobs__container__details.innerHTML = `<h3>${myAllJobs[id].roleName}</h3><p>${myAllJobs[id].requirements.content}</p>`
}  

let first__name = document.querySelector("#first__name").value;
let last__name = document.querySelector("#last__name").value;
let phone__no = document.querySelector("#phone__no").value;
let resume = document.querySelector("#file").value;

function checkValidation(){
    if(first__name === "" || last__name === "" || phone__no =="" || resume == ""){
        alert("Please fill the required details before submit");
        return false;
    }
}