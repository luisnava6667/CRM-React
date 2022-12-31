import { useLoaderData } from 'react-router-dom';
import Cliente from '../components/Cliente';
import { obtenerClientes } from '../data/clientes';
export function loader() {
   const clientes = obtenerClientes();
   return clientes;
}
const Index = () => {
   const clientes = useLoaderData();
   return (
      <>
         <h1 className='text-4xl text-blue-700 font-black'>Clientes</h1>
         <p className='mt-3'>Administra tus clientes</p>
         {clientes.length ? (
            <table className='table-auto shadow mt-5 w-full'>
               <thead className='bg-blue-800 text-white'>
                  <tr>
                     <th className='p-2'>Cliente</th>
                     <th className='p-2'>Contacto</th>
                     <th className='p-2'>Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {clientes.map((cliente) => (
                     <Cliente key={cliente.id} cliente={cliente} />
                  ))}
               </tbody>
            </table>
         ) : (
            <p className='mt-5 text-center text-2xl'>No hay clientes</p>
         )}
      </>
   );
};

export default Index;
