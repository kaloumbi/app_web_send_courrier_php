import { checkEmail, checkMessage, checkName, displayMessage } from "./validate.js"

window.onload = () =>{

    const apiUrl = "http://localhost/app_web_courrier/backend/api/send_email.php"
    const validData = {
        firstname: false,
        lastname: false,
        email: false,
        subject: false,
        message: false
    }

    !localStorage.getItem("validData") ? localStorage.setItem("validData", JSON.stringify(validData)) : null

    const firstname = document.getElementById("firstname")
    const lastname = document.getElementById("lastname")
    const message = document.getElementById("message")
    const subject = document.getElementById("subject")
    const email = document.getElementById("email")
    const submitButton = document.querySelector("#form_submit button")

    


    firstname.addEventListener("keyup", checkName)
    lastname.addEventListener("keyup", checkName)
    subject.addEventListener("keyup", checkName)
    email.addEventListener("keyup", checkEmail)
    message.addEventListener("keyup", checkMessage)

    submitButton.addEventListener("click", async (event)=>{
        event.preventDefault();
        const form =  document.querySelector("form")

        const formData = new FormData(form)

        const response = await window.fetch(apiUrl, {
            method: "POST",
            body: formData
        })

        const result = await response.json()

        if(result.isSuccess){
            // mail envoyé avec succès
            form.reset()
            document.querySelector(".alert.success").innerText = result.message;
            
        }else{
            // erreur
            const errors = result.error
            if(typeof errors == "object"){
                const names = Object.keys(errors)
                names.forEach(name => {
                    const selector = "."+name
                    const message = errors[name]
                    displayMessage(message, selector, name)
                });
            }else{
                document.querySelector(".alert.fail").innerText = result.error;
            }
        }

        


    })

}