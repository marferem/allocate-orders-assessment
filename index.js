const salesOrders = [{
  'id': 'S1',
  'created': '2020-01-02',
  'quantity': 6
}, {
  'id': 'S2', 
  'created': '2020-11-05',
  'quantity': 2 
}, {
  'id': 'S3', 
  'created': '2019-12-04',
  'quantity': 3 
}, {
  'id': 'S4', 
  'created': '2020-01-20',
  'quantity': 2 
}, {
  'id': 'S5', 
  'created': '2019-12-15',
  'quantity': 9 
}];

const purchaseOrders = [{
  'id': 'P1', 
  'receiving': '2020-01-04',
  'quantity': 4
}, {
  'id': 'P2', 
  'receiving': '2020-01-05',
  'quantity': 3 
}, {
  'id': 'P3', 
  'receiving': '2020-02-01',
  'quantity': 5 
}, {
  'id': 'P4', 
  'receiving': '2020-03-05',
  'quantity': 1 
}, {
  'id': 'P5', 
  'receiving': '2020-02-20',
  'quantity': 7
}];

const orderAscendingBy = ({ array, fieldName}) => {
    return array.sort((a, b) => {
        return a[fieldName] < b[fieldName] ? -1 
          : a[fieldName] > b[fieldName] ? 1
          : 0;
    })
}

const allocate = (salesOrders, purchaseOrders) => {
  const orderedSalesOrders = orderAscendingBy({ 
    array: salesOrders, 
    fieldName: 'created' 
  })
  console.log(' - Ordered sales orders: ', orderedSalesOrders)

  let orderedOPurchaseOrders = orderAscendingBy({
    array: purchaseOrders,
    fieldName: 'receiving'
  })
  console.log(' - Ordered purchase orders: ', orderedOPurchaseOrders)
  
  let existingItemsCount = 0;
  let dispatchDate = null;

  const salesWithDispatchingDatePairs = [];
  for (let i = 0; i < orderedSalesOrders.length; i++) {
    const currentSaleOrder = orderedSalesOrders[i];
    while (existingItemsCount < currentSaleOrder.quantity && orderedOPurchaseOrders.length) {
      const currentPurchaseOrder = orderedOPurchaseOrders.shift();
      existingItemsCount += currentPurchaseOrder.quantity;
      dispatchDate = currentPurchaseOrder.receiving;
    }
    
    if (existingItemsCount < currentSaleOrder.quantity) break;

    const saleWithDispatchDate = {
      saleOrderId: currentSaleOrder.id,
      dispatchDate
    };
    existingItemsCount -= currentSaleOrder.quantity;
    salesWithDispatchingDatePairs.push(saleWithDispatchDate);
  }
  return salesWithDispatchingDatePairs;
};


const salesWithDispatchingDatePairs = allocate(salesOrders, purchaseOrders);
console.log(' - sales with disptaching date paris: ' + JSON.stringify(salesWithDispatchingDatePairs, null, 2))