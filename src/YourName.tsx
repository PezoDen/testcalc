import React from "react";
import {useHistory} from "react-router-dom";

export function YourName(props: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    const history = useHistory()
    return <div>

        <div className="form-name">
            <span style={{marginRight:"1em"}}>Your name:</span>

            <input
                value={props.value}
                onChange={props.onChange}
            />
            <button style={{marginLeft: "1em"}} className="btn-next" disabled={!props.value} onClick={()=> history.push("/questions")}>Далее</button>
        </div>
    </div>
}