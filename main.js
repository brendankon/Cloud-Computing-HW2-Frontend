const form = document.querySelector('.js-form');
form.addEventListener('submit', handleSubmit);
const nextBtn = document.querySelector('.js-next');
const prevBtn = document.querySelector('.js-prev');
let resultStats = document.querySelector('.js-result-stats');
const spinner = document.querySelector('.js-spinner');
let totalResults;
let currentPage = 1;
let searchQuery;


async function fetchResults(query) {
  spinner.classList.remove('hidden');
  try {
    sdk.searchGet({q: query}, {}, {}).then((response) => {
        console.log(response);
        displayResults(response.data);
    });;
  } catch(err) {
    console.log(err);
  }
  spinner.classList.add('hidden');
} 

function handleSubmit(event) {
  event.preventDefault();
  currentPage = 1;
  const inputValue = document.querySelector('.js-search-input').value;
  searchQuery = inputValue.trim();
  console.log(searchQuery);
  fetchResults(searchQuery);
}

function displayResults(img_arr) {
    const searchResults = document.querySelector('.search-results');
    searchResults.textContent = '';
    img_arr.forEach(result => {
      searchResults.insertAdjacentHTML(
        'beforeend',
        `<div>
            <img src="${result}">
        </div>`
      );  
    });
};

function uploadFile() {
    //creating form data object and append file into that form data
    var file = null;
    try {
        console.log(fileupload.files[0]);
        const labelValue = document.getElementById("label_field").value;
        let header_info = {
            headers:{'Content-Type':'multipart/form-data; boundary=${data._boundary}' , "X-Api-Key":"I8I1dHFMus5oqCANYmvqW3caiXzOP5Xc9DprjLat", "x-amz-meta-customLabels": labelValue}
        }; 
        url = 'https://6q1bh40zwj.execute-api.us-east-1.amazonaws.com/v1/cloudhw-b2/' + fileupload.files[0].name
        axios.put(url,fileupload.files[0],header_info).then(response=>{
            console.log(response.data)    
        });

        document.getElementById("label_field").value = "";
        //console.log(file);
      } catch(err) {
        console.log(err);
      }
}

function runSpeechRecognition() {
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        console.log("Started speaking...");
    };
    
    recognition.onspeechend = function() {
        console.log("Stopped speaking...");
        recognition.stop();
    }
  
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        console.log(transcript);
        document.querySelector('.js-search-input').value = transcript;
    };
  
     // start recognition
     recognition.start();
}