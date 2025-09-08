---
layout: page
title: "Writing"
permalink: /writing/
subtitle: "Blogs · Articles · Essays"
---

<div class="filters">
  <label>Filter by tag:
    <select id="tag-filter">
      <option value="">All</option>
      {% assign all_tags = site.tags | sort %}
      {% for t in all_tags %}
        <option value="{{ t[0] }}">{{ t[0] }}</option>
      {% endfor %}
    </select>
  </label>
</div>

<ul id="post-list" class="card-list">
  {% for post in site.posts %}
    <li class="card" data-tags="{{ post.tags | join: ' ' }}">
      <a class="card-link" href="{{ post.url | relative_url }}">
        <h3 class="card-title">{{ post.title }}</h3>
        <p class="card-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
        <span class="card-date">{{ post.date | date: "%B %e, %Y" }}</span>
        {% if post.tags %}<span class="card-tags">{{ post.tags | array_to_sentence_string }}</span>{% endif %}
      </a>
    </li>
  {% endfor %}
</ul>

<script>
  // Simple client-side tag filter (no build needed)
  document.addEventListener('DOMContentLoaded', function(){
    var sel = document.getElementById('tag-filter');
    var items = Array.prototype.slice.call(document.querySelectorAll('#post-list .card'));
    sel.addEventListener('change', function(){
      var v = sel.value.trim();
      items.forEach(function(el){
        if(!v) { el.style.display = ''; return; }
        var tags = (el.getAttribute('data-tags') || '').split(' ');
        el.style.display = tags.includes(v) ? '' : 'none';
      });
    });
  });
</script>
