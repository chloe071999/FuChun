document.addEventListener("readystatechange", function(event) {
	if(event.target.readyState == "interactive") {
		// Adding a "JavaScript is Enabled" Body Class
		document.querySelector("body").classList.add("js");



        // function1 hamburger menu 
        const navbar = document.getElementById('navbar-hide');
        const expand = document.getElementById('navbar-show-btn');
        const hide = document.getElementById('navbar-hide');
        //show menu by adding class
        expand.addEventListener('click', () => {
            navbar.classList.add('navbar-hideandshow');
        });
        //hide menu by deleting class
        hide.addEventListener('click', () => {
            navbar.classList.remove('navbar-hideandshow');
        });
        


        // function2 switch color mode
        document.getElementById("mode-change").addEventListener("click", function (changeMode) {
            // using the toggle element, add dark-mode if the body doesn't have it, and remove dark-mode if the body has it
            document.body.classList.toggle("dark-mode");
            const target = changeMode.target;
            //switch icon
            target.classList.toggle("fa-moon");
            target.classList.toggle("fa-sun");
        });



        // function3 text animation
		const showText = document.querySelectorAll('.box')
        //listen to event
        window.addEventListener('scroll', scrollLoad);
        window.addEventListener("load", scrollLoad);
        window.addEventListener("resize", scrollLoad);

        function scrollLoad() {
            showText.forEach(box => {
                // Top of the current text from the top
                const textHeight = box.getBoundingClientRect().top;
                // Trigger condition , 60% of the overall height
                const toShow = window.innerHeight * 0.6;
                if (textHeight <= toShow) {
                    box.classList.add('show')
                } else {
                    box.classList.remove('show')
                }
            })
        };



        // function4 show booking pop-ups
        if(document.body.contains(document.querySelector("#show-reserve"))){
            document.querySelector("#show-reserve").addEventListener("click",function(){
                //show pop-up window
                document.querySelector(".popup").classList.add("active");
                //clicking the delete button later will trigger the display property of small to become none, so reinitialize the display of small here
                //because querySelectorAll returns a list of elements rather than a single element, the result needs to be traversed
                Array.from(document.querySelectorAll("small"))
                //use for to iterate over numerous multi-dimensional data 
                .forEach(function(disappear){
                    disappear.style.display = "block"
                });
            }
            );
        }



        // function5 check if the user input value is valid
        // refenrence: 777, J. (2021, October 20). Javascript form validation not working, not sure where I went wrong. Stack Overflow. https://stackoverflow.com/questions/69648086/javascript-form-validation-not-working-not-sure-where-i-went-wrong
        // declare variables 
        const userName = document.getElementById('inputname');
        const cardNumber = document.getElementById('card');
        const CVV = document.getElementById('CVV');


        if(document.body.contains(document.querySelector("#inputname"))){
            //two event bindings for each of the three input boxes, focus and blur
            document.querySelector("#inputname").addEventListener('focus', e => {
                e.preventDefault();
                checkNameInputs();
            });
            document.querySelector("#inputname").addEventListener('blur', e => {
                e.preventDefault();
                checkNameInputs();
            });
            document.querySelector("#card").addEventListener('focus', e => {
                e.preventDefault();
                checkCardInputs();
            });
            document.querySelector("#card").addEventListener('blur', e => {
                e.preventDefault();
                checkCardInputs();
            });
            document.querySelector("#CVV").addEventListener('focus', e => {
                e.preventDefault();
                checkCVVInputs();
            });
            document.querySelector("#CVV").addEventListener('blur', e => {
                e.preventDefault();
                checkCVVInputs();
            });
        }

        
        //check if the username is valid
        function checkNameInputs() {
            const userNameValue = document.getElementById("inputname").value;
            if(userNameValue === '') {
              setErrorFor(userName, 'User name cannot be blank');
              return false

            } else {
              setSuccessFor(userName);
              return true

            }
        };

        //check if the card number is valid
        function checkCardInputs() {
            const userNameValue = document.getElementById("card").value;
            if(userNameValue === '') {
              setErrorFor(cardNumber, 'Card number cannot be blank');
              return false

            } else {
              setSuccessFor(cardNumber);
              return true
            }
        };

        //check if the CVV is valid
        function checkCVVInputs() {
            const userNameValue = document.getElementById("CVV").value;
            if(userNameValue === '') {
              setErrorFor(CVV, 'CVV cannot be blank');
              return false

            } else {
              setSuccessFor(CVV);
              return true
            }
        };



        // function6 show error message
        // when the user enters the value invalid, a prompt message is displayed
        function setErrorFor(input, notice) {
            const inputContainer = input.parentElement;
            const small = inputContainer.querySelector("small");
            small.classList.add("input-error");
            //Modify the HTML text content to a prompt message
            small.innerText = notice;
        }
          


        // function7 hide error message
        // hide the prompt when the user enters the value valid
        function setSuccessFor(input) {
            const inputContainer = input.parentElement;
            const small = inputContainer.querySelector("small");
            small.classList.remove("input-error");
        }



        // function8 show thanks pop-up window and prompt the user to enter information
        // check if all input values are valid
        const remove = document.querySelector("#remove");
        if(document.body.contains(remove)){
            remove.addEventListener("click",function(e){
                //prevent form submit from refreshing the page by default
                e.preventDefault();
                const userNameValue = document.getElementById("inputname").value;
                const cardValue = document.getElementById("card").value;
                const CVVValue = document.getElementById("CVV").value;
                //if the user input value all valid, then hide the current pop-up window and show the reservation success page
                if(userNameValue != '' && cardValue != ''&& CVVValue != ''){
                    document.querySelector(".popup").classList.remove("active");
                    document.querySelector(".pop-thanks").classList.add("pop-thanks-active");
                }
                //if the user does not enter a value that is not all valid, the user is prompted for information
                else{
                    alert('Please fill up your information');                
                    console.log('we need more information')
                    return false
                }
    
            });
        }



        // function9 click the delete button to make the scheduled pop-up disappear
        if(document.body.contains(document.querySelector(".popup .close-btn"))){
            document.querySelector(".popup .close-btn").addEventListener("click",function(e){
                e.preventDefault()
                document.querySelector(".popup").classList.remove("active");
                //before the user input the invalid value will cause the small element to be visible, so here use display: none to make it disappear
                //because querySelectorAll returns a list of elements rather than a single element, the result needs to be traversed
                Array.from(document.querySelectorAll("small"))
                .forEach(function(disappear){
                    disappear.style.display = "none"
                });
                console.log('removeall');
            }
            );
        }



        // function10 display the user name entered by the user in a pop-up window
        // get the user input value. concatenation with template literals and joining operators.
        if(document.body.contains(document.querySelector(".tksremove"))){
            document.querySelector(".tksremove").addEventListener("click",function(){
                let userName = document.getElementById("inputname").value;
                let showName = document.getElementById("showname");
                showName.innerHTML =`Thank you ${userName}`;
            });
        }

        // hide the scheduled success pop-up when the user clicks delete
        if(document.body.contains(document.querySelector("#removetks"))){
            document.querySelector("#removetks").addEventListener("click",function(){
                document.querySelector(".pop-thanks").classList.remove("pop-thanks-active");
            }
            );
        }



        // function11 testimonial function
        // create user data
        const testimonialContainer = [
            {
                name: "Harry",
                image: "images/person1.PNG",
                // (ihyperg.com, n.d.)
                reviews: "'Once you've been here, you can't forget it. '"
            },
            {
                name: "Chloe",
                image: "images/person2.PNG",
                // (ihyperg.com, n.d.)
                reviews: "'A once-in-a-lifetime resort. I can't forgert it'"
            },
            {
                name: "Tim",
                image: "images/person3.PNG",
                // (ihyperg.com, n.d.)
                reviews: "'A true paradise where you forget all your worries.'"
            },
        ];
        let i = 0;
        let l = testimonialContainer.length;
        let testMainContainer = document.getElementById("test-main-container");
        let nextSlider = document.getElementById("next-slider")
        let lastSlider = document.getElementById("last-slider")

        // manipulating HTML elements via the DOM
        let showReviews = () => {
            testMainContainer.innerHTML = `
            <img src=${testimonialContainer[i].image}>
            <p id="name">${testimonialContainer[i].name}</p>
            <p id="review">${testimonialContainer[i].reviews}</p>
            `
        };

        // show data
        if(document.body.contains(nextSlider)){
            nextSlider.addEventListener("click", () => {
                i = (i + l + 1) % l;
                showReviews();
            });
            lastSlider.addEventListener("click", () => {
                i = (i + l - 1) % l;
                showReviews();
            });
        }


	}
});