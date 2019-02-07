class InputChecker{
    constructor(inputID,inputName, inputTemplate){
        this.inputID = inputID;
        this.inputName = inputName;
        this.inputTemplate = inputTemplate;
        this.inputValue = "";
        this.inputField = null;
        this._init();
    }
    _init(){
        this.inputField = document.querySelector(`#${this.inputID}`);
        this.inputValue = this.inputField.value;
    }
    
    getCheck(){
        if (this.inputTemplate.test(this.inputValue)){
            return true;    
        } else {return false};
    }
}

class FormChecker{
    constructor(inputFields){
        this.inputFields = inputFields;
    }
    
    checkAllFields(){
        let errorText = "";
        let allOk = true;
        for (let field of this.inputFields){
            if (!field.getCheck()){
                errorText+= `Поле ${field.inputName} заполнено не по шаблону<br>`;
                allOk = false;
            }
        }
        
        if (allOk){
            alert("Все поля заполнены по шаблону");
        } else { document.getElementById("erorSet").innerHTML =           errorText;
            console.log(errorText);    
        } 
    }
}