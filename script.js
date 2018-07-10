class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    zero() {
        this.running = false;
        this.reset();
        this.print();
    }

    add() {
        if (this.running === false){
            let innerDisplay = this.display.innerText;
            // let results = $('.results');
            let results = document.querySelector('.results');
            // $('<li>').addClass('list-element').text(innerDisplay).appendTo(results);
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(innerDisplay));
            results.appendChild(li);
        } 
    }

    clean() {
        //jquery
        // var listElement = $('.list-element');
        // listElement.remove();

        //delete last li
        // let li = document.querySelector('li');
        // li.remove();
        
        let results = document.querySelector('.results');
        results.innerHTML = "";
    }
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let zeroButton = document.getElementById('zero');
zeroButton.addEventListener('click', () => stopwatch.zero());

let addButton = document.getElementById('add');
addButton.addEventListener('click', () => stopwatch.add());

let cleanButton = document.getElementById('clean');
cleanButton.addEventListener('click', () => stopwatch.clean());

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}