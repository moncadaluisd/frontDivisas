<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <a class="pagination-previous" @click.prevent="changePage(pagination.current_page - 1)">Anterior</a>
    <a class="pagination-next" @click.prevent="changePage(pagination.current_page + 1)">Siguiente Pagina</a>
    <ul class="pagination-list">
      <li v-for="page in pages"  :key="page" :class="isCurrentPage(page) ? 'active' : ''">
        <a class="pagination-link" aria-label="Goto page 1" @click.prevent="changePage(page)">{{ page }}</a>
      </li>

    </ul>
  </nav>
</template>


  <script>
    export default {
        props:['pagination', 'offset'],
        methods: {
            isCurrentPage(page){
                return this.pagination.current_page === page
            },
            changePage(page) {
                if (page > this.pagination.last_page) {
                    page = this.pagination.last_page;
                }
                this.pagination.current_page = page;
                this.$emit('paginate');
            }
        },
        computed: {
            pages() {
                let pages = []
                let from = this.pagination.current_page - Math.floor(this.offset / 2)
                if (from < 1) {
                    from = 1
                }
                let to = from + this.offset -1
                if (to > this.pagination.last_page) {
                    to = this.pagination.last_page
                }
                while (from <= to) {
                    pages.push(from)
                    from++
                }
                return pages
            }
        }
    }
</script>



<style lang="css" scoped>
</style>
