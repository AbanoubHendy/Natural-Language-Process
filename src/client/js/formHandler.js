import { response } from "express"

const userInput = document.getElementById('InputBox').value

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    Client.checkForName(userInput)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(data) {
        postData('/addData' , {url: data.userInput});
        UpdateUI();
    })
}

const postData = async (url = '' , data = {})=>{
    console.log(data);
    const res = await fetch(url , {
        method: 'POST',
        credentials: 'same-origin' ,
        headers: {
            'Content-Type' : 'application/json' ,
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await res.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log('Therre Is An Error' , error)
    }
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
