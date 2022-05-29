var mens = document.querySelector('.mens-clothing')
var category = document.querySelectorAll('.category-item')
var loginBtn = document.querySelector('.navbar__list-item.login')
var registerBtn = document.querySelector('.navbar__list-item.register')
var loginCompleteBtns = document.querySelectorAll('.btn-login')
var addCart = document.querySelector('.cart')
var currentQuantity = 1




function getData () {
    fetch('https://fakestoreapi.com/products/')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        action(data)
    })
}





function action (data) {
    
    var products = document.querySelector('.grid__row--product')


    // hàm nhấn vào một sản phẩm
    function openModal (product) {
        products.innerHTML = 
             `
            <div class="modal">
                <div class="modal__item">
                    <i class="fas fa-times" onclick=""></i>
                    <img src="${product.image}" alt="" class="img-detail-product">
                    <div class="content-detail-product">
                        <div class="name">${product.title}</div>
                        <div class="prince">
                            <div class="prince-new">${product.price} $$</div>
                        </div>
                        <div class="quantity">Số lượng:
                            <div class="minus" onclick="minusQuantity()">
                                <i class="fas fa-minus"></i>
                            </div>
                            <div class="quantity-number">${currentQuantity}</div>
                            <div class="plus" onclick="plusQuantity()">
                                <i class="fas fa-plus"></i>
                            </div>
                        </div>
                        <div class="pay-or-cart">
                            <div class="cart" onclick="">
                                <i class="far fa-shopping-cart"></i>
                                Thêm vào giỏ hàng
                            </div>
                            <div class="pay">mua ngay</div>
                        </div>
                </div>
            </div>
        `
    
    }
 

    // hàm render ra 1 sản phẩm
    function oneProduct (item) {
        return `
            <div class="grid__column-2-10 t-4 m-6" id="${item.id}" onclick="">
                <div class="item">
                    <div class="product-img-1" style="background-image: url('${item.image}');"></div>
                    <div class="product-info">
                        <h4>${item.title}</h4>
                        <div class="product-price">
                            <span class="price-new">${item.price} $$</span>
                        </div>
                        <div class="feedback" onclick="feedback()">
                            <div class="heart">
                                <i class="ti-heart"></i>
                            </div>
                            <div class="startBig">
                                <div class="start">
                                    <i class="ti-star"></i>
                                </div>
                                <div class="start">
                                    <i class="ti-star"></i>
                                </div>
                                <div class="start">
                                    <i class="ti-star"></i>
                                </div>
                                <div class="start">
                                    <i class="ti-star"></i>
                                </div>
                                <div class="start">
                                    <i class="ti-star"></i>
                                </div>
                            </div>
                        </div>
                        <div class="address">TP. Hồ Chí Minh</div>
                        <div class="favorite">
                            <i class="ti-check"></i>
                            <span>Yếu thích</span>
                        </div>
                        <div class="reduce">
                            <p>10%</p>
                            <span>GIẢM</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    
    data.forEach((item) => {
        products.innerHTML = products.innerHTML + oneProduct(item)   
        choose(data) 
         
    })



    // xử lý nút đăng nhập
    loginBtn.onclick = function () {
        login();
    }


    // xử lý nút đăng ký
    registerBtn.onclick = function () {
        register();
    }


    
    // hàm nhấn vô để mua sản phẩm
    function choose (data) {
        var cards = document.querySelectorAll('.grid__column-2-10.t-4.m-6')
        cards.forEach((card,index) => {
                card.onclick = () => {
                    data.forEach((element) => {
                        if (card.id == element.id) {
                            openModal(element) 
                            closeModal()
                        }
                    })   
                    
                }  
        })
    }
    
    
    

    
    category.forEach((element, index) => {
        element.onclick = () => {

            document.querySelector('.category-item.active').classList.remove('active');

            products.innerHTML = ``

            if (index === 0) { 
                category[0].classList.add('active') 
                render('men\'s clothing')
                choose(data)               
            }
            else if (index === 1) {
                category[1].classList.add('active')
                render('women\'s clothing')
                choose(data)     
            }
            else if (index === 2) {
                category[2].classList.add('active')
                render('jewelery')
                choose(data)  
            }
            else if (index === 3) {
                category[3].classList.add('active')
                render('electronics')
                choose(data)
            }
        }
    })


    // hàm check loại sản phẩm
    function check (obj, category) {
        if (obj.category === category) {
            return true
        } else {
            return false
        }
    }


    // hàm render ra loại sản phẩm sau khi check
    function render (string) {
        data.forEach((item, index) => {
            if(check(item, string) === true) {   
                products.innerHTML = products.innerHTML + oneProduct(item)
            }
        })
    }



    function closeModal () {
        var closeBtn = document.querySelector('.fas.fa-times');
        var currentModal = document.querySelector('.modal');
        closeBtn.onclick = () => {
            currentModal.style.display = 'none';
            currentModal.style.zIndex = -2;
            currentModal.style.opacity = 0;
            data.forEach((item) => {
                products.innerHTML = products.innerHTML + oneProduct(item)   
                choose(data)   
            })
            currentQuantity = 1;
        }   
    }



    // hàm nhấn vào nút đăng ký
    function register () {
        document.querySelector('.modal-register').style.display = 'flex';
        loginCompleteBtns.forEach(function (loginCompleteBtn) {
            loginCompleteBtn.onclick = function () {
                document.querySelector('.modal-register').style.display = 'none';
                document.querySelector('.register').style.display = 'none';
                document.querySelector('.login').style.display = 'none';
                document.querySelector('.navbar__list-item--user').style.display = 'inline-flex';
            }
        });
        var loginInRegisterBtn = document.querySelector('.loginInRegister')
        loginInRegisterBtn.onclick = function () {
            document.querySelector('.modal-register').style.display = 'none';
            login();
        };
        var emailSelectorOfRegister = document.querySelector('#form-1 #email');
        var passwordSelectorOfRegister = document.querySelector('#form-1 #password');
        var passwordConfirm = document.querySelector('#form-1 #password-confirm');
        isEmail(emailSelectorOfRegister);
        isRequitedInput(passwordSelectorOfRegister);
        // isRequitedInput(passwordConfirm);
        isConfirm(passwordSelectorOfRegister, passwordConfirm)
    }



    // hàm nhấn vào nút đăng nhập
    function login () {
        document.querySelector('.modal-login').style.display = 'flex';
        loginCompleteBtns.forEach(function (loginCompleteBtn) {
            loginCompleteBtn.onclick = function () {
                document.querySelector('.modal-login').style.display = 'none';
                document.querySelector('.register').style.display = 'none';
                document.querySelector('.login').style.display = 'none';
                document.querySelector('.navbar__list-item--user').style.display = 'inline-flex'
            }
        });
        var registerInLoginBtn = document.querySelector('.registerInLogin')
        registerInLoginBtn.onclick = function () {
            document.querySelector('.modal-login').style.display = 'none';
            register();
        };
        var emailSelectorOfLogin = document.querySelector('#form-2 .form-group #email');
        var passwordSelectorOfLogin = document.querySelector('#form-2 .form-group #password');
        isEmail(emailSelectorOfLogin);
        isRequitedInput(passwordSelectorOfLogin);
    }



    // hàm isrequited
    function isRequitedInput (selector) {
        selector.onblur = function () {
            var parentSelector = selector.parentElement
            if (selector.value.length >= 6) {
                parentSelector.querySelector('.form-message').innerText = ''
            } else if (selector.value.length < 6 && selector.value.length > 0) {
                parentSelector.querySelector('.form-message').innerText = 'Vui lòng nhập ít nhất 6 kí tự!'
            } else {
                parentSelector.querySelector('.form-message').innerText = 'Vui lòng nhập trường này!'
            }
        }  
    }



    // hàm isEmail
    function isEmail (selector) {
        selector.onblur = function () {
            var parentSelector = selector.parentElement
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(selector.value)) {
                parentSelector.querySelector('.form-message').innerText = ''
            } else {
                parentSelector.querySelector('.form-message').innerText = 'Vui lòng nhập đúng email!'
            }
    }
    }



    // hàm password confirm
    function isConfirm (password, passwordconfirm) {
        passwordconfirm.onblur = function () {
            if (passwordconfirm.value !== password.value) {
                passwordconfirm.parentElement.querySelector('.form-message').innerText = 'vui lòng nhập trùng khớp với password ở trên!'
            } else {
                passwordconfirm.parentElement.querySelector('.form-message').innerText = ''
            }
        }
    }
        


    // các hàm nhấn nút tăng giảm số lượng khi thanh toán 
    function minusQuantity () {
        if (currentQuantity <= 0) {
            currentQuantity = 0
        } else {
            currentQuantity = --currentQuantity;
        }
        
        document.querySelector('.quantity-number').innerText = currentQuantity;
    }

    function plusQuantity () {
        currentQuantity = ++currentQuantity;
        console.log(currentQuantity)
        document.querySelector('.quantity-number').innerText = currentQuantity;
    }





    // các hàm feedback (thả tym thả sao)  (click thì hình không có màu display = none + hình có màu display = block)

    function feedback () {
        
        
        
        var products = document.querySelectorAll('.grid__column-2-10')
        products.forEach(function (product) {
            
            event.stopPropagation();

            // xử lý nút thả tym
            var isHeart = false;
            var heartSelectors = product.querySelectorAll('.heart')
            heartSelectors.forEach(function (heartSelector) {
                heartSelector.onclick = function () {
                    event.stopPropagation();
                    if (isHeart) {
                        this.classList.remove('heart-color')
                        isHeart = false;
                    } else {
                        this.classList.add('heart-color')
                        isHeart = true;
                    }
                }
            })

                // xử lý nút thả sao
            var startGroupSelectors = document.querySelectorAll('.startBig')
            startGroupSelectors.forEach(function (startGroupSelector) {
                
                var startSelectors = startGroupSelector.querySelectorAll('.start')
                startSelectors.forEach(function (startSelector) {
                    var isStart = false;
                    startSelector.onclick = function () {
                        event.stopPropagation();
                        if (isStart) {
                            this.classList.remove('start-color');
                            isStart = false;
                        } else {
                            this.classList.add('start-color');
                            isStart = true;
                        }
                    }
                })
            })
            

        })
    
    }

    
}





getData()









//https://fakestoreapi.com/products/
