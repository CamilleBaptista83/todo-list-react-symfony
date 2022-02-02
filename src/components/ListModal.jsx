import React, { useEffect, useState } from "react";
import { Button, Modal } from 'antd';
import ListForm from "./ListForm";

import axios from 'axios';


export default function ListModal(props) {

    const [name, setName] = useState("");
    const [color, setColor] = useState("#3B97FF");
    const [error, setError] = useState(null)


    function handleSubmit() {

        const list = {
            "name": name,
            "color": color,
            "tasks": []
        };

        axios.post('http://127.0.0.1:8000/api/todo_lists', list)
            .then(function (response) {
                if (response.data.redirect == '/') {
                    window.location = "/index"
                }
            })

        props.handleCancel();
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
            <ListForm
                name={name}
                color={color}
                setName={setName}
                setColor={setColor} />
        </Modal>
    );
}