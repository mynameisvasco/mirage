<template>
	<div class="flex mb-4">
	<vs-popup class="holamundo" title="Add a new client" :active.sync="newPopupActiveClients">
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="Name" v-model="newClient.name" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Email" v-model="newClient.email" />
				</div>
			</div>
			<div class="vx-row mb-6">
			<div class="vx-col w-full">
					<vs-input type="text" disabled class="w-full" icon-pack="feather" icon="icon-truck" icon-no-border label="Company" v-model="editCompany.name" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="password" autocomplete="new-password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Password" v-model="newClient.password" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Password Confirmation" v-model="newClient.password_confirmation" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="file" @change="onFileChangeNewClients" class="w-full" icon-pack="feather" icon="icon-file" icon-no-border label="Picture file"/>
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full align-items-right justify-content-flex-end">
					<vs-button @click="createClient()" icon-pack="feather" icon="icon-plus" class="mr-3 mb-2">Create</vs-button>
				</div>
			</div>
		</vs-popup>
		<vs-popup class="holamundo" title="Edit client" :active.sync="editPopupActiveClients">
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="Name" v-model="editClient.name" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Email" v-model="editClient.email" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="text" disabled class="w-full" icon-pack="feather" icon="icon-truck" icon-no-border label="Company" v-model="editClient.company.name" />
				</div>
			</div>
			<div class="vx-row mb-8">
				<div class="vx-col w-full">
					<vs-input type="file" @change="onFileChangeEdit" class="w-full" icon-pack="feather" icon="icon-file" icon-no-border label="Picture file"/>
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col mr-0 pr-0 align-items-right justify-content-flex-end">
					<vs-button @click="updateClient()" icon-pack="feather" icon="icon-save" class="mr-3 mb-2">Save</vs-button>
				</div>
				<div class="vx-col ml-0 pl-0 align-items-right justify-content-flex-end">
					<vs-button @click="deleteClient(editClient.id)" color="danger" icon-pack="feather" icon="icon-trash" class="mr-3 mb-2">Delete</vs-button>
				</div>
			</div>
		</vs-popup>
		<vs-popup class="holamundo" title="Add a new company" :active.sync="newPopupActive">
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input class="w-full" icon-pack="feather" icon="icon-truck" icon-no-border label="Name" v-model="newCompany.name" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Email" v-model="newCompany.email" />
				</div>
			</div>
            <div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-phone" icon-no-border label="Phone" v-model="newCompany.phone" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-link" icon-no-border label="Tax Number" v-model="newCompany.number" />
				</div>
			</div>
            <div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="number " class="w-full" icon-pack="feather" icon="icon-hash" icon-no-border label="Max Users" v-model="newCompany.max_users " />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-map-pin" icon-no-border label="Address" v-model="newCompany.address" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="file" @change="onFileChangeNewClients" class="w-full" icon-pack="feather" icon="icon-file" icon-no-border label="Picture file"/>
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full align-items-right justify-content-flex-end">
					<vs-button @click="createCompany()" icon-pack="feather" icon="icon-plus" class="mr-3 mb-2">Create</vs-button>
				</div>
			</div>
		</vs-popup>
		<vs-popup class="holamundo popup-md" title="Edit company" :active.sync="editPopupActive">
			<div class="">
				<vs-tabs alignment="center">
					<vs-tab label="Details" icon-pack="feather" icon="icon-edit">
						<div class="vx-row mb-6">
							<div class="vx-col w-full">
								<vs-input class="w-full" icon-pack="feather" icon="icon-truck" icon-no-border label="Name" v-model="editCompany.name" />
							</div>
						</div>
						<div class="vx-row mb-6">
							<div class="vx-col w-full">
								<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Email" v-model="editCompany.email" />
							</div>
						</div>
						<div class="vx-row mb-6">
							<div class="vx-col w-full">
								<vs-input class="w-full" icon-pack="feather" icon="icon-phone" icon-no-border label="Phone" v-model="editCompany.phone" />
							</div>
						</div>
						<div class="vx-row mb-6">
							<div class="vx-col w-full">
								<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-link" icon-no-border label="Tax Number" v-model="editCompany.number" />
							</div>
						</div>
						<div class="vx-row mb-6">
							<div class="vx-col w-full">
								<vs-input type="number " class="w-full" icon-pack="feather" icon="icon-hash" icon-no-border label="Max Users" v-model="editCompany.max_users " />
							</div>
						</div>
						<div class="vx-row mb-6">
							<div class="vx-col w-full">
								<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-map-pin" icon-no-border label="Address" v-model="editCompany.address" />
							</div>
						</div>
						<div class="vx-row mb-8">
							<div class="vx-col w-full">
								<vs-input type="file" @change="onFileChangeEdit" class="w-full" icon-pack="feather" icon="icon-file" icon-no-border label="Picture file"/>
							</div>
						</div>
						<div class="vx-row mb-6">
							<div class="vx-col mr-0 pr-0 align-items-right justify-content-flex-end">
								<vs-button @click="updateCompany()" icon-pack="feather" icon="icon-save" class="mr-3 mb-2">Save</vs-button>
							</div>
							<div class="vx-col ml-0 pl-0 align-items-right justify-content-flex-end">
								<vs-button @click="deleteCompany(editCompany.id)" color="danger" icon-pack="feather" icon="icon-trash" class="mr-3 mb-2">Delete</vs-button>
							</div>
						</div>
					</vs-tab>
					<vs-tab label="Inventory" icon-pack="feather" icon="icon-archive">
						<div class="vx-row mb-6">
							<div class="vx-col w-full mb-6 mt-1">
								<p>Add new items</p>
							</div>
							<div class="vx-col xs:w-full sm:w-full md:w-1/2 lg:w-1/3">
								<label class="ml-2" style="font-size:12px;">Items</label><br>
								<v-select v-model="itemsToAdd.name" :options="items"></v-select>
							</div>
							<div class="vx-col xs:w-full sm:w-full md:w-1/2 lg:w-1/3">
								<vs-input class="w-full" icon-pack="feather" icon="icon-edit" icon-no-border label="Description" v-model="itemsToAdd.description" />
							</div>
							<div class="vx-col xs:w-full sm:w-full md:w-1/2 lg:w-1/3">
								<vs-input type="number" class="w-full" icon-pack="feather" icon="icon-hash" icon-no-border label="Quantity" v-model="itemsToAdd.quantity" />
							</div>
							<div class="vx-col xs:w-full sm:w-full md:w-1/2 lg:w-1/3 mt-6">
								<vs-button @click="createItem()" icon-pack="feather" icon="icon-plus" class="mr-3 mb-2">Add</vs-button>
							</div>
							<div class="vx-col w-full mt-6"> 
								<vs-list>
									<vs-list-header title="Items"></vs-list-header>
									<vs-list-item v-for="item in editCompany.items" :index="item.id" :title="item.name" :subtitle="item.quantity + ' units. - ' + item.description">
										<vs-button size="small" @click="deleteItem(item.id)" icon-pack="feather" icon="icon-x" color="danger">Remove</vs-button>
									</vs-list-item>
								</vs-list>
							</div>
						</div>
					</vs-tab>
					<vs-tab label="Users" icon-pack="feather" icon="icon-users">
						<vs-button icon-pack="feather" class="mb-6 mt-6" @click="newPopupActiveClients = true" icon="icon-plus">New Client</vs-button>
						<vs-table search max-items="10" pagination :data="clients">
							<template slot="header">
								<h3 class="mb-5">
									Clients
								</h3>
							</template>
							<template slot="thead">
								<vs-th>
									Name
								</vs-th>
								<vs-th>
									Role
								</vs-th>
								<vs-th sort-key="status">
									Since
								</vs-th>
								<vs-th>
								</vs-th>
							</template>
							<template slot-scope="{data}">
								<vs-tr :key="indextr" v-for="(tr, indextr) in data" >
									<vs-td :data="data[indextr].name">
										<div class="grid-layout-container alignment-block">
											<vs-row
												vs-align="center"
												vs-type="flex" vs-w="12">
												<vs-col class="mb-4" vs-type="flex" vs-align="center" vs-lg="3" vs-md="6" vs-sm="6" vs-xs="12">
													<vs-avatar v-if="data[indextr].picture" :src="'/storage/avatars/' + data[indextr].picture "/> 
													<vs-avatar v-if="!data[indextr].picture" color="primary" :text="data[indextr].name"/>
												</vs-col>
												<vs-col vs-type="flex" vs-align="center" vs-lg="6" vs-md="6" vs-sm="6" vs-xs="12">
													<span style="margin-top:-10px;">{{data[indextr].name}}</span>
												</vs-col>
											</vs-row>
										</div>
									</vs-td>

									<vs-td :data="data[indextr].company_rank">
										<vs-chip :color="convertRankName(data[indextr].company_rank)[1]">{{convertRankName(data[indextr].company_rank)[0]}}</vs-chip>
									</vs-td>

									<vs-td :data="data[indextr].created_at">
										{{data[indextr].created_at.split(" ")[0]}}
									</vs-td>
									<vs-td :data="data[indextr].id">
										<vs-button @click="getClient(data[indextr].id)" icon-pack="feather" icon="icon-edit" color="primary">Edit</vs-button>
									</vs-td>
								</vs-tr>
							</template>
						</vs-table>
					</vs-tab>
				</vs-tabs>
			</div>
		</vs-popup>
		<div class="w-full mt-6">
			<vs-button icon-pack="feather" class="mb-4" @click="newPopupActive = true" icon="icon-plus">New Company</vs-button>
			<vs-table search max-items="10" pagination :data="companies">
				<template slot="header">
					<h3 class="mb-5">
						Companies
					</h3>
				</template>
				<template slot="thead">
					<vs-th>
						Name
					</vs-th>
					<vs-th>
						Email
					</vs-th>
					<vs-th sort-key="status">
						Since
					</vs-th>
					<vs-th>
					</vs-th>
				</template>
				<template slot-scope="{data}">
					<vs-tr :key="indextr" v-for="(tr, indextr) in data" >
						<vs-td :data="data[indextr].name">
							<div class="grid-layout-container alignment-block">
								<vs-row
									vs-align="center"
									vs-type="flex" vs-w="12">
									<vs-col class="mb-4" vs-type="flex" vs-align="center" vs-lg="3" vs-md="6" vs-sm="6" vs-xs="12">
										<vs-avatar v-if="data[indextr].picture" :src="'/storage/companies/' + data[indextr].picture "/> 
										<vs-avatar v-if="!data[indextr].picture" color="primary" :text="data[indextr].name"/>
									</vs-col>
									<vs-col vs-type="flex" vs-align="center" vs-lg="6" vs-md="6" vs-sm="6" vs-xs="12">
										<span style="margin-top:-10px;">{{data[indextr].name}}</span>
									</vs-col>
								</vs-row>
							</div>
						</vs-td>

						<vs-td :data="data[indextr].email">
							{{data[indextr].email}}
						</vs-td>

						<vs-td :data="data[indextr].created_at">
							{{data[indextr].created_at.split(" ")[0]}}
						</vs-td>
						<vs-td :data="data[indextr].id">
							<vs-button @click="getCompany(data[indextr].id)" icon-pack="feather" icon="icon-edit" color="primary">Edit</vs-button>
						</vs-td>
					</vs-tr>
				</template>
			</vs-table>
		</div>
	</div>
