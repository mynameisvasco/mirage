let axios = require('axios')
import Router from 'vue-router'

export default {
    user : [{
        id: null,
        name: null,
        email: null,
        picture: null,
        rank: null,
        authenticated: false,
    }],

    async getUserInfo() {
        let token = localStorage.token
        
        //If token is null means user did not login yet
        if(token === null) {
            this.user.authenticated = false
        }

        //Otherwise check if token is valid
        await axios.get('/api/auth/user',  {headers: { 'Authorization': 'Bearer ' + token } })
        .then((response) => {
            this.user.id = response.data.id
            this.user.name = response.data.name
            this.user.email = response.data.email
            this.user.picture = response.data.picture
            this.user.rank = response.data.rank
            this.user.authenticated = true
        })
        .catch(() => {
            this.user.authenticated = false
        })
    },

    async login(email,password) {
         //Send axios POST request
         await axios.post('/api/auth/login', {
            email: email,
            password: password,
        })
        .then((response) => {
            //Save token into local storage
            localStorage.token = response.data.access_token
            this.user.authenticated = true
            location.reload()
        })
        .catch((error) => {                
            console.log(error)

            //Show error notification
            this.$vs.notify({
                title:'Login failed',
                text:'Please check your credentials',
                color:'danger',
                position:'top-right'
            })
        })
    }
}