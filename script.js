document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('driverForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    
    // Modal elements
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const hiddenIframe = document.getElementById('hidden_iframe');

    // Trạng thái theo dõi form
    let isSubmitted = false;

    // Khi người dùng bấm nút submit gửi form
    form.addEventListener('submit', () => {
        // Đổi nút submit thành trạng thái loading
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
        isSubmitted = true;
    });

    // Lắng nghe sự kiện iframe ẩn tải xong (Google Sheets đã ghi nhận dữ liệu)
    hiddenIframe.addEventListener('load', () => {
        if (isSubmitted) {
            // 1. Hiện Modal đăng ký thành công rực rỡ
            successModal.classList.remove('hidden');
            
            // 2. Reset lại form trống
            form.reset();
            
            // 3. Khôi phục lại trạng thái ban đầu của nút bấm
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
            
            // Reset trạng thái
            isSubmitted = false;
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
});
