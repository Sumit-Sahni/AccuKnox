import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../store/WidgetSlice';

const Widget = ({ category, widget }) => {
    const dispatch = useDispatch();

    return (
        <div className="bg-white p-4 shadow w-80 h-40 border rounded-xl">
            <p className="text-lg font-medium">{widget.name}</p>
            <p className="text-gray-600">{widget.text}</p>
            <button
                className="mt-2 text-red-500 hover:text-red-700"
                onClick={() => dispatch(removeWidget({ categoryName: category, widgetId: widget.id }))}
            >
                Remove
            </button>
        </div>
    );
};

export default Widget;
