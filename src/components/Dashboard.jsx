import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Widget from './Widget';
import AddWidgetForm from './AddWidgetForm';

const Dashboard = () => {
    const categories = useSelector(state => state.widgets.categories);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategories = categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget =>
            widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            widget.text.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    }));

    return (
        <section className='w-5/6 mx-auto  p-10 '>
          
          <div className=' flex justify-between  justify-items-center '>
              <div className='flex justify-between self-center w-40 px-2'>
                  <div>
                    <h1>Menu</h1>
                  </div>
                  <div>
                    <h1>Dashboard</h1>
                  </div>
              </div>
              <div className="w-96">
                 <div className="">
                   <input
                     type="text"
                     placeholder="Search widgets..."
                     className=" mb-2 p-2 border rounded w-full"
                     value={searchTerm}
                     onChange={e => setSearchTerm(e.target.value)}
                   />
              </div>
          </div>  

         </div>

      {/* CNAAP DASHBOARD */}
        <div className=" my-4  bg-blue-50 p-4">
            <div className='flex justify-between '>
                <div className='flex justify-center flex-col'>
                     <h1 className='text-xl font-semibold'>CNAPP Dashboard</h1>
                </div>
                <div className='w-80'>
                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                       Button
                </button>
                </div>
            </div>
            
            
          {/* CSPM EXECUTIVE DASHBOARD */}
            <div className='px-4'>
                {filteredCategories.map(category => (
                    <div key={category.name} className="mb-6">
                        <h2 className=" font-semibold">{category.name}</h2>
                        <div className="">
                            <div className=' overflow-auto flex flex-wrap flex-row justify-start py-1 hide-scrollbar'>
                                 {category.widgets.length > 0 ? (
                                     category.widgets.map(widget => (
                                        <div className='w-80 h-40 my-1 mx-2'>
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

        </div>
    </section>
    );
};

export default Dashboard;
