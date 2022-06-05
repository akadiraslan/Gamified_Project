import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { ReportService } from 'app/@core/mock/common/report.service';
import { BaseComponent } from '../../@components/base/base.component';
import { ChartTypes, DataTypes } from 'app/@core/data/chart';
import { Types } from 'app/@core/model/report';
import { MessageService } from 'app/@core/mock/common/message.service';
import { GameService } from 'app/@core/mock/common/game.service';
import { ApiService } from 'app/@core/mock/common/api.service';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent extends BaseComponent implements OnInit, OnDestroy {
    data: any;
    options: any;
    themeSubscription: any;
    organisationId: any;
    games = [];
    charts: Types[] = ChartTypes;
    totalQuestion = [];
    totalCorrect = [];
    totalWrong = [];
    case = 'barChart';

    dataTypes = DataTypes;
    reportData = [];
    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            name: {
                title: 'User name',
                type: 'string',
            },
            email: {
                title: 'User Email',
                type: 'email',
            },
            score: {
                title: 'Score',
                type: 'number',
            },
        },
    };
    source: LocalDataSource = new LocalDataSource();

    constructor(private theme: NbThemeService, private reportService: ReportService,
        private messageService: MessageService, private gameService: GameService,
        private apiService: ApiService) {
        super();
    }

    ngOnInit(): void {
        this.spinnerShow();
        this.gameService.getAllReport().subscribe((data: any) => {
            this.reportData = data;
            console.log(data);
            this.spinnerHide();
            this.changeReportId(data[0].test_id);
        });
    }

    changeReportId($event) {

        const tableData = [];
        this.gameService.getReport($event).subscribe((data: any) => {
            this.spinnerHide();
            console.log('data');
            console.log(data);
            data.forEach(dat => {
                this.gameService.getUserName(dat.user_id).subscribe((userNam: any) => {
                    tableData.push({
                        name: userNam.name, score: dat.score, email: userNam.email
                    })
                });

            });
        });
        setTimeout(() => {
            this.source.load(tableData);
        }, 1000);
    }

    changeChart($event) {
        if ($event === this.charts[0].id) {
            this.case = 'barChart';
            this.getBarChart();
        } else if ($event === this.charts[1].id) {
            this.case = 'barHorizontalChart';
            this.getBarHorizontalChart();
        } else if ($event === this.charts[2].id) {
            this.case = 'barAnimationChart';
            this.getBarAnimationChart();
        } else if ($event === this.charts[3].id) {
            this.case = 'lineChart';
            this.getLineChart();
        } else if ($event === this.charts[4].id) {
            this.case = 'lineAreaChart';
            this.getLineAreaChart();
        } else if ($event === this.charts[5].id) {
            this.case = 'areaChart';
            this.getAreaChart();
        } else if ($event === this.charts[6].id) {
            this.case = 'scatterChart';
            this.getScatterChart();
        }
    }

    getBarChart() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const chartjs: any = config.variables.chartjs;

            this.data = {
                labels: this.games,
                datasets: [{
                    data: this.totalQuestion,
                    label: this.dataTypes[0],
                    backgroundColor: NbColorHelper.hexToRgbA('#42aaff', 0.8),
                }, {
                    data: this.totalCorrect,
                    label: this.dataTypes[1],
                    backgroundColor: NbColorHelper.hexToRgbA('#2ce69b', 0.8),
                }, {
                    data: this.totalWrong,
                    label: this.dataTypes[2],
                    backgroundColor: NbColorHelper.hexToRgbA('#ff708d', 0.8),
                }],
            };

            this.options = {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    labels: {
                        fontColor: chartjs.textColor,
                    },
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                                color: chartjs.axisLineColor,
                            },
                            ticks: {
                                fontColor: chartjs.textColor,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: true,
                                color: chartjs.axisLineColor,
                            },
                            ticks: {
                                fontColor: chartjs.textColor,
                            },
                        },
                    ],
                },
            };
        });
    }

    getBarHorizontalChart() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const chartjs: any = config.variables.chartjs;

            this.data = {
                labels: this.games,
                datasets: [{
                    label: this.dataTypes[0],
                    backgroundColor: '#42aaff',
                    data: this.totalQuestion,
                }, {
                    label: this.dataTypes[1],
                    backgroundColor: '#2ce69b',
                    borderWidth: 1,
                    data: this.totalCorrect,
                }, {
                    label: this.dataTypes[2],
                    backgroundColor: '#ff708d',
                    data: this.totalWrong,
                },
                ],
            };
            this.options = {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    rectangle: {
                        borderWidth: 2,
                    },
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: true,
                                color: chartjs.axisLineColor,
                            },
                            ticks: {
                                fontColor: chartjs.textColor,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: false,
                                color: chartjs.axisLineColor,
                            },
                            ticks: {
                                fontColor: chartjs.textColor,
                            },
                        },
                    ],
                },
                legend: {
                    position: 'right',
                    labels: {
                        fontColor: chartjs.textColor,
                    },
                },
            };
        });
    }

    getBarAnimationChart() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            const xAxisData = [];

            const data0 = [];
            const data1 = [];
            const data2 = [];
            const colors: any = config.variables;
            const echarts: any = config.variables.echarts;

            this.options = {
                backgroundColor: echarts.bg,
                color: ['#42aaff', '#2ce69b', '#ff708d'],
                legend: {
                    data: this.dataTypes,
                    align: 'left',
                    textStyle: {
                        color: echarts.textColor,
                    },
                },
                xAxis: [
                    {
                        data: xAxisData,
                        silent: false,
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: echarts.splitLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: this.dataTypes[0],
                        type: 'bar',
                        data: data1,
                        animationDelay: idx => idx * 100 + 100,
                    },
                    {
                        name: this.dataTypes[1],
                        type: 'bar',
                        data: data1,
                        animationDelay: idx => idx * 100 + 100,
                    },
                    {
                        name: this.dataTypes[2],
                        type: 'bar',
                        data: data2,
                        animationDelay: idx => idx * 100 + 200,
                    },
                ],
                animationEasing: 'elasticOut',
                animationDelayUpdate: idx => idx * 5,
            };

            for (let i = 0; i < this.games.length; i++) {
                xAxisData.push(this.games[i]);
                data0.push(this.totalQuestion[i]);
                data1.push(this.totalCorrect[i]);
                data2.push(this.totalWrong[i]);
            }
        });
    }

    getLineChart() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const echarts: any = config.variables.echarts;

            this.options = {
                backgroundColor: echarts.bg,
                color: ['#42aaff', '#2ce69b', '#ff708d'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c}',
                },
                legend: {
                    left: 'left',
                    data: this.dataTypes,
                    textStyle: {
                        color: echarts.textColor,
                    },
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.games,
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: echarts.splitLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },

                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                series: [
                    {
                        name: this.dataTypes[0],
                        type: 'line',
                        data: this.totalQuestion,
                    },
                    {
                        name: this.dataTypes[1],
                        type: 'line',
                        data: this.totalCorrect,
                    },
                    {
                        name: this.dataTypes[2],
                        type: 'line',
                        data: this.totalWrong,
                    },
                ],
            };
        });

    }


    getLineAreaChart() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const chartjs: any = config.variables.chartjs;

            this.data = {
                labels: this.games,
                datasets: [{
                    data: this.totalQuestion,
                    label: this.dataTypes[0],
                    backgroundColor: NbColorHelper.hexToRgbA('#3366ff', 0.3),
                    borderColor: '#42aaff',
                }, {
                    data: this.totalCorrect,
                    label: this.dataTypes[1],
                    backgroundColor: NbColorHelper.hexToRgbA('#ff3d71', 0.3),
                    borderColor: '#2ce69b',
                }, {
                    data: this.totalWrong,
                    label: this.dataTypes[2],
                    backgroundColor: NbColorHelper.hexToRgbA('#0095ff', 0.3),
                    borderColor: '#ff708d',
                },
                ],
            };

            this.options = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: true,
                                color: chartjs.axisLineColor,
                            },
                            ticks: {
                                fontColor: chartjs.textColor,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: true,
                                color: chartjs.axisLineColor,
                            },
                            ticks: {
                                fontColor: chartjs.textColor,
                            },
                        },
                    ],
                },
                legend: {
                    labels: {
                        fontColor: chartjs.textColor,
                    },
                },
            };
        });
    }

    getAreaChart() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const echarts: any = config.variables.echarts;

            this.options = {
                backgroundColor: echarts.bg,
                color: ['#ff708d', '#2ce69b', '#42aaff'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: echarts.tooltipBackgroundColor,
                        },
                    },
                },
                legend: {
                    data: this.dataTypes,
                    textStyle: {
                        color: echarts.textColor,
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: this.games,
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: echarts.axisLineColor,
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: echarts.splitLineColor,
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: echarts.textColor,
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: this.dataTypes[2],
                        type: 'line',
                        stack: 'Total amount',
                        areaStyle: { normal: { opacity: echarts.areaOpacity } },
                        data: this.totalWrong,
                    },
                    {
                        name: this.dataTypes[1],
                        type: 'line',
                        stack: 'Total amount',
                        areaStyle: { normal: { opacity: echarts.areaOpacity } },
                        data: this.totalCorrect,
                    },
                    {
                        name: this.dataTypes[0],
                        type: 'line',
                        stack: 'Total amount',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: echarts.textColor,
                                },
                            },
                        },
                        areaStyle: { normal: { opacity: echarts.areaOpacity } },
                        data: this.totalQuestion,
                    },
                ],

            };
        });
    }

    getScatterChart() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const chartjs: any = config.variables.chartjs;
            this.data = {
                labels: this.games,
                datasets: [{
                    label: this.dataTypes[0],
                    data: this.totalQuestion,
                    borderColor: '#42aaff',
                    backgroundColor: '#42aaff',
                    fill: false,
                    borderDash: [5, 5],
                    pointRadius: 8,
                    pointHoverRadius: 10,
                }, {
                    label: this.dataTypes[1],
                    data: this.totalCorrect,
                    borderColor: '#2ce69b',
                    backgroundColor: '#2ce69b',
                    fill: false,
                    borderDash: [5, 5],
                    pointRadius: 8,
                    pointHoverRadius: 10,
                }, {
                    label: this.dataTypes[2],
                    data: this.totalWrong,
                    borderColor: '#ff708d',
                    backgroundColor: '#ff708d',
                    fill: false,
                    pointRadius: 8,
                    pointHoverRadius: 10,
                }],
            };

            this.options = {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: chartjs.textColor,
                    },
                },
                hover: {
                    mode: 'index',
                },
                scales: {
                    xAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month',
                            },
                            gridLines: {
                                display: true,
                                color: chartjs.axisLineColor,
                            },
                            ticks: {
                                fontColor: chartjs.textColor,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value',
                            },
                            gridLines: {
                                display: true,
                                color: chartjs.axisLineColor,
                            },
                            ticks: {
                                fontColor: chartjs.textColor,
                            },
                        },
                    ],
                },
            };
        });
    }

    ngOnDestroy(): void {
        this.themeSubscription ? this.themeSubscription.unsubscribe() : null;
    }

}
