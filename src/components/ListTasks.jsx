import React, { useState } from 'react'
import { completedTask } from '../apiPlatform';

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
                                    twoToneColor="#7cb305"
                                />
                            }
                        />,
                        ,
                        <Button
                            type="text"
                            icon={
                                <CloseCircleTwoTone key="delete"
                                    twoToneColor="#f5222d"
                                />
                            }
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
