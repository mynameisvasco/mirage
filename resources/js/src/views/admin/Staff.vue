<template>
	<div class="flex mb-4">
		<vs-popup class="holamundo" title="Add a new staff" :active.sync="newPopupActive">
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="Name" v-model="newStaff.name" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Email" v-model="newStaff.email" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="password" autocomplete="new-password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Password" v-model="newStaff.password" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Password Confirmation" v-model="newStaff.password_confirmation" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="file" @change="onFileChangeNew" class="w-full" icon-pack="feather" icon="icon-file" icon-no-border label="Picture file"/>
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<label class="ml-2" style="font-size:12px;">Role</label>
					<v-select placeholder="Select a role" v-model="newStaff.rank" :value="convertRankName(newStaff.rank.value)[0]" :options="[{label: 'Administrator', value: 3}, {label: 'Financial', value: 2}, {label: 'Support', value: 1}]"></v-select>
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full align-items-right justify-content-flex-end">
					<vs-button @click="createStaff()" icon-pack="feather" icon="icon-plus" class="mr-3 mb-2">Create</vs-button>
				</div>
			</div>
		</vs-popup>
		<vs-popup class="holamundo" title="Edit staff" :active.sync="editPopupActive">
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="Name" v-model="editStaff.name" />
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<vs-input type="text " class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Email" v-model="editStaff.email" />
				</div>
			</div>
			<div class="vx-row mb-8">
				<div class="vx-col w-full">
					<vs-input type="file" @change="onFileChangeEdit" class="w-full" icon-pack="feather" icon="icon-file" icon-no-border label="Picture file"/>
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col w-full">
					<label class="ml-2" style="font-size:12px;">Role</label>
					<v-select :placeholder="convertRankName(editStaff.rank)[0]" v-model="editStaff.rank" :options="[{label: 'Administrator', value: 3}, {label: 'Financial', value: 2}, {label: 'Support', value: 1}]"></v-select>
				</div>
			</div>
			<div class="vx-row mb-6">
				<div class="vx-col mr-0 pr-0 align-items-right justify-content-flex-end">
					<vs-button @click="updateStaff()" icon-pack="feather" icon="icon-save" class="mr-3 mb-2">Save</vs-button>
				</div>
				<div class="vx-col ml-0 pl-0 align-items-right justify-content-flex-end">
					<vs-button @click="deleteStaff(editStaff.id)" color="danger" icon-pack="feather" icon="icon-trash" class="mr-3 mb-2">Delete</vs-button>
				</div>
			</div>
		</vs-popup>
		<div class="w-full mt-6">
			<vs-button icon-pack="feather" class="mb-4" @click="newPopupActive = true" icon="icon-plus">New Staff</vs-button>
			<vs-table search max-items="10" pagination :data="staffs">
				<template slot="header">
					<h3 class="mb-5">
						Staffs
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
						Role
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

					<vs-td :data="data[indextr].rank">
						<vs-chip :color="convertRankName(data[indextr].rank)[1]">{{convertRankName(data[indextr].rank)[0]}}</vs-chip>
					</vs-td>
					<vs-td :data="data[indextr].id">
						<vs-button @click="getStaff(data[indextr].id)" icon-pack="feather" icon="icon-edit" color="primary">Edit</vs-button>
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
			staffs:[],
			editStaff: {
				name: null,
				email: null,
				rank: 0,
				picture: null,
			},
			newStaff: {
				name: null,
				email: null,
				rank: 0,
				password: null,
				password_confirmation: null,
				picture: null,
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
		getStaffs() {
            this.$http.get('/api/users/rank/staff', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.staffs = response.data
			})
			.catch((error) =>{
				console.log(error)
			})
        },
		getStaff(id) {
			this.editPopupActive = true

			this.$http.get('/api/users/' + id, {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.editStaff = response.data
			})
			.catch((error) =>{
				console.log(error)
			})
		},
		 onFileChangeNew(event) {
            this.newStaff.picture = event.target.files[0]
        },
		onFileChangeEdit(event) {
            this.editStaff.picture = event.target.files[0]
        },
		createStaff() {
			let formData = new FormData();
            formData.append('picture', this.newStaff.picture)
			formData.append('name', this.newStaff.name)
			formData.append('email', this.newStaff.email)
			formData.append('password', this.newStaff.password)
			formData.append('password_confirmation', this.newStaff.password_confirmation)
			formData.append('rank', this.newStaff.rank.value)

			this.$http.post('/api/auth/signup', formData, {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
			.then((response) => {
				this.staffs.push(response.data)
				this.$vs.notify({
					title:'Success!',
					text: 'Staff was added with success',
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
		updateStaff() {
			let formData = new FormData();
            formData.append('picture', this.editStaff.picture)
			formData.append('name', this.editStaff.name)
			formData.append('email', this.editStaff.email)
			formData.append('rank', this.editStaff.rank.value)
			formData.append('_method', "PUT")

			this.$http.post('/api/users/' + this.editStaff.id, formData ,{headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
			.then((response) => {
				for(let i = 0; i < this.staffs.length; i++) {
					if(this.staffs[i].id == response.data.id) {
						this.$set(this.staffs, i, response.data)
					}
				}
				this.$vs.notify({
					title:'Success!',
					text: 'Staff was edited with success',
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
		deleteStaff(id) {
			this.$http.delete('/api/users/'+id, {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token}})
			.then((response) => {
				for(let i = 0; i < this.staffs.length; i++) {
					if(this.staffs[i].id == id) {
						this.$delete(this.staffs, i)
					}
				}
				this.$vs.notify({
					title:'Success!',
					text: 'Staff was deleted with success',
					color:'success',
					position:'top-right'
				})

				this.editPopupActive = false
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
		this.getStaffs()
	},
}
</script>