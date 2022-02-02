import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css';
import ListCard from './components/ListCard';

import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ListModal from './components/ListModal';

export default function Home() {
    const [lists, setLists] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
  
  
    useEffect(() => {
      axios.get('https://todo-list-symfony-api.herokuapp.com/api/todo_lists')
        .then(response => setLists(response.data['hydra:member']));
    }, []);
  
    return (
      <div className="App">
        <header className='App-header'>
          <img src="https://img.icons8.com/nolan/150/approval.png" />
          <h1>Votre Gestionnaire de Listes</h1>
  
          <Button
            type="primary"
            shape="round"
            icon={<PlusCircleOutlined />}
            size='large'
            onClick={() => setIsModalVisible(true)}>
            Ajouter une liste
          </Button>
  
          {isModalVisible && (
            <ListModal 
            modalTitle="Ajouter une liste"
            lists = {lists}
            setLists = {setLists}
            isVisible={isModalVisible} 
            handleCancel={() => setIsModalVisible(false)} />
          )}
  
          <h2>Listes :</h2>
          <div className='d-flex flex-wrap'>
            {lists.map(list => {
              return (
                <ListCard
                  key={list.id}
                  list={list}
                  setLists={setLists}
                />
              )
            })}
          </div>
        </header>
      </div>
    );
}
