let crudTab = document.querySelector(".crudTable");
let thead = document.querySelector("thead");
let tbody = document.querySelector("tbody");
let form = document.querySelector("form");

function TuLocalStorage(data) {
    localStorage.setItem("crutData", JSON.stringify(data));
}

function LocalStoragefrom() {
    let data = localStorage.getItem("crutData");
    return data ? JSON.parse(data) : [];
}

let crutDatas = LocalStoragefrom().length
    ? LocalStoragefrom()
    : [
        { id: 1, name: "John Doe", email: "John@example.com" },
        { id: 2, name: "Jane Doe", email: "Jane@example.com" },
        { id: 3, name: "Alice Doe", email: "Alice@example.com" },

    ];
TuLocalStorage(crutDatas);

(function rendeTableHead() {
    let tr = document.createElement("tr");
    Object.keys(crutDatas[0]).forEach((key) => {
        let th = document.createElement("th");
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        tr.append(th);
    });

    let thAction = document.createElement("th");
    thAction.textContent = "Action";
    tr.append(thAction);

    thead.append(tr);
})();

function renderTableData(datas) {
    tbody.innerHTML = "";
    datas.forEach((val) => {
        let tr = document.createElement("tr");
        let tdId = document.createElement("td");
        let tdName = document.createElement("td");
        let tdEmail = document.createElement("td");
        let tdAction = document.createElement("td");

        tdId.textContent = val.id;
        tdName.textContent = val.name;
        tdEmail.textContent = val.email;

        tr.append(tdId, tdName, tdEmail, tdAction);

        let deltBtn = document.createElement("button");
        let edidBtn = document.createElement("button");
        deltBtn.innerHTML = `<button><img src='./delet.png' alt='' width="25px" height="25px"></button>`;
        edidBtn.innerHTML = `<button><img src='./image (8) (1).png' alt='' width="25px"></button>`;
        tdAction.append(deltBtn, edidBtn);

        tbody.append(tr);

        deltBtn.addEventListener("click", () => {
            onDelete(val.id);
        });
        edidBtn.addEventListener("click", () => {
            onEdit(val);
        });
    });

    if (datas.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4'>No data found</td></tr>";
    }
}

renderTableData(crutDatas);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let nameText = e.target[0].value;
    let emailText = e.target[1].value;

    if (!nameText || !emailText) {
        alert("name ni email ni kirgizing");
        return;
    }

    let newData = {
        id: crutDatas.length + 1,
        name: nameText,
        email: emailText,
    };

    crutDatas.push(newData);
    TuLocalStorage(crutDatas);
    renderTableData(crutDatas);

    e.target[0].value = "";
    e.target[1].value = "";
});

function onDelete(id) {
    crutDatas = crutDatas.filter((val) => val.id !== id);
    TuLocalStorage(crutDatas);
    renderTableData(crutDatas);
}

function onEdit(val) {
    let inputName = prompt("yangi name", val.name);
    let inputEmail = prompt("yangi email:", val.email);

    if (inputName && inputEmail) {
        crutDatas = crutDatas.map((item) =>
            item.id === val.id ? { ...item, name: inputName, email: inputEmail } : item
        );
        TuLocalStorage(crutDatas);
        renderTableData(crutDatas);
    }
}