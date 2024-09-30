import {useState} from "react";
import {Card} from "primereact/card";
import {useDispatch} from "react-redux";
import {setX} from "../../app/dotsValuesSlice";

export function FormX(){
    const [data, setData] = useState([
        {
            "id": -3,
            "value": -3
        },
        {
            "id": -2,
            "value": -2
        },
        {
            "id": -1,
            "value": -1
        },
        {
            "id": 0,
            "value": 0
        },
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
    const [selectedItems, setSelectedItems] = useState([1]);
    const dispatch = useDispatch();

    function checkBoxHandler(e){
        let isSelected = e.target.checked;
        let id = parseInt(e.target.value);
        if(isSelected){
            if(selectedItems.length == 0){
                dispatch(setX(e.target.value));
            } else {
                dispatch(setX(null));
            }
            setSelectedItems([...selectedItems, id]);
        } else {
            let correctValues = selectedItems.filter((index)=>{
                return index!==id;
            })
            setSelectedItems(correctValues);
            if(correctValues.length == 1){
                dispatch(setX(correctValues[0]));
            } else {
                dispatch(setX(null));
            }
        }

    }
    const listItems = data.map(
        (item, index)=>
            <div><input type={"checkbox"} id={"checkbox-x-" + item.value} value={item.value} checked={selectedItems.includes(item.id)} onChange={checkBoxHandler}></input>
                <label form={"checkbox-x-2"}>{item.value}</label></div>
    )
    if(selectedItems.length > 1){
        return (
            <Card id={"form-x"} title={"Координата X"}>
                {listItems}
                <span style={{color:'red'}} id={"x-error"}>
                Выберете 1 элемент
                </span>
            </Card>
        )
    } else {
        return (
            <Card id={"form-x"} title={"Координата X"}>
                {listItems}
            </Card>
        );
    }
}
