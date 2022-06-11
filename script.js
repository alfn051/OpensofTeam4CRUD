var selectedRow = null;
var editstate = true; //관리자 목록회원수정-true, 회원정보수정-false / 추후 로그인기능 추가후 기본값 false
var localStorage = window.localStorage;
var sessionStorage = window.sessionStorage;
var loginstate = null;
var member = []; //회원 배열, 헷갈림 주의!
if(localStorage.length>0){ //로컬스토리지에 저장된 배열이 있으면 불러오기
    member = JSON.parse(localStorage.getItem('member')); 
}
if(sessionStorage.length>0){
    loginstate = sessionStorage.getItem('login');
}
if(loginstate!=null){
   // moveInfo(); //이게 왜 오류가 나냐고 계속 왜
}

function onLoginSubmit() {
    var form = document.loginform;
    loop1:
    while(true){
        for(var i=0; i<member.length; i++){
            if(member[i]['userid'] == form.loginid.value){
                if(member[i]['userpw'] == form.loginpw.value){
                    alert(member[i]['username'] + "님, 환영합니다!");
                    loginstate=i;
                    sessionStorage.setItem('login',loginstate);
                    moveInfo();
                    break loop1;
                }
                else{
                    alert("비밀번호가 틀렸습니다.");
                    break loop1;
                }
            }
            else{
                
            }
        }alert("아이디가 틀렸습니다.");break loop1;
    }
    
}

function moveInfo(){
    var form = document.infoform;
    form.userid.value=member[loginstate]['userid'];
    form.userpw.value=member[loginstate]['userpw'];
    form.username.value=member[loginstate]['username'];
    form.userphone.value=member[loginstate]['userphone'];
    form.userdate.value=member[loginstate]['userdate'];
}

function logout(){
    loginstate=null;
    sessionStorage.setItem('login',loginstate);
}

function onRegiSubmit() {
    var formData = readRegiData();
    insertNewRecord(formData);
}

function readRegiData() {
    var formData = {};
    formData["userid"] = document.getElementById("newid").value;
    formData["userpw"] = document.getElementById("newpw").value;
    formData["username"] = document.getElementById("newname").value;
    formData["userphone"] = document.getElementById("newphone").value;
    formData["userdate"] = document.getElementById("newdate").value;
    return formData;

}
function readInfoData() {
    var formData = {};
    formData["userid"] = document.getElementById("userid").value;
    formData["userpw"] = document.getElementById("userpw").value;
    formData["username"] = document.getElementById("username").value;
    formData["userphone"] = document.getElementById("userphone").value;
    formData["userdate"] = document.getElementById("userdate").value;
    return formData;
}

function insertTable(){
    var table = document.getElementById("adminList").getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    for(var i=0;i<member.length;i++){
        var newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = i+1;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = member[i]['userid'];
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = member[i]['userpw'];
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = member[i]['username'];
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = member[i]['userphone'];
        cell6 = newRow.insertCell(5);
        cell6.innerHTML = member[i]['userdate'];
        cell7 = newRow.insertCell(6);
        cell7.innerHTML = `<a onClick="onEdit(this)">수정 </a>
                           <a onClick="onDelete(this)">삭제</a>`;
    }
    
}

function insertNewRecord(data) { 
    member.push(data);//member배열에 data추가
    localStorage.setItem('member', JSON.stringify(member)); //로컬스토리지에 member배열 저장
}

function resetForm() {
    document.getElementById("userid").value = "";
    document.getElementById("userpw").value = "";
    document.getElementById("username").value = "";
    document.getElementById("userphone").value = "";
    document.getElementById("userdate").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("userid").value = selectedRow.cells[1].innerHTML;
    document.getElementById("userpw").value = selectedRow.cells[2].innerHTML;
    document.getElementById("username").value = selectedRow.cells[3].innerHTML;
    document.getElementById("userphone").value = selectedRow.cells[4].innerHTML;
    document.getElementById("userdate").value = selectedRow.cells[5].innerHTML;
}
function onInfoSubmit() {
    var formData = readInfoData();
    if(editstate==true){
        num=(selectedRow.cells[0].innerHTML)-1;
        member[num]['userid'] = formData.userid;
        member[num]['userpw'] = formData.userpw;
        member[num]['username'] = formData.username;
        member[num]['userphone'] = formData.userphone;
        member[num]['userdate'] = formData.userdate;
        localStorage.setItem('member', JSON.stringify(member)); //로컬스토리지에 member배열 저장
        insertTable();
    }else{
        // 자기정보 수정기능
    }

}

function onDelete(td) {
    if (confirm('정말로 이 회원을 삭제하시겠습니까? ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("adminList").deleteRow(row.rowIndex);
        member.splice(row.rowIndex , 1); //배열에서 삭제기능
        localStorage.setItem('member', JSON.stringify(member)); //로컬스토리지에 member배열 저장
        insertTable();
        resetForm();       
    }
}

function moveLogin(){

}

function moveRegister(){

}

function onAdmin(){
    insertTable();
}
