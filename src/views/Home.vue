<template>
	<div class="home">
		<div v-if="error" class="error">Could not fetch the data</div>
		<div v-if="documents">
			<ListView :playlists="documents" />
		</div>
	</div>
</template>

<script>
import getColection from "../composables/getCollection";
import ListView from '../components/ListView.vue';
export default {
	name: "Home",
    components: { ListView },
	setup() {
		const { error, documents } = getColection('playlists');
		return { error, documents };
	},
};
</script>

<style>

</style>