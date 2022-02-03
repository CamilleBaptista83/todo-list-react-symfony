
import { useEffect, useState } from 'react';
import './App.css';
import ListCard from './components/ListCard';

import { Button, Spin } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ListModal from './components/ListModal';
import { getFirst } from './apiPlatform';


function App() {

  const [lists, setLists] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFirst(setLists, setIsLoading)
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
            setLists={setLists}
            isVisible={isModalVisible}
            setIsLoading = {setIsLoading}
            handleCancel={() => setIsModalVisible(false)} />
        )}

        <h2>Listes :</h2>

        {isLoading ? <Spin /> : (
          <div className='d-flex flex-wrap'>
            {lists.map(list => {
              return (
                <ListCard
                  key={list.id}
                  list={list}
                  setLists={setLists}
                  setIsLoading = {setIsLoading}
                />
              )
            })}
          </div>
        )}


      </header>
    </div>
  );
}

export default App;
