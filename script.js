const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyihAZVhdzy6ksopO_Ew0foPzaeoPIFk6VJJMWfdVoDJYFyv8xWBTbGEOB4JPVBGe5CJw/exec'; 

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('driverForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Kiểm tra nếu chưa thay link Apps Script
        if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            showMessage('Vui lòng thay thế SCRIPT_URL trong file script.js bằng link Google Apps Script thực tế của bạn!', 'error');
            return;
        }

        // Thay đổi trạng thái nút submit
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
        formMessage.classList.add('hidden');

        // Lấy dữ liệu từ form
        const formData = new FormData(form);
        
        // Chuẩn bị dữ liệu gửi đi (FormData mapping theo tên cột Google Sheet)
        // Các name của input phải khớp với Apps Script nhận vào (Họ Và Tên, Khu Vực,...)
        const data = new FormData();
        data.append('Họ Và Tên', formData.get('fullName'));
        data.append('Số điện thoại liên hệ', formData.get('phone'));
        data.append('Khu Vực', formData.get('area'));
        data.append('Bằng lái xe', formData.get('license'));
        data.append('Đã từng chạy Xanh SM', formData.get('experienced'));

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                showMessage('Đăng ký thành công! Chúng tôi sẽ sớm liên hệ với bạn.', 'success');
                form.reset();
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Lỗi khi gửi form:', error);
            showMessage('Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau!', 'error');
        } finally {
            // Khôi phục nút submit
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.classList.remove('hidden');
    }
});
