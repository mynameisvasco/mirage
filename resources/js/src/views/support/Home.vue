<template>
	<div class="flex">
		<div class="w-full mt-6">
			<vs-row>
				<!-- CARD 1: CONGRATS -->
				<vs-col class="mb-6" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-md="12" vs-sm="12" vs-w="12">
					<vx-card class="h-100 text-center bg-primary-gradient greet-user">
						<img src="@assets/images/elements/decore-left.png" style="position: absolute;left: 0;top: 0;" alt="Decore Left" width="200" >
						<img src="@assets/images/elements/decore-right.png" style="position: absolute;right: 0;top: 0;" alt="Decore Right" width="175">
					<feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
						<h1 class="mb-6 text-white">Welcome back {{user.name}},</h1>
						<p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">We selected the best statistics about your business to present you in this page</p>
					</vx-card>
				</vs-col>
				<vs-col vs-lg="6" vs-md="12" vs-sm="12" vs-w="12">
					<vx-card title="Tickets tracker">
						<div class="h-100" slot="no-body">
							<div class="vx-row text-center">
								<vs-col class="mb-6 pt-5" vs-justify="center" vs-align="center" vs-lg="4" vs-md="4" vs-sm="12" vs-w="12">
									<feather-icon icon="MessageSquareIcon" class="p-6 mt-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
									<p class="text-center"><span class="block">Total Tickets</span><span class="text-4xl">{{numberWithCommas(this.tickets.num)}}</span></p>
								</vs-col>
								<vs-col class="mb-6 pt-5" vs-justify="center" vs-align="center" vs-lg="4" vs-md="4" vs-sm="12" vs-w="12">
									<feather-icon icon="CheckIcon" class="p-6 mt-6 mb-8 bg-success inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
									<p class="text-center"><span class="block">Resolved Tickets</span><span class="text-4xl">{{numberWithCommas(this.tickets.solved)}}</span></p>
								</vs-col>
								<vs-col class="mb-6 pt-5" vs-justify="center" vs-align="center" vs-lg="4" vs-md="4" vs-sm="12" vs-w="12">
									<feather-icon icon="XIcon" class="p-6 mt-6 mb-8 bg-danger inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
									<p class="text-center"><span class="block">Unresolved Tickets</span><span class="text-4xl">{{numberWithCommas(this.tickets.unsolved)}}</span></p>
								</vs-col>
							</div>
						</div>
					</vx-card>
				</vs-col>
			</vs-row>
		</div>
	</div>
</template>

<script>
import store from '../../store/store'
export default {
	data() {
		return {
			tickets:
			{
				num:0,
				solved:0,
				unsolved:0
			},

			invoices:
			{
				num:0,
				paid:0,
				unpaid:0,
				totalMoney:0,
			}
		}
	},
	methods: {
		getStats() {
			this.$http.get('/api/stats', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				//Tickets
				this.tickets.num = response.data.tickets.numTickets
				this.tickets.solved =	response.data.tickets.solvedTickets
				this.tickets.unsolved = response.data.tickets.unsolvedTickets

				
				//Invoices
				this.invoices.num = response.data.invoices.numInvoices
				this.invoices.paid = response.data.invoices.paidInvoices
				this.invoices.unpaid = response.data.invoices.unpaidInvoices
				this.invoices.totalMoney = response.data.invoices.totalMoney

				
			})
			.catch((error) =>{
				console.log(error)
			})
		},
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		}
	},
	mounted() {
		this.getStats()
	},
	computed: {
		user: function() {
			return this.$store.state.AppActiveUser
		},
	},

	beforeRouteEnter(to, from, next) {
		if(store.state.AppActiveUser.rank != 1) {
			next('/login')
		} else {
			next()
		}
	}
}
</script>