COS10005 Web Development - Assignment 2
Website name : FOODSMILE:)
Student      : Lee Cheng Feng
Student ID   : 106730578
Hosted on    : https://mercury.swin.edu.au/cos10005/s106730578/106730578_assign2/

---------------------------------------------------------------
1. WEBSITE STRUCTURE
---------------------------------------------------------------
assignment2/
  index.html        Home page: introduces the platform, its purpose and its services
  restaurants.html  Restaurant listing: six restaurants with cuisine, price range, signature dishes
                    with prices, reservation deposit, description and image
  recommend.html    Recommendation form (dietary preference, budget, dining purpose)
  register.html     Registration form with JavaScript validation (front end only, no database)
  reservation.html  Reservation form with deposit, voucher and online payment options
  bill.html         Estimated bill calculator (optional bonus task)
  refer.html        Sources of the third-party images

  css/style.css     Shared stylesheet linked on every page (desktop, tablet and mobile layouts)

  js/script.js      All JavaScript for the website

  images/           Logo, background and restaurant images

  Readme.txt        This file

All pages share the same header, navigation bar (the current page is highlighted) and footer.

---------------------------------------------------------------
2. GITHUB REPOSITORY
---------------------------------------------------------------
https://github.com/LeeCF04/COS10005.git

---------------------------------------------------------------
3. HOW THE JAVASCRIPT WORKS (PLAIN ENGLISH)
---------------------------------------------------------------
All JavaScript is in js/script.js. Each part only runs on the page that has its form.

Restaurant data
- The six restaurants are stored once at the top of script.js (name, cuisine, price range,
  reservation deposit, whether it is pork-free/Muslim-friendly, and tags for budget and
  dining purpose). Every page uses this one list, so the deposit and prices stay consistent.

Reserve buttons
- Clicking "Reserve this restaurant" (restaurants page) or "Choose this restaurant"
  (recommendations) opens reservation.html?restaurant=ID. The reservation page reads the ID,
  selects that restaurant in the dropdown and fills in its deposit.
  Users can still change the restaurant on the reservation page.

Recommendation page
- The user picks a dietary preference, a budget and a dining purpose.
- A restaurant is an exact match only if it fits all three: the dietary choice (Muslim-friendly
  shows only pork-free restaurants), the budget, and the dining purpose.
- If there is no exact match, restaurants that fit the dietary preference and either the
  budget or the purpose are shown with a note explaining what does not match.
- If nothing fits, a message asks the user to change a choice.

Registration validation
- All fields are required.
- Username: at least 5 characters; letters, numbers and underscores only.
- Email: must be in a valid format (name@site.com).
- Phone: digits only, 8 to 15 digits.
- Password: at least 10 characters with an uppercase letter, a lowercase letter, a number and a
  special character.
- Confirm password: must match the password.
- Gender, country/region and at least one dietary preference must be selected.
- An error message appears under each wrong field, and the form is not submitted until every
  error is fixed.

Reservation validation and dynamic fields
- Full name, email, phone, restaurant, date, time, number of people and billing email are required.
- Email and billing email must be in a valid format.
- Phone: digits only, at least 10 digits.
- The date must be today or later, and if the date is today the time must not have passed.
- The number of people must be greater than 0.
- The deposit amount updates automatically when the restaurant is changed.
- Choosing "Voucher" shows a 12-digit voucher code field and hides the card fields.
  Choosing "Online payment" shows the card fields and hides the voucher field.
- Card number: digits only. Visa and Mastercard need 16 digits, American Express needs 15.
  This is a format check only; no real payment is processed.
- Ticking "Same as email address" copies the email into the billing email field.
- Errors are shown beside each field and the form is not submitted until all are fixed.
- Valid forms are sent with POST to http://mercury.swin.edu.au/it000000/cos10005/regtest.php

Bill estimator
- The user chooses a restaurant, the number of people (1 to 30) and an optional add-on
  (starter, dessert or drink) per person.
- Estimated food cost = midpoint of the restaurant's price range x number of people.
  The add-on cost x number of people is added to give the estimated total.
- Deposits, service charge and tax are not included. The result updates when "Calculate
  estimate" is clicked, and "Reset" clears it.

---------------------------------------------------------------
4. KNOWN ISSUES AND LIMITATIONS
---------------------------------------------------------------
- Reservation deposits are fictional examples for this assignment.
- The registration and reservation forms only validate in the browser; no database or real
  payment processing is used.
