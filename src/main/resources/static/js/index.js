let index = (function () {
    let $container;
    let $table;

    let init = function (container) {
        $container = container;
        sidebar();

        index.time.init(container);
        index.name.init(container);
        index.director.init(container);
        index.actor.init(container);
        index.type.init(container);
        index.combine.init(container);
        index.list.init(container);
        index.hot.init(container);

        $table = $container.find('#listtable').clone();

        $container.find('#listtable').DataTable();
        $('#loading').shCircleLoader();
        $container.find('#loading').attr('hidden','hidden');
    };

    let sidebar = function () {
        $container.find('[href="#time"]').click(function () {
            $container.find('.tab-pane').removeClass('active');
            $container.find('.tab-pane').removeClass('show');
            $container.find('#time').addClass('active');
            $container.find('#time').addClass('show');
        });

        $container.find('[href="#name"]').click(function () {
            $container.find('.tab-pane').removeClass('active');
            $container.find('.tab-pane').removeClass('show');
            $container.find('#name').addClass('active');
            $container.find('#name').addClass('show');
        });

        $container.find('[href="#director"]').click(function () {
            $container.find('.tab-pane').removeClass('active');
            $container.find('.tab-pane').removeClass('show');
            $container.find('#director').addClass('active');
            $container.find('#director').addClass('show');
        });

        $container.find('[href="#actor"]').click(function () {
            $container.find('.tab-pane').removeClass('active');
            $container.find('.tab-pane').removeClass('show');
            $container.find('#actor').addClass('active');
            $container.find('#actor').addClass('show');
        });

        $container.find('[href="#type"]').click(function () {
            $container.find('.tab-pane').removeClass('active');
            $container.find('.tab-pane').removeClass('show');
            $container.find('#type').addClass('active');
            $container.find('#type').addClass('show');
        });

        $container.find('[href="#combine"]').click(function () {
            $container.find('.tab-pane').removeClass('active');
            $container.find('.tab-pane').removeClass('show');
            $container.find('#combine').addClass('active');
            $container.find('#combine').addClass('show');
        });

        $container.find('[href="#list"]').click(function () {
            $container.find('.tab-pane').removeClass('active');
            $container.find('.tab-pane').removeClass('show');
            $container.find('#list').addClass('active');
            $container.find('#list').addClass('show');
        });

        $container.find('[href="#hot"]').click(function () {
            $container.find('.tab-pane').removeClass('active');
            $container.find('.tab-pane').removeClass('show');
            $container.find('#hot').addClass('active');
            $container.find('#hot').addClass('show');
        });

    };

    return {
        init : init,
        getTable : function () {
            return $table;
        }
    }
})();