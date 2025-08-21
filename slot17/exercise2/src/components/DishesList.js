import React, {useContext, useMemo, useState} from "react";
import {CartContext} from "./CartContext";
import PropTypes from "prop-types";

const DishesList = ({dishes}) => {
    const {addToCart} = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredDishes = useMemo(() => {
        const keyword = searchTerm.trim().toLowerCase();
        if (!keyword) return dishes;
        return dishes.filter((dish) =>
            dish.name.toLowerCase().includes(keyword) ||
            (dish.description || "").toLowerCase().includes(keyword)
        );
    }, [dishes, searchTerm]);

    return (
        <div className="container">
            <h2 className="section-title">Danh sách món ăn</h2>
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc mô tả..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Tìm kiếm món ăn"
                />
            </div>
            <div className="dishes">
                {filteredDishes.map(dish => (
                    <div key={dish.id} className="dish-item">
                        <img src={dish.image} alt={dish.name} />
                        <div className="dish-content">
                            <h3>{dish.name}</h3>
                            <p className="dish-desc">{dish.description}</p>
                            <p className="dish-price">{`Price: $${parseFloat(dish.price).toFixed(2)}`}</p>
                            <button className="btn btn-primary" onClick={() => addToCart(dish)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

DishesList.propTypes = {
    dishes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            price: PropTypes.string.isRequired
        })
    ).isRequired,
};

export default DishesList;
