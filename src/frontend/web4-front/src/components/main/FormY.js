import {Slider} from "primereact/slider";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import {Card} from "primereact/card";
import {useDispatch, useSelector} from "react-redux";
import {setY} from "../../app/dotsValuesSlice";

export default function FormY(){
    const dispatch = useDispatch();
    const Y_local = useSelector((state) => state.dotInfo.y);
    return(
        <Card id={"form-y"} title={"Кордината Y"}>
            <h4>Y: {Y_local}</h4>
            <Slider style={{maxWidth:"300px"}} id={"form-y-slider"} min={-2.99} max={4.99} step={0.01} value={Y_local} onChange={event => {
                dispatch(setY(event.value));
            }}/>
        </Card>
    )
}