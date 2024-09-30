import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card} from "primereact/card";
import {Toast} from "primereact/toast";

function authorize(username, password, errorHandler, successHandler){
        fetch("http://localhost:8080/loginUser", {
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({username: username, password: password})
    })
        .then(res => {
            if(res.ok) {
                return res.text().then(res => {
                    localStorage.setItem("jwt", res);
                    successHandler("Вы вошли в аккаунт");
                });
            }
            return res.text().then(res => {throw new Error(res)});
        }).catch((error) => {
            errorHandler(error.message);
        })
}
function LoginForm(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const errorToast = useRef();
    const showError = (message) => {
        errorToast.current.show({severity:'error', summary: 'Ошибка', detail:message, life: 4000});
    }
    const showSuccess = (message) => {
        errorToast.current.show({severity:'success', summary: 'Успешно', detail:message, life: 1000})
        setTimeout(()=>{
            navigate("/main")
        }, 1000)
    }
    const navigate = useNavigate();
    const navigateRegister = () =>{
        navigate("/register");
    }
    return (
        <div id={"login_form"} style={{position:"relative", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Card title={"Войти в аккаунт"} style={{maxWidth:"450px", marginTop:"5%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <InputText placeholder={"Имя пользователя"} id={"input_username"} onChange={e=>{setUsername(e.target.value)}}/>
                <br/>
                <br/>
                <InputText placeholder={"Пароль"} id={"input_password"} onChange={e=>{setPassword(e.target.value)}}/>
                <br/>
                <br/>
                <Button onClick={e=> {
                    authorize(username, password, showError, showSuccess);
                }}>Авторизация</Button>
                <br/>
                <br/>
                <Button label={"Регистрация"} link onClick={navigateRegister} style={{  display:"table", margin:"0 auto"}}/>
            </Card>
            <Toast ref={errorToast} />
        </div>
    )
}

export default LoginForm;