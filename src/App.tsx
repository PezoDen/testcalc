import React, {ChangeEvent, useState} from "react";
import {YourName} from './YourName';
import {Questions} from "./Questions";
import {Route, Redirect} from "react-router-dom";

export type GenerateArrayType = {
    num1: number
    num2: number
    operator: string
    res?: number
    userRes: number
}

function App() {
    let [name, setName] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }



    function generateArray(): Array<GenerateArrayType> {
        const operators = ["-", "+", "/", "*"];
        const newArray: Array<GenerateArrayType> = [];

        for (let i = 0; i < 10; i++) {
            newArray[i] = {
                operator: operators[(Math.floor(Math.random() * (operators.length)))],
                num1: Math.floor(Math.random() * 100),
                num2: Math.floor(Math.random() * 100),
                userRes: 0,
            }
            calculate(newArray[i])
        }
        return newArray;
    }

    function calculate(obj: GenerateArrayType): GenerateArrayType {
        if (obj.operator === "-") {
            obj.res = obj.num1 - obj.num2
        }
        if (obj.operator === "+") {
            obj.res = obj.num1 + obj.num2
        }
        if (obj.operator === "*") {
            obj.res = obj.num1 * obj.num2
        }
        if (obj.operator === "/") {
            obj.res = obj.num1 % 10 + 2
            obj.num2 = obj.num2 % 10 + 1
            obj.num1 = obj.res * obj.num2
        }
        return obj
    }
    let [arrayGenerated, setArrayGenerated] = useState<Array<GenerateArrayType>>(generateArray)

    return (
        <div>

            <Route
                exact path={"/"}
                render={() => <YourName value={name} onChange={onChangeHandler}/>}
            />
            <Route path={"/questions"} render={() => <Questions arrayGenerated={arrayGenerated}
                                                                setArrayGenerated={setArrayGenerated}
                                                                name={name}/>}/>

            <Route
                path={"*"}
                render={() => <Redirect to={"/"}/>}
            />
        </div>
    );
}

export default App;
