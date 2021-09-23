Ecommerce.sale.gathering.report.controller = {};

Ecommerce.sale.gathering.report.controller.filter = document.getElementById("ecommerce-sale-gathering-report-filter-form");
if(Ecommerce.sale.gathering.report.controller.filter){
  Ecommerce.sale.gathering.report.controller.filter.addEventListener("submit", async event => {
    event.preventDefault();

    let sale = {
      periodStart: lib.datetimeToTimestamp(event.target.elements.namedItem("periodStart").value),
      periodEnd: lib.datetimeToTimestamp(event.target.elements.namedItem("periodEnd").value),
      gathering_user_id: event.target.elements.namedItem("gathering-user-id").value
    };

    let response = await API.response(Ecommerce.sale.gathering.report.filter, sale);
    if(!response){ return false };
    
    let gatheringAmountByUserId = {};
    response.sale_gatherings.forEach(function (sale) {
      gatheringAmountByUserId[sale.packing_user_id] = (gatheringAmountByUserId[sale.packing_user_id] || 0) + 1;
    });

    let gatherings = [];

    for (let [key, value] of Object.entries(gatheringAmountByUserId)) {
      let gathering = { id: key, amount: value };
      for(let i in response.sale_gatherings){ 
        if(key == response.sale_gatherings[i].packing_user_id){
          gathering.gathering_user_name = response.sale_gatherings[i].packing_user_name;
        }
      };
      gatherings.push(gathering);
    };

    if(gatherings.length){
      let index = gatherings.reduce((total, gathering) => total + gathering.amount, 0); //Total embalado
      for(let i in gatherings){
        gatherings[i].percentage = lib.ruleOfThree(index, 100, gatherings[i].amount).toFixed(2);
        gatherings[i].commission = lib.ruleOfThree(100, 20, gatherings[i].percentage).toFixed(2);
      };
    }

    document.getElementById("ecommerce-sale-gathering-report-filter-box").style.display = "";
    
    const setup = { pageSize: 10, page: 0 };
    (function(){ lib.carousel.execute("ecommerce-sale-gathering-report-filter-box", Ecommerce.sale.gathering.report.view.filter, gatherings, setup); }());
  });
};