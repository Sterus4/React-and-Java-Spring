import {useState} from "react";
import {Card} from "primereact/card";
import {useDispatch} from "react-redux";
import {setR} from "../../app/dotsValuesSlice";

export function FormR({R_local = 1, onRChange}){
    const dispatch = useDispatch();

    const [data, setData] = useState([

        {
            "id": 1,
            "value": 1
        },
        {
            "id": 2,
            "value": 2
        },
        {
            "id": 3,
            "value": 3
        },
        {
            "id": 4,
            "value": 4
        },
        {
            "id": 5,
            "value": 5
        }
    ]);
    const [selectedItems, setSelectedItems] = useState([3]);

    function checkBoxHandler(e){
        let isSelected = e.target.checked;
        let id = parseInt(e.target.value);
        if(isSelected){
            if(selectedItems.length == 0){
                dispatch(setR(e.target.value));
            } else {
                dispatch(setR(null));
            }
            setSelectedItems([...selectedItems, id]);
        } else {
            let correctValues = selectedItems.filter((index)=>{
                return index!==id;
            })
            setSelectedItems(correctValues);
            if(correctValues.length == 1){
                dispatch(setR(correctValues[0]));
            } else {
                dispatch(setR(null));
            }
        }
    }
    const listItems = data.map(
        (item, index)=>
            <div><input type={"checkbox"} id={"checkbox-r-" + item.value} value={item.value} checked={selectedItems.includes(item.id)} onChange={checkBoxHandler}></input>
                <label form={"checkbox-r-2"}>{item.value}</label></div>
    )
    if(selectedItems.length > 1){
        return (
            <Card id={"form-r"} title={"Радиус"} >
                {listItems}
                <span style={{color:'red'}} id={"r-error"}>
                Выберете 1 элемент
                </span>
            </Card>
        )
    } else {
        return (
            <Card id={"form-r"} title={"Радиус"} >
                {listItems}
            </Card>
        );
    }
}
