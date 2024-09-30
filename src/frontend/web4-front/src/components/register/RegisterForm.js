import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useRef, useState} from "react";
import "../../css/RegisterForm.css"
import {Card} from "primereact/card";
import {NavLink, useNavigate} from "react-router-dom";
import {Toast} from "primereact/toast";

function register(username, password, errorHandler, infoHandler){
    fetch("http://localhost:8080/registerUser", {
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({username: username, password: password})
    })
        .then(res => {
            return res.text();
        }).then(res => {
            infoHandler(res)
    }).catch((error) => {
        errorHandler("Сервер недоступен");
    })
}
function RegisterForm(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const errorToast = useRef();
    const showError = (message) => {
        errorToast.current.show({severity:'error', summary: 'Ошибка', detail:message, life: 4000});
    }

    const showInfo = (message) => {
        errorToast.current.show({severity:'info', summary: 'Информация', detail:message, life: 4000});
    }
    const navigateLogin = () =>{
        navigate("/login");
    }
    return (
        <div id={"register_form"} style={{position:"relative", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Card  title={"Регистрация"} style={{maxWidth:"450px", marginTop:"5%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <InputText placeholder={"Имя пользователя"} id={"input_username_register"} onChange={e => setUsername(e.target.value)}/>
                <br/>
                <br/>
                <InputText placeholder={"Пароль"} id={"input_password_register"} onChange={e => setPassword(e.target.value)}/>
                <br/>
                <br/>
                <Button disabled={username === "" || password === ""} tyle={{position: "relative", margin:"0 auto"}} value={"submit"} onClick={event => {
                    register(username, password, showError, showInfo);
                }}>Регистрация</Button>
                <br/>
                <br/>
                <Button label={"Войти в аккаунт"} link onClick={navigateLogin} style={{  display:"table", margin:"0 auto"}}/>
            </Card>
            <Toast ref={errorToast} />
        </div>

    )
}

export default RegisterForm;