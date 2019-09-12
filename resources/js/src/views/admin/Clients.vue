<template>
	<div class="flex mb-4">
		<vs-popup class="holamundo" title="Add a new client" :active.sync="newPopupActive">
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
					<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-link" icon-no-border label="Tax Number" v-model="newClient.vat" />
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
					<vs-input type="file" @change="onFileChangeNew" class="w-full" icon-pack="feather" icon="icon-file" icon-no-border label="Picture file"/>
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full align-items-right justify-content-flex-end">
					<vs-button @click="createClient()" icon-pack="feather" icon="icon-plus" class="mr-3 mb-2">Create</vs-button>
				</div>
			</div>
		</vs-popup>
		<vs-popup class="holamundo" title="Edit client" :active.sync="editPopupActive">
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
					<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-link" icon-no-border label="Tax Number" v-model="editClient.vat" />
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
		<div class="w-full mt-6">
			<vs-button icon-pack="feather" class="mb-4" @click="newPopupActive = true" icon="icon-plus">New Client</vs-button>
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
									<vs-avatar v-if="data[indextr].picture" :src="'/storage/avatars/' + data[indextr].picture "/> 
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
						<vs-button @click="getClient(data[indextr].id)" icon-pack="feather" icon="icon-edit" color="primary">Edit</vs-button>
					</vs-td>
					</vs-tr>
				</template>
			</vs-table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			newPopupActive: false,
			editPopupActive: false,
			clients:[],
			editClient: {
				name: null,
				email: null,
				rank: 0,
				picture: null,
				vat: null,
			},
			newClient: {
				name: null,
				email: null,
				password: null,
				password_confirmation: null,
				rank: 0,
				picture: null,
				vat: null,
			},
		}
	},
	methods: {
		getClients() {
            this.$http.get('/api/users/rank/0', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.clients = response.data
			})
			.catch((error) =>{
				console.log(error)
			})
        },
		getClient(id) {
			this.editPopupActive = true

			this.$http.get('/api/users/' + id, {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.editClient = response.data
			})
			.catch((error) =>{
				console.log(error)
			})
		},
		 onFileChangeNew(event) {
            this.newClient.picture = event.target.files[0]
        },
		onFileChangeEdit(event) {
            this.editClient.picture = event.target.files[0]
        },
		createClient() {
			let formData = new FormData();
            formData.append('picture', this.newClient.picture)
			formData.append('name', this.newClient.name)
			formData.append('email', this.newClient.email)
			formData.append('password', this.newClient.password)
			formData.append('vat', this.editClient.vat)
			formData.append('password_confirmation', this.newClient.password_confirmation)
			formData.append('rank', this.newClient.rank)

			this.$http.post('/api/auth/signup', formData, {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
			.then((response) => {
				this.clients.push(response.data)
				this.newPopupActive = false
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
			formData.append('vat', this.editClient.vat)
			formData.append('_method', "PUT")

			this.$http.post('/api/users/' + this.editClient.id, formData ,{headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
			.then((response) => {
				for(let i = 0; i < this.clients.length; i++) {
					if(this.clients[i].id == response.data.id) {
						this.$set(this.clients, i, response.data)
					}
				}
				this.editPopupActive = false
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
				this.editPopupActive = false
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
		}
	},
	mounted() {
		this.getClients()
	},
}
</script>