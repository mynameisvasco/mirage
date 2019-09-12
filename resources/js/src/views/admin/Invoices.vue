<template>
	<div class="flex">
	<vs-popup background-color="rgba(0,0,0,.6)" class="holamundo" title="Are you sure you want to delete this ticket?" :active.sync="deletePopUpActive">
			<vs-row vs-justify="right" vs-align="flex-end" >
				<vs-col vs-justify="right" vs-align="flex-end" class="mb-4" vs-w="12">
					<p>After take this action you won't be able to go back. Please, make sure it's what you want to do</p>
				</vs-col>
				<vs-col vs-justify="right" vs-align="flex-end" vs-w="12">
					<vs-button color="danger" @click="deleteInvoice(deleteInvoice.id)" icon-pack="feather" icon="icon-trash" type="filled">Delete</vs-button>
				</vs-col>
			</vs-row>
		</vs-popup>
		<vs-popup fullscreen class="holamundo popup-md" title="New Invoice" :active.sync="newPopupActive">
			<div style="margin-bottom:10px;">
				<vs-row>
					<vs-col class="mb-4" vs-w="12" vs-sm="12" vs-md="6" vs-lg="4">
						<label class="ml-2" style="font-size:12px;">Client</label><br>
						<v-select v-model="newInvoice.user_id" :options="clients"></v-select>
					</vs-col>
					<vs-col class="mb-4" vs-align="center" vs-w="12" vs-sm="12" vs-md="6" vs-lg="4">
						<vs-input type="text" class="w-full" icon-pack="feather" icon="icon-edit" icon-no-border label="Name" v-model="newInvoice.name" />
						</vs-input>
					</vs-col>
					<vs-col class="mb-4" vs-align="center" vs-w="12" vs-sm="12" vs-md="6" vs-lg="4">
						<vs-input type="text" class="w-full" icon-pack="feather" icon="icon-align-left" icon-no-border label="Description" v-model="newInvoice.description" />
						</vs-input>
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
					<vs-col class="mb-4" vs-align="center" vs-w="12" vs-sm="12" vs-md="6" vs-lg="4">
						<vs-input type="text" class="w-full" icon-pack="feather" icon="icon-dollar-sign" icon-no-border label="Currency" v-model="newInvoice.currency" />
						</vs-input>
					</vs-col>
					<vs-col class="mb-4" vs-w="12" vs-md="6" vs-sm="12" vs-lg="4">
						<label class="ml-1" style="font-size:12px;">Status</label><br>
						<v-select v-model="newInvoice.status" :options='[{label: "Unpaid", value: 0}, {label: "Paid", value: 1}, {label: "Overdue", value: 2}]'></v-select>
					</vs-col>
					<vs-col class="mb-4" vs-w="12" vs-md="6" vs-sm="12" vs-lg="4">
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
			<vs-button icon-pack="feather" class="mb-4" @click="newPopupActive = true" icon="icon-plus">New Invoice</vs-button>
			<vs-table search max-items="10" pagination :data="invoices">
				<template slot="header">
					<h3 class="mb-5">
						Invoices
					</h3>
				</template>
				<template slot="thead">
					<vs-th>
						Client Name
					</vs-th>
					<vs-th>
						Name
					</vs-th>
					<vs-th sort-key="status">
						Amount(£)
					</vs-th>
					<vs-th sort-key="status">
						Status
					</vs-th>
					<vs-th>
					</vs-th>
				</template>
				<template slot-scope="{data}">
					<vs-tr :key="indextr" v-for="(tr, indextr) in data" >
						<vs-td :data="data[indextr].user.name">
							<div class="grid-layout-container alignment-block">
								<vs-row
									vs-align="center"
									vs-type="flex" vs-w="12">
									<vs-col class="mb-4" vs-type="flex" vs-align="center" vs-lg="3" vs-md="6" vs-sm="6" vs-xs="12">
										<vs-avatar v-if="data[indextr].user.picture" :src="'/storage/avatars/' + data[indextr].user.picture "/> 
										<vs-avatar v-if="!data[indextr].user.picture" color="primary" :text="data[indextr].user.name"/>
									</vs-col>
									<vs-col vs-type="flex" vs-align="center" vs-lg="6" vs-md="6" vs-sm="6" vs-xs="12">
										<span style="margin-top:-10px;">{{data[indextr].user.name}}</span>
									</vs-col>
								</vs-row>
							</div>
						</vs-td>

						<vs-td :data="data[indextr].name">
							{{data[indextr].name}}
						</vs-td>

						<vs-td :data="data[indextr].totalMoney">
							{{data[indextr].totalMoney}}
						</vs-td>

						<vs-td :data="data[indextr].id">
							<vs-chip :color="convertStatusName(data[indextr].status).status">{{convertStatusName(data[indextr].status).text}}</vs-chip>
						</vs-td>
						<vs-td :data="data[indextr].id">
                            <vs-button @click="getInvoice(data[indextr].id)" color="primary">Open</vs-button>
                        </vs-td>
					</vs-tr>
				</template>
			</vs-table>
		</div>
	</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
	components: {
    	Datepicker
  	},
	data() {
		return {
			editPopupActive: false,
			newPopupActive: false,
			deletePopUpActive: false,
			invoices:[],
			clients: [],
			newInvoice: {
				items: [],
				itemToAdd: {}
			},
			deleteInvoice:{
			},
			taxes: [
			]
		}
	},

	methods: {
		convertStatusName: function(status) {
			if(status === 0) {
				return {status:'warning', text:'Unpaid'}
			} else if (status === 1) {
				return {status:'success', text:'Paid'}
			} else if(status === 2) {
				return {status:'primary', text:'Overdue'}
			} else {
				return {status:'danger', text:'Unknown'}
			}
		},

		getTaxes() {
			this.$http.get('/api/companyinformations', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				for(let i = 0; i < JSON.parse(response.data.taxes).length; i++) {
					this.taxes.push({label: JSON.parse(response.data.taxes)[i].name, value: JSON.parse(response.data.taxes)[i].percentage})
				}
				console.log(this.taxes)
			})
			.catch((error) =>{
				console.log(error)
			})
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

		getClients(){
			this.$http.get('/api/users/rank/0', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				for(let i = 0; i < response.data.length; i++) {
					this.clients.push({label: response.data[i].name, value: response.data[i].id})
				}
			})
			.catch((error) =>{
				console.log(error)
			})
		},

		createInvoice() {
			let invoice = {
				name: this.newInvoice.name,
				user_id: this.newInvoice.user_id.value,
				items: this.newInvoice.items,
				description: this.newInvoice.description,
				notes: this.newInvoice.notes,
				dueDate: this.newInvoice.dueDate,
				currency: this.newInvoice.currency,
				status: this.newInvoice.status.value,
				taxes: JSON.stringify(this.newInvoice.taxes).replace(/label/g, 'name').replace(/value/g, 'percentage')
			} 
			this.$http.post('/api/invoices', 
				invoice,
				{headers: { 'Authorization': 'Bearer ' + localStorage.token }}
			)
			.then((response) => {
				this.invoices.push(response.data)
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
		addInvoiceItem() {
			this.newInvoice.items.push({name: this.newInvoice.itemToAdd.name, price: this.newInvoice.itemToAdd.price})
		},
		deleteInvoiceItem(name, price) {
			for(let i = 0; i < this.newInvoice.items.length; i++) {
				if(this.newInvoice.items[i].name == name && this.newInvoice.items[i].price == price) {
					this.$delete(this.newInvoice.items, i)
				}
			}
		}
	},

	mounted() {
		this.getInvoices()
		this.getClients()
		this.getTaxes()
	},

	computed: {
		user: function() {
			return this.$store.state.AppActiveUser
		}
	},
	
}
</script>