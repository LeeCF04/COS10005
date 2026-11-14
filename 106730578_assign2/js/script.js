// Restaurant data (matches restaurants.html). Deposits are fictional.
// muslim = pork-free / Muslim-friendly. budgets and purposes are used by the recommendation form.
const RESTAURANTS = {
  yip: {
    name: "Yip Noodle House", cuisine: "Asian", deposit: 20, min: 20, max: 40,
    muslim: false, budgets: ["medium"], purposes: ["casual"],
    description: "Modern-cozy eatery with customizable Yunnan-style rice noodles and rich broths."
  },
  grandmum: {
    name: "Grandmum Kitchen", cuisine: "Malaysian", deposit: 10, min: 15, max: 30,
    muslim: true, budgets: ["low", "medium"], purposes: ["family", "friends", "casual"],
    description: "Pork-free, family-friendly home-style Malaysian comfort food."
  },
  bangga: {
    name: "Bang Ga Bang Ga", cuisine: "Korean", deposit: 10, min: 15, max: 25,
    muslim: false, budgets: ["low", "medium"], purposes: ["friends", "casual"],
    description: "Student-friendly Korean street food with refillable kimchi, pickled radish and soup."
  },
  mentai: {
    name: "Sushi Mentai", cuisine: "Japanese", deposit: 10, min: 20, max: 40,
    muslim: false, budgets: ["low", "medium"], purposes: ["casual"],
    description: "Budget-friendly fast-casual sushi, from RM 1.80 a plate."
  },
  bkt: {
    name: "Yip Weng Bah Kut Teh", cuisine: "Malaysian", deposit: 15, min: 15, max: 30,
    muslim: false, budgets: ["low", "medium"], purposes: ["casual"],
    description: "Owner-run Klang-style bak kut teh with traditional herbal broths."
  },
  moeko: {
    name: "Sushi Moeko", cuisine: "Japanese", deposit: 15, min: 20, max: 40,
    muslim: true, budgets: ["medium"], purposes: ["casual"],
    description: "Pork-free sushi place known for fresh thick-cut sashimi and friendly staff."
  }
};

function getElement(id) {
  return document.getElementById(id);
}

function showError(id, message) {
  const errorElement = getElement(id + "-error");
  if (errorElement) errorElement.textContent = message;
}

function clearErrors(form) {
  form.querySelectorAll(".error").forEach(function (element) {
    element.textContent = "";
  });
}

function setMessage(id, message, isSuccess) {
  const element = getElement(id);
  if (!element) return;
  element.textContent = message;
  element.className = "form-message " + (isSuccess ? "success" : "failure");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// "Reserve this restaurant" buttons on restaurants.html
document.querySelectorAll(".reserve-button").forEach(function (button) {
  button.addEventListener("click", function () {
    window.location.href = "reservation.html?restaurant=" + encodeURIComponent(button.dataset.restaurant);
  });
});

// ---------- Recommendations ----------
const recommendForm = getElement("recommend-form");
if (recommendForm) {
  recommendForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const dietary = getElement("dietary").value;
    const budget = getElement("budget").value;
    const purpose = getElement("purpose").value;
    const results = getElement("recommend-results");

    if (!dietary || !budget || !purpose) {
      setMessage("recommend-message", "Please choose all three preferences.", false);
      return;
    }

    const exact = [];
    const partial = [];
    Object.keys(RESTAURANTS).forEach(function (id) {
      const restaurant = RESTAURANTS[id];
      const dietMatches = dietary === "none" || restaurant.muslim;
      const budgetMatches = budget === "any" || restaurant.budgets.includes(budget);
      const purposeMatches = restaurant.purposes.includes(purpose);
      if (dietMatches && budgetMatches && purposeMatches) {
        exact.push({ id: id, note: "" });
      } else if (dietMatches && (budgetMatches || purposeMatches)) {
        // dietary preference is always respected; budget or purpose may differ
        partial.push({ id: id, note: budgetMatches ? "Matches your budget, but not your dining purpose." : "Matches your dining purpose, but not your budget." });
      }
    });

    const shown = exact.length > 0 ? exact : partial;
    results.innerHTML = "";
    if (shown.length === 0) {
      results.innerHTML = '<p class="empty-state">No matches found. Try changing one of your preferences.</p>';
      setMessage("recommend-message", "No match. You can adjust your choices and try again.", false);
      return;
    }

    shown.forEach(function (match) {
      const restaurant = RESTAURANTS[match.id];
      const card = document.createElement("article");
      card.className = "match-card";

      const heading = document.createElement("h3");
      heading.textContent = restaurant.name;
      const cuisine = document.createElement("p");
      cuisine.textContent = restaurant.cuisine + " · RM " + restaurant.min + "–" + restaurant.max + " per person";
      const description = document.createElement("p");
      description.textContent = restaurant.description;
      const deposit = document.createElement("p");
      deposit.textContent = "Reservation deposit: RM " + restaurant.deposit;
      const link = document.createElement("a");
      link.className = "button button-small";
      link.href = "reservation.html?restaurant=" + encodeURIComponent(match.id);
      link.textContent = "Choose this restaurant";

      card.append(heading, cuisine, description, deposit);
      if (match.note) {
        const note = document.createElement("p");
        note.className = "partial-note";
        note.textContent = match.note;
        card.append(note);
      }
      card.append(link);
      results.appendChild(card);
    });

    if (exact.length > 0) {
      setMessage("recommend-message", exact.length + " restaurant match(es) found.", true);
    } else {
      setMessage("recommend-message", "No exact match. Showing the closest options that fit your dietary preference.", false);
    }
  });
}

