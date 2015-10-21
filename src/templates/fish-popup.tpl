<h2>Рыбное место</h2>
<% if (typeof(list) !== 'undefined') { %>
	Здесь ловится:
	<ol>
		<% _.each(list, function(item) { %>
			<li><%= item %></li>
		<% }); %>
	</ol>
<% } %>
<a href="http://nuclearwings.ru/?page=library/fishing" target="_blank">Узнать больше...</a>