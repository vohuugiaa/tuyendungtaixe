const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyihAZVhdzy6ksopO_Ew0foPzaeoPIFk6VJJMWfdVoDJYFyv8xWBTbGEOB4JPVBGe5CJw/exec'; 

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('driverForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    const formMessage = document.getElementById('formMessage');
    
    // Modal elements
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Thay đổi trạng thái nút submit
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
        formMessage.classList.add('hidden');

        // Lấy dữ liệu từ form
        const formData = new FormData(form);
        
        // Chuẩn bị dữ liệu gửi đi (FormData mapping theo tên cột Google Sheet)
        const data = new FormData();
        data.append('Họ Và Tên', formData.get('fullName'));
        data.append('Số điện thoại liên hệ', formData.get('phone'));
        data.append('Khu Vực', formData.get('area'));
        data.append('Bằng lái xe', formData.get('license'));
        data.append('Đã từng chạy Xanh SM', formData.get('experienced'));

        try {
            // Dùng mode: 'no-cors' để giải quyết triệt để lỗi chuyển hướng 302 của Google Script
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: data
            });

            // Hiển thị modal đăng ký thành công
            successModal.classList.remove('hidden');
            form.reset();
        } catch (error) {
            console.error('Lỗi khi gửi form:', error);
            showMessage('Không thể gửi thông tin. Vui lòng kiểm tra lại kết nối mạng!', 'error');
        } finally {
            // Khôi phục nút submit
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    });

    // Sự kiện đóng Modal
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.add('hidden');
    });

    // Đóng modal khi click ra ngoài vùng card
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.add('hidden');
        }
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.classList.remove('hidden');
    }
});
