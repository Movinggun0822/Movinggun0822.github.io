const form = document.querySelector(".js-form"),
    input = document.querySelector(".forminput"),
    greeting = document.querySelector(".js-greetings");

const  USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault(); //  event의 디폴트 행동을 막음
    const currentValue = input.value;   //  input은 뭐든 가질수 있음
    paintGreeting(currentValue);    //  greeting 하기
    saveName(currentValue); //  local storage에 저장하기
}

function askForName(){
    form.classList.add(SHOWING_CN); //  블록 class 더해서 form 보여주기
    form.addEventListener("submit", handleSubmit);  // 제출한다면 handleSubmit 실행
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);  //  블록 class를 없애서 form을 가리기(나중에 블록이 생길수 있으므로 미리 방지)
    greeting.classList.add(SHOWING_CN); //  블록 class를 더해서 greeting이 보이게 함
    greeting.innerText = `Hi, ${text}`
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);  //  local storage의 currentUser 가져와서 저장
    if(currentUser === null){ // current user가 없을 때
        askForName();
    }
    else{
        paintGreeting(currentUser); // current user가 있을 때
    }
}

function init(){
    loadName();
}

init();