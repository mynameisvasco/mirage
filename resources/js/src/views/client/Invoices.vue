<template>
	<div class="flex">
		<div class="w-full mt-6">
			<vs-row>
				<vs-col vs-w="12">
		
					<vs-table search max-items="10" pagination :data="invoices">
						<template slot="header">
							<h3 class="mb-5">
								Invoices
							</h3>
						</template>
						<template slot="thead">
							<vs-th>
								Company Name
							</vs-th>
                            <vs-th>
								Due Date
							</vs-th>
							<vs-th sort-key="status">
								Total Cost
							</vs-th>
							<vs-th sort-key="status">
								Status
							</vs-th>
							<vs-th>
							</vs-th>
						</template>
						<template slot-scope="{data}">
							<vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >

								<vs-td :data="data[indextr].company.name">
									<div class="grid-layout-container alignment-block">
										<vs-row
											vs-align="center"
											vs-type="flex" vs-w="12" class="mt-3">
											<vs-col class="mb-4" vs-type="flex" vs-align="center" vs-lg="3" vs-md="6" vs-sm="6" vs-xs="12">
												<vs-avatar v-if="data[indextr].company.picture" :src="'/storage/companies/' + data[indextr].company.picture "/> 
												<vs-avatar v-if="!data[indextr].company.picture" color="primary" :text="data[indextr].company.name"/>
											</vs-col>
											<vs-col vs-type="flex" vs-align="center" vs-lg="4" vs-md="6" vs-sm="6" vs-xs="12">
												<span style="margin-top:-10px;">{{data[indextr].company.name}}</span>
											</vs-col>
										</vs-row>
									</div>
								</vs-td>

                                <vs-td :data="data[indextr].dueDate">
									{{data[indextr].dueDate}}
								</vs-td>

								<vs-td :data="data[indextr].totalMoney">
									{{data[indextr].totalMoney}} {{data[indextr].currency}}
								</vs-td>

								<vs-td :data="data[indextr].id">
									<vs-chip :color="convertStatusName(data[indextr].status).status">{{convertStatusName(data[indextr].status).text}}</vs-chip>
								</vs-td>
								<vs-td :data="data[indextr].id">
									<vs-button @click='openInvoice(data[indextr].url)' icon-pack="feather" icon="icon-globe" color="primary">Open</vs-button>
								</vs-td>
							</vs-tr>
						</template>
					</vs-table>
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

			invoices:[],
		}
	},

	methods: {
		convertStatusName: function(status) {
			if(status === 0) {
				return {status:'warning', text:'Unpaid'}
			} else if (status === 1) {
				return {status:'success', text:'Paid'}
			} else if(status === 2) {
				return {status:'danger', text:'Overdue'}
			} else {
				return {status:'primary', text:'Unknown'}
			}
		},
		getInvoices() {
			this.$http.get('/api/invoices', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.invoices = response.data
			})
			.catch((error) =>{
				console.log(error)
			})
		},
		openInvoice(url) {
			window.open("/storage/invoices/"+ url, '_blank')
		}
	},

	mounted() {
		this.getInvoices()
	},

	computed: {
		user: function() {
			return this.$store.state.AppActiveUser
		}
	},

	 //Only admin clients and financial clients can access this route
	beforeRouteEnter : (to, from, next) => {
		if(store.state.AppActiveUser.company_rank != 3 && store.state.AppActiveUser.company_rank != 2) {
			next('/login')
		} else {
			next()
		}
	}
	
}
</script>