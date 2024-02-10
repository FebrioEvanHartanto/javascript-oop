class User {
  constructor(nama, umur, uangSaku){
    this.nama = nama;
    this.umur = umur;
    this.uangSaku = uangSaku;
  }
}

const userList = [];

const registerTab = document.getElementById("register-tab");
const pendaftarTab=  document.getElementById("pendaftar-tab");
const cardContent = document.getElementById("card-content")
const registerFormContent = document.getElementById("register-form");
const listPendaftarContent = document.getElementById("list-pendaftar-content")
const tableUser = document.getElementById("table-body");
const inputNama = document.getElementById("input-nama");
const inputUmur = document.getElementById("input-umur");
const inputUang = document.getElementById("input-uang");
const submitBtn = document.getElementById("add-user-btn");
const validationText = document.getElementById("validation-status-text");
const avgUangSaku = document.getElementById("avg-uang-saku")
const avgUmur = document.getElementById("avg-umur")

function toggleTab(activeTabId, inactiveTabId) {
  document.getElementById(activeTabId).classList.add('active');
  document.getElementById(activeTabId).classList.remove('inactive');
  document.getElementById(inactiveTabId).classList.remove('active');
  document.getElementById(inactiveTabId).classList.add('inactive');

  if (activeTabId === "register-tab") {
    registerFormContent.classList.add('block');
    registerFormContent.classList.remove('hidden');
    listPendaftarContent.classList.add("hidden")
  } else {
    registerFormContent.classList.add("hidden");
    listPendaftarContent.classList.add('block');
    listPendaftarContent.classList.remove('hidden');
    displayList();
  }
}

async function validateData(user) {

  validationText.innerHTML = "Validating data..."
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user.nama.length < 10) {
        reject("Nama harus minimal 10 karakter!");
      } else if (user.umur < 25) {
        reject("Umur harus minimal 25 tahun!");
      } else if (user.uangSaku < 100000 || user.uangSaku > 1000000) {
        reject("Jumlah uang harus diantara 100.000 dan 1.000.000");
      } else {
        resolve();
      }
    }, 1000); 
  });
}

function cariAverageUangSaku(){
  if (userList.length === 0) {
    return 0; 
  } else{
    const totalUangSaku = userList.reduce((akumulator, currentUser) => {
      return akumulator + currentUser.uangSaku;
    }, 0);
    return totalUangSaku / userList.length;
  }
}

function cariAverageUmur(){
  if (userList.umur === 0) {
    return 0; 
  } else{
    const totalUmur = userList.reduce((akumulator, currentUser) => {
      return akumulator + currentUser.umur;
    }, 0);
    return totalUmur / userList.length;
  }
}

function displayList() {
  const averageUangSaku = cariAverageUangSaku();
  const averageUmur = cariAverageUmur();
  tableUser.innerHTML=""

  for(let i= 0; i < userList.length ; i++){
    const row = tableUser.insertRow(i);

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.innerHTML = userList[i].nama;
    cell2.innerHTML = userList[i].umur;
    cell3.innerHTML = `Rp. ${userList[i].uangSaku}`;

    avgUangSaku.innerHTML = `Rata - rata pendaftar memiliki uang sangu sebesar: ${averageUangSaku}`
    avgUmur.innerHTML = `Rata - rata pendaftar berumur: ${averageUmur}`
  };
}


window.onload = () => {
  displayList();
  submitBtn.addEventListener("click", async () => {
    const newUser = new User(inputNama.value, parseInt(inputUmur.value), parseInt(inputUang.value));

    try {
      await validateData(newUser);
      userList.push(newUser);
      inputNama.value = "";
      inputUmur.value = "";
      inputUang.value = "";
      validationText.textContent = "Data successfully validated and added!";
      setTimeout(() => {
        validationText.innerHTML= ""
      },2000)
    } catch (error) {
      validationText.textContent = error;
    }
  });

  toggleTab("register-tab", "pendaftar-tab");
};
