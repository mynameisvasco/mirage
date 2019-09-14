<template>
    <div >
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
                            <vs-col class="mb-5" vs-w="12" vs-lg="6">
                                <label class="ml-1" style="font-size:13px;">Current Logo</label>
                                <p><img class="mb-4" style="background-color:#eaeaea; border-radius:10px; padding:6px;" :src="'/storage/company/logo.png?'+Math.random()" width="100%"></p>
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
                    <vx-card class="h-100" title="Taxes">
                        <vs-row>
                            <vs-col class="mb-5" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" vs-lg="12">
                                <vs-input type="text" class="w-full" icon-pack="feather" icon="icon-edit" icon-no-border label="Name" v-model="taxToAdd.name" />
						        </vs-input>
                            </vs-col>
                            <vs-col class="mb-5" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" vs-lg="12">
                                <vs-input type="number" step="1" class="w-full" icon-pack="feather" icon="icon-percent" icon-no-border label="Percentage" v-model="taxToAdd.percentage" />
						        </vs-input>
                            </vs-col>
                            <vs-col class="mb-6" vs-w="12" vs-lg="12">
                                <vs-button @click="addTax()" icon-pack="feather" icon="icon-plus" color="primary">Add</vs-button>
                            </vs-col>
                        </vs-row>
                        <vs-row>
                            <vs-col class="mb-5" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                                <vs-list>
                                    <vs-list-header title="Tax Name"></vs-list-header>
                                    <vs-list-item v-for="tax in company.taxes" :title="tax.name + ' (' + tax.percentage + '%)'">
                                        <vs-button size="small" @click="removeTax(tax.name)" icon-pack="feather" icon="icon-x" color="danger">Remove</vs-button>
                                    </vs-list-item>
                                    <vs-list-item v-if="company.taxes.length == 0" title="No taxes added yet" subtitle="Taxes will be displayed here"> </vs-list-item>
                                </vs-list>
                            </vs-col>
                        </vs-row>
                        <vs-row vs-justify="center" vs-align="center">
				            <vs-col class="mt-5" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
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
                            <vs-col class="mb-5" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" vs-lg="12">
                                <vs-input type="text" class="w-full" icon-pack="feather" icon="icon-box" icon-no-border label="Name" v-model="itemToAdd.name" />
						        </vs-input>
                            </vs-col>
                            <vs-col class="mb-5" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" vs-lg="12">
                                <vs-input type="text" step="1" class="w-full" icon-pack="feather" icon="icon-edit" icon-no-border label="Description" v-model="itemToAdd.description" />
						        </vs-input>
                            </vs-col>
                            <vs-col class="mb-6" vs-w="12" vs-lg="12">
                                <vs-button @click="addItem()" icon-pack="feather" icon="icon-plus" color="primary">Add</vs-button>
                            </vs-col>
                        </vs-row>
                        <vs-row>
                            <vs-col class="mb-5" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                                <vs-list>
                                    <vs-list-header title="Item Name"></vs-list-header>
                                    <vs-list-item v-for="item in company.items" :title="item.name" :subtitle="item.description">
                                        <vs-button size="small" @click="removeItem(item.name)" icon-pack="feather" icon="icon-x" color="danger">Remove</vs-button>
                                    </vs-list-item>
                                    <vs-list-item v-if="company.items.length == 0" title="No items added yet" subtitle="Items will be displayed here"> </vs-list-item>
                                </vs-list>
                            </vs-col>
                        </vs-row>
                        <vs-row vs-justify="center" vs-align="center">
				            <vs-col class="mt-5" vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                                <vs-button @click="updateCompanyInfo()" icon-pack="feather" icon="icon-save" color="primary">Save</vs-button>
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
                taxes: [{}],
                items: [{}],
            },
            taxToAdd: {
                name: "",
                percentage:null,
            },
            itemToAdd: {
                name: "",
                description: "",
            }
            
        }
    },
    methods: {
        getCompanyInfo() {
            this.$http.get('/api/companyinformations', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
                this.company = response.data
                this.company.taxes = JSON.parse(response.data.taxes)
                this.company.items = JSON.parse(response.data.items)
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
            formData.append('taxes', JSON.stringify(this.company.taxes))
            formData.append('items', JSON.stringify(this.company.items))
            formData.append('logo', this.company.logo)
            formData.append('_method', 'PUT')

            this.$http.post('/api/companyinformations/' + this.company.id, 
            formData,
            {headers: { 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
			.then((response) => {
                this.company = response.data
                this.company.taxes = JSON.parse(response.data.taxes)
                this.company.items = JSON.parse(response.data.items)
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
            this.company.logo = event.target.files[0]
        },

        addTax() {
            this.company.taxes.push(this.taxToAdd)
        },

        addItem() {
            this.company.items.push(this.itemToAdd)
        },

        removeTax(name) {
			for(let i = 0; i < this.company.taxes.length; i++) {
				if(this.company.taxes[i].name == name) {
					this.$delete(this.company.taxes, i)
				}
			}
		},

        removeItem(name) {
			for(let i = 0; i < this.company.items.length; i++) {
				if(this.company.items[i].name == name) {
					this.$delete(this.company.items, i)
				}
			}
		}
    },
    mounted() {
        this.getCompanyInfo()
    },

    //Only admins can access this route
	beforeRouteEnter : (to, from, next) => {
		if(store.state.AppActiveUser.rank != 3) {
			next('/login')
		} else {
			next()
		}
	}
}
</script>