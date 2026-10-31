let products = [
  { productCode: "PRD-001", productName: "Điện Thoại Nova X1",
    brand: "Nova Mobile",
    stockQuantity: 120, warrantyMonths: 12 },
  { productCode: "PRD-002", productName: "Máy Tính Bảng Nova Tab",
    brand: "Nova Mobile",
    stockQuantity: 35, warrantyMonths: 24 },
  { productCode: "PRD-003", productName: "Tai Nghe Sky Buds",
    brand: "Bluesky Audio",
    stockQuantity: 80, warrantyMonths: 6 }
];

function findProductIndex(code) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].productCode === code) {
      return i;
    }
  }
  return -1;
}

function validateProductCode(code) {
  if (code === "") {
    return "Lỗi: Chưa nhập mã sản phẩm";
  }
  if (code.length < 6) {
    return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
  }
  if (!code.startsWith("PRD-")) {
    return 'Lỗi: Sai tiền tố "PRD-"';
  }
  if (code.includes(" ")) {
    return "Lỗi: Chứa khoảng trắng";
  }
  if (findProductIndex(code) !== -1) {
    return "Lỗi: Mã sản phẩm đã tồn tại";
  }
  return "";
}

function normalizeText(rawText) {
  let trimmedText = rawText.trim();
  if (trimmedText === "") {
    return "";
  }
  let words = trimmedText.split(" ");
  let resultWords = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== "") {
      let word = words[i].toLowerCase();
      let formattedWord = word[0].toUpperCase() + word.slice(1);
      resultWords.push(formattedWord);
    }
  }
  return resultWords.join(" ");
}

function inputIntegerInRange(message, min, max) {
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    let trimmedInput = input.trim();
    if (trimmedInput === "") {
      console.log("Lỗi: chưa nhập, nhập lại");
      continue;
    }
    let numberValue = Number(trimmedInput);
    if (isNaN(numberValue) || !Number.isInteger(numberValue)) {
      console.log("Lỗi: không phải số nguyên, nhập lại");
      continue;
    }
    if (numberValue < min || numberValue > max) {
      console.log("Lỗi: ngoài phạm vi " + min + " - " + max + ", nhập lại");
      continue;
    }
    return numberValue;
  }
}

function displayProducts(list) {
  if (list.length === 0) {
    console.log("Danh sách sản phẩm trống");
    return;
  }
  for (let i = 0; i < list.length; i++) {
    console.log((i + 1) + ". " + list[i].productCode + " - " + list[i].productName + " - " + list[i].brand);
    console.log("   Số lượng tồn kho: " + list[i].stockQuantity + " | Số tháng bảo hành: " + list[i].warrantyMonths);
  }
  console.log("Tổng: " + list.length + " sản phẩm");
}

function showProducts() {
  displayProducts(products);
}

