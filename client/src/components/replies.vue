<template>
  <section>
  <div class="mt-4 me-5" style="margin-left: 70px">
    <hr>
    <h5> {{reply.name}} </h5>
    <div v-if="isReplyEdit === false">
      <p> {{initialReply}} </p>
      <p @click.prevent="changeisReplyEdit" style="color:blue"> edit </p>
    </div>
    <div v-if="isReplyEdit === true" class="mb-2">
      <textarea class="form-control" rows="3" v-model="reply.reply"></textarea>
      <button type="submit" class="btn btn-primary mt-3" @click.prevent="updateReply(commentId, reply._id)">Edit Reply</button>
      <button type="submit" class="btn btn-outline-danger mt-3 ms-2" @click.prevent="changeisReplyEdit">Cancel</button>
      <p style="color:red" class="mt-2"> {{errorUpdate}} </p>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  props: [
    'reply',
    'commentId'
  ],

  data () {
    return {
      isReplyEdit: false,
      errorUpdate: '',
      initialReply: this.reply.reply
    }
  },

  methods: {
    changeisReplyEdit () {
      if (this.isReplyEdit === false) {
        this.isReplyEdit = true
      } else {
        this.isReplyEdit = false
        this.reply.reply = this.initialReply
        this.errorUpdate = ''
      }
    },

    updateReply (commentId, replyId) {
      if (this.reply.reply === '') {
        Swal.fire({
          icon: 'error',
          title: 'FAIL',
          text: 'Reply cannot be empty'
        })
      } else {
        axios({
          url: `http://localhost:3000/replies/${commentId}/${replyId}`,
          method: 'put',
          data: {
            reply: this.reply.reply
          }
        })
          .then(response => {
            this.isReplyEdit = false
            this.initialReply = this.reply.reply
            this.errorUpdate = ''
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style>

</style>
