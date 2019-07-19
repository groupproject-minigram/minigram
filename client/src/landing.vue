<template>
    <div id="landing">
        <b-button v-b-modal.modal-register>Register</b-button>
        <b-button v-b-modal.modal-login>Login</b-button>

         <div>
    

    <!-- <div class="mt-3">
      Submitted Names: -->
      <!-- <div v-if="submittedNames.length === 0">--</div> -->
      <!-- <ul v-else class="mb-0 pl-3"> -->
        <!-- <li v-for="name in submittedNames">{{ name }}</li> -->
      <!-- </ul> -->
    <!-- </div> -->

    <b-modal
      id="modal-register"
      ref="modal"
      title="Submit Your Data"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >

      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Username"
          label-for="name-input"
          invalid-feedback="Name is required"
        >        
          <b-form-input
            id="user-name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>

          <b-form-group
          :state="emailState"
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="email"
            v-model="registerEmail"
            :state="emailState"
            required
          ></b-form-input>

          <b-form-group
          :state="password"
          label="Password"
          label-for="password-input"
          invalid-feedback="password is required"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="registerPassword"
            :state="password"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      id="modal-login"
      ref="modal"
      title="Login With Your Registered Email"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">      
          <b-form-group
          :state="emailState"
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="email"
            v-model="loginEmail"
            :state="emailState"
            required
          ></b-form-input>

          <b-form-group
          :state="password"
          label="Password"
          label-for="password-input"
          invalid-feedback="password is required"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="loginPassword"
            :state="password"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
    </div>
</template>

<script>
export default {
    name: 'landing',
    props:['page']
}
</script>

<style>

</style>
