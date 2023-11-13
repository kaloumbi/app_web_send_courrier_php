export const displayMessage = (message, selector, name) =>{
    document.querySelector(selector).innerText = message;
    addInputValidate(name)
    // setTimeout(()=>{
    //     document.querySelector(selector).innerText = "";
    // },3000)
}

export const checkName = (event) =>{
    const input = event.target
    const name = input.name
    const value = input.value.trim()
    const model = /^[A-Za-z éèçêùû]{2,20}$/i
    const selector = "."+name

    document.querySelector(selector).innerText = "";
    if(value){
        // else if()
        // 1 -  taille >= 2
        if(value.length < 2){
            const message = "Le champ '"+name+"' doit avoir au moins 2 caractères"
            displayMessage(message, selector, name)
        }else if(!model.test(value)){
            const message = "Le format de données est incorrect"
            displayMessage(message, selector, name)

        }else{
            deleteInputValidate(name)
        }

    }
}
export const checkEmail = (event) =>{
    const input = event.target
    const name = input.name
    const model = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
    const selector = "."+name
    
    input.value = input.value.toLowerCase()
    const value = input.value.trim()

    document.querySelector(selector).innerText = "";

    if(value){
        if(!model.test(value)){
            const message = "Le format de données est incorrect"
            displayMessage(message, selector, name)

        }else{
            deleteInputValidate(name)
        }

    }
}
export const checkMessage = (event) =>{
    const inputText = event.target
    const name = inputText.name
    const selector = "."+name
    
    inputText.value = inputText.value.trim()
    const value = inputText.value.trim()

    document.querySelector(selector).innerText = "";

    if(value){
        if(value.length < 20){
            const message =  "Le champ '"+name+"' doit avoir au moins 20 caractères"
            displayMessage(message, selector, name)
        }else{
            deleteInputValidate(name)
        }

    }
}

const checkFormValid = () =>{
    const data = JSON.parse(localStorage.getItem("validData"))

    if(Object.keys(data).length){
        return false
    }else{
        return true
    }
}
const updateForm = () =>{
    if(checkFormValid()){
        // form valid
        document.getElementById("form_submit").classList.remove('none')
    }else{
        // form non valid
        document.getElementById("form_submit").classList.add('none')
    }
}
const deleteInputValidate = (name) =>{
    const data = JSON.parse(localStorage.getItem("validData"))
    delete data[name]
    localStorage.setItem("validData", JSON.stringify(data))
    updateForm()
}
const addInputValidate = (name) =>{
    const data = JSON.parse(localStorage.getItem("validData"))
    data[name] = false
    localStorage.setItem("validData", JSON.stringify(data))
    updateForm()
}

