<template>
  <div>
    <div v-if="job.length !== 0">
      <h1>{{ job.title }}</h1>
      <p>The job id is {{ id }}</p>
      <h2>{{ job.details }}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        voluptates nobis unde optio vero mollitia quas repudiandae soluta
        quisquam natus iusto, autem consectetur laboriosam laudantium modi hic
        aliquid quidem, ipsum, repellat eius? Minima, ullam! Modi eum mollitia
        facilis voluptatem dolore quas placeat corporis, quaerat odit cumque
        libero eligendi optio quo veritatis aliquid ab perferendis ullam
        commodi. Voluptates sapiente ad sunt deleniti. Doloremque sapiente ad
        ratione illum autem omnis totam quis natus voluptatem vero. Rem ipsum,
        sint maiores iusto unde sit illum voluptas magnam, quasi quaerat vitae
        totam nihil adipisci natus tempora autem ea assumenda veniam id eaque
        labore at sunt? Ea totam modi sed magnam voluptatem nesciunt, doloribus
        magni veritatis eveniet neque ab amet minus consequatur deleniti. Quos
        esse modi, asperiores nesciunt rem eveniet quas quam recusandae,
        voluptatibus tenetur sunt quaerat mollitia. Laudantium quam, est eum
        deserunt voluptate ea facere aliquid perspiciatis quisquam nihil
        corporis ipsam quidem quis non earum minima maiores doloribus iste
        voluptatem excepturi. Quia laborum sit dolores asperiores enim ex et
        necessitatibus minus, possimus provident. Vitae, veritatis voluptatem,
        officia voluptas alias magni accusamus odio culpa fuga harum quia
        laboriosam numquam inventore qui repellendus ad est expedita, nostrum
        reiciendis ducimus perferendis natus quas ratione amet. Tempora,
        recusandae nisi!
      </p>
    </div>
    <div v-else class="load">Loading job details...</div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      job: {},
    };
  },
  mounted() {
    fetch("http://localhost:3000/jobs/" + this.id)
      .then((res) => res.json())
      .then((data) => (this.job = data))
      .catch((err) => console.log(err.message));
  },
};
</script>

<style>
.load {
  text-align: center;
}
</style>
