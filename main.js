const form = document.getElementById("addForm"); 
const itemsList = document.getElementById("items"); 
const filter = document.getElementById("filter"); 

let itemsArray = [];

getFromLocalStorage();

form.addEventListener("submit", addItem);

itemsList.addEventListener("click", removeItem);

filter.addEventListener("keyup", filterItems);

function addItem(e) {

    e.preventDefault();

    const newItemInput = document.getElementById("newItemText");

    const newItemText = newItemInput.value;

    const newElement = document.createElement("li");
    newElement.className = "list-group-item";
   

    const newTextNode = document.createTextNode(newItemText);
    newElement.appendChild(newTextNode);

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    deleteBtn.className = "btn btn-light btn-sm float-right";
    deleteBtn.dataset.action = "delete";

    newElement.appendChild(deleteBtn);

    itemsList.prepend(newElement);

    newItemInput.value = "";

    let id = 1;
        if (itemsArray.length > 0) {
        id = itemsArray[itemsArray.length - 1]['id'] + 1; 
        };

        const taskObject = {
        id: id,
        text: newItemText
    };

    newElement.dataset.id = id;

    itemsArray.push(taskObject);
    saveToLocalStorage(itemsArray);

}

function removeItem(e) {
    if (
        e.target.hasAttribute("data-action") &&
        e.target.getAttribute("data-action") == "delete"
    ) {
        if (confirm("Удалить задачу?")) {

           const deleteId = e.target.parentNode.getAttribute('data-id');
            const itemsArrayParse = JSON.parse(localStorage.getItem('tasks'));
            itemsArrayParse.forEach(function(item, index){

                if (item.id == deleteId) {
                    itemsArrayParse.splice(index, 1);

                    itemsArray.forEach(function(item, index){
                        if (item.id == deleteId) {
                            itemsArray.splice(index, 1)
                        }
                    })

                    e.target.parentNode.remove();

                    localStorage.clear();
                    saveToLocalStorage(itemsArrayParse);
                }}
            )
        }};
    };

function filterItems(e) {

    const searchedText = e.target.value.toLowerCase();

    const items = itemsList.querySelectorAll("li");

    items.forEach(function (item) {

        const itemText = item.firstChild.textContent.toLowerCase();

        if (itemText.indexOf(searchedText) != -1) {
          
            item.style.display = "block";
        } else {

            item.style.display = "none";
        }
    });
};

function saveToLocalStorage(go) {
    localStorage.setItem("tasks", JSON.stringify(go));
};

function getFromLocalStorage() {
    const data = localStorage.getItem("tasks");
    if (data) {
        itemsArray = JSON.parse(data);
        itemsArray.forEach(function (item) {
            const html = `<li class="list-group-item" data-id="${item.id}">
    ${item.text}
    <button
        data-action="delete"
        type="button"
        class="btn btn-light btn-sm float-right"
    >
    Удалить
    </button>
    </li>`;
            itemsList.insertAdjacentHTML('beforeend', html)
        })
    } 
};
