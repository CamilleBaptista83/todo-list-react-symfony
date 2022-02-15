import { useEffect, useState } from 'react';
import './App.css';
import ListCard from './components/ListCard';

import { Button, Spin, Row, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ListModal from './components/ListModal';
import { get, getByName, getFirst } from './apiPlatform';


function App() {

  const [lists, setLists] = useState([]);
  //Modale de l'ajout de la liste
  const [isModalVisible, setIsModalVisible] = useState(false);
  //Liste séléctionnée pour modification
  const [selectedList, setSelectedList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //DarkMode 

  const [mode, setMode] = useState(true)

  useEffect(() => {
    getFirst(setLists, setIsLoading)
  }, []);


  return (
    <div className="App">
      <header className={mode ? "App-header" : "App-header-light"} >

        <Switch
          checkedChildren={<img src="https://img.icons8.com/external-justicon-flat-justicon/15/000000/external-sun-weather-justicon-flat-justicon-1.png" />}
          unCheckedChildren={<img src="https://img.icons8.com/external-justicon-flat-justicon/15/000000/external-moon-weather-justicon-flat-justicon-1.png" />}
          defaultChecked
          onChange={() => {
            setMode(!mode)
            console.log(mode)
          }} />

        <img src="https://img.icons8.com/nolan/150/approval.png" />
        <h1>Votre Gestionnaire de Listes</h1>

        <hr />

        {
          //Bouton pour ajout de liste quand on ests sur téléphone
        }
        <div className='fixed-bottom'>
          <Button
            className='buttonQuery'
            style={{ backgroundColor: '#BB86FC', border: 'none' }}
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedList(null)
              setIsModalVisible(true)
            }} />
        </div>


        <div className='btn-top'>


          {//Ajouter une liste
          }

          <Button
            className='button'
            size='large'
            onClick={() => {
              setSelectedList(null)
              setIsModalVisible(true)
            }}
          >
            Ajouter une liste
          </Button>

          {//Filtre
          }

          <Button
            className='button'
            size='large'
            onClick={() => {
              getByName(setLists)
            }}>
            Trier par nom
          </Button>


          <Button
            className='button'
            size='large'
            onClick={() => {
              get(setLists)
            }}>
            Le plus récent
          </Button>

        </div>

        <div className='container'>

          {isLoading ? <Spin /> : (
            <Row gutter={[16, 16]} className='mt-3'>
              {lists.map(list => {
                return (
                  <ListCard
                    key={list.id}
                    list={list}
                    setLists={setLists}
                    setIsLoading={setIsLoading}
                    setSelectedList={setSelectedList}
                    setIsModalVisible={setIsModalVisible}
                  />
                )
              })}
            </Row>
          )}

        </div>

        {
          //Modal pour l'ajout d'un liste
          isModalVisible && (
            <ListModal
              modalTitle={selectedList === null ? "Ajouter une liste" : "Modifier la liste"}
              setLists={setLists}
              isVisible={isModalVisible}
              setIsLoading={setIsLoading}
              list={selectedList}
              handleCancel={() => setIsModalVisible(false)} />
          )}

      </header>
    </div>
  );
}

export default App;
