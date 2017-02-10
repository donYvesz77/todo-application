import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])


.factory('todoFactory', ($http) => {
    


    function getTasks($scope) {
       $http.get('/todos').then(response => {
            $scope.todos = response.data.todos;
		});

		// $http({
	 //      method: 'GET',
	 //      url: '/todos'
	 //   }).then(function (response){
	 //   		console.log(response.todos);
	 //   		$scope.todos = response.todos;
	 //   });

	}

	function createTask ($scope, params) {
		
		if (!$scope.createTaskInput) { return; }

        $http.post('/todos', {
            task: $scope.createTaskInput,
            isCompleted: false,
            isEditing: false
        }).then(response => {
            getTasks($scope);
            $scope.createTaskInput = '';
            params.createHasInput = false;
		});

		// params.createHasInput = false;
		// $scope.createTaskInput = '';
	}

	function updateTask($scope, todo){
		$http.put(`/todos/${todo._id}`, { task: todo.updatedTask }).then(response => {
            getTasks($scope);
            todo.isEditing = false;
		});


		// todo.task = todo.updatedTask;
		// todo.isEditing = false;
	}

	function deleteTask ($scope, todoToDelete) {
		$http.delete(`/todos/${todoToDelete._id}`).then(response => {
            getTasks($scope);
		});

		// _.remove($scope.todos, todo => todo.task === todoToDelete.task);
	}

	function watchCreateTaskInput(params, $scope, val){
		const createHasInput = params.createHasInput; 

		if (!val && createHasInput) {
            $scope.todos.pop();
            params.createHasInput = false;
        } else if (val && !createHasInput) {
            $scope.todos.push({ task: val, isCompleted: false });
            params.createHasInput = true;
        } else if (val && createHasInput) {
            $scope.todos[$scope.todos.length - 1].task = val;
		}
	}

	return{
		getTasks,
		createTask,
		updateTask,
		deleteTask,
		watchCreateTaskInput
	};
});

export default todoFactory;