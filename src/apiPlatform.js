import axios from 'axios';

export function getFirst(setLists, setIsLoading) {
    axios.get('http://127.0.0.1:8000/api/todo_lists')
        .then(response => setLists(response.data['hydra:member']))
        .finally(() => setIsLoading(false))
}

export function get(setLists) {
    axios.get('http://127.0.0.1:8000/api/todo_lists')
        .then(response => setLists(response.data['hydra:member']))
}


export function deleteList(idList, setLists) {
    axios.delete('http://127.0.0.1:8000/api/todo_lists/' + idList)
        .then(response => get(setLists))
}

export function addList(name, color, setLists) {
    const list = {
        "name": name,
        "color": color,
        "tasks": []
    };

    axios.post('http://127.0.0.1:8000/api/todo_lists', list)
        .then(response => get(setLists))

}