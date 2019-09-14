<template>
	<div class="flex mb-4">
		<vs-popup background-color="rgba(0,0,0,.6)" class="holamundo" title="Are you sure you want to delete this ticket?" :active.sync="deletePopUpActive">
			<vs-row vs-justify="right" vs-align="flex-end" >
				<vs-col vs-justify="right" vs-align="flex-end" class="mb-4" vs-w="12">
					<p>After take this action you won't be able to go back. Please, make sure it's what you want to do</p>
				</vs-col>
				<vs-col vs-justify="right" vs-align="flex-end" vs-w="12">
					<vs-button color="danger" @click="deleteTicket(viewTicket.id)" icon-pack="feather" icon="icon-trash" type="filled">Delete</vs-button>
				</vs-col>
			</vs-row>
		</vs-popup>
		<vs-popup class="holamundo" title="New Ticket" :active.sync="newPopupActive">
			<div style="margin-bottom:10px;">
				<vs-row>
					<vs-col class="mb-4" vs-align="center" vs-w="12">
						<vs-input type="text" class="w-full" icon-pack="feather" icon="icon-edit" icon-no-border label="Title" v-model="newTicket.title" />
						</vs-input>
					</vs-col>
				</vs-row>
			</div>
			<vs-row>
				<vs-col vs-w="12">
					<label class="ml-2" style="font-size:12px;">Message</label><br>
				</vs-col>
				<vs-col vs-type="flex"vs-justify="center" vs-align="center" vs-w="12">
					<vs-textarea  style="height:140px;" v-model="newMessage" />
				</vs-col>
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
					<vs-button color="success" @click="createTicket()" type="filled">Send</vs-button>
				</vs-col>
			</vs-row>
		</vs-popup>
		<vs-popup class="holamundo" :title="viewTicket.title" :active.sync="editPopupActive">
			<div :key="viewTicket.message.id" v-for="message in viewTicket.message" style="margin-bottom:50px;">
				<vs-row>
					<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
						<vs-avatar v-if="message.user.picture" :src="'/storage/avatars/' + message.user.picture "/> 
						<vs-avatar v-if="!message.user.picture" color="primary" :text="message.user.name"/>
					</vs-col>
  					<vs-col vs-type="" vs-justify="center" vs-align="center" vs-w="10">
						<p>{{message.body}}</p>
						<small>{{message.created_at}}</small>
					</vs-col>
				</vs-row>
			</div>
			<vs-row vs-justify="center" vs-align="center">
				<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
					<vs-textarea style="height:140px;" label="Your message" v-model="newMessage" />
				</vs-col>
				<vs-col vs-type="flex" class="mb-4" vs-justify="center" vs-align="center" vs-w="3" vs-md="4" vs-sm="12">
					<vs-button color="success" @click="replyTicket(viewTicket.id)" icon-pack="feather" icon="icon-send" type="filled">Reply</vs-button>
				</vs-col>
			</vs-row>
		</vs-popup>
		<div class="w-full">
			<vs-button icon-pack="feather" @click="newPopupActive = true" class="mb-4" icon="icon-plus">New Ticket</vs-button>
			<vs-table search max-items="10" pagination :data="tickets">
				<template slot="header">
					<h3 class="mb-5">
						Tickets
					</h3>
				</template>
				<template slot="thead">
					<vs-th>
						Title
					</vs-th>
					<vs-th sort-key="status">
						Status
					</vs-th>
					<vs-th sort-key="updated_at">
						Last Reply Date
					</vs-th>
					<vs-th>
					</vs-th>
				</template>
				<template slot-scope="{data}">
					<vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="data[indextr].title">
                            {{data[indextr].title}}
                        </vs-td>

                        <vs-td :data="data[indextr].status">
                            <vs-chip :color="getTicketStatus(data[indextr].status).status">{{getTicketStatus(data[indextr].status).text}}</vs-chip>
                        </vs-td>

                        <vs-td :data="data[indextr].updated_at">
                            {{data[indextr].updated_at}}
                        </vs-td>
                        <vs-td :data="data[indextr].id">
                            <vs-button @click="getTicket(data[indextr].id)" color="primary">Open</vs-button>
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
			editPopupActive: false,
			newPopupActive: false,
			deletePopUpActive: false,
			tickets:[],
			viewTicket: [],
			newMessage: [],
			clients: [],
			newTicket: {
				client_id: null,
				title: null,
			},
		}
	},
	methods: {
		getTicketStatus: function(status) {
			if(status === 1) {
				return {status:'success', text:'Replied'}
			} else if (status === 0) {
				return {status:'warning', text:'Waiting for reply'}
			} else if(status === 2) {
				return {status:'primary', text:'Resolved'}
			} else {
				return {status:'Unknown', text:'danger'}
			}
		},

		getTickets() {
			this.$http.get('/api/tickets', {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.tickets = response.data
			})
			.catch((error) =>{
				console.log(error)
			})
		},
		getTicket(id) {
			this.editPopupActive = true
			this.$http.get('/api/tickets/' + id, {headers: { 'Authorization': 'Bearer ' + localStorage.token }})
			.then((response) => {
				this.viewTicket = response.data
			})
			.catch((error) =>{
				console.log(error)
			})
		},

		getDate() {
			let today = new Date()
			let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
			let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
			return date+' '+time
		},

		replyTicket(id) {
			let message = {
				body: this.newMessage, 
				ticket_id: this.viewTicket.id,
			} 
			this.$http.post('/api/messages', 
				message,
				{headers: { 'Authorization': 'Bearer ' + localStorage.token }}
			)
			.then((response) => {
				this.viewTicket.message.push(response.data)
				for(let i = 0; i < this.tickets.length; i++) {
					if(this.tickets[i].id == this.viewTicket.id) {
						this.$set(this.tickets[i], 'status', response.data.ticket.status)
					}
				}
			})
			.catch((error) =>{
				console.log(error)
			})
		},

		createTicket(user_id) {
			let message = {
				body: this.newMessage,
				staff_id: 0,
				user_id: this.$store.state.AppActiveUser.id,
				title: this.newTicket.title
			} 
			this.$http.post('/api/messages', 
				message,
				{headers: { 'Authorization': 'Bearer ' + localStorage.token }}
			)
			.then((response) => {
				this.tickets.push(response.data[0])
				this.$vs.notify({
					title:'Success!',
					text: 'Message was sent and ticket was creted!',
					color:'success',
					position:'top-right'
				})
			})
			.catch((error) =>{
				console.log(error)
			})
		} 
	},
	computed: {
		user: function() {
			return this.$store.state.AppActiveUser
		}
	},
	mounted() {
		this.getTickets()
		if(this.$route.fullPath.split("?")[1])
		{
			this.getTicket(this.$route.fullPath.split("?")[1])
		}
	},
}
</script>