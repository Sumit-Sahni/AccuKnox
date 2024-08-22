import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [
        {
            name: 'CSPM Executive Dashboard',
            widgets: [
                { id: 1, name: 'Cloud Account', text: 'Connected' },
            ],
        },

        {
            name: 'CWPP Dashboard',
            widgets: [
                { id: 1, name: 'Top 5 Namespace Specif Alert', text: 'No Graph available' },
            ],
        },
    ],
};

const widgetSlice = createSlice({
    name: 'widgets',
    initialState,
    reducers: {
        addWidget: (state, action) => {
            const { categoryName, widget } = action.payload;
            const category = state.categories.find(cat => cat.name === categoryName);
            if (category) {
                category.widgets.push(widget);
            }
        },
        removeWidget: (state, action) => {
            const { categoryName, widgetId } = action.payload;
            const category = state.categories.find(cat => cat.name === categoryName);
            if (category) {
                category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
            }
        },
    },
});

export const { addWidget, removeWidget } = widgetSlice.actions;
export default widgetSlice.reducer;