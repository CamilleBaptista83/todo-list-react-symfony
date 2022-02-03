import React, { useState } from 'react'
import { completedTask } from '../apiPlatform';

import CheckboxTask from './CheckboxTask';


export default function ListTasks(props) {

    const [taskCompleted, setTaskCompleted] = useState(props.task.completed)
    const [submit, setSubmit] = useState(false)

    if (submit === true) {
        completedTask(props.task.id, taskCompleted, props.setLists)
    }

    return (
        <CheckboxTask
            key={props.task.id}
            title={props.task.title}
            check={taskCompleted}
            taskCompleted={taskCompleted}
            setTaskCompleted={setTaskCompleted}
            setSubmit={setSubmit}
        />
    )
}
