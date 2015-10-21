<h2>«<%= caption %>»</h2>
<% if (typeof(production) !== 'undefined') { %>
	Производит:
	<ol>
		<% _.each(production, function(item) { %>
			<li><%= item %></li>
		<% }); %>
	</ol>
<% } %>
<% if (typeof(link) !== 'undefined') { %>
	<a href="http://nuclearwings.ru/?page=<%= link %>" target="_blank">Список заводов региона</a>
<% } %>