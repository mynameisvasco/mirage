<template>
    <div>
        <vs-popup background-color="rgba(0,0,0,.6)" class="holamundo" title="Edit Item" :active.sync="editPopupActive">
			<vs-row>
                <vs-col class="mb-4" vs-align="center" vs-sm="12">
                    <vs-input type="text" class="w-full" icon-pack="feather" icon="icon-edit" icon-no-border label="Description" v-model="itemToEdit.description" />
                    </vs-input>
                </vs-col>
				<vs-col vs-w="12">
					<vs-button color="primary" @click="editItem()" icon-pack="feather" icon="icon-save" type="filled">Save</vs-button>
				</vs-col>
			</vs-row>
		</vs-popup>
        <div class="flex">
            <h3 class="mt-6 mb-5">
                Company
            </h3>
        </div>
        <vs-row class="ml-0">
            <vs-col class="mb-4" vs-align="center" vs-sm="12" vs-w="12" vs-md="6" vs-lg="4">
                <div class="flex">
                    <vx-card class="h-100" title="Informations">
                        <vs-row>
                            <vs-col class="mb-4" vs-w="12" vs-lg="4" vs-md="6" vs-sm="12">
                                <vs-avatar v-if="!company.picture" size="100px" color="primary" :text="company.name"/>
                                <vs-avatar v-if="company.picture" size="100px" :src="'/storage/companies/'+ company.picture +'?'+Math.random()"/>
                            </vs-col>
                            <vs-col class="mb-5" vs-w="12" vs-lg="6">
                                <vs-input type="file" @change="onFileChange" class="w-full" icon-pack="feather" icon="icon-file" icon-no-border label="Upload Logo"/>
                            </vs-col>
                            <vs-col class="mb-4" vs-align="center" vs-sm="12">
                                <vs-input type="text" class="w-full" icon-pack="feather" icon="icon-truck" icon-no-border label="Name" v-model="company.name" />
                                </vs-input>
                            </vs-col>
                             <vs-col class="mb-4" vs-align="center" vs-sm="12">
                                <vs-input type="text" class="w-full" icon-pack="feather" icon="icon-map-pin" icon-no-border label="Address" v-model="company.address" />
                                </vs-input>
                            </vs-col>
                            <vs-col class="mb-4" vs-align="center" vs-sm="12">
                                <vs-input type="text" class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Email" v-model="company.email" />
                                </vs-input>
                            </vs-col>
                            <vs-col class="mb-4" vs-align="center" vs-sm="12">
                                <vs-input type="text" class="w-full" icon-pack="feather" icon="icon-phone" icon-no-border label="Phone" v-model="company.phone" />
                                </vs-input>
                            </vs-col>
                            <vs-col class="mb-4" vs-align="center" vs-sm="12">
                                <vs-input type="text" class="w-full" icon-pack="feather" icon="icon-hash" icon-no-border label="Company No." v-model="company.number" />
                                </vs-input>
                            </vs-col>
                        </vs-row>
                        <vs-row vs-justify="center" vs-align="center">
				            <vs-col class="mt-4" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                                <vs-button @click="updateCompanyInfo()" icon-pack="feather" icon="icon-save" color="primary">Save</vs-button>
                            </vs-col>
                        </vs-row>
                    </vx-card>
                </div>
            </vs-col>
            <vs-col style="" class="mb-4" vs-align="center" vs-sm="12" vs-w="12" vs-md="6" vs-lg="4">
                <div class="flex">
                    <vx-card class="h-100" title="Inventory Items">
                        <vs-row>
                            <vs-col class="mb-5" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                                <vs-list>
                                    <vs-list-header title="Item Name"></vs-list-header>
                                    <vs-list-item v-for="item in company.items" :title="item.name" :subtitle="item.description">
                                        <vs-button size="small" @click="openEditPopUp(item)" icon-pack="feather" icon="icon-edit" color="primary">Edit</vs-button>
                                    </vs-list-item>
                                    <vs-list-item v-if="company.items.length == 0" title="No items added yet" subtitle="Items will be displayed here"></vs-list-item>
                                </vs-list>
                            </vs-col>
                        </vs-row>
                    </vx-card>
                </div>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
import store from '../../store/store'
export default {
	data() {
		return {
            company: {
                items: [{}],
            },
            itemToEdit: {},
            editPopupActive: false,
            
        }
    },
    methods: {
        getCompanyInfo() {
            this.$http.get('/api/companies/'+ this.$store.state.AppActiveUser.company_id, {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
                this.company = response.data
                this.company.items = response.data.items
			})
			.catch((error) =>{
				console.log(error)
			})
        },

        updateCompanyInfo() {
            let formData = new FormData();
            formData.append('name', this.company.name)
			formData.append('address', this.company.address)
            formData.append('email', this.company.email)
            formData.append('phone', this.company.phone)
            formData.append('number', this.company.number)
            formData.append('picture', this.company.picture)
            formData.append('_method', 'PUT')

            this.$http.post('/api/companies/' + this.company.id, 
            formData,
            {headers: { 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
			.then((response) => {
                this.company = response.data
			    this.$vs.notify({
					title:'Success!',
					text: 'Company was updated with success',
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
        
        onFileChange(event) {
            this.company.picture = event.target.files[0]
        },
        openEditPopUp(item) {
            this.editPopupActive = true
            this.itemToEdit = item
        },
        editItem() {
            let formData = new FormData();
            formData.append('description', this.itemToEdit.description)
            formData.append('_method', 'PUT')

             this.$http.post('/api/items/' + this.itemToEdit.id, 
            formData,
            {headers: { 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
			.then((response) => {
                for(let i = 0; i < this.company.items.length; i++) {
					if(this.company.items[i].id == response.data.id) {
						this.$set(this.company.items, i, response.data)
					}
				}
			    this.$vs.notify({
					title:'Success!',
					text: 'Company was updated with success',
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
        this.getCompanyInfo()
    },

    //Only admin clients can access this route
	beforeRouteEnter : (to, from, next) => {
		if(store.state.AppActiveUser.company_rank != 3) {
			next('/login')
		} else {
			next()
		}
	}
}
</script>