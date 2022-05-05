    var addBar = $('#todo-input');
    var list = document.getElementById('todo-list');
    var btnUpdate = document.getElementById('update-item');
    var btnRemove = document.getElementById('delete-item');
    var totalCount = document.getElementById('total-count');

    var currentInputValue = '';
    addBar.on({
    'input': function (e) {
        console.log(e.target.value);
        currentInputValue = e.target.value;
    },
    'keyup': function (e) {
        if (e.keyCode === 13) {
            createTODOItemAtBackend();
        }
    }
    })

    function createNewNode() {
        var newListElement = document.createElement('li');
        var textNode = document.createTextNode(currentInputValue);
        newListElement.innerHTML = '<i onclick="remove(this)"class="fas fa-trash"></i>';
        newListElement.appendChild(textNode);
        newListElement.id = 'item' + (list.childElementCount + 1);

        return newListElement;
    }

    function addListItem() {
    if (currentInputValue !== undefined && currentInputValue !== null && currentInputValue !== '') {
            var newListElement = createNewNode();

        list.appendChild(newListElement);
        currentInputValue = '';
        }
        else {
            alert('Please enter a valid TODO item');
        }
    }

    function clearInputData() {
        addBar.val('');
        currentInputValue = '';
    }

    function remove(me) {
        var count = parseInt(totalCount.innerHTML);
        count -= 1;
        if (count < 0) count = 0;
        totalCount.innerHTML = count.toString();
        me.parentElement.remove();
    }

    /*addBar.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            addListItem();
        }
    });*/

    /*
    addBar.addEventListener('input', function (e) {
    currentInputValue = e.target.value;
    });

    addBar.addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
        createTODOItemAtBackend();
    }
    });*/

    $('#add-item').click(createTODOItemAtBackend);

    //btnAdd.addEventListener('click', createTODOItemAtBackend);

    /*btnUpdate.addEventListener('click', function () {
        var firstElement = list.firstElementChild;
        var newListElement = createNewNode();

        list.replaceChild(newListElement, firstElement);
    })*/

    btnUpdate.addEventListener('click', function () {
        var firstElement = list.firstElementChild;
        var newListElement = createTODODynamically(firstElement.id, currentInputValue);
        var count = parseInt(totalCount.innerHTML);
        count -= 1;
        if (count < 0) count = 0;
        totalCount.innerHTML = count.toString();
        list.replaceChild(newListElement, firstElement);
        clearInputData();
    })

    btnRemove.addEventListener('click', function () {
        var firstElement = list.firstElementChild;
        var count = parseInt(totalCount.innerHTML);
        count -= 1;
        if (count < 0) count = 0;
        totalCount.innerHTML = count.toString();
        list.removeChild(firstElement);
    })

    function createTODODynamically(id, title) {
        var newListElement = document.createElement('li');
        var textNode = document.createTextNode(title);
        newListElement.innerHTML = '<i onclick="remove(this)"class="fas fa-trash"></i>';
        newListElement.appendChild(textNode);
        newListElement.id = id;
        var count = parseInt(totalCount.innerHTML);
        count += 1;
        totalCount.innerHTML = count.toString();
        return newListElement;
    }

    /*function getTODOListFromBackend() {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    var response = JSON.parse(this.responseText);
                    for (var i = 0; i < response.length; i++) {
                        list.appendChild(createTODODynamically(response[i].id, response[i].title));
                    }
                }
                else {
                    console.log('Call Falied');
                }
            }
        }
        http.open('GET', "https://jsonplaceholder.typicode.com/todos", true);
        http.send();
    }*/

    function getTODOListFromBackend() {
    $.get('https://jsonplaceholder.typicode.com/todos', function (data,status) {
        var response = data;
        for (var i = 0; i < response.length; i++) {
            list.appendChild(createTODODynamically(response[i].id, response[i].title));
        }
    })
    }

    /*var listItem = '<li>First List Item</li>';
    var listItem1 = '<li>First List Item 1</li>';
    var listItem2 = '<li>First List Item 2</li>';
    var listItem3 = '<li>First List Item 3</li>';
    console.log(listItem);
    list.append(listItem, listItem1, listItem2, listItem3);
    list.remove();
    $('li').first().remove();
    $('li').last().remove();
    $('li').eq(1).remove();*/

    getTODOListFromBackend();

    /*function createTODOItemAtBackend() {
        var http = new XMLHttpRequest();
        http.open('POST', "https://jsonplaceholder.typicode.com/todos", true);
        http.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 201) {
                    var response = JSON.parse(this.responseText);
                    list.appendChild(createTODODynamically(response.id, currentInputValue));
                    console.log('Add item to the list');
                    clearInputData();
                }
                else {
                    console.log('Call Falied');
                }
            }
        }
        var obj = JSON.stringify({
            "userId": 1,
            "title": currentInputValue,
            "completed": false
        })
        http.send(obj);
    }*/

    function createTODOItemAtBackend() {
        var obj = {
            "userId": 1,
            "title": currentInputValue,
            "completed": false
        };
        $.post('https://jsonplaceholder.typicode.com/todos', obj, function (data,status) {
            var response = data;
            list.appendChild(createTODODynamically(response.id, currentInputValue));
            console.log('Add item to the list');
            clearInputData();
        })
    }