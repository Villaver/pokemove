import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

const Root = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Root/>
);
