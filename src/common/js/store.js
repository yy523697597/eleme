// 存储商家
export function saveToLocal(id, key, value) {
  let seller = localStorage._seller_;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller.JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  localStorage._seller_ = JSON.stringify(seller);
}
// 读取
export function loadFromLocal(id, key, value) {

}
