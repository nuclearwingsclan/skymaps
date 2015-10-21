<h2>Флягеры</h2>
Лёгкое: <%= easy %><br>
Сложное: <%= hard %>
<% if (typeof(link) !== 'undefined') { %>
	<br><a href="http://nuclearwings.ru/?page=<%= link %>" target="_blank">Список флягеров региона</a>
<% } %>