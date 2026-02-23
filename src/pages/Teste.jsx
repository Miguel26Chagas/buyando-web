import toast, { Toaster } from 'react-hot-toast';

export const Teste = () => {
    const notify = () => toast('Here is your toast.');

    return(    
        <div>
            <button onClick={notify} className='bg-red-300 p-4 mt-4 rounded-md shadow-sm'>Make me a toast</button>
            <Toaster />
        </div>
        );
}