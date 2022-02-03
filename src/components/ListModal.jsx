import React, { useEffect, useState } from "react";
import { Button, Modal } from 'antd';
import ListForm from "./ListForm";

import axios from 'axios';
import { addList } from "../apiPlatform";


export default function ListModal(props) {

    const [name, setName] = useState("");
    const [color, setColor] = useState("#3B97FF");
    const [error, setError] = useState(null)


    function handleSubmit() {

        addList(name, color, props.setLists)

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