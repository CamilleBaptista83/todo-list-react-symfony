import React from 'react'

import { Checkbox } from 'antd';


export default function CheckboxTask(props) {

    function handleChange() {
        props.setTaskCompleted(!props.taskCompleted)
        props.setSubmit(true)
    }

    return (
        <Checkbox
        checked= {props.check}
        onChange={handleChange}
        >{props.title}</Checkbox>
    )
}

