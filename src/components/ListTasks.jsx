import React, { useState } from 'react'
import { completedTask, deleteTask } from '../apiPlatform';

import { EditTwoTone, CloseCircleTwoTone } from '@ant-design/icons';


import CheckboxTask from './CheckboxTask';
import { Button, List } from 'antd';


export default function ListTasks(props) {

    const [taskCompleted, setTaskCompleted] = useState(props.task.completed)
    const [submit, setSubmit] = useState(false)

    if (submit === true) {
        completedTask(props.task.id, taskCompleted, props.setLists, props.setIsModalTaskVisible)
    }

    return (
        <div className='m-2'>
            <List>
                <List.Item
                    actions={[
                        <Button
                            type="text"
                            icon={
                                <EditTwoTone key="edit"
                                    twoToneColor="#B3B3B3"
                                    style={{ fontSize: '123%'}}
                                />
                            }
                            onClick={() => {
                                props.setTaskSelected(props.task)
                                props.setIsModalTaskVisible(true)
                            }}
                        />,
                        ,
                        <Button
                            type="text"
                            icon={
                                <CloseCircleTwoTone key="delete"
                                    twoToneColor="#B3B3B3"
                                    style={{ fontSize: '120%'}}
                                />
                            }

                            onClick={() => {
                                deleteTask(props.task.id, props.setLists)
                            }}
                        />
                    ]}
                >
                    <CheckboxTask
                        key={props.task.id}
                        title={props.task.title}
                        check={taskCompleted}
                        taskCompleted={taskCompleted}
                        setTaskCompleted={setTaskCompleted}
                        setSubmit={setSubmit}
                    />
                </List.Item>

            </List>
        </div>
    )
}
