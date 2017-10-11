// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function() {
	$(this).toggleClass("completed");
});

// Delete Todos
$("ul").on("click", "span", function(event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	event.stopPropagation();
});

// Add New Todo
$("input[type='text']").on("keypress", function(event) {
	if(event.which === 13) {
		addTodo();
	}
});

$(".f")

function addTodo() {
	var newTodo = $("input[type='text']").val();
	$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + newTodo + "</li>");
	$("input[type='text']").val("");
}

$("h1 span").on("click", ".fa", function() {
	$(this).toggleClass("fa-caret-down");
	$(this).toggleClass("fa-caret-up");
	$("#addTodo").fadeToggle(500);
})