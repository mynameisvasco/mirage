<template>
    <div>
        <div class="flex">
            <h3 class="mt-6 mb-5">
                Profile
            </h3>
        </div>
        <vs-row class="ml-0">
            <vs-col class="mb-4" vs-align="center" vs-sm="12" vs-w="12" vs-md="12" vs-lg="6" vs-xl="4">
                <div class="flex h-100">
                    <vx-card>
                        <vs-row>
                            <vs-col class="mb-4" vs-w="12" vs-lg="4" vs-md="6" vs-sm="12">
                                <vs-avatar v-if="!profile.picture" size="100px" color="primary" :text="profile.name"/>
                                <vs-avatar v-if="profile.picture" size="100px" :src="'storage/avatars/' + profile.picture"/>
                            </vs-col>
                            <vs-col class="mb-4" vs-w="12" vs-lg="8" vs-md="6" vs-sm="12">
                                <vs-input class="w-full l mt-6" type="file" @change="onFileChange" icon-pack="feather" icon="icon-file" icon-no-border label="Upload Picture"/>
                            </vs-col>
                            <vs-col class="mb-4" vs-align="center" vs-sm="12" vs-md="6" vs-lg="6">
                                <vs-input type="text" class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label="Name" v-model="profile.name" />
                                </vs-input>
                            </vs-col>
                            <vs-col class="mb-4" vs-align="center" vs-sm="12" vs-md="6" vs-lg="6">
                                <vs-input type="text" class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Email" v-model="profile.email" />
                                </vs-input>
                            </vs-col>
                        </vs-row>
                        <vs-row class="mb-6">
				            <vs-col class="mt-4" vs-type="flex" vs-sm="12" vs-md="6" vs-lg="6">
                                <vs-button @click="updateProfile()" icon-pack="feather" icon="icon-save" color="primary">Save</vs-button>
                            </vs-col>
                        </vs-row>
                    </vx-card>
                </div>
            </vs-col>
            <vs-col class="mb-4" vs-w="12" vs-md="12" vs-lg="6">
               <div class="h-100 flex">
                    <vx-card>
                        <vs-row class="mt-6">
                            <vs-col class="mb-4" vs-align="center" vs-sm="12" vs-md="6" vs-lg="6">
                                <vs-input type="password" autocomplete="new-password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Password" v-model="profile.password" />
                                </vs-input>
                            </vs-col>
                            <vs-col class="mb-4" vs-align="center" vs-sm="12" vs-md="6" vs-lg="6">
                                <vs-input type="password" autocomplete="new-password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Password Confirmation" v-model="profile.password_confirmation" />
                                </vs-input>
                            </vs-col>
                            <vs-col class="mt-4 mb-6" vs-type="flex" vs-sm="12" vs-md="6" vs-lg="6">
                                    <vs-button @click="updatePassword()" icon-pack="feather" icon="icon-lock" color="primary">Change Password</vs-button>
                            </vs-col>
                        </vs-row>
                    </vx-card>
                </div>
            </vs-col>
        </vs-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                profile:[]
            }
        },
        methods: {
            getProfile() {
                this.$http.get('/api/auth/user', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
                .then((response) => {
                    this.profile = response.data
                    console.log(this.profile)
                })
                .catch((error) =>{
                    console.log(error)
                })
            },
            onFileChange(event) {
                this.profile.picture = event.target.files[0]
            },
            updatePassword() {
                let formData = new FormData();
                formData.append('password', this.profile.password)
                formData.append('password_confirmation', this.profile.password_confirmation)

                 this.$http.post('/api/users/changepassword', formData ,{headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
                .then((response) => {
                    this.$vs.notify({
                        title:'Success!',
                        text: 'Password was updated with success',
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
            updateProfile() {
                let formData = new FormData();
                formData.append('picture', this.profile.picture)
                formData.append('name', this.profile.name)
                formData.append('email', this.profile.email)
                formData.append('vat', this.profile.vat)
                formData.append('address', this.profile.address)
                formData.append('_method', "PUT")

                this.$http.post('/api/users/' + this.profile.id , formData ,{headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}})
                .then((response) => {
                    this.profile = response.data
                    this.$vs.notify({
                        title:'Success!',
                        text: 'Profile was updated with success',
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
            this.getProfile()
            console.log(this.profile)
        }
    }
</script>