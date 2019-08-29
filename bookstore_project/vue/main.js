let app = new Vue( {
    el: '#bookstore',
    data: {
    books: [],
    isLoading: true

    },
    methods: {
        fetchData: function() {
            fetch('https://api.myjson.com/bins/zyv02')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // console.log(data);
                    this.books = data.books;
                    this.isLoading = false;
                })
                .catch(err => {
                    console.log('oh snap, summit went wrong', err);
                });
        }
    },
    mounted(){
        this.fetchData();
    }
})
