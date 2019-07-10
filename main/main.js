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
