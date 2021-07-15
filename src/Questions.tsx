import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {GenerateArrayType} from "./App";

type  IPropsType = {
    arrayGenerated: Array<GenerateArrayType>
    setArrayGenerated: Dispatch<SetStateAction<GenerateArrayType[]>>
    name: string
}

export function Questions(props: IPropsType) {
    const [solved, setSolved] = useState(false)
    const [say, setSay] = useState("")

    function result(userRes: number, res: number) {
        let goodResult: number[] = []
        if (userRes === res) {
            goodResult.push(1)
        }
        let badResult: number[] = []
        if (userRes !== res) {
            badResult.push(1)
        }
        // console.log({goodResult, badResult})
        return {goodResult, badResult}
    }

    //all questions logic
    let mapped = props.arrayGenerated.map((el, i) => {
        const color = !solved ? 'white' : +el.userRes === el.res ? 'green' : 'red'
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value
            props.setArrayGenerated((prevState: any) => {
                let copy = [...prevState]
                copy[i].userRes = +value
                result(el.userRes, el.res!)
                return copy
            })
        }
        return <div className="questionsBlocks" key={i}>
            <div className="questionsBlocks-exercise" >{el.num1} {el.operator} {el.num2} =</div>

            <input className="questionsBlocks-result" disabled={solved} style={{backgroundColor: color, color: "#781616FF"}}
                   value={el.userRes === 0 ? '' : el.userRes} type={"number"}
                   onChange={onChangeHandler}/>
        </div>
    })


    const goodResults = props.arrayGenerated.reduce((acc, el) => el.res === el.userRes ? acc + 1 : acc, 0);
    let badResults = 10 -goodResults

    useEffect(() => {
        if (7 <= goodResults && goodResults <= 10) {
            setSay("- отличная работа")
        } else if (4 <= goodResults && goodResults <= 6) {
            setSay("- хороший результат")
        } else if (goodResults <= 3){
            setSay("- не переживай в следующий раз будет лучше :) ")
        }
    }, [goodResults])


    return <div className="questions">
        <div className="mappedItems">{mapped}</div>
        {/*<div>{say}</div>*/}
        {solved && <div className="goodResults"><span style={{marginRight: "20px"}}><strong>{props.name} {say}:</strong></span> <div style={{marginRight: "20px"}}><strong>Правильных ответов :</strong> {goodResults}</div>
            <div><strong>Неправильных ответов :</strong> {badResults}</div>
        </div>}
        <div className="buttons-blocks">
            <Link style={{textDecoration: 'none'}} to="/">
                <button className="btn-prev">
                    Назад
                </button>
            </Link>
            <button className="btn-next" onClick={() => setSolved(true)}> Посмотреть результат</button>
        </div>
    </div>;
}
