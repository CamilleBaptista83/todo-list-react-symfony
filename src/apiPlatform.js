import axios from 'axios';
import swal from 'sweetalert';

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
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete('http://127.0.0.1:8000/api/todo_lists/' + idList)
                    .then(response => get(setLists))
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
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


export function addTask(title, idList, setLists) {
    const task = {
        "title": title,
        "completed": false,
        "list": idList
    };

    axios.post('http://127.0.0.1:8000/api/todo_lists', task)
        .then(response => get(setLists))

}

export function modifyList(name, color, id, setLists) {
    let data = {
        name : name,
        color : color
    };

    let config = {
        headers: {
            "Content-Type": "application/merge-patch+json"
        }
    }

    axios.patch("http://127.0.0.1:8000/api/todo_lists/" + id, data, config)
        .then(response => get(setLists))

}


export function completedTask(id, taskCompleted, setLists) {
    let data = {
        completed: taskCompleted
    };

    let config = {
        headers: {
            "Content-Type": "application/merge-patch+json"
        }
    }

    axios.patch("http://127.0.0.1:8000/api/tasks/" + id, data, config)
        .then(response => get(setLists))

}