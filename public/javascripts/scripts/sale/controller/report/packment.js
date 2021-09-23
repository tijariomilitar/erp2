Sale.packment.report.controller = {};

Sale.packment.report.controller.filter = document.getElementById("sale-packment-report-filter-form");
if(Sale.packment.report.controller.filter){
  Sale.packment.report.controller.filter.addEventListener("submit", async event => {
    event.preventDefault();

    let sale = {
      periodStart: lib.datetimeToTimestamp(event.target.elements.namedItem("periodStart").value),
      periodEnd: lib.datetimeToTimestamp(event.target.elements.namedItem("periodEnd").value),
      packment_user_id: event.target.elements.namedItem("packment-user-id").value
    };

    if(sale.status == "Confirmadas"){ sale.status = ""; };

    let response = await API.response(Sale.packment.report.filter, sale);
    if(!response){ return false };

    let packmentAmountByUserId = {};
    response.sale_packments.forEach(function (sale) {
      packmentAmountByUserId[sale.packment_user_id] = (packmentAmountByUserId[sale.packment_user_id] || 0) + 1;
    });

    let packments = [];

    for (let [key, value] of Object.entries(packmentAmountByUserId)) {
      let packment = { id: key, amount: value };
      for(let i in response.sale_packments){ 
        if(key == response.sale_packments[i].packment_user_id){
          packment.packment_user_name = response.sale_packments[i].packment_user_name;
        }
      };
      packments.push(packment);
    };

    if(packments.length){
      let index = packments.reduce((total, packment) => total + packment.amount, 0); //Total embalado
      for(let i in packments){
        packments[i].percentage = lib.ruleOfThree(index, 100, packments[i].amount).toFixed(2);
        // packments[i].commission = lib.ruleOfThree(100, 20, packments[i].percentage).toFixed(2);
      };
    }

    document.getElementById("sale-packment-report-filter-box").style.display = "";
    
    const setup = { pageSize: 10, page: 0 };
    (function(){ lib.carousel.execute("sale-packment-report-filter-box", Sale.packment.report.view.filter, packments, setup); }());
  });
};