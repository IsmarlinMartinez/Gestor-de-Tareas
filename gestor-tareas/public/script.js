async function cargarTareas() {
      const res = await fetch('/api/tareas');
      const tareas = await res.json();
      const ul = document.getElementById('listaTareas');
      const vacio = document.getElementById('vacio');
      ul.innerHTML = '';
      if (tareas.length === 0) { vacio.style.display = 'block'; return; }
      vacio.style.display = 'none';
      tareas.forEach(t => {
        const li = document.createElement('li');
        if (t.completada) li.classList.add('completada');
        li.innerHTML = `
          <button class="check-btn" onclick="toggleTarea(${t.id})">✓</button>
          <span>${t.titulo}</span>
          <button class="del-btn" onclick="eliminarTarea(${t.id})">×</button>
        `;
        ul.appendChild(li);
      });
    }

    async function agregarTarea() {
      const input = document.getElementById('nuevaTarea');
      const titulo = input.value.trim();
      if (!titulo) return;
      await fetch('/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo })
      });
      input.value = '';
      cargarTareas();
    }

    async function toggleTarea(id) {
      await fetch(`/api/tareas/${id}`, { method: 'PATCH' });
      cargarTareas();
    }

    async function eliminarTarea(id) {
      await fetch(`/api/tareas/${id}`, { method: 'DELETE' });
      cargarTareas();
    }

    document.getElementById('nuevaTarea').addEventListener('keydown', e => {
      if (e.key === 'Enter') agregarTarea();
    });

    cargarTareas();