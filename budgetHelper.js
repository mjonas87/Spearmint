$(document).ready(function() {
	var helper = new BudgetHelper();
	setTimeout(helper.scrapeBudget, 1500);
});

var BudgetHelper = (function () {
    var BudgetHelper = function () {
        this.setupHandlers();
        this.defineDomElements();
    };

    BudgetHelper.prototype.setupHandlers = function () {
    };

    BudgetHelper.prototype.defineDomElements = function () {
    	this.spendingList = $('#spendingBudget-list-body')
    	this.spendingBudgetEntries = this.spendingList.find('li');
    };

    BudgetHelper.prototype.scrapeBudget = function() {
    	this.spendingList = $('#spendingBudget-list-body')
    	this.spendingBudgetEntries = this.spendingList.find('li');

    	//Wait until all ajax connections are closed.
    	while($.active > 0){}

    	var link = document.createElement('a');
		link.textContent = 'Export data as CSV';
		link.download = 'file.csv';
		link.href = 'data:text/csv,'

		var items = this.spendingBudgetEntries.map(function(idx, entry){
			return {
				category: $($(entry).find('a.title strong')[0]).html(),
				actual: $($($(entry).find('div.progress strong.money')[0]).find('span')[1]).html().replace('$',''),
				estimated: $($($(entry).find('div.progress strong.money')[1]).find('span')[1]).html().replace('$',''),
			};
		});

    	var categories = items.each(function(idx, item){
    		link.href += item.category + ',' + item.actual + ',' + item.estimated + '%0D%0A';
    	});
    	//right_col

    	$('td.details-budgets').append(link);
    };

    return BudgetHelper;
})();