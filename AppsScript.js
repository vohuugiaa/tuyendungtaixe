// Copy đoạn code này dán vào Extensions -> Apps Script trên Google Sheet của bạn.
// Sau đó Deploy dưới dạng Web App (thiết lập quyền truy cập là "Anyone").

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Lấy thông tin từ request gửi lên
    var name = e.parameter['Họ Và Tên'] || '';
    var phone = e.parameter['Số điện thoại liên hệ'] || '';
    var area = e.parameter['Khu Vực'] || '';
    var license = e.parameter['Bằng lái xe'] || '';
    var experienced = e.parameter['Đã từng chạy Xanh SM'] || '';
    var timestamp = new Date(); // Thời gian đăng ký

    // Thêm một dòng mới vào Sheet theo thứ tự cột:
    // Cột A: Họ Và Tên
    // Cột B: Khu Vực
    // Cột C: Đã từng chạy Xanh SM
    // Cột D: Bằng lái xe
    // Cột E: Số điện thoại liên hệ
    // Cột F: Thời gian đăng ký (Tùy chọn)
    
    sheet.appendRow([name, area, experienced, license, phone, timestamp]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Đăng ký thành công!'
    })).setMimeType(ContentService.MimeType.JSON)
       .setHeader('Access-Control-Allow-Origin', '*'); // Cho phép CORS
       
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON)
       .setHeader('Access-Control-Allow-Origin', '*');
  }
}

// Hàm GET để test thử Apps Script hoạt động hay chưa
function doGet(e) {
  return ContentService.createTextOutput("Apps Script Xanh SM is Running!")
         .setHeader('Access-Control-Allow-Origin', '*');
}
