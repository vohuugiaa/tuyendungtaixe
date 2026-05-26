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

    // Thêm một dòng mới vào Sheet theo thứ tự cột của bạn:
    // Cột A: Thời gian
    // Cột B: Họ Và Tên
    // Cột C: Khu Vực
    // Cột D: Đã từng chạy Xanh SM
    // Cột E: Bằng lái xe
    // Cột F: Số điện thoại liên hệ
    
    sheet.appendRow([timestamp, name, area, experienced, license, phone]);
    
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