// ---------- Registration ----------
const registerForm = getElement("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors(registerForm);
    let valid = true;

    const username = getElement("username").value.trim();
    const email = getElement("reg-email").value.trim();
    const phone = getElement("reg-phone").value.trim();
    const password = getElement("password").value;
    const confirmPassword = getElement("confirm-password").value;
    const country = getElement("country").value;
    const gender = registerForm.querySelector('input[name="gender"]:checked');
    const dietary = registerForm.querySelectorAll('input[name="dietary_preferences"]:checked');

    if (username.length < 5 || !/^[A-Za-z0-9_]+$/.test(username)) {
      showError("username", "Use at least 5 letters, numbers or underscores.");
      valid = false;
    }
    if (!isValidEmail(email)) {
      showError("reg-email", "Enter a valid email address.");
      valid = false;
    }
    if (!/^\d{8,15}$/.test(phone)) {
      showError("reg-phone", "Enter 8–15 digits only.");
      valid = false;
    }
    if (password.length < 10 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) ||
        !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      showError("password", "Use 10+ characters with uppercase, lowercase, a number and a special character.");
      valid = false;
    }
    if (confirmPassword === "" || confirmPassword !== password) {
      showError("confirm-password", "Passwords must match.");
      valid = false;
    }
    if (!country) {
      showError("country", "Please select a country or region.");
      valid = false;
    }
    if (!gender) {
      showError("gender", "Please select a gender option.");
      valid = false;
    }
    if (dietary.length === 0) {
      showError("dietary-preferences", "Please select at least one dietary preference.");
      valid = false;
    }

    if (!valid) {
      setMessage("register-message", "Please correct the errors above before submitting.", false);
      return;
    }
    setMessage("register-message", "Validation passed. Submitting the form.", true);
    registerForm.submit();
  });
}

