var selectedRow = null;
var editstate = true; //관리자 목록회원수정-true, 회원정보수정-false / 추후 로그인기능 추가후 기본값 false





function onRegiSubmit() {
    var formData = readFormData();
    insertNewRecord(formData);
    /*
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    } */
}

function readFormData() {
    var formData = {};
    formData["userid"] = document.getElementById("newid").value;
    formData["userpw"] = document.getElementById("newpw").value;
    formData["username"] = document.getElementById("newname").value;
    formData["userphone"] = document.getElementById("newphone").value;
    formData["userdate"] = document.getElementById("newdate").value;
    return formData;
}

function insertNewRecord(data) { //json만들고 수정요
    var table = document.getElementById("adminList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.userid;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.userpw;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.username;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.userphone;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.userdate;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<a onClick="onEdit(this)">수정 </a>
                       <a onClick="onDelete(this)">삭제</a>`;
}

function resetForm() {
    document.getElementById("userid").value = "";
    document.getElementById("userpw").value = "";
    document.getElementById("username").value = "";
    document.getElementById("userphone").value = "";
    document.getElementById("userdate").value = "";
    selectedRow = null;
}

function onInfoSubmit(td) {
    if(editstate==true){
        selectedRow = td.parentElement.parentElement;
        document.getElementById("userid").value = selectedRow.cells[0].innerHTML;
        document.getElementById("userpw").value = selectedRow.cells[1].innerHTML;
        document.getElementById("username").value = selectedRow.cells[2].innerHTML;
        document.getElementById("userphone").value = selectedRow.cells[3].innerHTML;
        document.getElementById("userdate").value = selectedRow.cells[4].innerHTML;
    }else{}
    
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.userid;
    selectedRow.cells[1].innerHTML = formData.userpw;
    selectedRow.cells[2].innerHTML = formData.username;
    selectedRow.cells[3].innerHTML = formData.userphone;
    selectedRow.cells[4].innerHTML = formData.userdate;
}

function onDelete(td) {
    if (confirm('정말로 이 회원을 삭제하시겠습니까? ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("adminList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

function moveLogin(){

}

function moveRegister(){

}

function onAdmin(){

}

function onLoginSubmit() {

}
function logout(){

}