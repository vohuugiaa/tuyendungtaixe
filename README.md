# Hướng Dẫn Sử Dụng Landing Page Tuyển Dụng Xanh SM

Dự án này là Landing Page tuyển dụng chuyên nghiệp dành cho tài xế Xanh SM, được tối ưu giao diện hiện đại (vibrant colors, clean layout, floating animations, custom radio cards) và hỗ trợ kết nối trực tiếp với Google Sheet thông qua Google Apps Script.

## Cấu Trúc Thư Mục
1. `index.html`: Giao diện chính của Landing Page.
2. `style.css`: Bộ quy tắc định dạng giao diện chuyên nghiệp cao cấp.
3. `script.js`: Xử lý logic gửi dữ liệu từ Form về Google Sheet qua Apps Script.
4. `AppsScript.js`: Đoạn mã cần dán vào Google Sheet để nhận dữ liệu từ Landing Page.

---

## Các Bước Cấu Hình Kết Nối Google Sheet

### Bước 1: Thiết Lập Google Sheet
1. Tạo một trang Google Sheet mới.
2. Thiết lập các cột tiêu đề tại hàng đầu tiên (Hàng 1) đúng thứ tự hoặc bất kỳ để dễ theo dõi:
   - **Cột A**: Họ Và Tên
   - **Cột B**: Khu Vực
   - **Cột C**: Đã từng chạy Xanh SM
   - **Cột D**: Bằng lái xe
   - **Cột E**: Số điện thoại liên hệ
   - **Cột F**: Thời gian đăng ký

### Bước 2: Thiết Lập Google Apps Script
1. Trên giao diện Google Sheet, chọn **Tiện ích mở rộng** (Extensions) -> **Apps Script**.
2. Xóa hết mã code hiện tại trong ô soạn thảo.
3. Mở file `AppsScript.js` đi kèm thư mục này, sao chép toàn bộ nội dung và dán vào ô soạn thảo của Apps Script.
4. Nhấn biểu tượng **Lưu** (Save).

### Bước 3: Triển Khai (Deploy) Dưới Dạng Web App
1. Nhấn nút **Triển khai** (Deploy) ở góc trên bên phải -> Chọn **Triển khai mới** (New deployment).
2. Chọn loại triển khai là **Ứng dụng web** (Web app) bằng cách click vào biểu tượng bánh răng.
3. Cấu hình các thông số sau:
   - **Mô tả**: `Xanh SM Form API`
   - **Thực thi dưới dạng** (Execute as): `Tôi` (Me)
   - **Ai có quyền truy cập** (Who has access): `Bất kỳ ai` (Anyone) - *Bắt buộc phải chọn phần này để form từ ngoài gửi dữ liệu vào được.*
4. Nhấn nút **Triển khai** (Deploy).
5. Nếu Google yêu cầu cấp quyền truy cập tài khoản (Authorize access), hãy thực hiện cấp quyền (chọn tài khoản của bạn -> Advanced -> Go to ... (unsafe) -> Allow).
6. Sau khi triển khai xong, hệ thống sẽ cung cấp cho bạn một đường link **URL ứng dụng web** (Web app URL). Hãy **Sao chép** đường dẫn này.

### Bước 4: Tích Hợp Vào Mã Nguồn Landing Page
1. Mở file `script.js`.
2. Tìm dòng thứ 2:
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Thay thế `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` bằng link URL ứng dụng web bạn đã sao chép ở Bước 3.
4. Lưu file và tận hưởng thành quả! Mở file `index.html` lên trình duyệt và thử điền form đăng ký, dữ liệu sẽ tự động đẩy về Google Sheet của bạn lập tức!
