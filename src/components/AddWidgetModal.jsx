import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget } from '../store/WidgetSlice';

const AddWidgetModal = ({ isOpen, onClose }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [widgetName, setWidgetName] = useState('');
    const [widgetText, setWidgetText] = useState('');
    const dispatch = useDispatch();

    // Fetch categories dynamically from the Redux store
    const categories = useSelector(state => state.widgets.categories);

    useEffect(() => {
        if (isOpen) {
            setSelectedCategory(null); // Reset the selected category when the modal opens
            setWidgetName('');  // Clear the widget name when the modal opens
            setWidgetText('');  // Clear the widget text when the modal opens
        }
    }, [isOpen]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            const newWidget = {
                id: Date.now(), // Generates a unique ID for the new widget
                name: widgetName,
                text: widgetText,
            };
            dispatch(addWidget({ categoryName: selectedCategory, widget: newWidget }));
            onClose(); // Close the modal after submitting the form
        } else {
            alert('Please select a category.');
        }
    };

    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 bg-slate-500 bg-opacity-70 flex  justify-end">
            <div className="bg-white p-4 rounded shadow-lg w-full h-80 md:h-full  md:w-2/5 rounded-l-xl ">
                 <div className=' bg-slate-600 px-2 py-1 my-4 flex justify-between  rounded'>
                   <h2 className="text-lg text-white ">Add Widget</h2>
                   <h2 onClick={onClose} className='text-red-500 text-xl px-2 cursor-pointer'>X</h2>
                 </div>
                <div className="flex flex-row mb-4">
                    {categories.map(category => (
                        <button
                            key={category.name}
                            onClick={() => handleCategorySelect(category.name)}
                            className={`flex-1 w-10 p-2 mx-1 rounded   ${
                                selectedCategory === category.name ? 'border-2 border-blue-400 shadow-2xl ' : 'border border-gray-800'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className=''>
                 <form onSubmit={handleSubmit} className='flex flex-col h-80'>
                    <input 
                        type="text" 
                        placeholder="Widget Name" 
                        className="p-2 mb-2 border rounded w-full"
                        value={widgetName} 
                        onChange={e => setWidgetName(e.target.value)} 
                        required 
                        disabled={!selectedCategory} // Disable if no category is selected
                    />
                    <input 
                        type="text" 
                        placeholder="Widget Text" 
                        className="p-2 mb-2 border rounded w-full"
                        value={widgetText} 
                        onChange={e => setWidgetText(e.target.value)} 
                        required 
                        disabled={!selectedCategory} // Disable if no category is selected
                    />

                    <div className='flex justify-end'>
                       <button onClick={onClose}  className=" bg-transparent hover:bg-red-400 hover:text-white   py-1 px-4 border border-red-500 hover:border-transparent rounded">Cancel</button>
                    <button 
                        type="submit" 
                        className="border border-blue-500 text-black p-2 rounded hover:text-white hover:bg-blue-900 w-30 mx-2 cursor-pointer"
                        disabled={!selectedCategory} // Disable if no category is selected
                    >
                        Conform
                     </button>
                    </div>
                   
                </form>
                </div>
                
            </div>
        </div>
    );
};

export default AddWidgetModal;
