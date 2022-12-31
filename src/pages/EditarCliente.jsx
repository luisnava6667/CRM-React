import {
   Form,
   useNavigate,
   useLoaderData,
   useActionData,
   redirect,
} from 'react-router-dom';
import Error from '../components/Error';
import Formulario from '../components/Formulario';
import { actualizarCliente, obtenerCliente } from '../data/clientes';

export async function loader({ params }) {
   const { clienteId } = params;
   const cliente = await obtenerCliente(clienteId);
   if (Object.values(cliente).length === 0) {
      throw new Response('', {
         status: 404,
         statusText: 'No hay Resultados',
      });
   }
   return cliente;
}
export async function action({ params, request }) {
   const formData = await request.formData();
   const datos = Object.fromEntries(formData);
   const email = formData.get('email');
   //validacion de datos
   const errores = [];
   if (Object.values(datos).includes('')) {
      errores.push('Todos los campos son obligatorios');
   }

   let regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
   );
   if (!regex.test(email)) {
      errores.push('El email no es valido');
   }
   //retornar datos si hay errores
   if (Object.keys(errores).length) {
      return errores;
   }
   //actualizar cliente
   await actualizarCliente(params.clienteId, datos);
   return redirect('/');
}

const EditarCliente = () => {
   const navigate = useNavigate();
   const cliente = useLoaderData();
   const errores = useActionData();
   return (
      <>
         <h1 className='text-4xl text-blue-700 font-black'>Editar Cliente</h1>
         <p className='mt-3'>
            Acontinuacion podras modificar los datos de un cliente
         </p>
         <div className='flex justify-end'>
            <button
               className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
               onClick={() => navigate('/')}>
               Volver
            </button>
         </div>
         <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
            {errores?.length &&
               errores.map((error, i) => <Error key={i}>{error}</Error>)}
            <Form method='post' noValidate>
               <Formulario cliente={cliente} />
               <input
                  type='submit'
                  className='bg-blue-800 w-full mt-5 p-3 font-bold text-white uppercase hover:bg-blue-900'
                  value='Guardar Cambios'
               />
            </Form>
         </div>
      </>
   );
};

export default EditarCliente;
