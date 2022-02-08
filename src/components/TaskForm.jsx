import React from 'react';
import { Form, Input } from 'antd';

export default function TaskForm(props) {

    function handleChange(event) {
        switch (event.target.name) {
            case "title":
                props.setTitle(event.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <Form>
            <label htmlFor="title">Titre</label>
            <Input placeholder='Nom de la liste' name='title' id='title'
                onChange={handleChange}></Input>
        </Form>
    );
}