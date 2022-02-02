import React, { useState } from 'react'

import CheckboxTask from './CheckboxTask';


export default function ListTasks(props) {

    const [taskCompleted, setTaskCompleted] = useState(props.task.completed)
    const [submit, setSubmit] = useState(false)

    if (submit === true) {
        console.log('submit ' + taskCompleted)
        console.log('id ' + props.task.id)

        fetch("http://127.0.0.1:8000/api/tasks/" + props.task.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/merge-patch+json"
            },
            body: JSON.stringify(
                {
                    "completed": taskCompleted
                }
            )
        })
            .then(res => console.log(res))
            .then(function (res) {
                if (res.redirected == '/') {
                    window.location = "/index"
                }
            })
            .catch(err => console.error(err))
    }


    /*async function onChangeBox() {
        let data = setTaskCompleted(!taskCompleted)
        let updateCompleted = !taskCompleted;

        await fetch("https://todo-list-symfony-api.herokuapp.com/api/tasks/" + props.task.id, { // note we are going to /1
            method: "PATCH",
            headers: {
                "Content-Type": "application/merge-patch+json"
            },
            body: JSON.stringify(
                {
                    "completed": updateCompleted   // we are changing the "likes" value to 5

                    https://www.zone-telechargement.work/?p=film&id=12366-spider-man-far-from-home
                }
            )
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                return res
            })
            .catch(err => console.error(err))

    };*/

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
