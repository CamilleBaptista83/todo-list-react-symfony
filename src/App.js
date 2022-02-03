
import { useEffect, useState } from 'react';
import './App.css';
import ListCard from './components/ListCard';

import { Button, Spin } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ListModal from './components/ListModal';
import { getFirst } from './apiPlatform';


function App() {

  const [lists, setLists] = useState([]);
  //Modale de l'ajout de la liste
  const [isModalVisible, setIsModalVisible] = useState(false);
  //Liste séléctionnée pour modification
  const [selectedList, setSelectedList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFirst(setLists, setIsLoading)
  }, []);

  return (
    <div className="App">
      <header className='App-header'>
        <img src="https://img.icons8.com/nolan/150/approval.png" />
        <h1>Votre Gestionnaire de Listes</h1>
      </header>

      <Button
        className='m-5'
        type="primary"
        shape="round"
        icon={<PlusCircleOutlined />}
        size='large'
        onClick={() => setIsModalVisible(true)}>
        Ajouter une liste
      </Button>


      {
      //Modal pour l'ajout d'un liste
      isModalVisible && (
        <ListModal
          modalTitle= {selectedList === null ? "Ajouter une liste" : "Modifier la liste"} 
          setLists={setLists}
          isVisible={isModalVisible}
          setIsLoading={setIsLoading}
          selectedList = {selectedList}
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
                setIsLoading={setIsLoading}
                setSelectedList = {setSelectedList}
                setIsModalVisible = {setIsModalVisible}
              />
            )
          })}
        </div>
      )}
    </div>
  );
}

export default App;