</template>

<script>
import store from '../../store/store'
export default {
	data() {
		return {
			newPopupActive: false,
			editPopupActive: false,
			companies:[],
			editCompany: {
				items:[]
			},
			newCompany: {
			},
			itemsToAdd:[],
			items:[],
			newPopupActiveClients: false,
			editPopupActiveClients: false,
			clients:{},
			editClient: {
				company:[],
			},
			newClient: {
			},
		}
	},
	methods: {
		convertRankName(rank){
			if(rank == 1){
                return  ['Support', 'success']
            }else if(rank == 2){
                return ['Financial', 'primary']
            }else if(rank == 3){
                return ['Administrator', 'warning']
            }
			else
				return [null, null]
        },
		getClient(id) {
			this.editPopupActiveClients = true

			this.$http.get('/api/users/' + id, {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.editClient = response.data
			})
			.catch((error) =>{
				console.log(error)
			})
		},
		onFileChangeNewClients(event) {
            this.newClient.picture = event.target.files[0]
        },
		onFileChangeEditClients(event) {
            this.editClient.picture = event.target.files[0]
        },
		createClient() {
			let formData = new FormData();
            formData.append('picture', this.newClient.picture)
			formData.append('name', this.newClient.name)
			formData.append('email', this.newClient.email)
			formData.append('password', this.newClient.password)
			formData.append('password_confirmation', this.newClient.password_confirmation)
			formData.append('company_id', this.editCompany.id)
			formData.append('rank', 0)

			this.$http.post('/api/auth/signup', formData, {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
			.then((response) => {
				this.clients.push(response.data)
				this.newPopupActiveClients = false
				this.$vs.notify({
					title:'Success!',
					text: 'Client was added with success',
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
		updateClient() {
			let formData = new FormData();
            formData.append('picture', this.editClient.picture)
			formData.append('name', this.editClient.name)
			formData.append('email', this.editClient.email)
			formData.append('_method', "PUT")

			this.$http.post('/api/users/' + this.editClient.id, formData ,{headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
			.then((response) => {
				for(let i = 0; i < this.clients.length; i++) {
					if(this.clients[i].id == response.data.id) {
						this.$set(this.clients, i, response.data)
					}
				}
				this.editPopupActiveClients = false
				this.$vs.notify({
					title:'Success!',
					text: 'Client was edited with success',
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
		deleteClient(id) {
			this.$http.delete('/api/users/'+id, {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token}})
			.then((response) => {
				for(let i = 0; i < this.clients.length; i++) {
					if(this.clients[i].id == id) {
						this.$delete(this.clients, i)
					}
				}
				this.editClient = {}
				this.editPopupActiveClients = false
				this.$vs.notify({
					title:'Success!',
					text: 'Client was deleted with success',
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
		getItems() {
			 this.$http.get('/api/companyinformations', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				for(let i = 0; i < JSON.parse(response.data.items).length; i++) {
					this.items.push({label: JSON.parse(response.data.items)[i].name, value: JSON.parse(response.data.items)[i].name})
				}
			})
			.catch((error) =>{
				console.log(error)
			})
		},
		getCompanies() {
            this.$http.get('/api/companies', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.companies = response.data
			})
			.catch((error) =>{
				console.log(error)
			})
        },
		getCompany(id) {
			this.editPopupActive = true

			this.$http.get('/api/companies/' + id, {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.editCompany = response.data
				this.clients = response.data.users
			})
			.catch((error) =>{
				console.log(error)
			})
		},
		 onFileChangeNew(event) {
            this.newCompany.picture = event.target.files[0]
        },
		onFileChangeEdit(event) {
            this.editCompany.picture = event.target.files[0]
        },
		createCompany() {
			let formData = new FormData();
            formData.append('picture', this.newCompany.picture)
			formData.append('name', this.newCompany.name)
			formData.append('email', this.newCompany.email)
			formData.append('number', this.newCompany.number)
			formData.append('address', this.newCompany.address)
            formData.append('phone', this.newCompany.phone)
            formData.append('max_users', this.newCompany.max_users)

			this.$http.post('/api/companies', formData, {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
			.then((response) => {
				this.companies.unshift(response.data)
				this.newPopupActive = false
				this.$vs.notify({
					title:'Success!',
					text: 'Company was added with success',
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
		updateCompany() {
			let formData = new FormData();
            formData.append('picture', this.editCompany.picture)
			formData.append('name', this.editCompany.name)
			formData.append('email', this.editCompany.email)
			formData.append('number', this.editCompany.number)
			formData.append('address', this.editCompany.address)
            formData.append('phone', this.editCompany.phone)
            formData.append('max_users', this.editCompany.max_users)
			formData.append('_method', "PUT")

			this.$http.post('/api/companies/' + this.editCompany.id, formData ,{headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
			.then((response) => {
				for(let i = 0; i < this.companies.length; i++) {
					if(this.companies[i].id == response.data.id) {
						this.$set(this.companies, i, response.data)
					}
				}
				this.editPopupActive = false
				this.$vs.notify({
					title:'Success!',
					text: 'Company was edited with success',
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
		deleteCompany(id) {
			this.$http.delete('/api/companies/'+id, {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token}})
			.then((response) => {
				for(let i = 0; i < this.companies.length; i++) {
					if(this.companies[i].id == id) {
						this.$delete(this.companies, i)
					}
				}
				this.editPopupActive = false
				this.$vs.notify({
					title:'Success!',
					text: 'Company was deleted with success',
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

		createItem() {
			let formData = new FormData();
            formData.append('name', this.itemsToAdd.name.label)
			formData.append('description', this.itemsToAdd.description)
			formData.append('quantity', this.itemsToAdd.quantity)
			formData.append('company_id', this.editCompany.id)
			this.$http.post('/api/items', formData, {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token}})
			.then((response) => {
				this.editCompany.items.push(response.data)
				this.$vs.notify({
					title:'Success!',
					text: 'Item was added with success',
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

		deleteItem(id) {
			this.$http.delete('/api/items/'+id, {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token}})
			.then((response) => {
				for(let k = 0; k < this.editCompany.items.length; k++) {
					if(this.editCompany.items[k].id == id) {
						this.$delete(this.editCompany.items, k)
					}
				}
				this.$vs.notify({
					title:'Success!',
					text: 'Item was deleted with success',
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
	},
	mounted() {
		this.getCompanies()
		this.getItems()
	},

	//Only admins and financial can access this route
	beforeRouteEnter : (to, from, next) => {
		if(store.state.AppActiveUser.rank != 3) {
			next('/login')
		} else {
			next()
		}
	}
}
</script>