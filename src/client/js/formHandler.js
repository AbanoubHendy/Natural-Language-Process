import { response } from "express"

const userInput = document.getElementById('InputBox').value

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    Client.checkForName(userInput)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message;
        postData('/sentiment-2.1?key=186c9dd70631cf3585378167bad6b588&lang=<lang>&txt=<text>&model=<model>' , {res});
        UpdateUI();
    })
}

const postData = async (url = '' , userInput = {})=>{
    console.log(userInput);
    const res = await fetch(url , {
        method: 'POST',
        credentials: 'same-origin' ,
        headers: {
            'Content-Type' : 'application/json' ,
        },
        body: JSON.stringify(userInput),
    });
}

const UpdateUI = async ()=> {
    const res = await fetch('/test');
    try{
        const alldata = await res.json();
        document.getElementById('Irony').innerHTML=alldata.irony;
        document.getElementById('Agreement').innerHTML=alldata.agreement;
        document.getElementById('Confidence').innerHTML=alldata.confidence;
        document.getElementById('Subjectivity').innerHTML=alldata.subjectivity;
        document.getElementById('Score_tag').innerHTML=alldata.score_tag;
    }catch(error) {
        console.log('There Is An Error' , error)
    }
};

export { handleSubmit }
