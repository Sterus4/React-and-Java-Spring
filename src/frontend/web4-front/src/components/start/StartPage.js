import {Button} from "primereact/button";
import "../../css/Start.css"
import {useRef, useState} from "react";
import Clock from "react-clock";
import 'react-clock/dist/Clock.css';
import {NavLink, useNavigate} from "react-router-dom";
import {TfiUser} from "react-icons/tfi";
import {Toast} from "primereact/toast";


let localUsername = "";
function checkUsername(){
    let token = localStorage.getItem("jwt")
    fetch("http://localhost:8080/access", {
        headers: {
            'Accept': 'text/plain',
            'Authorization': token
        },
        method: "GET",
    })
        .then(res => {
            if(res.ok){
                return res.text().then(res => {
                    localUsername = res;
                })
            }
        }).catch(error => {

    })
}
function checkAccess(onOkHandler, toast){
    let token = localStorage.getItem("jwt")
    fetch("http://localhost:8080/access", {
        headers: {
            'Accept': 'text/plain',
            'Authorization': token
        },
        method: "GET",
    })
        .then(res => {
            if(!res.ok){
                window.location.replace("/login")
            } else {
                onOkHandler();
            }
        })

}

checkUsername()
function StartPage(){

    const [nowTime, setNowTime] = useState(new Date());
    const navigate = useNavigate()
    const toast = useRef();

    const navigateRegister = () => {
        navigate("/register");
    }

    const navigateLogin = () => {
        navigate("/login");
    }

    const navigateMain = () => {
        checkAccess(()=>{
            navigate("/main")
        }, toast);
    }
    setInterval(() => {
        setNowTime(new Date());
    }, 1000)
    return (
        <div id={"start-page"}>
            <header id={"start-page-header"} style={{padding:"20px", display:"flex"}}>
                <div style={{position:"relative", textAlign:"center"}}>
                    <TfiUser size="40"/>
                    <br/>
                    <span style={{}}><b>{localUsername}</b></span>
                </div>
                <span className="p-buttonset" style={{position:"absolute", right:"3%"}}>
                    <Button label="Регистрация" onClick={navigateRegister}/>
                    <Button label="Авторизация" onClick={navigateLogin}/>
                </span>
            </header>
            <div id={"start-page-main"}>

                <div id={"start-page-clock"} style={{position:"relative", marginTop:"10%"}}>
                    <Clock value={nowTime}/>
                </div>

                <Button label={"Перейти на главную страницу"} style={{position:"relative", left:"50%", transform:"translate(-50%)", marginTop:"20px"}} onClick={navigateMain}/>
            </div>
            <Toast ref={toast}/>
        </div>
    )
}
export default StartPage