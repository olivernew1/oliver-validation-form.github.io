// Đối tượng (Validator này là hàm nhưng mong muốn trong tlai viết theo kiểu đối tượng)
function Validator (options){

    // HÀM thực hiện Validate:
    function Validate (inputElement, rule) {
        
        var errorNotice = inputElement.parentElement.querySelector(options.errorSelector);
            // chọn element input, rồi nhảy qua thẻ parent (dùng thuộc tính built-in 'parentElement) 
            // để query .form-message bên trong nó (Biến này để dùng ở dưới khi code phần hiển thị message của div .form-message)
        var errorMessage = rule.test(inputElement.value); 
            // var biến để call() function child 'test' đã đc định nghĩa ở dưới, và truyền vào (value) là inputElement.value                    
            
            // _____ hiện ra lỗi hoặc bỏ lỗi _____:  
        if (errorMessage){
            errorNotice.innerText = errorMessage; // trả về value.trim() = hợp lệ, hoặc trả về undefined = 'vui lòng nhập...'
            inputElement.parentElement.classList.add('invalid'); // thêm màu đỏ cho errorMessage (classList là thuộc tính sẵn built-in; invalid là class mình viết trong CSS)
        } else { // nếu ko có đoạn else này thì trong trg hợp đã bị hiện "Vui lòng...", điền lại ttin vào vẫn ko mất tbao lỗi đó
            errorNotice.innerText = ' ';  // nghĩa là khi user chưa điền gì thì ẩn/ hiện notice trống ' ' = ko hiện
            inputElement.parentElement.classList.remove('invalid'); // bỏ border đỏ
        }    
        
    }

    // lấy element của form cần validate:
    var formElement = document.querySelector(options.form);
    // Lấy form trong parent object (ở đây hiển thị qua biến là options) 

    if (formElement){ //nếu có form thì chạy forEach qua rules
        
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            // query tnay để lấy chính xác element m muốn (nếu chỉ #fullname thì sẽ trùng với nhiều chỗ khác)
            
            if (inputElement){ // nếu có inputElemnt 
                // xử lý trường hợp blur khỏi input:
                inputElement.onblur = function () { // thì lắng nghe event blur (click ra ngoài) 
                    Validate(inputElement, rule);
                }

                // bỏ thông báo đỏ khi ng dùng nhập vào input:
                inputElement.oninput = function () {
                    var errorNotice = inputElement.parentElement.querySelector(options.errorSelector);
                    errorNotice.innerText = ' ';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}

// ĐỊNH NGHĨA RULES:
// Ng tắc các rules (tự đặt):
// 1. Khi có lỗi -> Trả ra message lỗi ('vui lòng nhập trg này')
// 2. Khi hợp lệ -> Kô trả ra gì cả (trả ra undefined)
Validator.isRequired = function (selector){   // viết function 'isRequired' nằm trong function/ object 'Validator' - private
    return {
        selector: selector, 
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này' 
            // toán tử 3 ngôi
            // trim: loại bỏ dầu cách đầu, cuối và value full dấu cách
        }
    };
} 

Validator.isEmail = function (selector){   // viết function 'isEmail' nằm trong function/ object 'Validator' - private
    return {
        selector: selector, 
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // search email regex js
            return regex.test(value) ? undefined : 'email ko hợp lệ';
        }
    };
} 

console.log(Validator.isRequired);