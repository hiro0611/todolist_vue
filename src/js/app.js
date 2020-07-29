import Vue from 'vue';

new Vue({
    el: '#app',
    data: {
        tasks:[
            {id: 1, title: 'Vueインプット', isChecked: true},
            {id: 2, title: 'Vueアウトプット', isChecked: false}
        ],
        nextId: 3,
        newTask: '',
        searchWord: ''
    },
    computed: {
        filteredTask: function(){
            return this.searchTask(this.tasks, this.searchWord);
        }
    },
    methods: {
        addTask: function(){
            this.tasks.push({
                id: this.nextId++,
                title: this.newTask,
                isChecked: false
            });
            this.newTask = '';
        },
        removeTask: function(index){
            this.tasks.splice(index,1);
        },
        searchTask: function(list, key){
            return list.filter(function(task){
                return task.title.indexOf(key) !==-1 || key === '';
            });
        }
    }
});


