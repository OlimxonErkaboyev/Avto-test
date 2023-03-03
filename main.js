const elBtns = document.querySelectorAll(".js-answer-btn");
const elSanoqBtn = document.querySelector(".js-savol-num");
const elCompleted = document.querySelector(".js-answer-count");
const elTime = document.querySelector(".js-time");
const elCorrect = document.querySelector(".js-correct");
const elCorrectAnswer = document.querySelector(".js-uncorrect-final");
let savolRaqami = 1;
let javobRaqami = 0;
let urunishlarSoni = 5;
let togriJavob = 0;


let arr = [];

function foras(count) {
    document.querySelector(".js-urunish-soni").textContent = `${count} ta`;
}
function savolCount(son) {
    elSanoqBtn.textContent = `${son}-savol`;
}
function jsJavoblarSoni(son) {
    elCompleted.textContent = `${son}/10`;
    if (javobRaqami === 10 && urunishlarSoni !== 0) {
        document.querySelector(".tests").classList.add("d-none");
        document.querySelector(".youWin").classList.remove("d-none");
        document.querySelector(".js-correct-final").innerText = togriJavob;
        document.querySelector("body").style.background = "green";
    }
}
function jsCorrectFunction(son) {
    elCorrect.textContent = son;
}

// Javobni topsa ishlaydi
function greenLine(ind) {
    togriJavob++;
    jsCorrectFunction(togriJavob);
    let number = Math.floor(Math.random() * 90 + 1);
    if (!arr.includes(number)){
        arr.push(number);
        elBtns.forEach((btn, index) => {
            if (index === ind) {
                btn.style.border = "3px solid green";
                btn.classList.add("disabled");
                setTimeout(() => {
                    btn.style.border = "1px solid rgb(184, 184, 184)";
                    btn.classList.remove("disabled");
                    testRender(roadSymbol.slice(number, number + 3));
                    savolRaqami++;
                    javobRaqami++;
                    savolCount(savolRaqami);
                    jsJavoblarSoni(javobRaqami);
                }, 750);
            } else {
                btn.classList.add("disabled");
                setTimeout(() => {
                    btn.classList.remove("disabled");
                }, 750);
            }
        });
    } else {
        greenLine(ind);
    }
}

// Javobni tola olmasa ishlaydi
function redLine(ind) {
    let number = Math.floor(Math.random() * 90 + 1);
    if (!arr.includes(number)){
        elBtns.forEach((btn, index) => {
            if (index === ind) {
                btn.style.border = "2px solid red";
                btn.classList.add("disabled");
                setTimeout(() => {
                    btn.style.border = "1px solid rgb(184, 184, 184)";
                    btn.classList.remove("disabled");
                    
                    testRender(roadSymbol.slice(number, number + 3));
                    savolRaqami++;
                    javobRaqami++;
                    urunishlarSoni--;
                    savolCount(savolRaqami);
                    jsJavoblarSoni(javobRaqami);
                    foras(urunishlarSoni);
                    if (urunishlarSoni === 0) {
                        document.querySelector(".tests").classList.add("d-none");
                        document.querySelector(".gameOver").classList.remove("d-none");
                        elCorrectAnswer.textContent = togriJavob;
                        console.log(document.querySelector(".js-uncorrect-final"));
                        document.querySelector("body").style.background = "red";
                    }
                }, 750);
            } else {
                btn.classList.add("disabled");
                setTimeout(() => {
                    btn.classList.remove("disabled");
                }, 750);
            }
        });
    } else {
        redLine(ind);
    }
}
// Testlarni Render qiladi
function testRender(symbols) {
    let sum = Math.floor(Math.random() * 2);
    symbols.forEach((value, index) => {
        elBtns[index].textContent = value.symbol_title;
        if (sum === index) {
            document.querySelector(".js-img").src = value.symbol_img;
            elBtns.forEach((btn, yandex) => {
                if (sum === yandex) {
                    btn.textContent = value.symbol_title;
                    btn.setAttribute("onclick", `greenLine(${yandex})`);
                    console.log(btn);
                } else {
                    btn.setAttribute("onclick", `redLine(${yandex})`);
                }
            });
        }
    });
}

// Timeni Render qiladi
function timeRender(time) {
    minut = `0${time}`;
    secund = 00;
    vaqt = `${minut}:${secund}`;
    elTime.textContent = vaqt;
    setInterval(() => {
        if (secund == 00 || secund == 0) {
            time = Number(time) - 1;
            console.log(time, secund)
            if (elTime.textContent == "00:0") {
                document.querySelector(".tests").classList.add("d-none");
                document.querySelector(".gameOver").classList.remove("d-none");
                document.querySelector(".js-uncorrect-final").textContent = correctAnswer;
            };
            secund = 60;
            secund--;
            minut = `0${time}`;
            vaqt = `${minut}:${secund}`;
            elTime.textContent = vaqt;
        } else {
            secund--;
            vaqt = `${minut}:${secund}`;
            elTime.textContent = vaqt;
        }
    }, 1000);
}


document.querySelectorAll(".blur-btn").forEach((value) => {
    value.addEventListener("click", () => {
        let sum = Math.floor(Math.random() * 90 + 1);
        arr.push(sum);
        document.querySelector(
            ".js-level"
            ).textContent = `Level: ${value.textContent}`;
            document.querySelector(".entery-section").classList.add("d-none");
            console.log(document.querySelector(".entery-section"))
            document.querySelector(".tests").classList.remove("d-none");
            testRender(roadSymbol.slice(sum, sum + 3));
            foras(urunishlarSoni);
            savolCount(savolRaqami);
            jsJavoblarSoni(javobRaqami);
            jsCorrectFunction(togriJavob);
            if (value.textContent == "Easy") {
                timeRender(8);
            } else if (value.textContent == "Medium") {
                timeRender(5);
            } else {
                timeRender(3)
            }
        });
    });
    
    
    