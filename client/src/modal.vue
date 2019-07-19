<template>
  <div v-if="page == 'landing'">
    <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>

    <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames" :key="name">{{ name }}</li>
      </ul>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="register">
        <b-form-group
          label="Username"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Email"
          label-for="email-input"
        >
          <b-form-input
            id="name-input"
            v-model="email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Password"
          label-for="passowrd-input"
        >
          <b-form-input
            id="name-input"
            v-model="password"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    props:['page'],
    data() {
      return {
        username: '',
        email:'',
        password:'',
        submittedNames: []
      }
    },
    methods: {
    //   checkFormValidity() {
    //     const valid = this.$refs.form.checkValidity()
    //     this.nameState = valid ? 'valid' : 'invalid'
    //     return valid
    //   },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.register()
      },
      register() {
        // Exit when the form isn't valid
        // if (!this.checkFormValidity()) {
        //   return
        // }
        // Push the name to submitted names
        this.submittedNames.push(this.username)
        console.log(this.username)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      }
    }
  }
</script>