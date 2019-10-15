<template>
	<div class="flex">
		<vs-popup background-color="rgba(0,0,0,.6)" class="holamundo" title="Are you sure you want to delete the following invoices?" :active.sync="deletePopUpActive">
			<vs-row>
				<vs-col class="mb-4" vs-w="12">
					<p>After take this action you won't be able to go back. Please, make sure it's what you want to do.</p>
				</vs-col>
				<vs-col vs-w="12">
					<vs-button color="danger" @click="deleteInvoices()" icon-pack="feather" icon="icon-trash" type="filled">Delete</vs-button>
				</vs-col>
			</vs-row>
		</vs-popup>
		<vs-popup background-color="rgba(0,0,0,.6)" class="holamundo" title="Are you sure you want to mark as paid the following invoices?" :active.sync="paidPopUpActive">
			<vs-row>
				<vs-col class="mb-4" vs-w="12">
					<p>After take this action you won't be able to go back. Please, make sure it's what you want to do.</p>
				</vs-col>
				<vs-col vs-w="12">
					<vs-button color="success" @click="payInvoices()" icon-pack="feather" icon="icon-check" type="filled">Mark as paid</vs-button>
				</vs-col>
			</vs-row>
		</vs-popup>
		<vs-popup fullscreen class="holamundo popup-md" title="New Invoice" :active.sync="newPopupActive">
			<div style="margin-bottom:10px;">
				<vs-row>
					<vs-col class="mb-4" vs-w="12" vs-sm="12" vs-md="6" vs-lg="4">
						<label class="ml-2" style="font-size:12px;">Company</label><br>
						<v-select @input="getResolvedTickets()" v-model="newInvoice.company_id" :options="companies"></v-select>
					</vs-col>
					<vs-col class="mb-4" vs-align="center" vs-w="12" vs-sm="12" vs-md="6" vs-lg="4">
						<label class="ml-2" style="font-size:12px;">Ticket</label><br>
						<v-select v-model="newInvoice.ticket_id" :options="tickets"></v-select>
					</vs-col>
					<vs-col class="mb-4" vs-w="12" vs-md="6" vs-sm="12" vs-lg="4">
						<h5 class="mt-4 mb-0"><span><vs-icon icon-pack="feather" icon="icon-clock"></vs-icon></span> Working Time</h5>
						<p v-if="newInvoice.ticket_id != null">{{newInvoice.ticket_id.time}} minutes</p>
						<p v-if="newInvoice.ticket_id == null">0 minutes</p>
					</vs-col>
					<vs-col class="mb-4" vs-align="center" vs-w="12" vs-sm="12" vs-md="6" vs-lg="4">
						<label class="ml-1" style="font-size:12px;">Currency</label><br>
						<v-select v-model="newInvoice.currency" :options='[{label: "GBP", value: "GBP"}, {label: "EUR", value: "EUR"}, {label: "USD", value:"USD"}]'></v-select>
					</vs-col>
					<vs-col class="mb-4" vs-align="center" vs-w="12" vs-sm="12" vs-md="6" vs-lg="4">
						<vs-input type="text" class="w-full" icon-pack="feather" icon="icon-bell" icon-no-border label="Notes" v-model="newInvoice.notes" />
						</vs-input>
					</vs-col>
					<vs-col class="mb-4" vs-w="12" vs-md="6" vs-sm="12" vs-lg="4">
						<label class="ml-1" style="font-size:12px;">Due date</label><br>
						<datepicker v-model="newInvoice.dueDate" format="yyyy-MM-dd"></datepicker>
					</vs-col>
					<vs-col class="mb-4" vs-w="12" vs-md="6" vs-sm="12" vs-lg="4">
						<label class="ml-2" style="font-size:12px;">Taxes</label><br>
						<v-select multiple  v-model="newInvoice.taxes" :options="taxes"></v-select>
					</vs-col>
					<vs-col class="mb-4" vs-w="12" vs-md="6" vs-sm="12" vs-lg="4">
						<label class="ml-1" style="font-size:12px;">Status</label><br>
						<v-select v-model="newInvoice.status" :options='[{label: "Unpaid", value: 0}, {label: "Paid", value: 1}, {label: "Overdue", value: 2}]'></v-select>
					</vs-col>
					<vs-col class="mb-4" vs-w="12" vs-md="6" vs-sm="12" vs-lg="4">
					</vs-col>
				</vs-row>
				<vs-row>
					<vs-col class="mb-4" vs-align="center" vs-sm="12" vs-w="12" vs-md="6" vs-lg="4">
						<vs-input type="text" class="w-full" icon-pack="feather" icon="icon-package" icon-no-border label="Item Name" v-model="newInvoice.itemToAdd.name" />
						</vs-input>
					</vs-col>
					<vs-col class="mb-4" vs-align="center" vs-sm="12" vs-w="12" vs-md="6" vs-lg="4">
						<vs-input type="number" step="0.5" class="w-full" icon-pack="feather" icon="icon-credit-card" icon-no-border label="Item Price" v-model="newInvoice.itemToAdd.price" />
						</vs-input>
					</vs-col>
					<vs-col class="mb-4 mt-6" vs-align="center" vs-sm="12" vs-w="12" vs-md="6" vs-lg="4">
						<vs-button @click="addInvoiceItem()" icon-pack="feather" icon="icon-plus" color="primary">Add Item</vs-button>
					</vs-col>
				</vs-row>
			</div>
			<vs-row>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
					<vs-list>
						<vs-list-header title="Items"></vs-list-header>
						<vs-list-item v-if="newInvoice.items.length == 0" title="No items added yet" subtitle="Please use the input above to add new items to this invoice"></vs-list-item>
						<vs-list-item v-for="item in newInvoice.items" :title="item.name" :subtitle="'£' + item.price">
							<vs-button @click="deleteInvoiceItem(item.name, item.price)" size="small" icon-pack="feather" icon="icon-x" color="danger">Remove</vs-button>
						</vs-list-item>
					</vs-list>
				</vs-col>
			</vs-row>
			<vs-row vs-align="flex-end" vs-type="flex" vs-justify="center">
				<vs-col class="popup-md-btn mt-6 mt-md-0" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
					<vs-button color="success" @click="createInvoice()" icon-pack="feather" icon="icon-send" type="filled">Create</vs-button>
				</vs-col>
			</vs-row>
		</vs-popup>	
		<div class="w-full mt-6">
			<vs-row>
				<vs-col vs-w="12">
					<vs-button class="actionBtn mb-4" style="display: inline;" icon-pack="feather" @click="newPopupActive = true" icon="icon-plus">New Invoice</vs-button>
					<vs-button class="actionBtn mb-4" style="display: inline;" v-if="selectedInvoices.length != 0" icon-pack="feather" color="danger" @click="deletePopUpActive = true" icon="icon-trash">Delete Invoices</vs-button>
					<vs-button class="actionBtn mb-4" style="display: inline;" v-if="selectedInvoices.length != 0" icon-pack="feather" color="success" @click="paidPopUpActive = true" icon="icon-check">Mark as paid</vs-button>
					<vs-table multiple v-model="selectedInvoices" search max-items="10" pagination :data="invoices">
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
								Ticket Name
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

								<vs-td :data="data[indextr].title">
									{{data[indextr].ticket.title}}
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
import Datepicker from 'vuejs-datepicker';
import store from '../../store/store'
export default {
	components: {
    	Datepicker
  	},
	data() {
		return {
			editPopupActive: false,
			newPopupActive: false,
			deletePopUpActive: false,
			paidPopUpActive: false,
			invoices:[],
			tickets:[],
			companies: [],
			newInvoice: {
				items: [],
				itemToAdd: {},
				taxes:"",
				ticket_id: null
			},
			deleteInvoice:{
			},
			taxes: [
			],
			selectedInvoices:[]
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

		getTaxes() {
			this.$http.get('/api/companyinformations', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				for(let i = 0; i < JSON.parse(response.data.taxes).length; i++) {
					this.taxes.push({label: JSON.parse(response.data.taxes)[i].name, value: JSON.parse(response.data.taxes)[i].percentage})
				}
			})
			.catch((error) =>{
				console.log(error)
			})
		},

		getResolvedTickets(){
			this.$http.get('/api/tickets/resolved/'+ this.newInvoice.company_id.value, {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				for(let i = 0; i < response.data.length; i++) {
					this.tickets.push({label: response.data[i].title, value: response.data[i].id, time: response.data[i].working_minutes})
				}
			})
			.catch((error) =>{
				console.log(error)
			})
		},

		getInvoices() {
			this.$http.get('/api/invoices', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.invoices = response.data
				console.log(this.invoices)
			})
			.catch((error) =>{
				console.log(error)
			})
		},

		getCompanies(){
			this.$http.get('/api/companies', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				for(let i = 0; i < response.data.length; i++) {
					this.companies.push({label: response.data[i].name, value: response.data[i].id})
				}
			})
			.catch((error) =>{
				console.log(error)
			})
		},

		createInvoice() {
			let invoice = {
				ticket_id: this.newInvoice.ticket_id.value,
				company_id: this.newInvoice.company_id.value,
				items: this.newInvoice.items,
				notes: this.newInvoice.notes,
				dueDate: this.newInvoice.dueDate,
				currency: this.newInvoice.currency.value,
				status: this.newInvoice.status.value,
				taxes: JSON.stringify(this.newInvoice.taxes).replace(/label/g, 'name').replace(/value/g, 'percentage')
			} 
			this.$http.post('/api/invoices', 
				invoice,
				{headers: { 'Authorization': 'Bearer ' + localStorage.token }}
			)
			.then((response) => {
				this.invoices.unshift(response.data)
				this.$vs.notify({
					title:'Success!',
					text: 'Invoice was created!',
					color:'success',
					position:'top-right'
				})
			})
			.catch((error) =>{
				//Show error notification
				Object.keys(error['response'].data.errors).forEach((key) => {
					let message = String(error['response'].data.errors[key]).replace('["', '').replace('"]', '')
					//Show error notification
					this.$vs.notify({
						title:'Error!',
						text: message,
						color:'danger',
						position:'top-right'
					})
				})
			})
		},
		deleteInvoices() {
			var deleteInvoicesIds = []
			for(let i = 0; i < this.selectedInvoices.length; i++) {
				deleteInvoicesIds.push(this.selectedInvoices[i].id)
			}
			this.$http.delete('/api/invoices/bulk/[' + (deleteInvoicesIds) + ']',
				{headers: { 'Authorization': 'Bearer ' + localStorage.token }}
			)
			.then((response) => {
				this.$vs.notify({
					title:'Success!',
					text: 'Invoices were deleted!',
					color:'success',
					position:'top-right'
				})
				for(let i = 0; i < this.invoices.length; i++) {
					for(let k = 0; k < deleteInvoicesIds.length; k++) {
						if(deleteInvoicesIds[k] == this.invoices[i].id) {
							console.log(deleteInvoicesIds[k])
							this.$delete(this.invoices, i)
						}
					}
				}
				this.selectedInvoices = []
				deleteInvoicesIds = []
				this.deletePopUpActive = false
			})
			.catch((error) =>{
				//Show error notification
				Object.keys(error['response'].data.errors).forEach((key) => {
					let message = String(error['response'].data.errors[key]).replace('["', '').replace('"]', '')
					//Show error notification
					this.$vs.notify({
						title:'Error!',
						text: message,
						color:'danger',
						position:'top-right'
					})
				})
			})
		},
		payInvoices() {
			var payInvoicesIds = []
			for(let i = 0; i < this.selectedInvoices.length; i++) {
				payInvoicesIds.push(this.selectedInvoices[i].id)
			}
			this.$http.post('/api/invoices/pay/[' + (payInvoicesIds) + ']', {_method: 'PUT'},
				{headers: { 'Authorization': 'Bearer ' + localStorage.token }}
			)
			.then((response) => {
				this.$vs.notify({
					title:'Success!',
					text: 'Invoices were deleted!',
					color:'success',
					position:'top-right'
				})
				for(let i = 0; i < this.invoices.length; i++) {
					for(let k = 0; k < payInvoicesIds.length; k++) {
						if(payInvoicesIds[k] == this.invoices[i].id) {
							this.$set(this.invoices[i], 'status', 1)
						}
					}
				}
				this.selectedInvoices = []
				payInvoicesIds = []
				this.payPopUpActive = false
			})
			.catch((error) =>{
				//Show error notification
				Object.keys(error['response'].data.errors).forEach((key) => {
					let message = String(error['response'].data.errors[key]).replace('["', '').replace('"]', '')
					//Show error notification
					this.$vs.notify({
						title:'Error!',
						text: message,
						color:'danger',
						position:'top-right'
					})
				})
			})
		},
		addInvoiceItem() {
			this.newInvoice.items.push({name: this.newInvoice.itemToAdd.name, price: this.newInvoice.itemToAdd.price})
		},
		deleteInvoiceItem(name, price) {
			for(let i = 0; i < this.newInvoice.items.length; i++) {
				if(this.newInvoice.items[i].name == name && this.newInvoice.items[i].price == price) {
					this.$delete(this.newInvoice.items, i)
				}
			}
		},
		openInvoice(url) {
			window.open("/storage/invoices/"+ url, '_blank')
		}
	},

	mounted() {
		this.getInvoices()
		this.getCompanies()
		this.getTaxes()
	},

	computed: {
		user: function() {
			return this.$store.state.AppActiveUser
		}
	},

	//Only admins and financial can access this route
	beforeRouteEnter : (to, from, next) => {
		if(store.state.AppActiveUser.rank != 3 && store.state.AppActiveUser.rank != 2) {
			next('/login')
		} else {
			next()
		}
	}
}
</script>