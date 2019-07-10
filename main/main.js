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
