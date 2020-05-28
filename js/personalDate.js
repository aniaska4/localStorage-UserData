
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

    addButton.addEventListener("click", function (e) {
        const nameValue = document.querySelector('.nameInput').value;
        const surnameValue = document.querySelector('.surnameInput').value;
        const emailValue = document.querySelector('.emailInput').value;
        const adressValue = document.querySelector('.adressInput').value;

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
            userManager.addUser(nameValue, surnameValue, emailValue, adressValue)

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

    addUser(name, surname, email, profession) {
        if(name != undefined || surname != undefined || email != undefined || profession != undefined) {
            const newUser = {
                id: Math.floor(Math.random() * (1000 - 0 + 1)) + 0,
                name: name,
                surname: surname,
                email: email,
                profession: profession
            };
            console.log(name)
    
            this.data.users.push(newUser);
            this.updateUsers(); 
            this.renderUsers();

        } 
    },

    deleteUser(event) {
       

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
