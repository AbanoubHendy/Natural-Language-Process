async function handleSubmit(event) {
    event.preventDefault()
    const userInput = document.getElementById('formText').value
    // check what text was put into the form field
    Client.checkForName(userInput)
    console.log("::: Form Submitted :::")
    // fetch('http://localhost:8081')
    const res = await postData('http://localhost:8081/add', { userInput })
    UpdateUI(res);
}
const postData = async (url = "http://localhost:8081/add" , data = {})=>{
    console.log('data => ', {url, data })
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
const UpdateUI = async res => {
    try{
        document.getElementById('Irony').innerHTML=`Irony: ${res.irony}`;
        document.getElementById('Agreement').innerHTML=`Agreement: ${res.agreement}`;
        document.getElementById('Confidence').innerHTML=`Confidence: ${res.confidence}`;
        document.getElementById('Subjectivity').innerHTML=`Subjectivity: ${res.subjectivity}`;
        document.getElementById('Score_tag').innerHTML=`Score_tag: ${res.score_tag}`;        
    }catch(error) {
        console.log('There Is An Error' , error)
    }
};
export { handleSubmit }