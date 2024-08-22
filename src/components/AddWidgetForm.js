import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../store/WidgetSlice';

const AddWidgetForm = ({ categoryName }) => {
    const [widgetName, setWidgetName] = useState('');
    const [widgetText, setWidgetText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const newWidget = {
            id: Date.now(),
            name: widgetName,
            text: widgetText,
        };
        dispatch(addWidget({ categoryName, widget: newWidget }));
        setWidgetName('');
        setWidgetText('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input 
                type="text" 
                placeholder="Widget Name" 
                className="p-2 mb-2 border rounded w-full"
                value={widgetName} 
                onChange={e => setWidgetName(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Widget Text" 
                className="p-2 mb-2 border rounded w-full"
                value={widgetText} 
                onChange={e => setWidgetText(e.target.value)} 
                required 
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full">
                Add Widget
            </button>
        </form>
    );
};

export default AddWidgetForm;
