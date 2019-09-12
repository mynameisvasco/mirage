<template>
	<div class="flex">
		<vs-row>
			<!-- CARD 1: CONGRATS -->
			<vs-col class="mb-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-md="12" vs-sm="12" vs-w="12">
				<vx-card class="text-center bg-primary-gradient greet-user">
					<img src="@assets/images/elements/decore-left.png" style="position: absolute;left: 0;top: 0;" alt="Decore Left" width="200" >
					<img src="@assets/images/elements/decore-right.png" style="position: absolute;right: 0;top: 0;" alt="Decore Right" width="175">
				<feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
					<h1 class="mb-6 text-white">Welcome back {{user.name}},</h1>
					<p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">We selected the best statistics about your business to present you in this page</p>
				</vx-card>
			</vs-col>
			
			<vs-col class="mb-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-md="6" vs-sm="6" vs-w="6">
				<statistics-card-line icon="MessageSquareIcon" :statistic="this.ticketsNum" statisticTitle="Tickets" :chartData="charts.tickets"  color='primary'  type='area'></statistics-card-line>
			</vs-col>

			<vs-col class="mb-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-md="6" vs-sm="6" vs-w="6">
			</vs-col>
		</vs-row>
	</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import store from '../../store/store'
export default {
	components: {
		VueApexCharts,
		StatisticsCardLine,
    },
	data() {
		return {
			ticketsNum: 0,
			charts: {
				// LINE AREA CHART
				tickets: {
					series: [{
						name: "Tickets",
						data: []
					}],
					chartOptions: {
						grid: {
							show: false,
							padding: {
								left: 0,
								right: 0
							}
						},
						chart: {
							toolbar: {
								show: false,
							},
							sparkline: {
								enabled: true
							}
						},
						dataLabels: {
							enabled: false
						},
						stroke: {
							curve: 'smooth',
							width: 2.5
						},
						fill: {
							type: 'gradient',
							gradient: {
								shadeIntensity: 0.9,
								opacityFrom: 0.7,
								opacityTo: 0.5,
								stops: [0, 80, 100]
							}
						},
						xaxis: {
							type: 'numeric',
							lines: {
								show: false,
							},
							axisBorder: {
								show: false,
							},
							labels: { show: false }
						},
						yaxis: [{
							y: 0,
							offsetX: 0,
							offsetY: 0,
							padding: { left: 0, right: 0 },
						}],
						tooltip: {
							x: { show: false }
						},
					},
				},
			},
		}
	},
	methods: {
		async getTicketsNumByDay() {
			await this.$http.get('/api/stats/ticketsNumByDay', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.ticketsNum = response.data.total
				this.charts.tickets.series[0].data = response.data.byDayNum
				this.charts.tickets.labels = response.data.byDayLabel
				
			})
			.catch((error) =>{
				console.log(error)
			})
		},
	},
	async mounted() {
		await this.getTicketsNumByDay()
	},
	computed: {
		user: function() {
			return this.$store.state.AppActiveUser
		}
	},

	beforeRouteEnter(to, from, next) {
		if(store.state.AppActiveUser.rank != 3) {
			next('/login')
		} else {
			next()
		}
	}
}
</script>