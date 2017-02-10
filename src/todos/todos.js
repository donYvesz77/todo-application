import _ from 'lodash';

export default function ($scope, todoFactory) {
	/* body... */
	let params = {
		createHasInput: false
	};
	

	// $scope.todos = [
	// {
	// 	task: 'do dishes',
	// 	isCompleted: false,
	// 	isEditing: false
	// },
	// {
	// 	task: 'Walk the Dog',
	// 	isCompleted: true,
	// 	isEditing: false
	// },	
	// ];

	todoFactory.getTasks($scope);

	$scope.onEditClick = todo =>{
		todo.isEditing = true;
		todo.updatedTask = todo.task;
	}

	$scope.onCompletedClick = todo => {
		todo.isCompleted = !todo.isCompleted;
	}

	$scope.onCancelClick = todo =>{
		todo.isEditing = false;
	}



	const {createTask, updateTask, deleteTask, watchCreateTaskInput} = todoFactory;

	$scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, params, $scope));

	$scope.createTask = _.partial(createTask, $scope, params);
	$scope.updateTask = _.partial(updateTask, $scope);
	$scope.deleteTask = _.partial(deleteTask, $scope);
}