// ---------- Reservation ----------
const reservationForm = getElement("reservation-form");
if (reservationForm) {
  const restaurantSelect = getElement("restaurant");
  const depositInput = getElement("deposit");
  const paymentRadios = reservationForm.querySelectorAll('input[name="payment_method"]');
  const voucherField = getElement("voucher-field");
  const cardFields = getElement("card-fields");
  const voucherInput = getElement("voucher-code");
  const cardType = getElement("card-type");
  const cardNumber = getElement("card-number");
  const dateInput = getElement("reservation-date");
  const timeInput = getElement("reservation-time");
  const sameEmail = getElement("same-email");
  const emailInput = getElement("res-email");
  const billingEmail = getElement("billing-email");

  const today = new Date();
  const localToday = today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");
  dateInput.min = localToday;

  // Pre-select the restaurant when arriving from restaurants.html or recommend.html
  const query = new URLSearchParams(window.location.search);
  const requestedRestaurant = query.get("restaurant");
  if (requestedRestaurant && RESTAURANTS[requestedRestaurant]) {
    restaurantSelect.value = requestedRestaurant;
  }

  function updateDeposit() {
    const selected = RESTAURANTS[restaurantSelect.value];
    depositInput.value = selected ? "RM " + selected.deposit.toFixed(2) : "";
  }

  function updatePaymentFields() {
    const selectedMethod = reservationForm.querySelector('input[name="payment_method"]:checked').value;
    const useVoucher = selectedMethod === "voucher";
    voucherField.classList.toggle("hidden", !useVoucher);
    cardFields.classList.toggle("hidden", useVoucher);
    voucherInput.required = useVoucher;
    cardType.required = !useVoucher;
    cardNumber.required = !useVoucher;
  }

  restaurantSelect.addEventListener("change", updateDeposit);
  paymentRadios.forEach(function (radio) {
    radio.addEventListener("change", updatePaymentFields);
  });
  sameEmail.addEventListener("change", function () {
    if (sameEmail.checked) {
      billingEmail.value = emailInput.value;
      billingEmail.readOnly = true;
    } else {
      billingEmail.readOnly = false;
    }
  });
  emailInput.addEventListener("input", function () {
    if (sameEmail.checked) billingEmail.value = emailInput.value;
  });
  updateDeposit();
  updatePaymentFields();

  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors(reservationForm);
    let valid = true;

    const fullName = getElement("full-name").value.trim();
    const email = emailInput.value.trim();
    const phone = getElement("res-phone").value.trim();
    const restaurantId = restaurantSelect.value;
    const reservationDate = dateInput.value;
    const reservationTime = timeInput.value;
    const people = Number(getElement("people").value);
    const billing = billingEmail.value.trim();
    const method = reservationForm.querySelector('input[name="payment_method"]:checked').value;

    if (!fullName) { showError("full-name", "Enter your full name."); valid = false; }
    if (!isValidEmail(email)) { showError("res-email", "Enter a valid email address."); valid = false; }
    if (!/^\d{10,}$/.test(phone)) { showError("res-phone", "Enter at least 10 digits, numbers only."); valid = false; }
    if (!restaurantId || !RESTAURANTS[restaurantId]) { showError("restaurant", "Choose a restaurant."); valid = false; }
    if (!reservationDate || reservationDate < localToday) { showError("reservation-date", "Choose today or a future date."); valid = false; }
    if (!reservationTime) { showError("reservation-time", "Choose a reservation time."); valid = false; }
    const now = String(today.getHours()).padStart(2, "0") + ":" + String(today.getMinutes()).padStart(2, "0");
    if (reservationDate === localToday && reservationTime && reservationTime < now) {
      showError("reservation-time", "Choose a time that has not passed.");
      valid = false;
    }
    if (!Number.isInteger(people) || people <= 0) { showError("people", "Number of people must be greater than 0."); valid = false; }
    if (!isValidEmail(billing)) { showError("billing-email", "Enter a valid billing email address."); valid = false; }

    if (method === "voucher") {
      if (!/^\d{12}$/.test(voucherInput.value.trim())) {
        showError("voucher-code", "Enter exactly 12 digits.");
        valid = false;
      }
    } else {
      const number = cardNumber.value.trim();
      const requiredLength = cardType.value === "amex" ? 15 : 16;
      if (!cardType.value) { showError("card-type", "Choose a card type."); valid = false; }
      if (!/^\d+$/.test(number) || number.length !== requiredLength) {
        showError("card-number", "Enter " + requiredLength + " digits for the selected card type.");
        valid = false;
      }
    }

    if (!valid) {
      setMessage("reservation-message", "Please correct the errors above before submitting.", false);
      return;
    }
    setMessage("reservation-message", "Validation passed. Submitting the reservation.", true);
    reservationForm.submit();
  });
}

// ---------- Bill estimator (bonus) ----------
const billForm = getElement("bill-form");
if (billForm) {
  const restaurantSelect = getElement("bill-restaurant");
  const peopleInput = getElement("bill-people");
  const extraSelect = getElement("bill-extra");
  const baseOutput = getElement("bill-base");
  const extraOutput = getElement("bill-extra-total");
  const totalOutput = getElement("bill-total");
  const explanation = getElement("bill-explanation");
  const message = getElement("bill-message");

  function formatRM(amount) {
    return "RM " + amount.toFixed(2);
  }

  billForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const restaurant = RESTAURANTS[restaurantSelect.value];
    const people = Number(peopleInput.value);
    const addOnPerPerson = Number(extraSelect.value);

    if (!restaurant) {
      message.textContent = "Please choose a restaurant.";
      restaurantSelect.focus();
      return;
    }
    if (!Number.isInteger(people) || people < 1 || people > 30) {
      message.textContent = "Please enter a whole number from 1 to 30.";
      peopleInput.focus();
      return;
    }

    const perPerson = (restaurant.min + restaurant.max) / 2;
    const base = perPerson * people;
    const addOns = addOnPerPerson * people;

    baseOutput.textContent = formatRM(base);
    extraOutput.textContent = formatRM(addOns);
    totalOutput.textContent = formatRM(base + addOns);
    explanation.textContent = "Estimated " + formatRM(perPerson) + " per person before add-ons, based on the range RM " +
      restaurant.min + "–" + restaurant.max + ".";
    message.textContent = "Estimate calculated.";
  });

  billForm.addEventListener("reset", function () {
    window.setTimeout(function () {
      baseOutput.textContent = "RM 0.00";
      extraOutput.textContent = "RM 0.00";
      totalOutput.textContent = "RM 0.00";
      explanation.textContent = "Choose a restaurant and calculate to see an estimate.";
      message.textContent = "";
    }, 0);
  });
}