function addProduct() {
  let rawCode = prompt("Nhập mã sản phẩm:");
  if (rawCode === null) {
    console.log("Hủy thao tác thêm");
    return;
  }
  let code = rawCode.trim().toUpperCase();
  let errorMessage = validateProductCode(code);
  if (errorMessage !== "") {
    console.log(errorMessage);
    return;
  }

  let productName = "";
  while (true) {
    let rawName = prompt("Nhập tên sản phẩm:");
    if (rawName === null) {
      console.log("Hủy thao tác thêm");
      return;
    }
    productName = normalizeText(rawName);
    if (productName === "") {
      console.log("Lỗi: chưa nhập, nhập lại");
      continue;
    }
    break;
  }

  let brand = "";
  while (true) {
    let rawBrand = prompt("Nhập hãng sản xuất:");
    if (rawBrand === null) {
      console.log("Hủy thao tác thêm");
      return;
    }
    brand = normalizeText(rawBrand);
    if (brand === "") {
      console.log("Lỗi: chưa nhập, nhập lại");
      continue;
    }
    break;
  }

  let stockQuantity = inputIntegerInRange("Nhập số lượng tồn kho (0 - 500):", 0, 500);
  if (stockQuantity === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  let warrantyMonths = inputIntegerInRange("Nhập số tháng bảo hành (6 - 36):", 6, 36);
  if (warrantyMonths === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  let newProduct = {
    productCode: code,
    productName: productName,
    brand: brand,
    stockQuantity: stockQuantity,
    warrantyMonths: warrantyMonths
  };

  products.push(newProduct);
  console.log(newProduct.productCode + " - " + newProduct.productName + " - " + newProduct.brand);
  console.log("Số lượng tồn kho: " + newProduct.stockQuantity + " | Số tháng bảo hành: " + newProduct.warrantyMonths);
}

function updateProduct() {
  let rawCode = prompt("Nhập mã sản phẩm cần cập nhật:");
  if (rawCode === null) {
    console.log("Bấm Cancel - đã hủy cập nhật");
    return;
  }
  let code = rawCode.trim().toUpperCase();
  let index = findProductIndex(code);
  if (index === -1) {
    console.log("Không tìm thấy sản phẩm có mã " + code);
    return;
  }

  let oldStock = products[index].stockQuantity;
  let oldWarranty = products[index].warrantyMonths;

  let newStock = inputIntegerInRange("Nhập số lượng tồn kho mới (0 - 500):", 0, 500);
  if (newStock === null) {
    console.log("Trước: " + oldStock + " / " + oldWarranty);
    console.log("Sau: " + products[index].stockQuantity + " / " + products[index].warrantyMonths);
    console.log("Bấm Cancel - đã hủy cập nhật");
    return;
  }

  let newWarranty = inputIntegerInRange("Nhập số tháng bảo hành mới (6 - 36):", 6, 36);
  if (newWarranty === null) {
    console.log("Trước: " + oldStock + " / " + oldWarranty);
    console.log("Sau: " + products[index].stockQuantity + " / " + products[index].warrantyMonths);
    console.log("Bấm Cancel - đã hủy cập nhật");
    return;
  }

  products[index].stockQuantity = newStock;
  products[index].warrantyMonths = newWarranty;

  console.log("Trước: " + oldStock + " / " + oldWarranty);
  console.log("Sau: " + products[index].stockQuantity + " / " + products[index].warrantyMonths);
  console.log("Cập nhật thành công");
}

function deleteProduct() {
  let rawCode = prompt("Nhập mã sản phẩm cần xóa:");
  if (rawCode === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }
  let code = rawCode.trim().toUpperCase();
  let index = findProductIndex(code);
  if (index === -1) {
    console.log("Không tìm thấy sản phẩm có mã " + code);
    return;
  }

  let confirmInput = prompt("Xác nhận xóa (Y/N):");
  if (confirmInput === null) {
    console.log("Đã hủy thao tác xóa, còn " + products.length + " sản phẩm");
    return;
  }

  let confirmValue = confirmInput.trim();
  if (confirmValue === "Y" || confirmValue === "y") {
    products.splice(index, 1);
    console.log("Xóa thành công, còn " + products.length + " sản phẩm");
  } else {
    console.log("Đã hủy thao tác xóa, còn " + products.length + " sản phẩm");
  }
}

function searchByBrand() {
}

function menu() {
  let isRunning = true;
  while (isRunning) {
    console.log("==================================================");
    console.log("1. Hiển thị danh sách sản phẩm");
    console.log("2. Thêm sản phẩm mới");
    console.log("3. Cập nhật thông tin sản phẩm");
    console.log("4. Xóa sản phẩm");
    console.log("5. Tìm kiếm sản phẩm theo hãng sản xuất");
    console.log("0. Thoát chương trình");
    console.log("==================================================");
    console.log("Vui lòng nhập lựa chọn của bạn (0 - 5):");

    let rawChoice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");
    if (rawChoice === null) {
      console.log("Lựa chọn không hợp lệ");
      continue;
    }

    let choice = rawChoice.trim();
    switch (choice) {
      case "1": {
        showProducts();
        break;
      }
      case "2": {
        addProduct();
        break;
      }
      case "3": {
        updateProduct();
        break;
      }
      case "4": {
        deleteProduct();
        break;
      }
      case "5": {
        searchByBrand();
        break;
      }
      case "0": {
        console.log("Thoát chương trình");
        isRunning = false;
        break;
      }
      default: {
        console.log("Lựa chọn không hợp lệ");
        break;
      }
    }
  }
}

menu();