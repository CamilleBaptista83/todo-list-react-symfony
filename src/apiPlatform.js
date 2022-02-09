import axios from 'axios';
import swal from 'sweetalert';

const baseUrl = 'http://127.0.0.1:8000/api/'


//Récupération des données

export function getFirst(setLists, setIsLoading) {
    axios.get(baseUrl + 'todo_lists')
        .then(response => setLists(response.data['hydra:member']))
        .finally(() => setIsLoading(false))
}

export function get(setLists) {
    axios.get(baseUrl + 'todo_lists')
        .then(response => setLists(response.data['hydra:member']))
}

export function getByName(setLists) {
    axios.get(baseUrl + 'todo_lists?order%5Bname%5D=asc')
        .then(response => setLists(response.data['hydra:member']))
}

//Gestion des listes

export function deleteList(idList, setLists) {
    swal({
        title: "Etes-vous sûr ?",
        text: "Une fois que la liste est supprimée vous n'avez aucun moyen de récupérer les données",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(baseUrl + 'todo_lists/' + idList)
                    .then(response => get(setLists))
                swal("Votre liste a bien été supprimée", {
                    icon: "success",
                });
            }
        });
}

export function addList(name, color, setLists, setIsModalTaskVisible) {
    const list = {
        "name": name,
        "color": color,
        "tasks": []
    };

    axios.post(baseUrl + 'todo_lists', list)
        .then(response => get(setLists))

}

export function modifyList(name, color, id, setLists) {
    let data = {
        name: name,
        color: color
    };

    console.log(data)

    let config = {
        headers: {
            "Content-Type": "application/merge-patch+json"
        }
    }

    axios.patch(baseUrl + "todo_lists/" + id, data, config)
        .then(response => get(setLists))

}

//Gestion des tâches

export function addTask(title, id, setLists) {
    const task = {
        "title": title,
        "completed": false,
        "list": '/api/todo_lists/' + id
    };

    axios.post(baseUrl + 'tasks', task)
        .then(response => get(setLists))

}

export function modifyTask(title, id, setLists) {
    let data = {
        title: title
    };

    let config = {
        headers: {
            "Content-Type": "application/merge-patch+json"
        }
    }

    axios.patch(baseUrl + "tasks/" + id, data, config)
        .then(response => get(setLists))

}

export function deleteTask(idTask, setLists) {
    swal({
        title: "Etes-vous sûr ?",
        text: "Une fois que la tâche est supprimée vous n'avez aucun moyen de récupérer les données",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(baseUrl + 'tasks/' + idTask)
                    .then(response => get(setLists))
                swal("Votre tâche a bien été supprimée", {
                    icon: "success",
                });
            }
        });
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

    axios.patch(baseUrl + "tasks/" + id, data, config)
        .then(response => get(setLists))

}