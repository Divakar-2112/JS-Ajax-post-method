document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector("button");
    let buttons = document.getElementById("btn2");
    let form = document.querySelector("form");
    let forms = document.getElementById("editform");
    let submitButton = document.getElementById("btn"); 
    let editButtons = document.getElementById("editbtn");

    if (button) {
        button.addEventListener("click", () => {
            form.style.display = "block";
        });
    }

    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://mimic-server-api.vercel.app/users");
            xhr.setRequestHeader("Content-Type", "application/json");

            let name = document.getElementById("name");
            let email = document.getElementById("email");
            let username = document.getElementById("username");


            let data = {
                name: name.value,
                email: email.value,
                username: username.value
            };


            xhr.send(JSON.stringify(data));
            console.log(data);
            form.style.display = "none";
            alert("User added successfully");
            xhr.onload = function () {
                if (xhr.status === 200 || xhr.status === 201) {
                    fetchUsers()
                    console.log("Success:", xhr.responseText);
                } else {
                    console.error("Error:", xhr.status, xhr.statusText);
                }
            };            
        });
        
    }
    if (buttons) {
        buttons.addEventListener("click", () => {
            forms.style.display = "block";
        });
    }

    function fetchUsers() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://mimic-server-api.vercel.app/users");

        xhr.onload = function () {
            if (xhr.status === 200) {
                let body = document.getElementById("bodylist");
                let users = JSON.parse(this.response);

                users.forEach((userdata) => {
                    let row = document.createElement("tr");

                    let fields = [userdata.id, userdata.name, userdata.email, userdata.username];

                    fields.forEach(field => {
                        let cell = document.createElement("td");
                        cell.textContent = field;
                        row.appendChild(cell);
                    });
                    let actioncell = document.createElement("td");
                    let deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";
                    deleteButton.id = "delete";
                    deleteButton.addEventListener("click", () => {
                        const xhr = new XMLHttpRequest();
                        xhr.open("DELETE", `https://mimic-server-api.vercel.app/users/${userdata.id}`);
                        
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                // fetchUsers();
                                console.log("Success:", xhr.responseText);
                            } else {
                                console.error("Error:", xhr.status, xhr.statusText);
                            }
                        };
                        xhr.send();
                        alert("User deleted successfully");
                    });

                    let editButton = document.createElement("button");
                    editButton.textContent = "Edit";
                    editButton.id = "edit";
                    editButton.addEventListener("click", () => {
                        let forms = document.getElementById("editform");
                        forms.style.display = "block";
                        let name = document.getElementById("name2");
                        let email = document.getElementById("email2");
                        let username = document.getElementById("username2");
                        name.value = userdata.name;
                        email.value = userdata.email;
                        username.value = userdata.username;
                        editButtons.addEventListener("click", (event) => {
                            event.preventDefault();
                            const xhr = new XMLHttpRequest();
                            xhr.open("PUT", `https://mimic-server-api.vercel.app/users/${userdata.id}`);
                            xhr.setRequestHeader("Content-Type", "application/json");

                            let data = {
                                name: name.value,
                                email: email.value,
                                username: username.value
                            };

                            xhr.send(JSON.stringify(data));
                            console.log(data);
                            forms.style.display = "block";
                            alert("User updated successfully");
                            xhr.onload = function () {
                                if (xhr.status === 200 || xhr.status === 201) {
                                    // fetchUsers()
                                    console.log("Success:", xhr.responseText);
                                } else {
                                    console.error("Error:", xhr.status, xhr.statusText);
                                }
                            };
                        });
                    });
                    actioncell.appendChild(deleteButton);
                    actioncell.appendChild(editButton);
                    row.appendChild(actioncell);
                    body.appendChild(row);
                }
                );
            } else {
                console.error("Failed to fetch users:", xhr.status, xhr.statusText);
            }
        };

        xhr.send();
    }

    fetchUsers();

});




