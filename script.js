const medicineForm = document.getElementById("medicineForm");
const medicineList = document.getElementById("medicineList");

let medicines = [];

medicineForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get values from input fields
    const name = document.getElementById("medicineName").value;
    const company = document.getElementById("company").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;
    const expiry = document.getElementById("expiry").value;

    // Create medicine object
    const medicine = {
        name: name,
        company: company,
        price: Number(price),
        quantity: Number(quantity),
        expiry: expiry
    };

    // Add medicine to array
    medicines.push(medicine);

    // Display medicines
    displayMedicines();

    // Update dashboard
    updateDashboard();

    // Reset form
    medicineForm.reset();

    alert("Medicine added successfully!");

});

function displayMedicines() {

    medicineList.innerHTML = "";

    medicines.forEach(function(medicine, index) {

        const today = new Date().toISOString().split("T")[0];

        let status = "";

        if (medicine.expiry < today) {
            status = "Expired";
        }
        else if (medicine.quantity === 0) {
            status = "Out of Stock";
        }
        else {
            status = "Available";
        }

        const row = document.createElement("tr");

        const values = [
            medicine.name,
            medicine.company,
            "₹" + medicine.price.toFixed(2),
            medicine.quantity,
            medicine.expiry,
            status
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", function() {
            medicines.splice(index, 1);
            displayMedicines();
            updateDashboard();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        medicineList.appendChild(row);

    });

}

function updateDashboard() {

    const today = new Date().toISOString().split("T")[0];

    document.getElementById("inStock").textContent =
        medicines.filter(m => m.quantity > 0 && m.expiry >= today).length;

    document.getElementById("outStock").textContent =
        medicines.filter(m => m.quantity === 0 && m.expiry >= today).length;

    document.getElementById("expiredStock").textContent =
        medicines.filter(m => m.expiry < today).length;

}
