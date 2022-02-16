<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign Up</h3>
    <input v-model="name" type="text" placeholder="Name" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Paswword" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign Up</button>
    <button v-else disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { ref } from "@vue/reactivity";
import { useRouter } from 'vue-router';

export default {
  setup(props, context) {
    const email = ref("");
    const password = ref("");
    const name = ref("");
    const router = useRouter()

    const { signup, error, isPending } = useSignup();
    const handleSubmit = async () => {
      await signup(email.value, password.value, name.value);
      if (!error.value) {
        context.emit("signup");
        router.push({ name: 'Home' })
      }
    };

    return { email, password, error, handleSubmit, isPending, name };
  },
};
</script>

<style></style>
