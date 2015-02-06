var Cloudstack = {};

(function() {
    convertModifiedBasicMetrics = function(filter) {
        /*
         The functions call here display the basic charts with more info from repos

         Controls the load of data and put the callback waiting until it's ready.
         */

        // repositories comes from Automator config
        var page = 1; // FIXME just to get it work, useless

        // If data is not available load them and cb this function
        if (Loader.check_filter_page (page, filter) === false) {
            $.each(Report.getDataSources(), function(index, DS) {
                if (filter !== "repos") return;
                if (filter === "repos") total = DS.getReposData().length;
                for (var i=0;i<total;i++) {
                    var repo = DS.getReposData()[i];
                    Loader.data_load_item(repo, DS, page, Convert.convertModifiedBasicMetrics, filter);
                }
            });
            return;
        }
        Convert.convertMetricsEvolCustomized(filter);
    };

    Cloudstack.build = function() {
        convertModifiedBasicMetrics("repos");
    };
})();

Loader.data_ready_global(function() {
    Cloudstack.build();
});
