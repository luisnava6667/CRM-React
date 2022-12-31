export async function obtenerClientes() {
   try {
      const respuesta = await fetch(import.meta.env.VITE_API_URL);
      const resultado = await respuesta.json();
      return resultado;
   } catch (error) {
      console.log(error);
   }
}
export async function obtenerCliente(id) {
   try {
      const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
      const resultado = await respuesta.json();
      return resultado;
   } catch (error) {
      console.log(error);
   }
}
export async function agregarCliente(datos) {
   try {
      const respuesta = await fetch(import.meta.env.VITE_API_URL, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(datos),
      });
      const resultado = await respuesta.json();
      return resultado;
   } catch (error) {
      console.log(error);
   }
}
export async function actualizarCliente(id, datos) {
   try {
      const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(datos),
      });
      const resultado = await respuesta.json();
      return resultado;
   } catch (error) {
      console.log(error);
   }
}
export async function eliminarCliente(id) {
   try {
      const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
         method: 'DELETE',
      });
      const resultado = await respuesta.json();
      return resultado;
   } catch (error) {
      console.log(error);
   }
}
