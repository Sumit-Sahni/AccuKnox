import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Widget from './Widget';
import AddWidgetModal from './AddWidgetModal';

const Dashboard = () => {
    const categories = useSelector(state => state.widgets.categories);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    const filteredCategories = categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget =>
            widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            widget.text.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    }));
    


    const handleOpenModal = () => {
        setModalOpen(true);
    };

   


    return (
        <section className=' md:w-5/6 mx-auto p-2 '>
          <div className=' flex flex-col md:flex-row justify-between  justify-items-center '>
              <div className='flex  md:flex-row justify-between md:self-center  px-2'>
                  <div>
                     <h1>Menu  &gt; </h1>
                   </div>
                  <div>
                    <h1 className= "font-bold mx-2">Dashboard V2</h1>
                  </div>
              </div>
              <div className="w-96">
                 <div className="">
                   <input
                     type="text"
                     placeholder="Search widgets..."
                     className=" mb-2 p-2 border border-blue-200 rounded w-full"
                     value={searchTerm}
                     onChange={e => setSearchTerm(e.target.value)}
                   />
              </div>
          </div>  

         </div>

      {/* CNAAP DASHBOARD */}
        <div className=" my-4 bg-[#F1F1F1] p-4 ">
            <div className='flex flex-col md:flex-row justify-between '>
                <div className='flex  flex-row items-center'>
                     <h1 className='text-xl font-semibold'>CNAPP Dashboard</h1>
                </div>
                <div className='w-80'>
                 <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                         onClick={handleOpenModal}>
                 Add Widget
                 </button>
                </div>
            </div>
            
            
          {/* CSPM EXECUTIVE DASHBOARD */}
            <div className='px-4 py-6'>
                {filteredCategories.map(category => (
                    <div key={category.name} className="mb-6">
                        <h2 className=" font-semibold">{category.name}</h2>
                        <div className="">
                            <div className='overflow-x-auto flex  flex-row justify-start py-1 scrollbar-none'>
                                 {category.widgets.length > 0 ? (
                                     category.widgets.map(widget => (
                                        <div className='w-80 h-40 my-1 mx-2 '>
                                           <Widget key={widget.id} category={category.name} widget={widget} />
                                        </div>
                                     ))
                                 ) : (
                                     <p>No widgets found.</p>
                                 )}
                            </div>  
                        </div>
                    </div>
                ))}
            </div>
            <AddWidgetModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    </section>
    );
};

export default Dashboard;
