const app = Vue.createApp({
  data() {
    return {
      showBook: true,
      url: "https://github.com/imran2975",
      books: [
        {
          title: "The final Empire",
          author: "Brandon Sanderson",
          age: 45,
          img: "assets/1.PNG",
          isFav: true,
        },
        {
          title: "Jiki magayi",
          author: "Buhari",
          age: 75,
          img: "assets/2.PNG",
          isFav: false,
        },
        {
          title: "Sweet sixteen",
          author: "Brandon Sanderson",
          age: 45,
          img: "assets/3.PNG",
          isFav: true,
        },
      ],
      x: 0,
      y: 0,
    };
  },
  methods: {
    toggleFav(book) {
      book.isFav = !book.isFav;
    },
    toggleShowBook() {
      this.showBook = !this.showBook;
    },
    handleEvent() {
      console.log("event");
    },
    handleMouseMove(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    },
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) => book.isFav);
    },
  },
});

app.mount("#app");
