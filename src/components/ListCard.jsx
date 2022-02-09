import React, { useState } from "react";

import { EditTwoTone, CloseCircleTwoTone, PlusOutlined } from '@ant-design/icons';

import { Card, Progress, Button, Col } from 'antd';
import ListTasks from './ListTasks';
import { deleteList } from '../apiPlatform';
import TaskModal from "./TaskModal";


export default function ListCard(props) {

    const [isModalTaskVisible, setIsModalTaskVisible] = useState(false);
    const [taskSelected, setTaskSelected] = useState(null);

    // ProgressBar
    let completed = 0
    let percent = 0

    props.list.tasks.forEach(element => {
        if (element.completed === true) {
            completed = completed + 1
            return completed
        }
    })

    percent = Math.round((completed * 100) / props.list.tasks.length)


    return (
        <Col span={6} xs={24} sm={12} xl={6}>
            <div
                className="site-card-border-less-wrapper m-1"
                style={{ borderTop: `20px solid ${props.list.color}` }}>
                <Card
                    title={props.list.name}
                    bordered={false}

                    actions={[
                        <EditTwoTone key="edit"
                            twoToneColor="#B3B3B3"
                            onClick={() => {
                                props.setIsModalVisible(true)
                                props.setSelectedList(props.list)
                            }} />,
                        <CloseCircleTwoTone key="delete"
                            twoToneColor="#B3B3B3"
                            onClick={() => deleteList(props.list.id, props.setLists)} />,
                    ]}
                >

                    <Progress className='mb-3' percent={percent} />

                    {props.list.tasks.length <= 0 && (
                        <p>Aucune tâche pour cette liste</p>
                    )}

                    {props.list.tasks.map(task => {
                        return (
                            <ListTasks
                                key={task.id}
                                task={task}
                                setLists={props.setLists}
                                taskSelected={taskSelected}
                                setTaskSelected={setTaskSelected}
                                setIsModalTaskVisible={setIsModalTaskVisible} />

                        )
                    })}

                    <div className='mt-4'>
                        <Button
                            style={{ backgroundColor: '#BB86FC', border: 'none' }}
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setIsModalTaskVisible(true)
                                setTaskSelected(null)
                            }} />
                    </div>

                </Card>

                {
                    //Modal pour l'ajout d'un liste
                    isModalTaskVisible && (
                        <TaskModal
                            modalTitle={taskSelected === null ? "Ajouter une tâche" : "Modifier la tâche"}
                            list={props.list}
                            isVisible={isModalTaskVisible}
                            setLists={props.setLists}
                            taskSelected={taskSelected}
                            setTaskSelected={setTaskSelected}
                            setIsModalTaskVisible={setIsModalTaskVisible}
                            handleCancel={() => setIsModalTaskVisible(false)} />
                    )}
            </div>
        </Col>
    );
}
