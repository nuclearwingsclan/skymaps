<h2><%= caption %></h2>
<% if (typeof(npc) !== 'undefined') { %>
	NPC: <%= npc %>
<% } %>
<% if (typeof(quests) !== 'undefined') { %>
	<div style="margin: 5px 0 6px">
		Участвует в квестах:
		<ol>
			<% _.each(quests, function(item, i) { %>
				<% if (i < 5) { %>
					<li><a href="http://nuclearwings.ru/?page=<%= item.url %>" target="_blank"><%= item.caption %></a></li>
				<% } %>
			<% }); %>
			<% if (quests.length > 5) { %>
				...и ещё <%= (quests.length - 5) %> других.
			<% } %>
		</ol>
	</div>
<% } else if (typeof(link) !== 'undefined') { %>
	<br>
<% } %>
<% if (typeof(link) !== 'undefined') { %>
	<a href="http://nuclearwings.ru/?page=<%= link %>" target="_blank">Узнать больше...</a>
<% } %>