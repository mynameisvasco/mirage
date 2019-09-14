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
								Name
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

								<vs-td :data="data[indextr].name">
									{{data[indextr].name}}
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
	
}
</script>