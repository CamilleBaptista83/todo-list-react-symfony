import React, { useState } from "react";
import { Button, Modal } from 'antd';
import TaskForm from "./TaskForm";
import { addTask } from "../apiPlatform";


export default function TaskModal(props) {

    const [title, setTitle] = useState("");
    const [error, setError] = useState(null)

    function handleSubmit() {
        addTask(title, props.list.id, props.setLists)
    }


    return (

        <Modal
            title={props.modalTitle}
            visible={props.isVisible}
            onCancel={props.handleCancel}
            footer={[
                <Button type="primary" onClick={handleSubmit} >
                    Créer
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