'use strict';

const isExited = (barcode) => {
    let isExited = false;
    let itemList = loadAllItems();
    itemList.forEach((item)=>{
        if(barcode === item.barcode){
            isExited = true;
        }
    })
    return isExited;
}

const getCountOfItems = (barcodes) =>{
    const cart = {};
    barcodes.forEach(barcode =>{
        let index = barcode.indexOf('-');
        let subBarcode = '';
        if (index > -1){
            subBarcode = barcode.substring(0,index);
            if (isExited(subBarcode)){
                if (cart[subBarcode]) {
                    cart[subBarcode] += parseFloat(barcode.substring(index+1));
                }
                else cart[subBarcode] = parseFloat(barcode.substring(index+1));
            }
        }else if (index === -1){
            if (isExited(barcode)){
                if (cart[barcode]) {
                    cart[barcode]++;
                }
                else cart[barcode] = 1;
            }
        }
    })
    return cart;
}

const getPromotion = (cart) =>{
    for(let item in cart){
        loadPromotions()[0].barcodes.forEach((barcode) => {
            if (item === barcode){
                let count = parseInt(cart[item] / 2);
                if (count > 0){
                    cart[item] -= 1;
                }
            }
        })
    }
    return cart;
}

const drawReceipts = (barcodes) => {
    let itemList = loadAllItems();
    let allItems = {};
    itemList.forEach(item =>{
        let barcode = item.barcode;
        allItems[barcode] = item;
    });
    let cart = getCountOfItems(barcodes);
    let orderList = getPromotion(getCountOfItems(barcodes));
    let result = '***<没钱赚商店>收据***\n';
    let sum = 0;
    let saveMoney = 0;
    for (let i in orderList ) {
        result += `名称：${allItems[i].name}，数量：${cart[i]}${allItems[i].unit}，单价：${allItems[i].price.toFixed(2)}(元)，小计：` + (allItems[i].price * orderList[i]).toFixed(2) + '(元)\n';
        sum += orderList[i] * allItems[i].price;
        saveMoney += (cart[i] - orderList[i]) * allItems[i].price;
    }
    result += `----------------------\n总计：${sum.toFixed(2)}(元)\n节省：${saveMoney.toFixed(2)}(元)\n`;
    result += '**********************';
    return result;
}

const printReceipt = tags => {
    let flag = true;
    tags.forEach(tag => {
        if (!isExited(tag)){
            flag = false;
        }
    })
    if (flag){
        console.log(drawReceipts(tags));
    }
    else console.log(drawReceipts(tags));
}
