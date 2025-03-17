let button = document.querySelector('button');
        let form = document.querySelector('form');
        let submitButton = document.querySelector('#button');
        button.addEventListener('click', () => {
            form.style.display = 'block';
        });
        submitButton.addEventListener('click', () => {
            form.style.display = 'none';
        });

        const xhr = new XMLHttpRequest();
        let dummy = document.getElementById("ajax");
        
        xhr.open("GET", "https://mimic-server-api.vercel.app/users");
        
        xhr.onload = function () {
            console.log(xhr);
            let body = document.getElementById("bodylist");
            let a = JSON.parse(this.response);
            console.log(a);
        
            a.forEach((userdata) => {
                let row = document.createElement("tr");
        
                let fields = [
                    userdata.id,
                    userdata.name,
                    userdata.email,
                    userdata.username
                ];
        
                fields.forEach(field => {
                    let cell = document.createElement("td");
                    cell.textContent = field;
                    row.appendChild(cell);
                });
        
                body.appendChild(row);
    });
}
        xhr.send();
        
