import '../../css/App.css';
import Form from "./Form";
import {TfiUser} from "react-icons/tfi";
import {useState} from "react";
import {Button} from "primereact/button";
import {AiOutlineHome} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import MainTable from "./MainTable";
import {save} from "../../app/hitSlice";
import {useDispatch} from "react-redux";
import {Card} from "primereact/card";
import {Canvas} from "./Canvas";

function check(setName){
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
                return res.text().then(res => {
                    setName(res);
                })
            }
        })
}
function getAll(dispatch) {
    let token = localStorage.getItem("jwt");
    fetch("http://localhost:8080/dots", {
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        },
        method: "GET",
    })
        .then(res => {
            if(res.ok){
                return res.json().then(res =>{
                    dispatch(save(res));
                });
            }
        }).catch(error =>{
        window.location.replace("/login");
    })
}
function App() {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const navigate = useNavigate();
    check(setName)
    getAll(dispatch);
    return (
        <div className="App">
            <header id="main-page-header" style={{padding: "20px", position:"relative", display:"flex"}}>
                <div style={{position:"relative", textAlign:"center"}}>
                    <TfiUser size="40"/>
                    <br/>
                    <span><b>{name}</b></span>
                </div>
                <Button label="Закончить сессию" severity="danger" text size={"small"} style={{marginLeft:"10px"}} onClick={event => {
                    localStorage.setItem("jwt", null);
                    navigate("/")
                }}/>

                <span id="main-page-header-span">
                    Нигаматуллин Степан P3234 Вариант: 2223
                </span>
                <div id={"goto-start-on-main"}>
                    <Button id={"go"} label="Вернуться на главную" severity={"info"} text size={"small"} style={{marginRight:"10px"}} onClick={()=>{
                        navigate("/");
                    }}/>
                    <AiOutlineHome size="40" onClick={()=>{
                        navigate("/");
                    }}/>
                </div>
            </header>
            <div id={"form-graph-part"}>
                <div id="main-form-part">
                    <Form />
                </div>
                <div id="main-graph-part">
                    <div style={{display:"grid"}}>
                        <Card id={"graph"} title={"График"} >
                            <Canvas width={420} height={420} />
                        </Card>
                    </div>
                </div>
            </div>
            <div id={"main-table-part"} style={{width:"80%", marginLeft:"10%", marginRight:"10%", marginTop:"20px", marginBottom:"20px"}}>
                <h4>Результат</h4>
                <MainTable/>
            </div>

        </div>
    );
}

export default App;
