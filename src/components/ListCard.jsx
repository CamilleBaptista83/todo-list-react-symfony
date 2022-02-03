import React from 'react';
import axios from 'axios';

import { EditOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';

import { Card, Progress, Button } from 'antd';
import ListTasks from './ListTasks';
import { deleteList } from '../apiPlatform';

export default function ListCard(props) {


    // ProgressBar
    let completed = 0
    let percent = 0

    percent = Math.round((completed * 100) / props.list.tasks.length)


    return (
        <div
            className="site-card-border-less-wrapper m-3"
            style={{ borderTop: `20px solid ${props.list.color}` }}>
            <Card
                title={props.list.name}
                bordered={false}
                style={{ width: 300 }}

                actions={[
                    <EditOutlined key="edit" />,
                    <CloseOutlined key="delete"
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
                            task={task} />

                    )
                })}

                <div className='mt-4'>
                    <Button shape="round" icon={<PlusOutlined />} />
                </div>

            </Card>
        </div>
    );
}
