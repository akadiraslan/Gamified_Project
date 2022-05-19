export const TableSetting = {
    actions: {
        edit: false,
        delete: false,
        add: false,
        custom: [
            {name: 'editAction', title: '<i class="nb-edit st-sort-ascent"></i> <br>'},
            {name: 'deleteAction', title: '<i class="nb-trash"></i>'},
        ],
        position: 'right',
        filter: false
    },
    pager: {
        display: true,
        perPage: 10,
    },
    columns: {},

};

export const apiSetting = {
    pagerLimitKey: 'limit',
    pagerPageKey: 'page',
    sortDirKey: 'order',
    sortFieldKey: 'sort',
    dataKey: 'data.data',
    totalKey: 'data.paginator.total',
    currentPage: 'data.paginator.current_page'
};
