$(document).ready(function() {
    $('#model_picker').select2({
        ajax: {
            url: 'config/schema.json',
            processResults: function (data) {
                // Transforms the top-level key of the response object from 'items' to 'results'
                return {
                    results: data.models.map(function mapModel(model, i) {
                        return {
                            id: i,
                            text: model.name,
                            columns: model.columns.map(function mapColumn(column, i) {
                                return {
                                    id: i,
                                    text: column.name
                                }
                            })
                        }
                    })
                };
            }
        }
    });
    
    $('#dimension_picker').select2({
        data: $('#model_picker').select2('data').flatMap(s => s.columns),
        multiple: true,
        allowClear: true
    });
    $('#measure_picker').select2({
        data: $('#model_picker').select2('data').flatMap(s => s.columns),
        multiple: true,
        allowClear: true
    });
    $('#visualization_picker').select2({
        ajax: {
            url: 'config/visualizations.json',
            processResults: function(data) {
                return {
                    results: data.visualizations.map(function mapViz(viz, i) {
                        return {
                            id: i,
                            text: viz.name,
                            type: viz.type
                        }
                    })
                }
            }
        }
    })

    $('#model_picker').on('select2:select', function (e) {
        $("#dimension_picker").select2({
            data: e.params.data.columns
        });
        $("#measure_picker").select2({
            data: e.params.data.columns
        });
    });

    $('#visualization_picker').on('select2:select', function(e) {
        var vizType = e.params.data.type;
        var myChart = echarts.init(document.getElementById('viz'));
    
        $.get('data.json').done(function (data) {
            myChart.setOption({
                title: {
                    text: 'asynchronous data loading example'
                },
                tooltip: {},
                legend: {
                    data:['Sales']
                },
                xAxis: {
                    data: data.categories
                },
                yAxis: {},
                series: [{
                    name: 'Sales',
                    type: vizType,
                    data: data.data
                }]
            });
        });    
    });
    

});

