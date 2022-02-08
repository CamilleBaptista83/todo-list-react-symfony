import React, { useState } from "react";
import { Button, Modal } from 'antd';
import TaskForm from "./TaskForm";
import { addTask, modifyTask } from "../apiPlatform";


export default function TaskModal(props) {

    const [title, setTitle] = useState(props.taskSelected ? props.taskSelected.title : "");
    const [error, setError] = useState(null)

    function handleSubmit() {
        if (props.list) {
            modifyTask(title, props.taskSelected.id, props.setLists)
        } else {
            addTask(title, props.list.id, props.setLists)
        }
        props.setIsModalTaskVisible(false)
    }


    return (

        <Modal
            title={props.modalTitle}
            visible={props.isVisible}
            onCancel={props.handleCancel}
            footer={[
                <Button type="primary" onClick={handleSubmit} >
                    {props.taskSelected ? "Modifier" : "Créer"}
                </Button>
            ]}
        >
            {error && <p>Une erreur est survenue</p>}
            <TaskForm
                title={title}
                setTitle={setTitle}/>
        </Modal>
    );
}