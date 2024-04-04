document.getElementById('patient-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let dob = document.getElementById('dob').value;
    if (name && dob) {
        document.getElementById('health-questions').style.display = 'block';
        document.getElementById('submit').style.display = 'none';
        document.getElementById('generate').style.display = 'block';
    }
});


function calculateAge() {
    let dob = document.getElementById('dob').value;
    let dobDate = new Date(dob);
    let currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();

    // Adjust age if birthday has not occurred yet this year
    if (currentDate.getMonth() < dobDate.getMonth() || (currentDate.getMonth() == dobDate.getMonth() && currentDate.getDate() < dobDate.getDate())) {
        age--;
    }

    document.getElementById('age').style.display = 'block';
    if (age < 0) {
        document.getElementById('prnt-age').innerText = 'Age: Unk';
    }
    else {
        document.getElementById('prnt-age').innerText = 'Age: ' + age;
    }


    if (age < 5) {
        alert('Please enter an appropriate Date-Of-Birth.');
    }
    else if (age < 18) {
        alert('You are too young.');
    }
    else if (age > 110) {
        alert('You are too old.');
    }
}


document.getElementById("dm-yes").addEventListener("change", function () {
    document.getElementById("dm-data").style.display = this.checked ? "flex" : "none";
    document.getElementById("dm-data").style.flexDirection = this.checked ? "column" : "row";
});

document.getElementById("dm-no").addEventListener("change", function () {
    document.getElementById("dm-data").style.display = this.checked ? "none" : "flex";
});

let rowDMCount = 1;

document.getElementById("dm-data").addEventListener("input", function (event) {
    let lastRow = document.querySelector(".dm-data-row:last-child");
    let lastInput = lastRow.querySelector("input[type='number'");
    if (event.target === lastInput && lastInput.value !== '') {
        let newRow = document.createElement("div");
        newRow.classList.add("dm-data-row");
        newRow.innerHTML = `
            <br>
            <label for="date"></label>
            <input type="date" class="glu-date">
            <label for="glu"></label>
            <input type="number" class="glucose" min="0">
        `;
        document.getElementById("dm-data").appendChild(newRow);
    }
});

function generateGraph() {    
    let dataDate = []; 
    let dataGlu = [];

    document.getElementById("patient-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const dateEntries = document.querySelectorAll(".glu-date");
        const gluEntries = document.querySelectorAll(".glucose");
        dateEntries.forEach(entry => {
            const date = entry.value;
            dataDate.push(date);
        });

        gluEntries.forEach(entry => {
            const glucose = entry.value;
            dataGlu.push(glucose);
        });

        dataDate.pop();
        dataGlu.pop();

        console.log(dataDate);
        console.log(dataGlu);

        document.getElementById('patient-form').style.display = 'none';
        document.getElementById('myChart').style.display = 'block';
    });

    updateChart(dataDate, dataGlu);
}

function updateChart(date, glucose) {
    let ctx = document.getElementById('myChart').getContext('2d');
    
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: 'Date',
                data: glucose,
                backgroundColor:"rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                tension: 0.1,
                fill: false,
                pointRadius: 4,
                pointBackgroundColor: "rgba(102,0,204,1.0)"
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}