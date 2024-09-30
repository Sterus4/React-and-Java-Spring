import {useRef, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {save} from "../../app/hitSlice";

export function Canvas({width, height}) {
    const canvasRef = useRef();
    let localR = 150;
    let axisLen = 200;
    let arrowDx = 2;
    let arrowDy = 6;
    let traitLen = 6;
    let pointRad = 5;
    let pointColor = "#8B4513"
    let pointColorGreen = "#32CD32"
    let pointColorRed = "#DC143C"
    const dispatch = useDispatch();
    const itemsRedux = useSelector((state) => state.hits.hits);

    const rValue = useSelector((state) => state.dotInfo.r);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, width / 2, height / 2);

        redrawGraph(context);

        });

    function send(x, y, r) {
        console.log(JSON.stringify({X: x, Y: y, R: r}));
        let token = localStorage.getItem("jwt");
        fetch("http://localhost:8080/dots/check", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            method: "POST",
            body: JSON.stringify({X: x, Y: y, R: r})
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

    function drawPoint(x, y, context, isHit) {
        let localX = x * localR / rValue;
        let localY = -y * localR / rValue;
        context.beginPath()
        context.arc(localX, localY, pointRad, 0,2 * Math.PI);
        if(isHit){
            context.fillStyle = pointColorGreen;
        } else {
            context.fillStyle = pointColorRed;
        }
        context.fill();
        context.closePath();
    }

    function redrawPoints(context) {
        for (let i = 0; i < itemsRedux.length; i++){
            if(itemsRedux[i].r == rValue){
                drawPoint(itemsRedux[i].x, itemsRedux[i].y, context, itemsRedux[i].isHit);
            }
        }
    }

    function redrawGraph(context){
        if (isNaN(rValue) || rValue <= 0){
            context.clearRect(-width / 2, -height / 2, width, height);
            drawGraph(context);
        } else {
            context.fillStyle = "#FFFFFF";
            context.strokeStyle = '#FFFFFF';
            context.clearRect(-width / 2, -height / 2, width, height);
            drawShapes(context);
            drawAxis(context);
            drawOnRTrait(context, rValue);
            redrawPoints(context);
        }

    }
    function drawOnRTrait(context, rValue){
        context.beginPath();
        context.moveTo(localR / 2, traitLen / 2);
        context.lineTo(localR / 2, - traitLen / 2);
        context.moveTo(localR, traitLen / 2);
        context.lineTo(localR, - traitLen / 2);

        context.moveTo(-localR / 2, traitLen / 2);
        context.lineTo(-localR / 2, - traitLen / 2);
        context.moveTo(-localR, traitLen / 2);
        context.lineTo(-localR, - traitLen / 2);

        context.moveTo(-traitLen / 2, localR / 2);
        context.lineTo(traitLen / 2, localR / 2)
        context.moveTo(-traitLen / 2, localR);
        context.lineTo(traitLen / 2, localR)

        context.moveTo(-traitLen / 2, -localR / 2);
        context.lineTo(traitLen / 2, -localR / 2)
        context.moveTo(-traitLen / 2, -localR);
        context.lineTo(traitLen / 2, -localR);
        context.stroke();
        context.fillText((rValue / 2).toString(), localR / 2, -traitLen / 2 - 3);
        context.fillText((-rValue / 2).toString(), -localR / 2, -traitLen / 2 - 3);
        context.fillText((-rValue / 2).toString(), traitLen / 2 + 1, localR / 2 - 2);
        context.fillText((rValue / 2).toString(), traitLen / 2 + 1, -localR / 2 - 2);

        context.fillText(rValue.toString(), localR, -traitLen / 2 - 3);
        context.fillText(-rValue.toString(), -localR, -traitLen / 2 - 3);
        context.fillText(-rValue.toString(), traitLen / 2 + 1, localR - 2);
        context.fillText(rValue.toString(), traitLen / 2 + 1, -localR - 2);
    }

    function drawGraph(context){
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = '#FFFFFF';
        context.clearRect(-width, -height, width, height);
        drawShapes(context);
        drawAxis(context);
        drawRTrait(context);
    }
    function drawShapes(context){
        context.beginPath();
        context.fillStyle = "#EDD7B9";
        context.strokeStyle = '#EDD7B9';
        context.fillRect(0, 0, -localR , localR / 2);
        context.lineTo(0, -localR / 2);
        context.lineTo(-localR / 2, 0);
        context.lineTo(0, 0);
        context.fill();

        context.arc(0, 0, localR / 2, 0, Math.PI / 2);
        context.lineTo(0, 0);
        context.fill();
        context.lineWidth = 1;
        context.moveTo(0, 0);
        context.lineWidth = 2;
        context.closePath();
    }
    function drawAxis(context){
        context.beginPath();
        context.fillStyle = "#A1845D";
        context.strokeStyle = "#A1845D";
        context.moveTo(0, axisLen);
        context.lineTo(0, -axisLen);
        context.moveTo(-axisLen, 0);
        context.lineTo(axisLen, 0);
        context.moveTo(0, -axisLen);
        context.lineTo(-arrowDx, -axisLen + arrowDy);
        context.moveTo(0, -axisLen);
        context.lineTo(arrowDx, -axisLen + arrowDy);

        context.moveTo(axisLen, 0);
        context.lineTo(axisLen - arrowDy, -arrowDx);
        context.moveTo(axisLen, 0);
        context.lineTo(axisLen - arrowDy, arrowDx);
        context.stroke();
        context.closePath();
    }

    function drawRTrait(context){
        context.beginPath();
        context.fillStyle = "#A1845D";
        context.strokeStyle = "#A1845D";
        context.moveTo(localR / 2, traitLen / 2);
        context.lineTo(localR / 2, - traitLen / 2);
        context.moveTo(localR, traitLen / 2);
        context.lineTo(localR, - traitLen / 2);

        context.moveTo(-localR / 2, traitLen / 2);
        context.lineTo(-localR / 2, - traitLen / 2);
        context.moveTo(-localR, traitLen / 2);
        context.lineTo(-localR, - traitLen / 2);

        context.moveTo(-traitLen / 2, localR / 2);
        context.lineTo(traitLen / 2, localR / 2)
        context.moveTo(-traitLen / 2, localR);
        context.lineTo(traitLen / 2, localR)

        context.moveTo(-traitLen / 2, -localR / 2);
        context.lineTo(traitLen / 2, -localR / 2)
        context.moveTo(-traitLen / 2, -localR);
        context.lineTo(traitLen / 2, -localR)

        context.fillText("R/2", localR / 2, -traitLen / 2 - 3);
        context.fillText("-R/2", -localR / 2, -traitLen / 2 - 3);
        context.fillText("-R/2", traitLen / 2 + 1, localR / 2 - 2);
        context.fillText("R/2", traitLen / 2 + 1, -localR / 2 - 2);

        context.fillText("R", localR, -traitLen / 2 - 3);
        context.fillText("-R", -localR, -traitLen / 2 - 3);
        context.fillText("-R", traitLen / 2 + 1, localR - 2);
        context.fillText("R", traitLen / 2 + 1, -localR - 2);
        context.stroke();
        context.closePath();
    }

    return <canvas ref={canvasRef} width={width} height={height} onClick={event => {
        if(isNaN(rValue) || rValue <=0){
            alert("Установите правильно значение радиуса");
        } else {
            const canvas = canvasRef.current;
            let left = canvas.getBoundingClientRect().left;
            let top = canvas.getBoundingClientRect().top;
            let x = (event.clientX - left - width / 2) * rValue / localR;
            let y= -(event.clientY - top - height / 2) * rValue / localR;
            send(x, y, rValue);

        }
    }}/>;
}