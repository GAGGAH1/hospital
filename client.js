class Client {
    constructor(name, age, symptoms = []) {
        this.name = name;
        this.age = age;
        this.symptoms = symptoms;
        this.appointment = null;
        this.diagnosis = null;
        this.prescription = null;
    }

    bookAppointment(physician, date, time) {
        this.appointment = new Appointment(physician, date, time);
        return this.appointment.generateReceipt();
    }

    requestEmergencyDiagnosis() {
        if (this.symptoms.length > 0) {
            const diagnosisSystem = new DiagnosisSystem();
            this.diagnosis = diagnosisSystem.diagnose(this.symptoms);
            this.prescription = this.diagnosis.prescribeMedicine();
        }
        return this.diagnosis ? this.prescription : "No symptoms provided.";
    }
}

class Physician {
    constructor(name, specialization) {
        this.name = name;
        this.specialization = specialization;
        this.available = true;
    }

    isAvailable() {
        return this.available;
    }
}

class Appointment {
    constructor(physician, date, time) {
        this.physician = physician;
        this.date = date;
        this.time = time;
    }

    generateReceipt() {
        return `Appointment with ${this.physician.name} on ${this.date} at ${this.time} is confirmed.`;
    }
}

class DiagnosisSystem {
    diagnose(symptoms) {
        let diagnosis = '';
        if (symptoms.includes('fever')) {
            diagnosis = 'Flu';
        } else if (symptoms.includes('headache')) {
            diagnosis = 'Migraine';
        } else if (symptoms.includes('stomach pain')){
            diagnosis = 'Diarrhea';
        }else if (symptoms.includes('sore throat')){
            diagnosis = 'Strep Throat';
        }else if (symptoms.includes('chest pain')){
            diagnosis = 'Pneumonia';
        }else if (symptoms.includes('feeling hopeless and helpless')){
            diagnosis = 'Depression';
        }
        return new Diagnosis(diagnosis);
    }
}

class Diagnosis {
    constructor(condition) {
        this.condition = condition;
    }

    prescribeMedicine() {
        let medicine = '';
        switch (this.condition) {
            case 'Flu':
                medicine = 'Antiviral';
                break;
            case 'Migraine':
                medicine = 'Pain reliever';
                break;
            case 'Diarrhea':
                medicine = 'Loperamide';
                break;
            case 'Strep Throat':
                medicine = 'Antibiotics';
                break;
            case 'Pneumonia':
                medicine = 'Antibiotics (for bacterial pneumonia) & antivirals (for viral pneumonia)';
                break;
            case 'Depression':
                medicine = 'Blame Tinubu(Antidepressants)';
                break;
            default:
                medicine = 'Consult a physician';
        }
        return `Diagnosis: ${this.condition}. Prescribed medicine: ${medicine}.`;
    }
}

class PharmacyManagementSystem {
    constructor() {
        this.physicians = [
            new Physician('Dr. Smith', 'Cardiologist'),
            new Physician('Dr. Johnson', 'Neurologist'),
            new Physician('Dr. Dami', 'Psychiatrist'),
            new Physician('Dr. Ayo', 'Dentist'),
            new Physician('Dr. Jackson', 'Dermatologist'),
            new Physician('Dr. Anne', 'Optician'),
            // Add more physicians here
        ];
        this.appointments = []; 
    }

    // Check if the physician is available at the chosen date and time
    isPhysicianAvailable(physician, date, time) {
        return !this.appointments.some(
            appointment => appointment.physician.name === physician.name && 
                           appointment.date === date && 
                           appointment.time === time
        );
    }

    bookAppointment(client, physician, date, time) {
        if (this.isPhysicianAvailable(physician, date, time)) {
            const appointment = new Appointment(physician, date, time);
            this.appointments.push(appointment);
            return appointment.generateReceipt();
        } else {
            return `${physician.name} is not available at the selected time. Please choose another physician or time.`;
        }
    }

    listAvailablePhysicians() {
        return this.physicians.filter(physician => physician.isAvailable());
    }
}

// Initialize the Pharmacy Management System and populate the Physician dropdown
const pharmacySystem = new PharmacyManagementSystem();
const physicianSelect = document.getElementById('physician');

function populatePhysicianDropdown() {
    physicianSelect.innerHTML = ''; // Clear existing options
    const physicians = pharmacySystem.listAvailablePhysicians();

    physicians.forEach(physician => {
        const option = document.createElement('option');
        option.value = physician.name;
        option.textContent = physician.name;
        physicianSelect.appendChild(option);
    });
}

// Call this function to populate the dropdown on page load
populatePhysicianDropdown();

document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const physicianName = document.getElementById('physician').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;

    if (!clientName || !physicianName || !appointmentDate || !appointmentTime) {
        
        alert("All fields are required to book an appointment.");
        return;
    }

    const client = new Client(clientName);
    const physician = pharmacySystem.physicians.find(p => p.name === physicianName);

    if (!physician) {
        receiptMessage.textContent = "Selected physician is not available";
        openModal(receiptModal)
        // alert("Selected physician is not available.");
        return;
    }

    const receipt = pharmacySystem.bookAppointment(client, physician, appointmentDate, appointmentTime);
    // const receipt = client.bookAppointment(physician, appointmentDate, appointmentTime);
    receiptMessage.textContent = receipt;
    openModal(receiptModal)
    // alert(receipt);
});

document.getElementById('diagnosisForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const symptoms = document.getElementById('symptoms').value.split(',');
    if (symptoms.length === 0 || symptoms[0] === "") {
        alert("Please provide symptoms for diagnosis.");
        return;
    }

    const client = new Client('Anonymous', 0, symptoms);
    const prescription = client.requestEmergencyDiagnosis();
    prescriptionMessage.textContent = prescription;
    openModal(diagnosisModal)
    // alert(prescription);
});

// Modals
const receiptModal = document.getElementById('receiptModal');
const diagnosisModal = document.getElementById('diagnosisModal');
const receiptMessage = document.getElementById('receiptMessage');
const prescriptionMessage = document.getElementById('prescriptionMessage');
const closeReceiptModal = document.getElementById('closeReceiptModal');
const closeDiagnosisModal = document.getElementById('closeDiagnosisModal');


// // Open Modal
function openModal(modal) {
    modal.classList.remove('hidden');
}

// Close Modal
function closeModal(modal) {
    modal.classList.add('hidden');
}

// Event Listners for Modals
closeReceiptModal.addEventListener('click', () => closeModal(receiptModal));
closeDiagnosisModal.addEventListener('click', () => closeModal(diagnosisModal));




