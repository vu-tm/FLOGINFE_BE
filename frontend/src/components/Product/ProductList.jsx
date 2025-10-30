import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function ProductList() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        api.get('/products').then(res => setItems(res.data)).catch(() => { });
    }, []);
    return (
        <div>
            <h3>Products</h3>
            <ul>
                {items.map(p => <li key={p.id}>{p.name} - {p.price}</li>)}
            </ul>
        </div>
    );
}
