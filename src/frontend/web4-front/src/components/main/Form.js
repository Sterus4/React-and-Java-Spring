import {FormX} from "./FormX";
import "../../css/Form.css"
import {FormR} from "./FormR";
import FormY from "./FormY";
import {Button} from "primereact/button";
import {useSelector, useDispatch} from "react-redux";
import { save} from "../../app/hitSlice";
import {Card} from "primereact/card";
import {Toast} from "primereact/toast";
import {useRef} from "react";

export default function Form(){
    /*const [yValue, setYValue] = useState(1);
    const [xValue, setXValue] = useState(1);
    const [rValue, setRValue] = useState(3);*/

    const xValue = useSelector((state) => state.dotInfo.x);
    const yValue = useSelector((state) => state.dotInfo.y);
    const rValue = useSelector((state) => state.dotInfo.r);

    const showSuccess = (message) => {
        toast.current.show({severity:'success', summary: 'Успешно', detail:message, life: 4000})
    }
    const toast = useRef();
    const dispatch = useDispatch();


    function send() {
        console.log(JSON.stringify({X: xValue, Y: yValue, R: rValue}));
        let token = localStorage.getItem("jwt");
        fetch("http://localhost:8080/dots/check", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            method: "POST",
            body: JSON.stringify({X: xValue, Y: yValue, R: rValue})
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

    function deleteAll(successHandler){
        let token = localStorage.getItem("jwt");
        fetch("http://localhost:8080/dots/deleteAll", {
            headers: {
                'Accept': 'text/plain',
                'Authorization': token
            },
            method: "GET",
        }).then(res =>{
            if(res.ok){
                return res.text().then(res => {
                    dispatch(save([]))
                    successHandler(res);
                })
            }
        }).catch(error => {
        })}
    return(
        <Card title={"Форма"} >
            <div id={"x-r-selector"}>
                <div id={"x-selector"} style={{position:"relative", width:"45%", display: "inline-block", marginRight:"5%"}}>
                    <FormX/>
                </div>
                <div id={"r-selector"} style={{position:"relative", width:"45%", verticalAlign:"top", display: "inline-block", marginLeft:"5%"}}>
                    <FormR/>
                </div>
            </div>
            <div style={{marginTop:"20px", marginBottom:"20px"}}>
                <FormY/>
            </div>

            <Button disabled={xValue == null || yValue == null || rValue == null} value={"submit"} raised onClick={send}>Отправить</Button>
            <Button label="Удалить все точки" severity="danger" raised onClick={e=>{
                deleteAll(showSuccess);
            }} style={{marginLeft:"10px"}}/>

            {/*
            //TODO footer
*/}
            <Toast ref={toast}/>
        </Card>
    )
}