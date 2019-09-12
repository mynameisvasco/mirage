<template>
    <div class="h-screen flex w-full bg-dark-shapes vx-row no-gutter items-center justify-center" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-2/3 lg:w-1/2 xl:w-1/4 sm:m-0 m-4">
            <img src="@assets/images/logo/logo.png" width="90%" class="mb-5" alt="logo">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row bg-transparent no-gutter justify-center items-center">
                        <div class="vx-col sm:w-full md:w-full lg:w-full d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Login</h4>
                                    <p>Welcome back, please login to your account.</p>
                                </div>
                                <vs-input
                                    icon="icon icon-user"
                                    icon-pack="feather"
                                    label-placeholder="Email"
                                    v-model="email"
                                    class="w-full no-icon-border"/>

                                <vs-input
                                    type="password"
                                    icon="icon icon-lock"
                                    icon-pack="feather"
                                    label-placeholder="Password"
                                    v-model="password"
                                    class="w-full mt-6 no-icon-border" />

                                <div class="flex flex-wrap justify-between my-5">
                                    <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
                                    <router-link to="#">Forgot Password?</router-link>
                                </div>
                                <vs-button @click="login()" class="float-right mb-5">Login</vs-button>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
import User from '../../user'
export default {
    data() {
        return {
            email: '',
            password: '',
            checkbox_remember_me: false
        }
    },

    methods: {
        login : function() {
            User.login(this.email, this.password)
        }
    }
}
</script>