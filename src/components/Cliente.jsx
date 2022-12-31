import React from 'react';
import { Form, useNavigate, redirect } from 'react-router-dom';
import { eliminarCliente } from '../data/clientes';

export async function action({ params }) {
   await eliminarCliente(params.clienteId);
   return redirect('/');
}
const Cliente = ({ cliente }) => {
   const navigate = useNavigate();
   const { nombre, empresa, id, telefono, email } = cliente;
   return (
      <tr className='border-b '>
         <td className=' text-center'>
            <p className='text-2xl text-gray-800'>{nombre}</p>
            <p className='text-gray-600'>{empresa}</p>
         </td>
         <td className=' text-center'>
            <p className=' text-gray-600'>
               <span className='text-gray-800 uppercase font-bold'>
                  Email:{' '}
               </span>
               {email}
            </p>
            <p className=' text-gray-600'>
               <span className='text-gray-800 uppercase font-bold'>
                  Telefono:{' '}
               </span>
               {telefono}
            </p>
         </td>
         <td className='p-8 text-center gap-3'>
            <button
               className='text-blue-600 hover:text-blue-700 uppercase font-bold text-xl'
               onClick={() => navigate(`/clientes/${id}/editar`)}>
               Editar
            </button>
            <Form
               method='post'
               action={`/clientes/${id}/eliminar`}
               onSubmit={(e) => {
                  if (!confirm('¿Estas seguro de eliminar este cliente?')) {
                     e.preventDefault();
                  }
               }}>
               <button
                  type='submit'
                  className='text-red-600 hover:text-red-700 uppercase font-bold text-xl'>
                  Eliminar
               </button>
            </Form>
         </td>
      </tr>
   );
};

export default Cliente;
