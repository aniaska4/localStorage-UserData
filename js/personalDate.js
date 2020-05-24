
// hide and show personal data:
const modals = () => {

    const showAddModal = () => {
        
        document.querySelector('.container__add-modal').style.display = 'block';
    }

    const hideAddModal = () => {
        document.querySelector('.container__add-modal').style.display = 'none';
    }

    document.querySelector('.container__add .fas').addEventListener('click', showAddModal);
    document.querySelector('.close').addEventListener('click', hideAddModal);
}


//data completion form:

const registrationFormFunction = () => {

    const addButton = document.querySelector('.content__button');
    const information = document.querySelector('.modal__information');
    const container = document.querySelector(".modal");

    const addItem = function (name, surname, email, profession) {
        var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
        
        // I create unique ID for user
        const id = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;

        var newItem = {
            id: id,
            'name': name,
            'surname': surname,
            'email': email,
            'profession': profession
        };
        
        oldItems.push(newItem);
        
        localStorage.setItem('itemsArray', JSON.stringify(oldItems));
    };

    addButton.addEventListener("click", function (e) {
        let nameValue = document.querySelector('.nameInput').value;
        let surnameValue = document.querySelector('.surnameInput').value;
        let emailValue = document.querySelector('.emailInput').value;
        let adressValue = document.querySelector('.adressInput').value;

        controllerUI.addDetailsCheckName();
        controllerUI.addDetailsCheckSurname();
        controllerUI.addDetailsCheckEmail();
        controllerUI.addDetailsCheckAdress()
        e.preventDefault();


        if (nameValue === "" || surnameValue === "" || emailValue === "" || adressValue === "") {
            information.classList.add("falsyValue");
            information.innerHTML = "You Must To Complete All Red Inputs";
            setTimeout(function () {
                information.classList.remove("falsyValue");
                information.classList.add("positiveValue");
            }, 2000)
        } else {    
            const newItems = document.querySelector(".newItems")
            

            newItems.innerHTML += `
            <ul class="personListItem">
              <li class="nameText">${nameValue}</li>
              <li class="surnameText">${surnameValue}</li>
              <li class="emailText">${emailValue}</li>
              <li class="emailText">${adressValue}</li>
              <button class="delete"> x
              </button>
            </li>
          `;

            addItem(nameValue, surnameValue, emailValue,  adressValue)

            //clean inputs in form
            document.querySelector('.nameInput').value = "";
            document.querySelector('.surnameInput').value = "";
            document.querySelector('.emailInput').value = "";
            document.querySelector('.adressInput').value = "";

            container.style.display = "none"

            container.classList.add("positiveValue");
            
        }
        
    });
    
}


const userManager = {
    data: {
        container: document.querySelector(".newItems"),
        users: []
    },

    getUsers() {
        let users = localStorage.getItem('itemsArray');
        if (!users) {
            return;
        }
        users = JSON.parse(users);
        this.data.users = users;

        this.renderUsers();
    },

    updateUsers() {
        localStorage.setItem('itemsArray', JSON.stringify(this.data.users));
    },

    renderUsers() {
        const usersHTML = [];

        this.data.users.forEach((user) => {
            const userTemplate = `
                <ul class="personListItem">
                    <li class="nameText">${user.name}</li>
                    <li class="surnameText">${user.surname}</li>
                    <li class="emailText">${user.email}</li>
                    <li class="emailText">${user.profession}</li>
                    <button
                        type="button"
                        data-user-id="${user.id}"
                        class="delete"
                    >x</button>
                </ul>
            `;

            usersHTML.push(userTemplate);
        });

        this.data.container.innerHTML = usersHTML.join('');
    },

    addUser() {
        this.updateUsers();
        this.renderUsers();
    },

    deleteUser(event) {
        const listIt = document.querySelector(".newItems")    
            listIt.addEventListener("click", function(e) {
                if (e.target.classList.contains('delete')) {
                    listIt.removeChild(e.target.parentNode);
                }
            });

        let userId = event.target.dataset.userId;
        if (!userId) {
            return;
        }

        userId = parseInt(userId, 10);
        const index = this.data.users.findIndex(user => {
            
            return user.id === userId
        });
        if (index !== -1) {
            this.data.users.splice(index, 1);
            this.updateUsers();
            this.renderUsers();
        }
    },

    init() {
        this.data.container.addEventListener('click', (event) => {
            if (event.target.matches('button.delete')) {
                this.deleteUser(event);
            }
        });

        // get the  user from localstorage
        this.getUsers();
        this.addUser();
    }
};

userManager.init();

registrationFormFunction();
modals();
