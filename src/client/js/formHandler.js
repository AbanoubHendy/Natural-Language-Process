import { response } from "express"

const userInput = document.getElementById('InputBox').value

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    Client.checkForName(userInput)
    console.log("::: Form Submitted :::")
    .then(res => {
        postData(userInput);
        UpdateUI();
    })
}

const postData = async (url = "http://localhost:8081/add" , data = {})=>{
    console.log(data);
    const res = await fetch('http://localhost:8081/add' , {
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
        document.getElementById('Irony').innerHTML=`Irony: ${alldata.irony}`;
        document.getElementById('Agreement').innerHTML=`Agreement: ${alldata.agreement}`;
        document.getElementById('Confidence').innerHTML=`Confidence: ${alldata.confidence}`;
        document.getElementById('Subjectivity').innerHTML=`Subjectivity: ${alldata.subjectivity}`;
        document.getElementById('Score_tag').innerHTML=`Score_tag: ${alldata.score_tag}`;
    }catch(error) {
        console.log('There Is An Error' , error)
    }
};

export { handleSubmit }
