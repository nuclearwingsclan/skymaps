<h2>Мастерская</h2>
<% if (typeof(list) !== 'undefined') { %>
	Производит:
	<ol>
		<% _.each(list, function(item) { %>
			<li><%= item %></li>
		<% }); %>
	</ol>
<% } %>
<% if (typeof(link) !== 'undefined') { %>
	<a href="http://nuclearwings.ru/?page=<%= link %>" target="_blank">Список мастерских региона</a>
<% } %>