- Card, voucher and email checks are format checks only.
- The recommendation page offers Muslim-friendly (pork-free) and no-preference options only,
  because none of the six restaurants advertise vegan menus.
- The bill estimator gives a rough estimate based on price ranges, not a restaurant quotation.

---------------------------------------------------------------
5. REFERENCES (THIRD-PARTY IMAGES)
---------------------------------------------------------------
- foodsmile logo img: https://stock.adobe.com/search?k=food+logo&asset_id=829908823

- background img: https://www.dreamstime.com/stock-photo-assorted-indian-recipes-food-various-spices-rice-wooden-table-image92742528

- yip noodle img: https://www.google.com/maps/contrib/108924305484097502669/photos/@3.025941,101.6171987,3a,92y,90t/data=!3m7!1e2!3m5!1sCIABIhAGbzaqQSdmOmgNol8ACBfv!2e10!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs%2FAAjk-CMrHS2lfF_gVUQGy-nqz79YSsjZdvHRFoscy_GdkmSNMEb4U1iOG7lqHMJTmb_DedcNlOmfY6VCiHvxPYCf8nYN2Q5LMJ0PUMM9DoEeFCnGuegAeujW36WQmoivMjLX3zg2hgqwSNDJMzYx%3Dw365-h273-k-no!7i680!8i510!4m3!8m2!3m1!1e1?entry=ttu&g_ep=EgoyMDI2MTEwOS4wIKXMDSoASAFQAw%3D%3D

- grandmum kitchen img: https://subangfood.com/grandmum-kitchen/

- bangga bangga img: https://www.google.com/maps/contrib/104520121791303305859/photos/@3.0754102,101.5889601,3a,75y,90t/data=!3m7!1e2!3m5!1sCIABIhBJEM4wWtRqfxXjvhR-ZeHr!2e10!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs%2FAAjk-CMtzwk8c4mlLaq8cgiuZHRaWTjk5FIwIkWbJUclkvhvCQPobvbONkdr7h8GPVEuCMFLQ877AEsxDYa_oC1KuA5r-YUaivyh1Li63Yvi32xB2_OBBVqlRsUESQm7OWegl6QakgFsqFrsG10f%3Dw365-h486-k-no!7i3024!8i4032!4m3!8m2!3m1!1e1?entry=ttu&g_ep=EgoyMDI2MTEwOS4wIKXMDSoASAFQAw%3D%3D

- sushi mentai img: https://www.facebook.com/sushimentaimalaysia/posts/sushi-mentai-bandar-puteri-puchong-is-opened-nowthanks-for-coming-to-our-opening/1228061264023083/

- bkt img: https://www.google.com/maps/contrib/102308442560739303453/photos/@3.0220952,101.6167404,3a,107.5y,90t/data=!3m7!1e2!3m5!1sCIABIhC8sxhUX91uHFif-V4NBJmS!2e10!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs%2FAAjk-COEIsbNb51pNJ-iliOtcQO7qXlv_s2o4GhUqB5xKbl9ZM6QBSy_QheQC9OWVSZV8KBVen2twf-_5MjWo-OuVos26rVx0L8WZvUscmHGJ6XIp4hXu4-qvArSLJfX6u_LMg9k53ntOtArNxCi%3Dw393-h260-k-no!7i720!8i476!4m3!8m2!3m1!1e1?entry=ttu&g_ep=EgoyMDI2MTEwOS4wIKXMDSoASAFQAw%3D%3D

- sushi moeko img: https://www.google.com/maps/place/Sushi+Moeko/@3.0752463,101.5881754,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhDgDwy3yP3NQHVy2tHeOgjg!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgrass-cs%2FAABkmLeW7fCy9NFyUCcTZuD5N-yrrn62TV1d-R7n7Vwl4dxt9lECokXHTK2yD1GreusOvCRvcd6kZIcAT8irS6x_Xl_KKz86O28Og7MqcFo0Ple3l0nN-AHs9i9lKgVaiInv-5Ngu9yCGlsBr5Q%3Dw86-h129-k-no!7i2688!8i4032!4m13!1m5!8m4!1e2!2s109927180625220513158!3m1!1e1!3m6!1s0x31cc4d83e51de10b:0xb75f8edb8e7bdd01!8m2!3d3.0752463!4d101.5881754!10e5!16s%2Fg%2F11xp2m76dj?entry=ttu&g_ep=EgoyMDI2MTEwOS4wIKXMDSoASAFQAw%3D%3D

Restaurant descriptions are summarised from publicly available information about each
restaurant. Reservation deposits are fictional examples created for this assignment.

