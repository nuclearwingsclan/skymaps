<h2>Пиратский маяк</h2>
Победив мобов, вы сможете получить корабельные монеты<%if (typeof(coins) !== 'undefined') { %> (<%= coins %>)<% } %>.
<% if (typeof(mobs) !== 'undefined') { %>
	<br>Охрана: <%= mobs %>
<% } %>
<% if (typeof(link) !== 'undefined') { %>
	<br><a href="http://nuclearwings.ru/?page=<%= link %>" target="_blank">Список маяков региона</a>
<% } %>