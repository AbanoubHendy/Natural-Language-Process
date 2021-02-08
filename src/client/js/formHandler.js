import { response } from "express"

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        postData();
        UpdateUI();
    });
}

const postData = async (url = '' , formText = {})=>{
    console.log(data);
    const res = await fetch('http://localhost:8081/test', {
        method: 'POST',
        credentials: 'same-origin' ,
        headers: {
            'Content-Type' : 'application/json' ,
        },
        body: JSON.stringify(formText),
    });
}

const UpdateUI = async ()=> {
    const request = await fetch('/test');
    try{
        const alldata = await request.json();
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
